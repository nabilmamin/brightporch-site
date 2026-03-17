import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplate from "@/components/LuxuryTemplate";

export default async function InteriorDesignerTemplate({
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
        name: "Interior Design",
        tagline: "Interior Design Studio",
        accentColor: "sage",
        heroHeading: (city) => `Thoughtful Interior Design in ${city}`,
        heroSubheading:
          "We create spaces that reflect how you live — functional, beautiful, and unmistakably yours.",
        ctaHeading: "Ready to Transform Your Space?",
        ctaSubheading:
          "Book a complimentary consultation and let's discuss your vision.",
        services: [
          { title: "Full-Home Design", desc: "Comprehensive design from concept to installation — furniture, finishes, lighting, and art." },
          { title: "Kitchen & Bath", desc: "Custom kitchen and bathroom design with premium materials and expert craftsmanship." },
          { title: "Space Planning", desc: "Optimize your layout for flow, function, and visual impact." },
          { title: "Color & Material", desc: "Curated palettes and material selections that set the tone for every room." },
          { title: "Furniture Sourcing", desc: "Access to trade-only showrooms and custom fabrication for one-of-a-kind pieces." },
          { title: "Staging & Styling", desc: "Prepare your home for sale or photography with professional styling." },
        ],
        processSteps: [
          { title: "Discovery Call", desc: "We learn about your style, goals, and how you use your space." },
          { title: "Concept Development", desc: "Mood boards, floor plans, and 3D renders to visualize the design." },
          { title: "Sourcing & Procurement", desc: "We handle ordering, tracking, and quality control for every item." },
          { title: "Installation", desc: "White-glove installation day — we place everything and style the details." },
        ],
      }}
    />
  );
}
