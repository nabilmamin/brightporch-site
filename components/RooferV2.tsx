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
  { title: "Roof Replacement", desc: "Asphalt shingles, metal, tile, flat roofs. We tear off the old, inspect the decking, and install it right." },
  { title: "Roof Repair", desc: "Missing shingles, leaks, flashing damage. We find the problem, fix it, and make sure it holds." },
  { title: "Storm Damage", desc: "Hail, wind, fallen trees. We document the damage, work with your insurance, and handle the full repair." },
  { title: "Leak Detection", desc: "Water stains on the ceiling don't always mean the leak is directly above. We trace it to the source." },
  { title: "Gutter Install & Repair", desc: "Seamless gutters, gutter guards, downspout routing. Keeps water away from your foundation." },
  { title: "Roof Inspections", desc: "Buying a home, selling a home, or just want to know where things stand. Written report with photos." },
];

const ROOF_FACTS = [
  { stat: "25 yrs", label: "average shingle roof lifespan in the Southeast" },
  { stat: "$12,000", label: "average cost of water damage from a neglected leak" },
  { stat: "40%", label: "of home insurance claims are weather-related roof damage" },
];

const TESTIMONIALS = [
  {
    text: "Storm took a bunch of shingles off. They were out the next morning, tarped it, and had the full replacement done within the week. Worked directly with our insurance company too.",
    name: "Mike & Karen T.",
    context: "Storm damage repair",
  },
  {
    text: "Had three roofers come out for quotes. Two of them barely got on the roof. These guys did a full inspection, showed us photos of the decking, and explained everything. Fair price, clean job.",
    name: "Robert S.",
    context: "Full roof replacement",
  },
  {
    text: "Small leak in the spare bedroom that two other companies couldn't find. They traced it to a flashing issue on the other side of the house. Fixed it in one visit. No more water stains.",
    name: "Patricia L.",
    context: "Leak detection & repair",
  },
];

