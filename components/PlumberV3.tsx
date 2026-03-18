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
  {
    title: "Emergency Repairs",
    desc: "Burst pipes, overflows, gas leaks. We show up fast with a fully stocked truck — day or night. No after-hours surcharge.",
    img: "/images/plumber/service-emergency.jpg",
    urgent: true,
  },
  {
    title: "Water Heaters",
    desc: "Tank and tankless install, repair, replacement. We size it right so you never run out of hot water mid-shower again.",
    img: "/images/plumber/service-water-heater.jpg",
    urgent: false,
  },
  {
    title: "Drain Cleaning",
    desc: "Camera inspection, hydro-jetting, rooter service. We find what's clogging your line and clear it — not just push it deeper.",
    img: "/images/plumber/service-drain.jpg",
    urgent: false,
  },
  {
    title: "Leak Detection",
    desc: "Thermal imaging and acoustic detection for hidden leaks in walls, slabs, and underground. We find it without tearing up your home.",
    img: "/images/plumber/service-leak.jpg",
    urgent: false,
  },
  {
    title: "Repiping",
    desc: "Replace corroded galvanized or polybutylene pipes with modern copper or PEX. Essential for homes built before 1990.",
    img: "/images/plumber/service-pipes.jpg",
    urgent: false,
  },
  {
    title: "Bathroom & Kitchen",
    desc: "Faucets, toilets, garbage disposals, and full plumbing for renovations. We rough it in and finish it clean.",
    img: "/images/plumber/service-bathroom.jpg",
    urgent: false,
  },
];

const WATER_DAMAGE_FACTS = [
  { stat: "14,000 gal", label: "wasted per year by average household leaks" },
  { stat: "$10,000+", label: "average water damage insurance claim" },
  { stat: "3 minutes", label: "for a burst pipe to flood a room" },
];

const TESTIMONIALS = [
  {
    text: "Pipe burst under the kitchen at 11pm on a Saturday. They answered, showed up in 35 minutes, and stopped the flooding before it hit the living room. I don't know what we would've done.",
    name: "Jennifer & Mark R.",
    context: "Emergency — Saturday night",
  },
  {
    text: "No surprises. He walked me through everything before starting, showed me the old corroded pipes, and explained exactly why we needed to repipe. Price was what he quoted. That never happens.",
    name: "Carlos M.",
    context: "Whole-home repipe",
  },
  {
    text: "Three other plumbers told us we needed to tear up the slab. These guys found the leak with a camera in 20 minutes and fixed it through a small access point. Saved us thousands.",
    name: "Angela W.",
    context: "Slab leak detection",
  },
];

