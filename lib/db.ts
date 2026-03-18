import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export interface Business {
  id: number;
  place_id: string;
  name: string;
  address: string;
  phone: string;
  email: string | null;
  website: string;
  rating: number | null;
  reviews_count: number | null;
  category: string;
  city: string;
  state: string;
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  best_practices: number | null;
  diagnosis_json: string | null;
  stage: string;
  opted_out: number;
}

export async function getBusiness(id: number): Promise<Business | undefined> {
  const result = await db.execute({
    sql: "SELECT * FROM businesses WHERE id = ?",
    args: [id],
  });
  return result.rows[0] as unknown as Business | undefined;
}

export async function setOptedOut(id: number): Promise<void> {
  await db.execute({
    sql: "UPDATE businesses SET opted_out = 1, updated_at = datetime('now') WHERE id = ?",
    args: [id],
  });
}

export interface CallLog {
  id: number;
  business_id: number;
  outcome: string;
  notes: string | null;
  called_at: string;
}

export interface DiagnosedBusiness extends Business {
  is_mobile_friendly: number | null;
  last_call_outcome: string | null;
  last_call_at: string | null;
}

export async function getDiagnosedBusinesses(
  category?: string,
  city?: string
): Promise<DiagnosedBusiness[]> {
  let sql = `
    SELECT b.*,
      cl.outcome AS last_call_outcome,
      cl.called_at AS last_call_at
    FROM businesses b
    LEFT JOIN (
      SELECT business_id, outcome, called_at,
        ROW_NUMBER() OVER (PARTITION BY business_id ORDER BY called_at DESC) AS rn
      FROM call_logs
    ) cl ON cl.business_id = b.id AND cl.rn = 1
    WHERE b.stage IN ('diagnosed', 'contacted')
      AND b.opted_out = 0
  `;
  const args: (string | number)[] = [];

  if (category) {
    sql += " AND b.category = ?";
    args.push(category);
  }
  if (city) {
    sql += " AND b.city = ?";
    args.push(city);
  }

  sql += " ORDER BY COALESCE(b.performance, 100) + COALESCE(b.seo, 100) ASC";

  const result = await db.execute({ sql, args });
  return result.rows as unknown as DiagnosedBusiness[];
}

export async function getCategories(): Promise<string[]> {
  const result = await db.execute(
    "SELECT DISTINCT category FROM businesses WHERE stage IN ('diagnosed', 'contacted') AND category IS NOT NULL ORDER BY category"
  );
  return result.rows.map((r) => r.category as string);
}

export async function getCities(): Promise<string[]> {
  const result = await db.execute(
    "SELECT DISTINCT city FROM businesses WHERE stage IN ('diagnosed', 'contacted') AND city IS NOT NULL ORDER BY city"
  );
  return result.rows.map((r) => r.city as string);
}

export async function getCallLogs(businessId: number): Promise<CallLog[]> {
  const result = await db.execute({
    sql: "SELECT * FROM call_logs WHERE business_id = ? ORDER BY called_at DESC",
    args: [businessId],
  });
  return result.rows as unknown as CallLog[];
}

export async function ensureCallLogsTable(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS call_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_id INTEGER NOT NULL REFERENCES businesses(id),
      outcome TEXT NOT NULL,
      notes TEXT,
      called_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await db.execute(
    "CREATE INDEX IF NOT EXISTS idx_call_logs_business ON call_logs(business_id)"
  );
}
