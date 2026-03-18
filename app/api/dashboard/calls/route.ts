import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const DASHBOARD_SECRET = process.env.DASHBOARD_SECRET || "";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  if (!DASHBOARD_SECRET || token !== DASHBOARD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { businessId, outcome, notes } = body;

  if (!businessId || !outcome) {
    return NextResponse.json(
      { error: "businessId and outcome required" },
      { status: 400 }
    );
  }

  const validOutcomes = [
    "called",
    "interested",
    "not_interested",
    "no_answer",
    "callback",
    "voicemail",
  ];
  if (!validOutcomes.includes(outcome)) {
    return NextResponse.json(
      { error: `Invalid outcome. Must be one of: ${validOutcomes.join(", ")}` },
      { status: 400 }
    );
  }

  await db.execute({
    sql: "INSERT INTO call_logs (business_id, outcome, notes) VALUES (?, ?, ?)",
    args: [businessId, outcome, notes || null],
  });

  await db.execute({
    sql: "UPDATE businesses SET stage = 'contacted', updated_at = datetime('now') WHERE id = ? AND stage IN ('scored', 'diagnosed')",
    args: [businessId],
  });

  return NextResponse.json({ status: "ok" });
}
