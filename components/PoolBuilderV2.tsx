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
  { title: "Custom Pool Design", desc: "We design around your yard, your budget, and how you actually want to use it. 3D renderings before we break ground." },
  { title: "Pool Construction", desc: "Gunite, fiberglass, vinyl — proper engineering, clean excavation, and a crew that shows up every day." },
  { title: "Renovations", desc: "Replaster, retile, new coping, add features. If your pool looks tired, we bring it back." },
  { title: "Outdoor Living", desc: "Decks, patios, kitchens, fire features. We build the whole backyard, not just the pool." },
  { title: "Equipment & Automation", desc: "Pumps, heaters, salt systems, smart controls. Installed, programmed, and explained." },
  { title: "Weekly Maintenance", desc: "Chemistry, cleaning, equipment checks. Your pool stays swim-ready year-round." },
];

const JOURNEY = [
  { label: "Dream It", desc: "Free consultation. We visit your yard, listen to your ideas, and talk honestly about budget." },
  { label: "Design It", desc: "3D renderings in your actual backyard. We adjust until you love it. Nothing starts until you sign off." },
  { label: "Build It", desc: "Permits, excavation, construction. Weekly updates and a timeline we stick to." },
  { label: "Enjoy It", desc: "We fill it, balance the water, walk you through every system, and hand you the keys." },
];

const PORTFOLIO = [
  { src: "/images/pool-builder/pool-1.jpg", label: "Freeform Family Pool", vibe: "Family" },
  { src: "/images/pool-builder/pool-2.jpg", label: "Modern Entertaining", vibe: "Entertaining" },
  { src: "/images/pool-builder/pool-3.jpg", label: "Lap Pool & Spa", vibe: "Fitness" },
  { src: "/images/pool-builder/pool-4.jpg", label: "Backyard Retreat", vibe: "Relaxation" },
];

const TESTIMONIALS = [
  {
    text: "They were straight with us about what would and wouldn't fit in our yard. Ended up with a different layout than we planned but the whole backyard works together now. Really glad we listened.",
    name: "Jason & Amy H.",
    context: "Custom pool + patio",
  },
  {
    text: "Crew was here every day, kept the mess reasonable, and finished on the date they originally quoted. The kids were swimming by Labor Day.",
    name: "The Reeves Family",
    context: "New pool construction",
  },
  {
    text: "Our 20-year-old pool looked terrible. They resurfaced it, replaced the coping, and added LED lights. Feels brand new for a fraction of replacement cost.",
    name: "Diane M.",
    context: "Pool renovation",
  },
];