export default function PlumberV3({ business }: { business: BusinessData }) {
  const name = business.name || "Your Plumber";
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
    <div className="min-h-[100dvh] bg-[#F8F6F1] text-[#1C2B3A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Emergency bar — the first thing you see */}
      <div className="bg-[#1C2B3A] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444]" />
            </span>
            <span
              className="text-[12px] tracking-[0.06em] uppercase text-white/80"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              Water emergency? We&apos;re on our way.
            </span>
          </div>
          <a
            href={telHref}
            className="text-[12px] bg-white/10 hover:bg-white/20 px-4 py-1.5 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, borderRadius: "4px" }}
          >
            Call {phone}
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#E3DFD6]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Droplet icon */}
            <div className="w-8 h-8 bg-[#2B7A98] flex items-center justify-center" style={{ borderRadius: "6px" }}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <span
                className="text-[15px] text-[#1C2B3A] block leading-tight"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
              >
                {name}
              </span>
              <span
                className="text-[11px] text-[#2B7A98] tracking-[0.08em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
              >
                Licensed Plumber
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={telHref}
              className="hidden md:block text-[13px] text-[#1C2B3A]/50 hover:text-[#1C2B3A] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {phone}
            </a>
            <a
              href={telHref}
              className="bg-[#2B7A98] text-white px-5 py-2.5 text-[12px] tracking-[0.05em] uppercase hover:bg-[#236580] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, borderRadius: "6px" }}
            >
              Free Estimate
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — water damage urgency */}
      <section className="relative min-h-[90dvh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/plumber/hero.jpg"
            alt="Professional plumber at work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C2B3A]/95 via-[#1C2B3A]/80 to-[#1C2B3A]/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-[#5BBAD5]"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
              >
                {location}
              </span>
              <span className="w-8 h-px bg-white/20" />
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-white/35"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                24/7 Emergency
              </span>
            </div>

            <h1
              className="text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.03em" }}
            >
              Water doesn&apos;t wait.{" "}
              <span className="text-[#5BBAD5]">Neither do we.</span>
            </h1>

            <p
              className="text-[17px] md:text-[19px] text-white/55 leading-[1.7] max-w-xl mb-10"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Burst pipes, backed-up drains, no hot water — we pick up the phone,
              show up fast, and fix it right. Upfront pricing before we start.
              Always.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={telHref}
                className="bg-[#2B7A98] text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#236580] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, borderRadius: "6px" }}
              >
                Get a Free Estimate
              </a>
              <a
                href={telHref}
                className="border border-white/20 text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:border-white/40 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, borderRadius: "6px" }}
              >
                {phone}
              </a>
            </div>

            {rating > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-[#FACC15]" : "text-white/15"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] text-white/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {rating}/5 from {reviewCount}+ reviews
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Water damage facts — urgency builder */}
      <section className="bg-[#1C2B3A] py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {WATER_DAMAGE_FACTS.map((fact) => (
            <div key={fact.stat} className="text-center">
              <p
                className="text-[2rem] md:text-[2.5rem] text-[#5BBAD5] leading-none mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
              >
                {fact.stat}
              </p>
              <p
                className="text-[13px] text-white/40 max-w-[200px] mx-auto"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
              >
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-[#E3DFD6] py-6 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "24/7 Emergency", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Upfront Pricing", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
            { label: "Licensed & Insured", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { label: "Work Guaranteed", icon: "M5 13l4 4L19 7" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#2B7A98] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span
                className="text-[13px] text-[#1C2B3A]/60"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services — image cards */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.12em] uppercase text-[#2B7A98] mb-4 block"
              style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
            >
              What We Fix
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-[#1C2B3A] leading-[1.1] max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Every plumbing problem has a fix. We know them all.
            </h2>
          </div>

          {/* Featured: Emergency */}
          <div
            className="group relative overflow-hidden bg-[#1C2B3A] mb-4"
            style={{ borderRadius: "8px" }}
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={SERVICES[0].img}
                  alt={SERVICES[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
                  </span>
                  <span
                    className="text-[11px] tracking-[0.1em] uppercase text-[#EF4444]"
                    style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
                  >
                    24/7 Emergency
                  </span>
                </div>
                <h3
                  className="text-[1.5rem] md:text-[1.8rem] text-white mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
                >
                  {SERVICES[0].title}
                </h3>
                <p
                  className="text-[15px] text-white/50 leading-[1.7] mb-6"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  {SERVICES[0].desc}
                </p>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 text-[#5BBAD5] text-[13px] hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
                >
                  Call now — we answer day and night
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Other services grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.slice(1).map((service) => (
              <div
                key={service.title}
                className="group bg-white border border-[#E3DFD6] hover:border-[#2B7A98]/30 overflow-hidden transition-all duration-300"
                style={{ borderRadius: "8px" }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-[16px] text-[#1C2B3A] mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-[14px] text-[#1C2B3A]/45 leading-[1.65]"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing promise — addresses the #1 fear */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-[#2B7A98] mb-4 block"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
              >
                Our Promise
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] text-[#1C2B3A] leading-[1.1] mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                The price we quote is the price you pay.{" "}
                <span className="text-[#1C2B3A]/30">Period.</span>
              </h2>
              <div
                className="space-y-4 text-[16px] text-[#1C2B3A]/55 leading-[1.75]"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                <p>
                  We know the reputation plumbers have. The vague quote that doubles
                  once they start. The &ldquo;while we&apos;re here&rdquo; upsell. The bill that
                  makes you wish you&apos;d just let the faucet drip.
                </p>
                <p>
                  That&apos;s not us. We diagnose, we explain what we found in plain English,
                  and we give you a fixed price. If the job takes longer than expected,
                  that&apos;s on us — not your wallet.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "Diagnose first, quote second", desc: "We figure out the real problem before we talk money. No guessing, no ballparking." },
                { title: "Price is the price", desc: "Written quote before we start. If we underestimated, we eat the difference." },
                { title: "No upselling", desc: "We'll tell you what you need. If your water heater has 5 more years, we'll say so." },
                { title: "Guarantee on all work", desc: "Not satisfied? We come back and fix it. Free. No arguments." },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-5 py-5 ${i > 0 ? "border-t border-[#E3DFD6]" : ""}`}
                >
                  <div className="w-8 h-8 bg-[#2B7A98]/10 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderRadius: "6px" }}>
                    <svg className="w-4 h-4 text-[#2B7A98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-[15px] text-[#1C2B3A] mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[14px] text-[#1C2B3A]/40 leading-[1.6]"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — story-driven */}
      <section className="py-24 md:py-32 px-6 bg-[#1C2B3A]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.12em] uppercase text-[#5BBAD5] mb-4 block"
              style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
            >
              Real Stories
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Why they called us back
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/5 p-8"
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
                  className="text-[14px] text-white/55 leading-[1.75] mb-6"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p
                    className="text-[14px] text-white"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[12px] text-[#5BBAD5]/60"
                    style={{ fontFamily: "'DM Mono', monospace" }}
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
            src="/images/plumber/cta-bg.jpg"
            alt="Modern bathroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1C2B3A]/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.1] mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.03em" }}
          >
            Leaking money on{" "}
            <span className="text-[#5BBAD5]">bad plumbing?</span>
          </h2>
          <p
            className="text-[17px] text-white/45 leading-[1.7] max-w-lg mx-auto mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Free estimates. Upfront pricing. Same-day service when you need it most.
            One call and we handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={telHref}
              className="bg-[#2B7A98] text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#236580] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, borderRadius: "6px" }}
            >
              Call for Free Estimate
            </a>
            <a
              href={telHref}
              className="border border-white/20 text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:border-white/40 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, borderRadius: "6px" }}
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 bg-[#141E29] text-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-[#2B7A98] flex items-center justify-center" style={{ borderRadius: "5px" }}>
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <span
                  className="text-white text-[15px]"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
                >
                  {name}
                </span>
              </div>
              <p
                className="text-[14px] text-white/25 leading-[1.7] max-w-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Licensed plumbers serving {city} and surrounding areas.
                24/7 emergency service. Upfront pricing on every job.
              </p>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-white/15 mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Contact
              </p>
              <div className="space-y-2 text-[14px]" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                <p>{business.address || location}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-white/15 mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Services
              </p>
              <ul className="space-y-2 text-[14px]" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                <li>Emergency Repairs</li>
                <li>Water Heaters</li>
                <li>Drain Cleaning</li>
                <li>Leak Detection</li>
                <li>Repiping</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[12px] text-white/15" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Preview website built for {name}
            </span>
            {diagnosis && (
              <span className="text-[12px] text-[#5BBAD5]/60" style={{ fontFamily: "'DM Mono', monospace" }}>
                Current site: {business.performance}/100 — This loads in under 1s
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
