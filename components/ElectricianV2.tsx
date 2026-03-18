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
    title: "Panel Upgrades",
    desc: "200-amp upgrades, breaker replacements, and fuse box modernization. End the tripped breakers for good.",
    img: "/images/electrician/panel.jpg",
  },
  {
    title: "Whole-Home Rewiring",
    desc: "Replace knob-and-tube or aluminum wiring with modern copper. Essential for older homes and insurance compliance.",
    img: "/images/electrician/wiring.jpg",
  },
  {
    title: "Lighting Design & Install",
    desc: "Recessed, landscape, under-cabinet, and accent lighting. We design and install — you flip the switch.",
    img: "/images/electrician/lighting.jpg",
  },
  {
    title: "EV Charger Installation",
    desc: "Level 2 home charging stations. Proper circuit sizing, permits pulled, and warranty-backed installation.",
    img: "/images/electrician/ev-charger.jpg",
  },
];

const EMERGENCY_ITEMS = [
  "Sparking outlets or switches",
  "Burning smell from panel or walls",
  "Power outage isolated to your home",
  "Exposed or damaged wiring",
  "Breaker that won't reset",
  "Flickering lights throughout the house",
];

const TESTIMONIALS = [
  {
    text: "Panel was sparking on a Sunday night. They answered the phone, showed up in 40 minutes, and had us back up and running. Saved us from what could've been a fire.",
    name: "Marcus T.",
    service: "Emergency Panel Repair",
  },
  {
    text: "Rewired our entire 1960s ranch — on schedule, under budget. The crew was clean, communicative, and knew exactly what they were doing. Insurance company was thrilled.",
    name: "Linda & George R.",
    service: "Whole-Home Rewiring",
  },
  {
    text: "Installed a Tesla Wall Connector and a sub-panel in our garage. Pulled permits, passed inspection first try. Professional from start to finish.",
    name: "Kevin S.",
    service: "EV Charger Install",
  },
];

