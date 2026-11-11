export type RegisterPayload = {
  name: string;
  telegram: string;
  phone: string;
  comment: string;
};

export type FieldErrors = Partial<Record<keyof RegisterPayload, string>>;

const NAME_RE = /^[\p{L}\p{M}\s.'-]{2,80}$/u;

function telegramIsValid(value: string): boolean {
  const trimmed = value.trim();
  const withoutProtocol = trimmed.replace(/^https?:\/\//i, "");
  const username = withoutProtocol
    .replace(/^(?:t\.me|telegram\.me)\//i, "")
    .replace(/^@/, "")
    .replace(/\/$/, "");

  return /^[a-zA-Z][a-zA-Z0-9_]{3,31}$/.test(username);
}

export function normalizeRegisterInput(raw: unknown): RegisterPayload {
  const data = (raw ?? {}) as Record<string, unknown>;
  const pick = (key: string) => String(data[key] ?? "").replace(/\s+/g, " ").trim();

  return {
    name: pick("name").slice(0, 120),
    telegram: pick("telegram").slice(0, 160),
    phone: pick("phone").slice(0, 40),
    comment: String(data.comment ?? "").trim().slice(0, 1000),
  };
}

export function validateRegisterInput(input: RegisterPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name) {
    errors.name = "Укажите имя";
  } else if (!NAME_RE.test(input.name)) {
    errors.name = "Имя может содержать только буквы, пробелы и дефис";
  }

  if (!input.telegram) {
    errors.telegram = "Укажите Telegram";
  } else if (!telegramIsValid(input.telegram)) {
    errors.telegram = "Укажите никнейм или ссылку Telegram";
  }

  if (!input.phone) {
    errors.phone = "Укажите номер телефона";
  } else {
    const digits = input.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      errors.phone = "Введите корректный номер телефона";
    }
  }

  return errors;
}
