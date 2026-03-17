import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplateV2 from "@/components/LuxuryTemplateV2";

export default async function InteriorDesignerV2Template({
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
        name: "Interior Design",
        tagline: "Interior Design Studio",
        heroHeading: (city) =>
          `Spaces that feel like you, designed in ${city}`,
        heroSubheading:
          "We create interiors that balance how you live with how you want to feel. Functional, considered, and distinctly personal.",
        ctaHeading: "Start with a conversation",
        ctaSubheading:
          "Tell us about your space and your vision. We handle the rest — from concept boards to installation day.",
        services: [
          {
            title: "Full-Home Interiors",
            desc: "End-to-end design for every room — furniture, finishes, lighting, textiles, and art, all coordinated.",
          },
          {
            title: "Kitchen & Bath Design",
            desc: "Custom layouts with hand-selected materials, cabinetry, and fixtures that hold up to daily life.",
          },
          {
            title: "Space Planning",
            desc: "Rethink your floor plan for better flow, more light, and rooms that actually work for your routine.",
          },
          {
            title: "Material Curation",
            desc: "Fabric, stone, wood, metal — we source and specify every surface so nothing clashes.",
          },
          {
            title: "Custom Furniture",
            desc: "When off-the-shelf won't do. Bespoke pieces designed for your dimensions and your taste.",
          },
          {
            title: "Styling & Staging",
            desc: "Final-layer styling for move-in day, or staging that helps your home sell faster and higher.",
          },
        ],
        processSteps: [
          {
            title: "Discovery",
            desc: "A relaxed conversation about your space, your habits, and what you want to change.",
          },
          {
            title: "Concept & Direction",
            desc: "Mood boards, floor plans, and 3D walkthroughs so you can feel the design before anything moves.",
          },
          {
            title: "Sourcing & Procurement",
            desc: "We order, track, and inspect every piece. Trade pricing means your budget goes further.",
          },
          {
            title: "Install & Reveal",
            desc: "Our team places, hangs, and styles every detail. You walk in and it's done.",
          },
        ],
      }}
    />
  );
}
