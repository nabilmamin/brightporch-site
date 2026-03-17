import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplateV2 from "@/components/LuxuryTemplateV2";

export default async function HomeBuilderTemplate({
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
        name: "Custom Home Builder",
        tagline: "Custom Home Building",
        heroHeading: (city) => `Homes built for how ${city} lives`,
        heroSubheading:
          "From raw land to move-in day — we build homes that reflect your family, your taste, and the way you want to live.",
        ctaHeading: "Planning your next home?",
        ctaSubheading:
          "Start with a free site visit. We'll walk the lot, talk through your vision, and outline what's possible.",
        services: [
          { title: "Custom Home Builds", desc: "Ground-up construction on your lot, tailored to your family and your lifestyle." },
          { title: "Major Renovations", desc: "Structural changes, additions, and renovations that feel like they were always part of the home." },
          { title: "Architectural Design", desc: "In-house design that balances what looks right with what builds right." },
          { title: "Project Management", desc: "One point of contact, weekly updates, and a timeline you can count on." },
          { title: "Green Building", desc: "Energy-efficient construction with sustainable materials and smart home integration." },
          { title: "Estate Properties", desc: "Multi-structure builds — guest houses, pools, outdoor kitchens, and more." },
        ],
        processSteps: [
          { title: "Site Visit", desc: "We walk your lot, discuss your vision, and talk through budget and timeline." },
          { title: "Design & Planning", desc: "Architectural plans, material selections, and a detailed construction schedule." },
          { title: "Construction", desc: "Skilled crews, quality materials, and weekly progress updates from your project manager." },
          { title: "Final Walkthrough", desc: "Detailed inspection, touch-ups, and keys in your hand." },
        ],
      }}
    />
  );
}
