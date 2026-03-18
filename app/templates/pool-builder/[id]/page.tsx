import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import PoolBuilderV2 from "@/components/PoolBuilderV2";
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
    title: `${business.name} — Pool Builder in ${business.city}, ${business.state}`,
    description: `${business.name} builds custom pools in ${business.city}, ${business.state}. Design, construction, renovations, outdoor living. Free consultations.`,
  };
}

export default async function PoolBuilderTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <PoolBuilderV2 business={business} />;
}
