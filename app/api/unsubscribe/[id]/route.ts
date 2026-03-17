import { NextResponse } from "next/server";
import { getBusiness, setOptedOut } from "@/lib/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = parseInt(id, 10);
  const business = await getBusiness(businessId);

  if (!business) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await setOptedOut(businessId);

  return NextResponse.json({ success: true, message: "Unsubscribed successfully" });
}
