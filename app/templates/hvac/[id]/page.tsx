import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import HvacV2 from "@/components/HvacV2";
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
    title: `${business.name} — Heating & Cooling in ${business.city}, ${business.state}`,
    description: `${business.name} provides HVAC services in ${business.city}, ${business.state}. AC repair, furnace service, new installs. 24/7 emergency, free estimates.`,
  };
}

export default async function HvacTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <HvacV2 business={business} />;
}
