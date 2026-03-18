import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import LuxuryTemplateV2 from "@/components/LuxuryTemplateV2";

export default async function RemodelerTemplate({
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
        name: "Remodeling",
        tagline: "Kitchen & Bath Remodeling",
        heroImage: "/images/luxury/hero-remodeler.png",
        heroHeading: (city) => `Kitchens and baths worth coming home to, in ${city}`,
        heroSubheading:
          "We remodel the rooms that matter most — with materials that last, layouts that work, and details you'll notice every day.",
        ctaHeading: "Thinking about a remodel?",
        ctaSubheading:
          "Schedule a free in-home visit. We'll measure, discuss options, and give you a clear quote — no pressure.",
        services: [
          { title: "Kitchen Remodeling", desc: "Complete kitchen transformations — cabinetry, countertops, islands, appliances, and lighting." },
          { title: "Bathroom Remodeling", desc: "Walk-in showers, custom tile, double vanities, and fixtures that feel like a daily upgrade." },
          { title: "Whole-Home Renovation", desc: "Open floor plans, new finishes, and a modern feel throughout your entire home." },
          { title: "Room Additions", desc: "Bump-outs, second stories, and new rooms that blend with your home's existing character." },
          { title: "Basement Finishing", desc: "Turn unused space into a theater, gym, guest suite, or home office." },
          { title: "Accessible Design", desc: "Modifications that let you stay in the home you love — wider doors, grab bars, walk-in tubs." },
        ],
        processSteps: [
          { title: "In-Home Visit", desc: "We see your space, hear your goals, and take detailed measurements." },
          { title: "Design & Selection", desc: "Visit our showroom to pick materials, finishes, and fixtures you can touch." },
          { title: "Construction", desc: "Dedicated crew, daily cleanup, and a project manager who keeps everything on track." },
          { title: "Final Walkthrough", desc: "Punch list, final details, and the moment it all comes together." },
        ],
      }}
    />
  );
}
