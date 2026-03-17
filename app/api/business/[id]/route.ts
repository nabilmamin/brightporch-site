import { NextResponse } from "next/server";
import { getBusiness } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const business = getBusiness(parseInt(id, 10));

  if (!business) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Don't expose internal fields
  const { opted_out, stage, ...publicData } = business;
  return NextResponse.json(publicData);
}
