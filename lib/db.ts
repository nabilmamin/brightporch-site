import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "..", "leadgen.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH, { readonly: false });
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export interface Business {
  id: number;
  place_id: string;
  name: string;
  address: string;
  phone: string;
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

export function getBusiness(id: number): Business | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM businesses WHERE id = ?").get(id) as
    | Business
    | undefined;
}

export function setOptedOut(id: number): void {
  const db = getDb();
  db.prepare(
    "UPDATE businesses SET opted_out = 1, updated_at = datetime('now') WHERE id = ?"
  ).run(id);
}
