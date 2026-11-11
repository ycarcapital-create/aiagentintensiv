import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Создание отдела SMM из AI-агентов — бесплатный интенсив | ASIMO",
  description:
    "Бесплатный интенсив: соберите AI-команду, которая находит тренды, создаёт контент-план, генерирует контент, публикует его и контролирует результат.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable}`}>
      <body className="grain bg-[#05070b] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
