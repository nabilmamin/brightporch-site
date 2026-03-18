import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplateV2 from "@/components/LuxuryTemplateV2";

export default async function LandscapeArchitectTemplate({
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
        name: "Landscape Design",
        tagline: "Landscape Architecture",
        heroImage: "/images/luxury/hero-landscape-architect.png",
        heroHeading: (city) => `Outdoor spaces worth living in, built for ${city}`,
        heroSubheading:
          "We design landscapes that extend your home — gardens, patios, pools, and outdoor rooms that feel effortless year-round.",
        ctaHeading: "Rethink your outdoor space",
        ctaSubheading:
          "Schedule a property visit. We'll assess what you have, explore what's possible, and sketch it out together.",
        services: [
          { title: "Landscape Design", desc: "Custom plans that complement your home's architecture and work with your land, not against it." },
          { title: "Outdoor Living", desc: "Kitchens, fire pits, pergolas, and seating areas built for real entertaining." },
          { title: "Pool & Water Features", desc: "Pools, spas, fountains, and ponds integrated naturally into the landscape." },
          { title: "Garden Design", desc: "Native plantings, edible gardens, and seasonal color chosen for your specific climate and soil." },
          { title: "Hardscape", desc: "Patios, walkways, retaining walls, and driveways in natural stone and premium materials." },
          { title: "Landscape Lighting", desc: "Architectural lighting that transforms your property after dark — safe, dramatic, inviting." },
        ],
        processSteps: [
          { title: "Site Analysis", desc: "We study your property — soil, sun, drainage, views, and what's already working." },
          { title: "Concept Design", desc: "Detailed plans and renderings that bring your outdoor vision to life before we dig." },
          { title: "Installation", desc: "Expert crews handle grading, planting, stonework, and irrigation." },
          { title: "Seasonal Care", desc: "Optional maintenance plans to keep everything pristine as it matures." },
        ],
      }}
    />
  );
}
