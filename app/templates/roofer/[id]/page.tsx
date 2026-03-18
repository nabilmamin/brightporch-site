import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import RooferV2 from "@/components/RooferV2";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return {};
  return {
    title: `${business.name} — Roofing in ${business.city}, ${business.state}`,
    description: `${business.name} provides roofing services in ${business.city}, ${business.state}. Roof replacement, repairs, storm damage. Free inspections, insurance claims.`,
  };
}

export default async function RooferTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <RooferV2 business={business} />;
}
