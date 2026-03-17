import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import TradesTemplate from "@/components/TradesTemplate";

export default async function ElectricianTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  return (
    <TradesTemplate
      business={business}
      config={{
        name: "Electrician",
        tagline: "Licensed Electrical Services",
        accentColor: "amber",
        heroHeading: (city) => `Safe, Reliable Electrical Work in ${city}`,
        heroSubheading:
          "From panel upgrades to new wiring — licensed electricians who do it right and keep your family safe.",
        ctaHeading: "Electrical Problem?",
        ctaSubheading:
          "Don't risk it with DIY. Call a licensed electrician for a free estimate.",
        services: [
          {
            title: "Electrical Repairs",
            desc: "Outlets, switches, circuit breakers, and wiring repairs by licensed pros.",
          },
          {
            title: "Panel Upgrades",
            desc: "Upgrade your electrical panel to handle modern power demands safely.",
          },
          {
            title: "Whole-Home Rewiring",
            desc: "Replace old or dangerous wiring. Essential for older homes.",
          },
          {
            title: "Lighting Installation",
            desc: "Recessed lighting, landscape lighting, ceiling fans, and fixtures.",
          },
          {
            title: "EV Charger Installation",
            desc: "Level 2 electric vehicle charger installation for your home or business.",
          },
          {
            title: "Generator Installation",
            desc: "Whole-home standby generators for uninterrupted power during outages.",
          },
        ],
        whyUs: [
          {
            title: "Safety First",
            desc: "All work meets or exceeds NEC code. We don't cut corners on safety.",
          },
          {
            title: "Master Electricians",
            desc: "Licensed master electricians with years of residential and commercial experience.",
          },
          {
            title: "Clean & Respectful",
            desc: "We treat your home like our own. Clean jobsite, every time.",
          },
          {
            title: "Upfront Quotes",
            desc: "Detailed quotes before any work starts. No hidden fees or surprises.",
          },
        ],
      }}
    />
  );
}
