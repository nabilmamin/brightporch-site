import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplate from "@/components/LuxuryTemplate";

export default async function HomeBuilderTemplate({
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
        name: "Custom Home Builder",
        tagline: "Custom Home Building",
        accentColor: "stone",
        heroHeading: (city) => `Custom Homes Built for ${city} Living`,
        heroSubheading:
          "From blueprint to move-in day — we build homes that stand the test of time with uncompromising quality.",
        ctaHeading: "Planning Your Dream Home?",
        ctaSubheading:
          "Start with a free consultation. We'll walk the lot, discuss your vision, and outline the process.",
        services: [
          { title: "Custom Home Builds", desc: "Ground-up construction tailored to your family, your lot, and your lifestyle." },
          { title: "Luxury Renovations", desc: "Major renovations and additions that feel like they were always part of the home." },
          { title: "Architectural Design", desc: "In-house design team to create plans that balance beauty with buildability." },
          { title: "Project Management", desc: "Dedicated project manager for every build — on time, on budget, transparent." },
          { title: "Green Building", desc: "Energy-efficient construction with sustainable materials and smart home integration." },
          { title: "Estate Properties", desc: "Multi-structure estates with guest houses, pools, and outdoor living spaces." },
        ],
        processSteps: [
          { title: "Vision Meeting", desc: "We tour your lot, discuss your vision, and establish scope and budget." },
          { title: "Design & Planning", desc: "Architectural plans, material selections, and detailed construction timeline." },
          { title: "Construction", desc: "Skilled crews build your home with weekly updates and open communication." },
          { title: "Final Walkthrough", desc: "Detailed inspection, touch-ups, and a ceremonial key handoff." },
        ],
      }}
    />
  );
}
