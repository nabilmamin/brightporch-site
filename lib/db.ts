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
