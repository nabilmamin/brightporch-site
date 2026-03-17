import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import TradesTemplate from "@/components/TradesTemplate";

export default async function HvacTemplate({
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
        name: "HVAC",
        tagline: "Heating & Cooling Experts",
        accentColor: "orange",
        heroHeading: (city) => `Keep Your ${city} Home Comfortable Year-Round`,
        heroSubheading:
          "Expert heating and cooling installation, repair, and maintenance. Stay cool in summer, warm in winter.",
        ctaHeading: "AC Acting Up? Furnace on the Fritz?",
        ctaSubheading:
          "Don't sweat it. Call now for fast, reliable HVAC service.",
        services: [
          {
            title: "AC Repair & Installation",
            desc: "Fast air conditioning repair and expert installation of high-efficiency systems.",
          },
          {
            title: "Heating Repair",
            desc: "Furnace, heat pump, and boiler repair. We fix all makes and models.",
          },
          {
            title: "System Installation",
            desc: "New HVAC system installation with free in-home estimates and financing options.",
          },
          {
            title: "Maintenance Plans",
            desc: "Preventive maintenance to extend system life and avoid costly breakdowns.",
          },
          {
            title: "Duct Cleaning & Repair",
            desc: "Clean ducts for better air quality. Repair leaks to improve efficiency.",
          },
          {
            title: "Indoor Air Quality",
            desc: "Air purifiers, humidifiers, and filtration systems for healthier indoor air.",
          },
        ],
        whyUs: [
          {
            title: "24/7 Emergency Service",
            desc: "No heat in January? AC out in July? We're here around the clock.",
          },
          {
            title: "Certified Technicians",
            desc: "EPA-certified, factory-trained techs who know your system inside and out.",
          },
          {
            title: "Transparent Pricing",
            desc: "Flat-rate pricing on all repairs. The quote is the price — period.",
          },
          {
            title: "Energy Savings",
            desc: "We recommend the most efficient options to lower your utility bills.",
          },
        ],
      }}
    />
  );
}
