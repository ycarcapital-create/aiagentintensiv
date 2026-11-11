import { getDb } from "@/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getDb().execute(sql`select count(*)::int as count from registrations`);
    const count = Number((result.rows[0] as { count?: number } | undefined)?.count ?? 0);
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ ok: false, count: 0 });
  }
}