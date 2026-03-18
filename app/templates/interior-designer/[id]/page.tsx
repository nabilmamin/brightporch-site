import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import InteriorDesignerV3 from "@/components/InteriorDesignerV3";
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
    title: `${business.name} — Interior Design in ${business.city}, ${business.state}`,
    description: `${business.name} creates refined, personal interiors in ${business.city}, ${business.state}. Full-service luxury interior design — from concept to reveal.`,
  };
}

export default async function InteriorDesignerTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <InteriorDesignerV3 business={business} />;
}
