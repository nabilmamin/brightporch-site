import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";

interface Diagnosis {
  summary: string;
  problems: { label: string; explanation: string; severity: string }[];
  recommendation: string;
}

export default async function PlumberTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));

  if (!business) return notFound();

  let diagnosis: Diagnosis | null = null;
  if (business.diagnosis_json) {
    try {
      diagnosis = JSON.parse(business.diagnosis_json);
    } catch {
      // ignore parse errors
    }
  }

  const name = business.name || "Your Business";
  const city = business.city || "Your City";
  const state = business.state || "";
  const phone = business.phone || "(555) 000-0000";
  const rating = business.rating ?? 0;
  const reviewCount = business.reviews_count ?? 0;

  const services = [
    {
      title: "Emergency Repairs",
      desc: "24/7 emergency plumbing service. We arrive fast when you need us most.",
      icon: "🔧",
    },
    {
      title: "Drain Cleaning",
      desc: "Professional drain cleaning for clogs, slow drains, and backups.",
      icon: "🚿",
    },
    {
      title: "Water Heater",
      desc: "Installation, repair, and maintenance for all water heater types.",
      icon: "🔥",
    },
    {
      title: "Leak Detection",
      desc: "Advanced leak detection to find and fix hidden leaks fast.",
      icon: "💧",
    },
    {
      title: "Pipe Repair",
      desc: "Expert pipe repair and replacement for copper, PVC, and more.",
      icon: "🔩",
    },
    {
      title: "Remodeling",
      desc: "Kitchen and bathroom plumbing for your renovation projects.",
      icon: "🏠",
    },
  ];

  const stats = [
    { value: "Licensed", label: "& Insured" },
    { value: rating > 0 ? `${rating}` : "5.0", label: "Star Rating" },
    {
      value: reviewCount > 0 ? `${reviewCount}+` : "100+",
      label: "Reviews",
    },
    { value: "Same Day", label: "Service" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-[var(--font-geist-sans)]">
      {/* Floating Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4">
        <div className="w-full max-w-5xl">
          <div className="rounded-full bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] px-5 py-3 flex items-center justify-between">
            <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
              {name}
            </span>
            <a
              href={`tel:${phone}`}
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-neutral-900 text-white pl-5 pr-1.5 py-1.5 text-[13px] font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-neutral-800 active:scale-[0.98]"
            >
              <span>Call Now</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Subtle gradient orb */}
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-sky-100/60 to-blue-50/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-amber-50/40 to-orange-50/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center py-32">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/[0.04] px-4 py-1.5 mb-8">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500">
              {city}
              {state ? `, ${state}` : ""} &middot; Licensed & Insured
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] mb-6">
            Plumbing done
            <br />
            <span className="text-neutral-400">right, every time.</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Fast, reliable plumbing service for your home or business.
            {rating > 0 &&
              ` Trusted by ${reviewCount}+ customers with a ${rating}-star rating.`}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${phone}`}
              className="group relative inline-flex items-center gap-3 rounded-full bg-neutral-900 text-white pl-7 pr-2 py-2 text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-neutral-800 active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
            >
              <span>Get a Free Quote</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 text-neutral-500 text-[15px] font-medium hover:text-neutral-900 transition-colors duration-500"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[2rem] bg-white ring-1 ring-black/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-2">
            <div className="rounded-[calc(2rem-0.5rem)] bg-gradient-to-b from-neutral-50 to-white p-10 sm:p-14">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                {stats.map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                      {item.value}
                    </div>
                    <div className="text-sm text-neutral-400 mt-1 font-medium tracking-wide">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-neutral-900/[0.04] px-4 py-1.5 mb-5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500">
                What We Do
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
              Our Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-[1.5rem] bg-white ring-1 ring-black/[0.04] shadow-[0_1px_10px_rgba(0,0,0,0.03)] p-1.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <div className="rounded-[calc(1.5rem-0.375rem)] bg-gradient-to-b from-neutral-50/80 to-white p-7">
                  <div className="text-2xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[15px] text-neutral-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[2rem] bg-neutral-900 p-2">
            <div className="rounded-[calc(2rem-0.5rem)] bg-gradient-to-b from-neutral-800 to-neutral-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] p-10 sm:p-16">
              <div className="text-center mb-14">
                <div className="inline-flex items-center rounded-full bg-white/[0.06] px-4 py-1.5 mb-5 ring-1 ring-white/[0.08]">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-400">
                    Why Us
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Why choose {name}?
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Transparent Pricing",
                    desc: "No hidden fees, no surprises. You know the cost before we start.",
                  },
                  {
                    title: "Same-Day Service",
                    desc: "Emergency? We can be at your door today. Fast response guaranteed.",
                  },
                  {
                    title: "Experienced Team",
                    desc: "Licensed, certified plumbers with years of hands-on experience.",
                  },
                  {
                    title: "Satisfaction Guaranteed",
                    desc: "We stand behind our work. Not happy? We make it right.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.25rem] bg-white/[0.04] ring-1 ring-white/[0.06] p-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.07]"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-neutral-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-5">
            Ready to fix your
            <br />
            plumbing?
          </h2>
          <p className="text-lg text-neutral-500 mb-10 max-w-lg mx-auto leading-relaxed">
            Call now for a free estimate. Same-day service available for
            emergencies.
          </p>
          <a
            href={`tel:${phone}`}
            className="group relative inline-flex items-center gap-3 rounded-full bg-neutral-900 text-white pl-8 pr-2.5 py-2.5 text-lg font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-neutral-800 active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
          >
            <span>{phone}</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span className="font-semibold text-neutral-900">{name}</span>
            <span>{business.address || `${city}${state ? `, ${state}` : ""}`}</span>
            <span>{phone}</span>
          </div>
          <div className="text-center sm:text-right">
            {diagnosis && (
              <span className="text-amber-600 text-xs font-medium">
                Your current site scores {business.performance}/100 on mobile
                &middot; This site loads in under 1s
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
