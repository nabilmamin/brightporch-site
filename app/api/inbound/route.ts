import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "";

function extractOutreachId(toAddress: string): number | null {
  const match = toAddress.match(/reply\+(\d+)@/);
  return match ? parseInt(match[1], 10) : null;
}

function extractEmail(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return match ? match[1] : from.trim();
}

export async function POST(request: Request) {
  // Auth check via query param
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  if (WEBHOOK_SECRET && token !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const eventType = body.type || "";

  if (eventType !== "email.received") {
    return NextResponse.json({ status: "ignored", event: eventType });
  }

  const data = body.data || {};
  const emailId = data.email_id || "";
  const from = data.from || "";
  const toList: string[] = data.to || [];
  const subject = data.subject || "";

  // Try to match by reply-to tag
  let outreachId: number | null = null;
  let businessId: number | null = null;

  for (const to of toList) {
    outreachId = extractOutreachId(to);
    if (outreachId) break;
  }

  if (outreachId) {
    const result = await db.execute({
      sql: "SELECT business_id FROM outreach WHERE id = ?",
      args: [outreachId],
    });
    if (result.rows.length > 0) {
      businessId = result.rows[0].business_id as number;
    }
  }

  // Fallback: match by sender email
  if (!businessId && from) {
    const senderEmail = extractEmail(from);
    const result = await db.execute({
      sql: "SELECT id FROM businesses WHERE email = ?",
      args: [senderEmail],
    });
    if (result.rows.length > 0) {
      businessId = result.rows[0].id as number;
      // Find most recent outreach
      const outResult = await db.execute({
        sql: "SELECT id FROM outreach WHERE business_id = ? ORDER BY created_at DESC LIMIT 1",
        args: [businessId],
      });
      if (outResult.rows.length > 0) {
        outreachId = outResult.rows[0].id as number;
      }
    }
  }

  if (!businessId) {
    // Log unmatched reply
    await db.execute({
      sql: "INSERT INTO agent_logs (agent, action, result) VALUES (?, ?, ?)",
      args: [
        "webhook",
        "unmatched_reply",
        `from=${from}, to=${toList.join(",")}, subject=${subject.slice(0, 50)}`,
      ],
    });
    return NextResponse.json({ status: "received", matched: false });
  }

  // Fetch full email body from Resend API
  let rawText = subject;
  if (emailId && process.env.RESEND_API_KEY) {
    try {
      const res = await fetch(`https://api.resend.com/emails/${emailId}`, {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      });
      if (res.ok) {
        const emailData = await res.json();
        rawText = emailData.text || emailData.html || subject;
      }
    } catch {
      // Fall back to subject
    }
  }

  // Insert response
  const insertResult = await db.execute({
    sql: "INSERT INTO responses (business_id, outreach_id, raw_text) VALUES (?, ?, ?)",
    args: [businessId, outreachId, rawText],
  });

  // Log
  await db.execute({
    sql: "INSERT INTO agent_logs (agent, action, business_id, result) VALUES (?, ?, ?, ?)",
    args: [
      "webhook",
      "inbound_received",
      businessId,
      `response_id=${insertResult.lastInsertRowid}, outreach_id=${outreachId}`,
    ],
  });

  return NextResponse.json({
    status: "received",
    matched: true,
    response_id: Number(insertResult.lastInsertRowid),
  });
}
