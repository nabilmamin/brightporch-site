import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import HomeBuilderV2 from "@/components/HomeBuilderV2";
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
    title: `${business.name} — Custom Home Builder in ${business.city}, ${business.state}`,
    description: `${business.name} builds custom homes in ${business.city}, ${business.state}. Ground-up construction, renovations, and finish work.`,
  };
}

export default async function HomeBuilderTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return <HomeBuilderV2 business={business} />;
}