export default function PoolBuilderV2({ business }: { business: BusinessData }) {
  const name = business.name || "Your Pool Builder";
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

  // Navy #1A2E44, Sand accent #C4A97D, Warm white #FAF8F5

  return (
    <div className="min-h-[100dvh] bg-[#FAF8F5] text-[#1A2E44]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Nav — restrained, luxury-leaning */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <span
              className="text-[17px] text-[#1A2E44] block leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
            >
              {name}
            </span>
            <span
              className="text-[10px] text-[#C4A97D] tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Pool Design &amp; Build
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={telHref}
              className="hidden md:block text-[13px] text-[#1A2E44]/45 hover:text-[#1A2E44] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            >
              {phone}
            </a>
            <a
              href={telHref}
              className="bg-[#1A2E44] text-white px-6 py-2.5 text-[12px] tracking-[0.06em] uppercase hover:bg-[#152538] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, borderRadius: "4px" }}
            >
              Free Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — lifestyle-led, bottom-aligned text */}
      <section className="relative min-h-[95dvh] flex items-end">
        <div className="absolute inset-0">
          <img
            src="/images/pool-builder/hero.jpg"
            alt="Beautiful backyard pool"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E44]/90 via-[#1A2E44]/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#C4A97D]" />
              <span
                className="text-[11px] tracking-[0.15em] uppercase text-white/60"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                {location}
              </span>
            </div>

            <h1
              className="text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] text-white leading-[1.08] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
            >
              Your backyard,{" "}
              <em style={{ fontStyle: "italic" }}>built right</em>
            </h1>

            <p
              className="text-[17px] md:text-[19px] text-white/50 leading-[1.7] max-w-xl mb-10"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Custom pools, outdoor living, renovations. We design around your
              property and your budget, build on schedule, and stand behind
              every project.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={telHref}
                className="bg-[#C4A97D] text-[#1A2E44] px-8 py-3.5 text-[12px] tracking-[0.06em] uppercase hover:bg-[#B89A6E] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, borderRadius: "4px" }}
              >
                Schedule a Visit
              </a>
              <a
                href={telHref}
                className="border border-white/25 text-white px-8 py-3.5 text-[12px] tracking-[0.06em] uppercase hover:border-white/50 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, borderRadius: "4px" }}
              >
                {phone}
              </a>
            </div>

            {rating > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-[#C4A97D]" : "text-white/15"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {rating}/5 from {reviewCount}+ reviews
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Journey — the customer is the protagonist */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span
              className="text-[11px] tracking-[0.15em] uppercase text-[#C4A97D] mb-4 block"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              How It Works
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-[#1A2E44] leading-[1.1]"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
            >
              From first call to first swim
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {JOURNEY.map((step, i) => (
              <div key={step.label} className="text-center">
                <div
                  className="w-12 h-12 mx-auto mb-5 flex items-center justify-center bg-[#1A2E44] text-[#C4A97D]"
                  style={{ borderRadius: "50%", fontFamily: "'DM Serif Display', serif", fontSize: "18px" }}
                >
                  {i + 1}
                </div>
                <h3
                  className="text-[18px] text-[#1A2E44] mb-2"
                  style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}
                >
                  {step.label}
                </h3>
                <p
                  className="text-[14px] text-[#1A2E44]/40 leading-[1.65]"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio — organized by vibe */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.15em] uppercase text-[#C4A97D] mb-4 block"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Recent Builds
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-[#1A2E44] leading-[1.1]"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
            >
              Pools we&apos;ve built
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {PORTFOLIO.map((p) => (
              <div key={p.label} className="group relative overflow-hidden aspect-[16/10]" style={{ borderRadius: "6px" }}>
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E44]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-[14px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    {p.label}
                  </p>
                  <p className="text-white/50 text-[11px] tracking-[0.1em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {p.vibe}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span
                className="text-[11px] tracking-[0.15em] uppercase text-[#C4A97D] mb-4 block"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Services
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] text-[#1A2E44] leading-[1.1] mb-6"
                style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
              >
                What we do
              </h2>
              <p
                className="text-[16px] text-[#1A2E44]/40 leading-[1.75] max-w-md"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                From a brand-new custom pool to resurfacing an old one,
                we handle the full scope — design, permits, construction,
                and ongoing maintenance.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[13px] text-[#C4A97D]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Financing available on new builds
              </div>
            </div>
            <div className="space-y-0">
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  className={`py-6 ${i > 0 ? "border-t border-[#E8E2D8]" : ""}`}
                >
                  <h3
                    className="text-[15px] text-[#1A2E44] mb-1.5"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-[14px] text-[#1A2E44]/40 leading-[1.65]"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                  >
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 bg-[#1A2E44]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.15em] uppercase text-[#C4A97D] mb-4 block"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Reviews
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1]"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
            >
              What our customers say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/5 p-8"
                style={{ borderRadius: "6px" }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#C4A97D]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-[14px] text-white/50 leading-[1.75] mb-6"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p
                    className="text-[14px] text-white"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[12px] text-[#C4A97D]/50"
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
            src="/images/pool-builder/cta-bg.jpg"
            alt="Pool at golden hour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A2E44]/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.08] mb-6"
            style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
          >
            Ready to talk about{" "}
            <em style={{ fontStyle: "italic" }}>your pool?</em>
          </h2>
          <p
            className="text-[17px] text-white/40 leading-[1.7] max-w-lg mx-auto mb-10"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            Free on-site consultation. We look at your yard, talk about what you
            want, and give you a straight answer on budget and timeline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={telHref}
              className="bg-[#C4A97D] text-[#1A2E44] px-8 py-3.5 text-[12px] tracking-[0.06em] uppercase hover:bg-[#B89A6E] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, borderRadius: "4px" }}
            >
              Schedule a Visit
            </a>
            <a
              href={telHref}
              className="border border-white/20 text-white px-8 py-3.5 text-[12px] tracking-[0.06em] uppercase hover:border-white/40 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, borderRadius: "4px" }}
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 bg-[#111D2B]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12 text-white/30">
            <div className="md:col-span-2">
              <p
                className="text-white text-[17px] mb-3"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {name}
              </p>
              <p
                className="text-[14px] leading-[1.7] max-w-sm"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                Custom pool builder serving {city} and surrounding areas.
                Design, construction, renovations, and weekly maintenance.
                Financing available.
              </p>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.15em] uppercase text-white/15 mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Contact
              </p>
              <div className="space-y-2 text-[14px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                <p>{business.address || location}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.15em] uppercase text-white/15 mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Services
              </p>
              <ul className="space-y-2 text-[14px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                <li>Custom Pools</li>
                <li>Renovations</li>
                <li>Outdoor Living</li>
                <li>Equipment</li>
                <li>Maintenance</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[12px] text-white/15" style={{ fontFamily: "'Inter', sans-serif" }}>
              Preview website built for {name}
            </span>
            {diagnosis && (
              <span className="text-[12px] text-[#C4A97D]/50" style={{ fontFamily: "'DM Mono', monospace" }}>
                Current site: {business.performance}/100 — This loads in under 1s
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
