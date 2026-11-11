"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { validateRegisterInput } from "@/lib/validation";
import type { FieldErrors, RegisterPayload } from "@/lib/validation";

const INITIAL: RegisterPayload = {
  name: "",
  telegram: "",
  phone: "",
  comment: "",
};

export default function RegisterForm() {
  const [values, setValues] = useState<RegisterPayload>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  function update<K extends keyof RegisterPayload>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validateRegisterInput(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setMessage("");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; errors?: FieldErrors }
        | null;

      if (!response.ok || !data?.ok) {
        if (data?.errors) setErrors(data.errors);
        setStatus("error");
        setMessage(data?.message || "Не удалось отправить заявку. Попробуйте ещё раз.");
        return;
      }

      setStatus("success");
      setMessage("Заявка отправлена! Мы свяжемся с вами в Telegram.");
      setValues(INITIAL);
      // Decrement the seat counter on the landing page without a reload.
      if (typeof window !== "undefined" && typeof (window as unknown as { __seatBump?: () => void }).__seatBump === "function") {
        (window as unknown as { __seatBump?: () => void }).__seatBump!();
      }
    } catch {
      setStatus("error");
      setMessage("Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.");
    }
  }

  if (status === "success") {
    return (
      <div className="glow-border glass rounded-[28px] px-6 py-12 text-center sm:px-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12.5 9.5 17 19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-white">Заявка отправлена!</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-300">
          Мы свяжемся с вами в Telegram и пришлём детали участия в интенсиве.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glow-border glass rounded-[28px] p-5 sm:p-8" noValidate>
      <div className="grid gap-4">
        <Field
          label="Имя"
          name="name"
          placeholder="Как к вам обращаться"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(v) => update("name", v)}
        />
        <Field
          label="Telegram"
          name="telegram"
          placeholder="@username или ссылка"
          autoComplete="username"
          value={values.telegram}
          error={errors.telegram}
          onChange={(v) => update("telegram", v)}
        />
        <Field
          label="Номер телефона"
          name="phone"
          placeholder="+375 29 000 00 00"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
        />
        <label className="grid gap-2 text-sm">
          <span className="text-slate-300">Немного о себе</span>
          <textarea
            name="comment"
            rows={4}
            value={values.comment}
            onChange={(e) => update("comment", e.target.value)}
            placeholder="Чем вы занимаетесь и для чего вам нужен AI-отдел SMM"
            className="min-h-[120px] resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500"
          />
        </label>
        <div aria-hidden className="hidden">
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-200 px-6 py-4 text-base font-semibold text-slate-950 shadow-[0_12px_40px_rgba(46,233,208,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/20 border-t-slate-900" />
            Отправляем заявку...
          </>
        ) : (
          "Зарегистрироваться бесплатно"
        )}
      </button>

      <p className="mt-3 text-center text-sm font-medium text-amber-300">Количество мест ограничено</p>

      {status === "error" && message ? (
        <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {message}
        </p>
      ) : null}

      <p className="mt-5 text-center text-xs leading-5 text-slate-500">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных и получение информации
        об интенсиве. Мы не передаём ваши данные третьим лицам и используем их только для связи
        по заявке.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  autoComplete?: string;
  inputMode?: "tel" | "text";
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="flex items-center justify-between text-slate-300">
        {label}
        <span className="text-[11px] uppercase tracking-wider text-slate-500">обязательно</span>
      </span>
      <input
        name={name}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`rounded-2xl border bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-slate-500 ${
          error ? "border-red-400/50" : "border-white/10"
        }`}
      />
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
