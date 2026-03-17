import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import TradesTemplate from "@/components/TradesTemplate";

export default async function RooferTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return (
    <TradesTemplate
      business={business}
      config={{
        name: "Roofer",
        tagline: "Professional Roofing Services",
        accentColor: "red",
        heroHeading: (city) => `${city}'s Most Trusted Roofing Company`,
        heroSubheading:
          "Roof repairs, replacements, and inspections done right the first time. Protect your home from the elements.",
        ctaHeading: "Roof Damage? Leaking?",
        ctaSubheading:
          "Get a free inspection and estimate. We work with all insurance companies.",
        services: [
          {
            title: "Roof Replacement",
            desc: "Full roof replacement with premium materials and manufacturer-backed warranties.",
          },
          {
            title: "Roof Repair",
            desc: "Fix leaks, missing shingles, storm damage, and flashing issues fast.",
          },
          {
            title: "Free Inspections",
            desc: "Comprehensive roof inspection with detailed report and honest recommendations.",
          },
          {
            title: "Storm Damage",
            desc: "Hail, wind, and storm damage specialists. We handle the insurance paperwork.",
          },
          {
            title: "Commercial Roofing",
            desc: "Flat roof, TPO, EPDM, and metal roofing for commercial buildings.",
          },
          {
            title: "Gutters & Siding",
            desc: "Complete exterior protection — gutters, siding, and soffit installation.",
          },
        ],
        whyUs: [
          {
            title: "Insurance Experts",
            desc: "We work directly with your insurance company to maximize your claim.",
          },
          {
            title: "Warranted Work",
            desc: "Manufacturer warranties plus our own workmanship guarantee.",
          },
          {
            title: "Local & Experienced",
            desc: "Rooted in the community with years of experience on local homes.",
          },
          {
            title: "Free Estimates",
            desc: "Detailed written estimates with no pressure and no obligation.",
          },
        ],
      }}
    />
  );
}
