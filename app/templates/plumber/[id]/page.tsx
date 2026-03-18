import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import PlumberV3 from "@/components/PlumberV3";
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
    title: `${business.name} — Licensed Plumber in ${business.city}, ${business.state}`,
    description: `${business.name} provides professional plumbing services in ${business.city}, ${business.state}. 24/7 emergency service, upfront pricing, licensed & insured.`,
  };
}

export default async function PlumberTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <PlumberV3 business={business} />;
}
