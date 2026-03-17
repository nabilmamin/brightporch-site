import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplateV2 from "@/components/LuxuryTemplateV2";

export default async function PoolBuilderTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return (
    <LuxuryTemplateV2
      business={business}
      config={{
        name: "Pool Builder",
        tagline: "Custom Pool Design & Build",
        heroHeading: (city) => `Your backyard, reimagined — custom pools in ${city}`,
        heroSubheading:
          "We design and build pools that turn your backyard into the place everyone wants to be. Custom shapes, finishes, and features — no templates.",
        ctaHeading: "Ready to start your pool project?",
        ctaSubheading:
          "Book a free backyard consultation. We'll measure, sketch ideas, and give you a realistic timeline and budget.",
        services: [
          { title: "Custom Pool Design", desc: "Freeform, geometric, infinity edge — every pool drawn from scratch for your specific yard." },
          { title: "Spas & Hot Tubs", desc: "Built-in spas with custom tile, hydrotherapy jets, and integrated lighting." },
          { title: "Water Features", desc: "Waterfalls, bubblers, deck jets, and grottos that add texture and sound." },
          { title: "Pool Renovation", desc: "Resurface, retile, or completely reimagine your existing pool." },
          { title: "Outdoor Living", desc: "Pool houses, shade structures, outdoor bars, and fire features around the water." },
          { title: "Smart Pool Systems", desc: "Automated controls for lighting, temperature, cleaning, and chemical balance from your phone." },
        ],
        processSteps: [
          { title: "Backyard Visit", desc: "We walk your property, take measurements, and listen to how you want to use the space." },
          { title: "3D Design", desc: "Photorealistic renders so you can see your pool in your actual backyard before we break ground." },
          { title: "Construction", desc: "Excavation through finish — typically 8 to 12 weeks with weekly progress updates." },
          { title: "Fill Day", desc: "Equipment walkthrough, water chemistry tutorial, and your first swim." },
        ],
      }}
    />
  );
}