export default function RooferV2({ business }: { business: BusinessData }) {
  const name = business.name || "Your Roofing Company";
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

  // Earth tone palette
  // Primary: #3D2E1E (dark brown), Accent: #B5703C (warm copper), Bg: #F5F1EB (warm cream)

  return (
    <div className="min-h-[100dvh] bg-[#F5F1EB] text-[#3D2E1E]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Storm damage banner */}
      <div className="bg-[#3D2E1E] text-white py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
          <svg className="w-4 h-4 text-[#B5703C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span
            className="text-[12px] tracking-[0.04em] uppercase"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
          >
            Storm damage? We handle insurance claims start to finish.
          </span>
          <a
            href={telHref}
            className="text-[12px] bg-[#B5703C] hover:bg-[#A0622F] px-3 py-1 transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, borderRadius: "4px" }}
          >
            Call Now
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#F5F1EB]/95 backdrop-blur-md border-b border-[#E0D9CE]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-[#3D2E1E] flex items-center justify-center" style={{ borderRadius: "6px" }}>
              <svg className="w-5 h-5 text-[#B5703C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span
                className="text-[15px] text-[#3D2E1E] block leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
              >
                {name}
              </span>
              <span
                className="text-[10px] text-[#B5703C] tracking-[0.12em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
              >
                Licensed Roofing
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={telHref}
              className="hidden md:block text-[13px] text-[#3D2E1E]/50 hover:text-[#3D2E1E] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
            >
              {phone}
            </a>
            <a
              href={telHref}
              className="bg-[#B5703C] text-white px-5 py-2.5 text-[12px] tracking-[0.05em] uppercase hover:bg-[#A0622F] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, borderRadius: "5px" }}
            >
              Free Inspection
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90dvh] flex items-center bg-[#3D2E1E]">
        <div className="absolute inset-0">
          <img
            src="/images/roofer/hero.jpg"
            alt="Residential roofing"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D2E1E] via-[#3D2E1E]/80 to-[#3D2E1E]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            {rating > 0 && (
              <div className="flex items-center gap-3 mb-8 bg-white/5 backdrop-blur-sm px-4 py-2.5 inline-flex" style={{ borderRadius: "6px" }}>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-[#FACC15]" : "text-white/15"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] text-white/70" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
                  {rating}/5 from {reviewCount}+ reviews
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-[#B5703C]"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
              >
                {location}
              </span>
              <span className="w-8 h-px bg-white/15" />
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-white/30"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Licensed &amp; Insured
              </span>
            </div>

            <h1
              className="text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              A solid roof over{" "}
              <span className="text-[#B5703C]">your head</span>
            </h1>

            <p
              className="text-[17px] md:text-[19px] text-white/50 leading-[1.7] max-w-xl mb-10"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300 }}
            >
              Roof replacements, repairs, storm damage, leak fixes. We get on the roof,
              show you what we find, and give you an honest price.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={telHref}
                className="bg-[#B5703C] text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#A0622F] transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, borderRadius: "5px" }}
              >
                Get a Free Estimate
              </a>
              <a
                href={telHref}
                className="border border-white/20 text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:border-white/40 transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, borderRadius: "5px" }}
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Roof facts */}
      <section className="bg-[#3D2E1E] border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {ROOF_FACTS.map((fact) => (
            <div key={fact.stat} className="text-center">
              <p
                className="text-[2rem] md:text-[2.5rem] text-[#B5703C] leading-none mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
              >
                {fact.stat}
              </p>
              <p
                className="text-[13px] text-white/35 max-w-[220px] mx-auto"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
              >
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-[#E0D9CE] py-6 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Free Inspections", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
            { label: "Licensed & Insured", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { label: "Insurance Claims", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
            { label: "Workmanship Warranty", icon: "M5 13l4 4L19 7" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#B5703C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span
                className="text-[13px] text-[#3D2E1E]/55"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
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
              className="text-[11px] tracking-[0.12em] uppercase text-[#B5703C] mb-4 block"
              style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
            >
              Our Services
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-[#3D2E1E] leading-[1.1]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              What we do
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`group p-7 border transition-all duration-300 ${
                  i === 2
                    ? "bg-[#3D2E1E] border-[#3D2E1E] md:col-span-2 lg:col-span-1"
                    : "bg-white border-[#E0D9CE] hover:border-[#B5703C]/30"
                }`}
                style={{ borderRadius: "8px" }}
              >
                {i === 2 && (
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-[#B5703C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    <span
                      className="text-[11px] tracking-[0.08em] uppercase text-[#B5703C]"
                      style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
                    >
                      We handle insurance
                    </span>
                  </div>
                )}
                <h3
                  className={`text-[16px] mb-2 ${i === 2 ? "text-white" : "text-[#3D2E1E]"}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-[14px] leading-[1.65] ${i === 2 ? "text-white/45" : "text-[#3D2E1E]/40"}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How old is your roof? */}
      <section className="py-24 md:py-32 px-6 bg-[#3D2E1E]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-[11px] tracking-[0.12em] uppercase text-[#B5703C] mb-4 block"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
              >
                Roof Health
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1] mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                How old is your roof?
              </h2>
              <div
                className="space-y-4 text-[16px] text-white/40 leading-[1.75]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300 }}
              >
                <p>
                  Most homeowners don&apos;t know. If your roof is 20+ years old, or you&apos;ve
                  noticed granules in your gutters, curling shingles, or dark streaks,
                  it&apos;s worth getting it looked at.
                </p>
                <p>
                  We do free inspections. We get on the roof, take photos of everything
                  we see, and give you a written report. If it&apos;s fine, we&apos;ll tell you.
                  If it needs work, we&apos;ll explain what and why.
                </p>
              </div>
              <a
                href={telHref}
                className="inline-flex items-center gap-3 bg-[#B5703C] text-white px-7 py-3.5 text-[13px] tracking-[0.05em] uppercase hover:bg-[#A0622F] transition-colors mt-8"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, borderRadius: "5px" }}
              >
                Schedule Free Inspection
              </a>
            </div>
            <div>
              <p
                className="text-[12px] tracking-[0.1em] uppercase text-white/20 mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Signs your roof may need attention:
              </p>
              <div className="space-y-3">
                {[
                  "Shingles that are curling, cracked, or missing",
                  "Granules collecting in your gutters",
                  "Dark streaks or moss growth",
                  "Water stains on interior ceilings or walls",
                  "Daylight visible through the attic roof boards",
                  "Sagging areas on the roofline",
                  "Higher energy bills than usual",
                  "Roof is 20+ years old",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#B5703C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span
                      className="text-[14px] text-white/50"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
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
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.12em] uppercase text-[#B5703C] mb-4 block"
              style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}
            >
              Reviews
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-[#3D2E1E] leading-[1.1]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              What our customers say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-[#E0D9CE] p-8"
                style={{ borderRadius: "8px" }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#B5703C]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-[14px] text-[#3D2E1E]/55 leading-[1.75] mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p
                    className="text-[14px] text-[#3D2E1E]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[12px] text-[#B5703C]/60"
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
            src="/images/roofer/cta-bg.jpg"
            alt="Beautiful home exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#3D2E1E]/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.05] mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            Need a{" "}
            <span className="text-[#B5703C]">roofer?</span>
          </h2>
          <p
            className="text-[17px] text-white/40 leading-[1.7] max-w-lg mx-auto mb-10"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300 }}
          >
            Free inspections. Written estimates. We show up when we say we will
            and stand behind our work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={telHref}
              className="bg-[#B5703C] text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:bg-[#A0622F] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, borderRadius: "5px" }}
            >
              Schedule Free Inspection
            </a>
            <a
              href={telHref}
              className="border border-white/20 text-white px-8 py-4 text-[13px] tracking-[0.05em] uppercase hover:border-white/40 transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, borderRadius: "5px" }}
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 bg-[#2A1F14]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12 text-white/35">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-[#B5703C] flex items-center justify-center" style={{ borderRadius: "5px" }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span
                  className="text-white text-[15px]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                >
                  {name}
                </span>
              </div>
              <p
                className="text-[14px] leading-[1.7] max-w-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300 }}
              >
                Licensed roofing contractor serving {city} and surrounding areas.
                Free inspections, insurance claim assistance, workmanship warranty on all jobs.
              </p>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-white/15 mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Contact
              </p>
              <div className="space-y-2 text-[14px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300 }}>
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
              <ul className="space-y-2 text-[14px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300 }}>
                <li>Roof Replacement</li>
                <li>Roof Repair</li>
                <li>Storm Damage</li>
                <li>Leak Detection</li>
                <li>Gutters</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[12px] text-white/15" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Preview website built for {name}
            </span>
            {diagnosis && (
              <span className="text-[12px] text-[#B5703C]/60" style={{ fontFamily: "'DM Mono', monospace" }}>
                Current site: {business.performance}/100 — This loads in under 1s
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
