# AGENTS.md

Next.js 16 (App Router) + React 19 + TypeScript landing page (Russian, single page) with a registration form that persists to Postgres and notifies via Telegram.

## Commands

- `npm install` — no lockfile is committed; install will resolve versions fresh.
- `npm run dev` — `next dev`
- `npm run build` — `next build`
- `npm run start` — `next start`
- `npm run lint` — `eslint .`
- `npm run typecheck` — `tsc --noEmit`

There is no test script. No codegen, no migration runner — `drizzle-kit` is a devDependency but `drizzle.config.json` is never executed by any script.

## Environment

Required env vars (no `.env` file is committed):

- `DATABASE_URL` — Postgres connection string. **Required at import time**: `src/db/index.ts:4` throws if it is missing, so `next dev` / `next build` will crash without it. Drizzle config hardcodes a local default (`postgresql://postgres:postgres@127.0.0.1:5432/app_db`), but that file is not read by the app at runtime.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — optional; registration silently degrades to a no-op notification if either is absent (`src/app/api/register/route.ts:42`).

## Architecture

- App entry: `src/app/page.tsx` renders the whole landing page as one file with section components defined inline.
- Path alias: `@/*` → `src/*` (`tsconfig.json`).
- API routes: `src/app/api/health/route.ts` (DB ping) and `src/app/api/register/route.ts` (submit).
- DB: `src/db/index.ts` creates a single `pg` Pool, guarded by a `globalThis` symbol so it survives HMR in dev. `drizzle(pool)` is the exported `db`.
- Schema: `src/db/schema.ts` defines one table, `registrations` (no migrations are checked in).
- Client form: `src/components/RegisterForm.tsx` ("use client") validates client-side via `src/lib/validation.ts`, then POSTs to `/api/register`.
- Styling: Tailwind CSS v4 through `@tailwindcss/postcss` (`postcss.config.mjs`), custom tokens in `src/app/globals.css` (`--color-cyan`, `--color-gold`, etc.). Fonts: `Manrope` (sans) and `Unbounded` (display), both Google Fonts with Cyrillic subset.

## Conventions / quirks

- API routes set `export const dynamic = "force-dynamic"` — they are never statically rendered.
- Registration endpoint has an in-memory rate limit (12 s per IP, keyed off `x-forwarded-for`/`x-real-ip`) and a honeypot `website` field. The rate-limit Map is process-local and resets on deploy/restart.
- `src/db/index.ts` only attaches the pool to `globalThis` when `NODE_ENV !== "production"`.
- Copy and validation messages are in Russian; do not "fix" Cyrillic strings or regex flags (`/u` on `NAME_RE`).
- ESLint is the flat config from `eslint-config-next/core-web-vitals`; it ignores `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.

## Gotchas

- `next dev` and `next build` both fail fast without `DATABASE_URL` set, because `src/db/index.ts` is imported by the API routes (and thus by the app bundle).
- No `public/` directory exists yet; images referenced in `page.tsx` (`/images/asimo-logo.png`, etc.) will 404 until added.
- No CI, pre-commit hooks, or formatter config beyond ESLint — do not assume `prettier` or husky exists.