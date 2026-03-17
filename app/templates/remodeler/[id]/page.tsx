import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplate from "@/components/LuxuryTemplate";

export default async function RemodelerTemplate({
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
        name: "Remodeling",
        tagline: "Kitchen & Bath Remodeling",
        accentColor: "terracotta",
        heroHeading: (city) => `${city}'s Trusted Remodeling Experts`,
        heroSubheading:
          "Kitchen and bathroom transformations that elevate your home — designed with care, built with precision.",
        ctaHeading: "Ready to Remodel?",
        ctaSubheading:
          "Schedule a free in-home consultation. We'll measure, plan, and quote — no pressure.",
        services: [
          { title: "Kitchen Remodeling", desc: "Complete kitchen transformations — cabinetry, countertops, islands, appliances, and lighting." },
          { title: "Bathroom Remodeling", desc: "Spa-inspired bathrooms with custom tile, walk-in showers, and premium fixtures." },
          { title: "Whole-Home Renovation", desc: "Open up floor plans, update finishes, and modernize your entire living space." },
          { title: "Additions", desc: "Room additions, bump-outs, and second stories that blend seamlessly with your home." },
          { title: "Basement Finishing", desc: "Transform unused space into home theaters, gyms, guest suites, or offices." },
          { title: "Aging-in-Place", desc: "Accessible design modifications that let you stay in the home you love." },
        ],
        processSteps: [
          { title: "In-Home Consultation", desc: "We visit your home, listen to your goals, and take detailed measurements." },
          { title: "Design & Selection", desc: "Visit our showroom to choose materials, finishes, and fixtures." },
          { title: "Construction", desc: "Dedicated crew with daily cleanup. We respect your home and your schedule." },
          { title: "Final Reveal", desc: "Walkthrough, punch list, and the moment you see it all come together." },
        ],
      }}
    />
  );
}
