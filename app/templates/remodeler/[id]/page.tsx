import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import RemodelerV2 from "@/components/RemodelerV2";
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
    title: `${business.name} — Kitchen & Bath Remodeling in ${business.city}, ${business.state}`,
    description: `${business.name} provides remodeling services in ${business.city}, ${business.state}. Kitchens, bathrooms, additions, whole-home renovations.`,
  };
}

export default async function RemodelerTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <RemodelerV2 business={business} />;
}
