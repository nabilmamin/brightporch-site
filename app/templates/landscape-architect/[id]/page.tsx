import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LandscapeArchitectV2 from "@/components/LandscapeArchitectV2";
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
    title: `${business.name} — Landscape Architect in ${business.city}, ${business.state}`,
    description: `${business.name} provides landscape architecture in ${business.city}, ${business.state}. Design, hardscaping, planting, outdoor living.`,
  };
}

export default async function LandscapeArchitectTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <LandscapeArchitectV2 business={business} />;
}
