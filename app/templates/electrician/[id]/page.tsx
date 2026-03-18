import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import ElectricianV2 from "@/components/ElectricianV2";
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
    title: `${business.name} — Licensed Electrician in ${business.city}, ${business.state}`,
    description: `${business.name} provides licensed electrical services in ${business.city}, ${business.state}. 24/7 emergency service, free estimates, all work to code.`,
  };
}

export default async function ElectricianTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <ElectricianV2 business={business} />;
}
