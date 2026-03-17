import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import TradesTemplate from "@/components/TradesTemplate";

export default async function PlumberTemplate({
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
        name: "Plumber",
        tagline: "Professional Plumbing Services",
        accentColor: "blue",
        heroHeading: (city) => `${city}'s Trusted Plumbing Experts`,
        heroSubheading:
          "From leaky faucets to full repiping — fast, honest, and always on time. No job too big or small.",
        ctaHeading: "Need a Plumber?",
        ctaSubheading:
          "Call now for a free estimate. Same-day service available for emergencies.",
        services: [
          {
            title: "Emergency Repairs",
            desc: "24/7 emergency plumbing service. Burst pipes, overflows, and backups — we're there fast.",
          },
          {
            title: "Drain Cleaning",
            desc: "Professional drain cleaning for stubborn clogs, slow drains, and sewer line backups.",
          },
          {
            title: "Water Heater",
            desc: "Installation, repair, and replacement for tankless and traditional water heaters.",
          },
          {
            title: "Leak Detection",
            desc: "Advanced equipment to find hidden leaks in walls, slabs, and underground pipes.",
          },
          {
            title: "Pipe Repair & Repiping",
            desc: "Fix cracked, corroded, or burst pipes. Full repiping for older homes.",
          },
          {
            title: "Bathroom & Kitchen",
            desc: "Fixture installation, faucet replacement, and plumbing for remodels.",
          },
        ],
        whyUs: [
          {
            title: "Upfront Pricing",
            desc: "You know the cost before we start. No surprises on your bill.",
          },
          {
            title: "Fast Response",
            desc: "Same-day service available. Emergency calls answered 24/7.",
          },
          {
            title: "Licensed Professionals",
            desc: "Fully licensed, insured, and background-checked plumbers.",
          },
          {
            title: "Guaranteed Work",
            desc: "We stand behind every job. Not satisfied? We make it right.",
          },
        ],
      }}
    />
  );
}
