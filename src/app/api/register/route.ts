import { getDb } from "@/db";
import { registrations } from "@/db/schema";
import { normalizeRegisterInput, validateRegisterInput } from "@/lib/validation";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const RATE_LIMIT_MS = 12_000;
const recentSubmissions = new Map<string, number>();

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function pruneRateLimit(now: number) {
  if (recentSubmissions.size < 500) return;
  for (const [key, ts] of recentSubmissions) {
    if (now - ts > RATE_LIMIT_MS * 3) recentSubmissions.delete(key);
  }
}

function buildTelegramMessage(input: {
  name: string;
  telegram: string;
  phone: string;
  comment: string;
}): string {
  const about = input.comment.trim() ? input.comment.trim() : "не указано";
  return [
    "Новая заявка на интенсив «Создание отдела SMM из AI-агентов»",
    "",
    `Имя: ${input.name}`,
    `Telegram: ${input.telegram}`,
    `Телефон: ${input.phone}`,
    `О себе: ${about}`,
  ].join("\n");
}

async function sendTelegramMessage(text: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, error: "telegram_not_configured" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });

    const payload = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    if (!response.ok || !payload?.ok) {
      return { ok: false, error: "telegram_failed" };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "telegram_failed" };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const now = Date.now();
  const clientKey = getClientKey(request);
  pruneRateLimit(now);

  const last = recentSubmissions.get(clientKey);
  if (last && now - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { ok: false, message: "Слишком много попыток. Подождите несколько секунд и попробуйте ещё раз." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Не удалось прочитать данные формы." },
      { status: 400 },
    );
  }

  const body = raw as Record<string, unknown>;
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true, message: "Заявка отправлена! Мы свяжемся с вами в Telegram." });
  }

  const input = normalizeRegisterInput(raw);
  const errors = validateRegisterInput(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Проверьте обязательные поля.", errors },
      { status: 400 },
    );
  }

  recentSubmissions.set(clientKey, now);

  const telegram = await sendTelegramMessage(buildTelegramMessage(input));
  if (!telegram.ok) {
    recentSubmissions.delete(clientKey);
    return NextResponse.json(
      {
        ok: false,
        message: "Не удалось отправить заявку. Попробуйте ещё раз через минуту.",
      },
      { status: 502 },
    );
  }

  try {
    await getDb().insert(registrations).values({
      name: input.name,
      telegram: input.telegram,
      phone: input.phone,
      comment: input.comment || null,
    });
  } catch (error) {
    console.error("Failed to persist registration", error);
  }

  return NextResponse.json({
    ok: true,
    message: "Заявка отправлена! Мы свяжемся с вами в Telegram.",
  });
}
