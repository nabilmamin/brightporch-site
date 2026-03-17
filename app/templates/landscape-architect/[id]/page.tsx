import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplate from "@/components/LuxuryTemplate";

export default async function LandscapeArchitectTemplate({
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
        name: "Landscape Design",
        tagline: "Landscape Architecture & Design",
        accentColor: "sage",
        heroHeading: (city) => `Outdoor Spaces That Define ${city} Living`,
        heroSubheading:
          "We design landscapes that extend your home — outdoor kitchens, gardens, pools, and living spaces that feel effortless.",
        ctaHeading: "Reimagine Your Outdoor Space",
        ctaSubheading:
          "Schedule a site visit and let's explore what's possible for your property.",
        services: [
          { title: "Landscape Design", desc: "Custom landscape plans that complement your home's architecture and your lifestyle." },
          { title: "Outdoor Living", desc: "Kitchens, fire pits, pergolas, and seating areas designed for entertaining." },
          { title: "Pool & Spa Design", desc: "Infinity pools, natural pools, and spa retreats integrated into the landscape." },
          { title: "Garden Design", desc: "Native plantings, edible gardens, and seasonal color that thrive in your climate." },
          { title: "Hardscape", desc: "Patios, walkways, retaining walls, and driveways in natural stone and premium materials." },
          { title: "Lighting Design", desc: "Architectural landscape lighting that transforms your property after dark." },
        ],
        processSteps: [
          { title: "Site Analysis", desc: "We study your property — soil, sun, drainage, views, and existing features." },
          { title: "Concept Design", desc: "Detailed renderings and plans that bring your outdoor vision to life." },
          { title: "Installation", desc: "Expert crews handle every element from grading to final planting." },
          { title: "Ongoing Care", desc: "Optional maintenance plans to keep your landscape pristine year-round." },
        ],
      }}
    />
  );
}
