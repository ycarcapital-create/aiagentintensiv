"use client";

import { useEffect, useState } from "react";

const TOTAL = 20;
const FALLBACK_REMAINING = 17;

export default function SeatCounter() {
  const [remaining, setRemaining] = useState(FALLBACK_REMAINING);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/registrations/count", { cache: "no-store" });
        if (!active) return;
        const data = (await response.json().catch(() => null)) as
          | { ok?: boolean; count?: number }
          | null;
        if (data?.ok && typeof data.count === "number") {
          setRemaining(Math.max(0, TOTAL - data.count));
        }
      } catch {
        // keep fallback
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  // RegisterForm calls this after a successful submission to bump the counter
  // without waiting for the next API poll.
  if (typeof window !== "undefined") {
    (window as unknown as { __seatBump?: () => void }).__seatBump = () =>
      setRemaining((prev) => Math.max(0, prev - 1));
  }

  return (
    <div className="flex items-center gap-2 text-sm text-amber-200">
      <span className="pulse-dot h-2 w-2 rounded-full bg-amber-400" aria-hidden />
      Осталось {remaining} мест из {TOTAL}
    </div>
  );
}