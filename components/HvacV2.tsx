interface BusinessData {
  name: string;
  city: string;
  state: string;
  phone: string;
  address: string;
  rating: number | null;
  reviews_count: number | null;
  performance: number | null;
  diagnosis_json: string | null;
}

const SERVICES = [
  { title: "AC Repair", desc: "Blowing warm air, strange noises, leaking water. We show up, figure out what's wrong, and fix it — usually the same day.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { title: "Heating Repair", desc: "No heat, weak airflow, pilot light issues. We work on all makes — gas furnaces, heat pumps, and electric systems.", icon: "M17.657 18.657A8 8 0 016.343 7.343S1.5 4.5 1.5 4.5l4.243 4.243a8 8 0 0111.314 0L21.3 4.5s-4.843 2.843-3.643 14.157z" },
  { title: "System Installation", desc: "We measure your home, size the equipment properly, and do a clean install. No shortcuts on ductwork or electrical.", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { title: "Maintenance Plans", desc: "Two tune-ups per year, priority scheduling, 15% off repairs. Catches problems before they get expensive.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { title: "Indoor Air Quality", desc: "Duct cleaning, UV purifiers, dehumidifiers. If your allergies are worse indoors, your air system might be the reason.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
  { title: "Ductwork", desc: "Leaky ducts waste about 30% of your conditioned air. We find the leaks, seal them, and your energy bill goes down.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
];

const EFFICIENCY_FACTS = [
  { stat: "30%", label: "of conditioned air lost through leaky ducts" },
  { stat: "$150/yr", label: "wasted per degree of bad thermostat calibration" },
  { stat: "15 yrs", label: "average system lifespan before replacement" },
];

const TESTIMONIALS = [
  {
    text: "AC went out on the hottest day of the year. They had someone here in 2 hours and the part replaced before dinner. Really appreciate the fast response.",
    name: "Rachel D.",
    context: "AC repair — emergency call",
  },
  {
    text: "Got three quotes for a new system. They were the only ones who actually measured the house and explained the sizing. Ended up being mid-price but the install was flawless.",
    name: "Tom & Lisa P.",
    context: "Full system replacement",
  },
  {
    text: "Been on their maintenance plan for 4 years. They caught a cracked heat exchanger last fall before it became a carbon monoxide issue. That alone was worth every penny.",
    name: "Doug K.",
    context: "Annual maintenance — safety catch",
  },
];

export default function HvacV2({ business }: { business: BusinessData }) {
  const name = business.name || "Your HVAC Company";
  const city = business.city || "Your City";
  const state = business.state || "";
  const phone = business.phone || "(555) 000-0000";
  const rating = business.rating ?? 0;
  const reviewCount = business.reviews_count ?? 0;
  const location = `${city}${state ? `, ${state}` : ""}`;
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  let diagnosis: { summary?: string } | null = null;
  if (business.diagnosis_json) {
    try { diagnosis = JSON.parse(business.diagnosis_json); } catch { /* ignore */ }
  }

  return (
    <div className="min-h-[100dvh] bg-white text-[#1B2431]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Rebate/promo banner — conversion driver */}
      <div className="bg-[#E8510E] text-white py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span
            className="text-[12px] tracking-[0.04em] uppercase"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}
          >
            Up to $8,000 back on new systems — federal + state rebates
          </span>
          <a
            href={telHref}
            className="text-[12px] bg-white/15 hover:bg-white/25 px-3 py-1 transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, borderRadius: "3px" }}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Thermostat icon */}
            <div className="w-9 h-9 bg-[#1B2431] flex items-center justify-center" style={{ borderRadius: "6px" }}>
              <svg className="w-5 h-5 text-[#E8510E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <span
                className="text-[15px] text-[#1B2431] block leading-tight"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700 }}
              >
                {name}
              </span>
              <span
                className="text-[10px] text-[#E8510E] tracking-[0.12em] uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}
              >
                Heating &amp; Cooling
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={telHref}
              className="hidden md:block text-[13px] text-[#1B2431]/50 hover:text-[#1B2431] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}
            >
              {phone}
            </a>
            <a
              href={telHref}
              className="bg-[#E8510E] text-white px-5 py-2.5 text-[12px] tracking-[0.05em] uppercase hover:bg-[#D14A0C] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, borderRadius: "5px" }}
            >
              Book Service
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90dvh] flex items-center bg-[#1B2431]">
        <div className="absolute inset-0">
          <img
            src="/images/hvac/hero.jpg"
            alt="HVAC professional"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2431] via-[#1B2431]/85 to-[#1B2431]/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            {/* Reviews lead — top of hero */}
            {rating > 0 && (
              <div className="flex items-center gap-3 mb-8 bg-white/5 backdrop-blur-sm px-4 py-2.5 inline-flex" style={{ borderRadius: "6px" }}>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-[#FACC15]" : "text-white/15"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] text-white/70" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>
                  {rating}/5 from {reviewCount.toLocaleString()}+ reviews
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-[#E8510E]"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}
              >
                {location}
              </span>
              <span className="w-8 h-px bg-white/15" />
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-white/30"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                24/7 Emergency
              </span>
            </div>

            <h1
              className="text-[2.8rem] md:text-[3.8rem] lg:text-[4.8rem] text-white leading-[1.02] mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "-0.02em", textTransform: "uppercase" }}
            >
              Heating &amp; cooling{" "}
              <span className="text-[#E8510E]">that just works</span>
            </h1>

            <p
              className="text-[17px] md:text-[19px] text-white/50 leading-[1.7] max-w-xl mb-10"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              AC repair, furnace service, new system installs. We show up on time,
              tell you what we find, give you a straight price, and get it done right.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={telHref}
                className="bg-[#E8510E] text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#D14A0C] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, borderRadius: "5px" }}
              >
                Schedule Service
              </a>
              <a
                href={telHref}
                className="border border-white/20 text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:border-white/40 transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, borderRadius: "5px" }}
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Efficiency facts */}
      <section className="bg-[#1B2431] border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {EFFICIENCY_FACTS.map((fact) => (
            <div key={fact.stat} className="text-center">
              <p
                className="text-[2rem] md:text-[2.5rem] text-[#E8510E] leading-none mb-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                {fact.stat}
              </p>
              <p
                className="text-[13px] text-white/35 max-w-[220px] mx-auto"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
              >
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-gray-100 py-6 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "24/7 Emergency", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Licensed & Insured", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { label: "Free Estimates", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "All Makes & Models", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#E8510E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span
                className="text-[13px] text-[#1B2431]/55"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.12em] uppercase text-[#E8510E] mb-4 block"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}
            >
              What We Do
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-[#1B2431] leading-[1.05]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "-0.01em", textTransform: "uppercase" }}
            >
              What we work on
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group bg-gray-50 border border-gray-100 hover:border-[#E8510E]/20 p-7 transition-all duration-300"
                style={{ borderRadius: "8px" }}
              >
                <div className="w-10 h-10 bg-[#E8510E]/10 flex items-center justify-center mb-5" style={{ borderRadius: "6px" }}>
                  <svg className="w-5 h-5 text-[#E8510E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3
                  className="text-[16px] text-[#1B2431] mb-2"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700 }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-[14px] text-[#1B2431]/40 leading-[1.65]"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal readiness — HVAC-specific section */}
      <section className="py-24 md:py-32 px-6 bg-[#1B2431]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-[#E8510E] mb-4 block"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}
              >
                Seasonal Readiness
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] text-white leading-[1.05] mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase" }}
              >
                A $99 tune-up now beats{" "}
                <span className="text-[#E8510E]">a $3,000 repair later</span>
              </h2>
              <p
                className="text-[16px] text-white/40 leading-[1.75] mb-8"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
              >
                Most systems break down on the hottest and coldest days — when they&apos;re
                working the hardest. Regular maintenance catches small problems before
                they turn into big ones.
              </p>
              <a
                href={telHref}
                className="inline-flex items-center gap-3 bg-[#E8510E] text-white px-7 py-3.5 text-[13px] tracking-[0.05em] uppercase hover:bg-[#D14A0C] transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, borderRadius: "5px" }}
              >
                Book a Tune-Up
              </a>
            </div>
            <div className="space-y-4">
              <p
                className="text-[12px] tracking-[0.1em] uppercase text-white/25 mb-2"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                What a $99 tune-up includes:
              </p>
              {[
                "Check refrigerant levels and test for leaks",
                "Clean condenser and evaporator coils",
                "Inspect and tighten all electrical connections",
                "Test thermostat calibration and cycling",
                "Lubricate all moving parts",
                "Inspect ductwork for leaks and damage",
                "Test carbon monoxide levels (furnace)",
                "Full written report with photos",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#E8510E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span
                    className="text-[14px] text-white/55"
                    style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.12em] uppercase text-[#E8510E] mb-4 block"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}
            >
              Reviews
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-[#1B2431] leading-[1.05]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase" }}
            >
              What our customers say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-gray-50 border border-gray-100 p-8"
                style={{ borderRadius: "8px" }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#FACC15]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-[14px] text-[#1B2431]/55 leading-[1.75] mb-6"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p
                    className="text-[14px] text-[#1B2431]"
                    style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[12px] text-[#E8510E]/60"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {t.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hvac/cta-bg.jpg"
            alt="Comfortable home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1B2431]/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.05] mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase" }}
          >

            Need heating or cooling{" "}
            <span className="text-[#E8510E]">service?</span>
          </h2>
          <p
            className="text-[17px] text-white/40 leading-[1.7] max-w-lg mx-auto mb-10"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
          >
            Free estimates on all work. Same-day emergency service available.
            Financing options on new system installs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={telHref}
              className="bg-[#E8510E] text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#D14A0C] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, borderRadius: "5px" }}
            >
              Schedule Service
            </a>
            <a
              href={telHref}
              className="border border-white/20 text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:border-white/40 transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, borderRadius: "5px" }}
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 bg-[#131A24]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12 text-white/35">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-[#E8510E] flex items-center justify-center" style={{ borderRadius: "5px" }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span
                  className="text-white text-[15px]"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700 }}
                >
                  {name}
                </span>
              </div>
              <p
                className="text-[14px] leading-[1.7] max-w-sm"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
              >
                Heating, cooling, and indoor air quality for {city} homes and businesses.
                24/7 emergency service. All makes and models.
              </p>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-white/15 mb-4"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Contact
              </p>
              <div className="space-y-2 text-[14px]" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
                <p>{business.address || location}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-white/15 mb-4"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Services
              </p>
              <ul className="space-y-2 text-[14px]" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
                <li>AC Repair</li>
                <li>Heating Repair</li>
                <li>System Installation</li>
                <li>Maintenance Plans</li>
                <li>Indoor Air Quality</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[12px] text-white/15" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Preview website built for {name}
            </span>
            {diagnosis && (
              <span className="text-[12px] text-[#E8510E]/60" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Current site: {business.performance}/100 — This loads in under 1s
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