export default function ElectricianV2({ business }: { business: BusinessData }) {
  const name = business.name || "Your Electrician";
  const city = business.city || "Your City";
  const state = business.state || "";
  const phone = business.phone || "(555) 000-0000";
  const rating = business.rating ?? 0;
  const reviewCount = business.reviews_count ?? 0;
  const location = `${city}${state ? `, ${state}` : ""}`;

  let diagnosis: { summary?: string } | null = null;
  if (business.diagnosis_json) {
    try { diagnosis = JSON.parse(business.diagnosis_json); } catch { /* ignore */ }
  }

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Emergency banner */}
      <div className="bg-[#FACC15] text-[#0A0A0A] py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span
            className="text-[12px] tracking-[0.05em] uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            24/7 Emergency Service — Call Now
          </span>
          <a
            href={`tel:${phone}`}
            className="text-[12px] underline underline-offset-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            {phone}
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Lightning icon */}
            <div className="w-8 h-8 bg-[#FACC15] flex items-center justify-center" style={{ borderRadius: "4px" }}>
              <svg className="w-5 h-5 text-[#0A0A0A]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <span
                className="text-[15px] text-white block leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
              >
                {name}
              </span>
              <span
                className="text-[11px] text-[#FACC15] tracking-[0.1em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
              >
                Licensed Electrician
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${phone}`}
              className="hidden md:flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </a>
            <a
              href={`tel:${phone}`}
              className="bg-[#FACC15] text-[#0A0A0A] px-5 py-2.5 text-[12px] tracking-[0.05em] uppercase hover:bg-[#FDE047] transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, borderRadius: "4px" }}
            >
              Free Estimate
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90dvh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/electrician/hero.jpg"
            alt="Professional electrician at work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[11px] tracking-[0.15em] uppercase text-[#FACC15]"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
              >
                {location}
              </span>
              <span className="w-8 h-px bg-[#FACC15]/40" />
              <span
                className="text-[11px] tracking-[0.15em] uppercase text-white/40"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Licensed & Insured
              </span>
            </div>

            <h1
              className="text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.03em" }}
            >
              Licensed electricians{" "}
              <span className="text-[#FACC15]">in {city}</span>
            </h1>

            <p
              className="text-[17px] md:text-[19px] text-white/55 leading-[1.7] max-w-xl mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}
            >
              Panel upgrades, rewiring, lighting, EV chargers. We show up on time,
              explain what we find, and do the work to code. Every time.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`tel:${phone}`}
                className="bg-[#FACC15] text-[#0A0A0A] px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#FDE047] transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, borderRadius: "4px" }}
              >
                Get a Free Estimate
              </a>
              <a
                href={`tel:${phone}`}
                className="border border-white/20 text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:border-white/40 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, borderRadius: "4px" }}
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
                <span className="text-[13px] text-white/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {rating}/5 from {reviewCount}+ reviews
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-white/5 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "24/7 Emergency", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Licensed & Insured", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { label: "Free Estimates", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Code Compliant", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#FACC15] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <span
                  className="text-[13px] text-white/60"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — cards with images */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.15em] uppercase text-[#FACC15] mb-4 block"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
            >
              What We Do
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1] max-w-lg"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              What we do
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group relative overflow-hidden bg-[#141414] border border-white/5 hover:border-[#FACC15]/20 transition-all duration-500"
                style={{ borderRadius: "6px" }}
              >
                <div className="grid sm:grid-cols-[1fr_1.2fr]">
                  <div className="aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3
                      className="text-[17px] text-white mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-[14px] text-white/40 leading-[1.7]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}
                    >
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional services list */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Electrical Repairs", "Generator Install", "Ceiling Fans", "Smoke Detectors", "Outlet & Switch Repair", "Surge Protection", "Code Corrections", "Safety Inspections"].map((s) => (
              <div
                key={s}
                className="bg-[#141414] border border-white/5 px-4 py-3 text-[13px] text-white/50"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, borderRadius: "4px" }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency section */}
      <section className="py-24 md:py-32 px-6 bg-[#FACC15] text-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-[11px] tracking-[0.15em] uppercase text-[#0A0A0A]/50 mb-4 block"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
              >
                24/7 Emergency
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] leading-[1.1] mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                Electrical emergency?{" "}
                <span className="block">We answer day and night.</span>
              </h2>
              <p
                className="text-[16px] text-[#0A0A0A]/60 leading-[1.7] mb-8 max-w-md"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
              >
                Electrical problems can get worse fast. If something doesn&apos;t look
                or smell right, give us a call. We answer around the clock.
              </p>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-3 bg-[#0A0A0A] text-[#FACC15] px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#1A1A1A] transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, borderRadius: "4px" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {phone} Now
              </a>
            </div>
            <div>
              <p
                className="text-[12px] tracking-[0.1em] uppercase text-[#0A0A0A]/40 mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Call immediately if you notice:
              </p>
              <div className="space-y-3">
                {EMERGENCY_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#0A0A0A]/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span
                      className="text-[15px] text-[#0A0A0A]/80"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.15em] uppercase text-[#FACC15] mb-4 block"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
            >
              Reviews
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              What our customers say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-[#141414] border border-white/5 p-8"
                style={{ borderRadius: "6px" }}
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
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p
                    className="text-[14px] text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[12px] text-[#FACC15]/60"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {t.service}
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
            src="/images/electrician/home-night.jpg"
            alt="Well-lit home at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.1] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.03em" }}
          >
            Need an{" "}
            <span className="text-[#FACC15]">electrician?</span>
          </h2>
          <p
            className="text-[17px] text-white/45 leading-[1.7] max-w-lg mx-auto mb-10"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}
          >
            Free estimates on all jobs. We show up on time, do the work to code,
            and clean up when we&apos;re done.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone}`}
              className="bg-[#FACC15] text-[#0A0A0A] px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#FDE047] transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, borderRadius: "4px" }}
            >
              Call for Free Estimate
            </a>
            <a
              href={`tel:${phone}`}
              className="border border-white/20 text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:border-white/40 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, borderRadius: "4px" }}
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-[#FACC15] flex items-center justify-center" style={{ borderRadius: "3px" }}>
                  <svg className="w-4 h-4 text-[#0A0A0A]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <span
                  className="text-white text-[15px]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  {name}
                </span>
              </div>
              <p
                className="text-[14px] text-white/30 leading-[1.7] max-w-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}
              >
                Licensed electricians serving {city} and surrounding areas.
                Emergency service available 24/7. All work meets NEC code.
              </p>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.15em] uppercase text-white/20 mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Contact
              </p>
              <div className="space-y-2 text-[14px] text-white/40" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
                <p>{business.address || location}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.15em] uppercase text-white/20 mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Services
              </p>
              <ul className="space-y-2 text-[14px] text-white/40" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300 }}>
                <li>Panel Upgrades</li>
                <li>Whole-Home Rewiring</li>
                <li>Lighting Installation</li>
                <li>EV Chargers</li>
                <li>Emergency Repair</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[12px] text-white/15" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Preview website built for {name}
            </span>
            {diagnosis && (
              <span className="text-[12px] text-[#FACC15]/70" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Current site: {business.performance}/100 — This loads in under 1s
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
