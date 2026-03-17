import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplate from "@/components/LuxuryTemplate";

export default async function PoolBuilderTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return (
    <LuxuryTemplate
      business={business}
      config={{
        name: "Pool Builder",
        tagline: "Custom Pool Design & Construction",
        accentColor: "navy",
        heroHeading: (city) => `${city}'s Premier Pool Builder`,
        heroSubheading:
          "Custom pools, spas, and water features designed to transform your backyard into a private resort.",
        ctaHeading: "Ready for Your Dream Pool?",
        ctaSubheading:
          "Book a free backyard consultation. We'll design something extraordinary together.",
        services: [
          { title: "Custom Pools", desc: "Freeform, geometric, infinity edge — every pool designed from scratch for your space." },
          { title: "Spas & Hot Tubs", desc: "Built-in spas with custom tile, jets, and lighting for year-round relaxation." },
          { title: "Water Features", desc: "Waterfalls, grottos, bubblers, and fountains that add drama and sound." },
          { title: "Pool Renovations", desc: "Resurface, retile, and modernize your existing pool to feel brand new." },
          { title: "Outdoor Living", desc: "Pool houses, cabanas, outdoor bars, and fire features around the pool." },
          { title: "Automation", desc: "Smart pool controls for lighting, temperature, cleaning, and chemical balance." },
        ],
        processSteps: [
          { title: "Backyard Consultation", desc: "We visit your property, discuss your vision, and take measurements." },
          { title: "3D Design", desc: "Photorealistic 3D renderings so you can see your pool before we break ground." },
          { title: "Construction", desc: "Expert excavation, plumbing, steel, and finishing — typically 8-12 weeks." },
          { title: "Final Reveal", desc: "Fill day, equipment walkthrough, and your first swim." },
        ],
      }}
    />
  );
}
