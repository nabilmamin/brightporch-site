interface Service {
  title: string;
  desc: string;
}

interface VerticalConfig {
  name: string;
  tagline: string;
  heroHeading: (city: string) => string;
  heroSubheading: string;
  services: Service[];
  processSteps: { title: string; desc: string }[];
  ctaHeading: string;
  ctaSubheading: string;
}

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

export default function LuxuryTemplateV2({
  config,
  business,
}: {
  config: VerticalConfig;
  business: BusinessData;
}) {
  const name = business.name || "Your Business";
  const city = business.city || "Your City";
  const state = business.state || "";
  const phone = business.phone || "(555) 000-0000";
  const rating = business.rating ?? 0;
  const reviewCount = business.reviews_count ?? 0;

  let diagnosis: { summary?: string } | null = null;
  if (business.diagnosis_json) {
    try {
      diagnosis = JSON.parse(business.diagnosis_json);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#FBFBFA] text-[#2F3437]" style={{ fontFamily: "'Geist', 'SF Pro Display', 'Helvetica Neue', sans-serif" }}>
      {/* Nav */}
      <nav className="border-b border-[#EAEAEA] bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-[15px] font-semibold tracking-tight text-[#111]">
              {name}
            </span>
            <span className="hidden sm:block text-xs text-[#787774] tracking-widest uppercase">
              {config.tagline}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden md:block text-sm text-[#787774]">{phone}</span>
            <a
              href="#"
              className="bg-[#111] text-white px-5 py-2 text-[13px] font-medium hover:bg-[#333] transition-colors"
              style={{ borderRadius: "4px" }}
            >
              Inquire
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — asymmetric split */}
      <section className="min-h-[100dvh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full py-24 md:py-0">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20 items-center">
            {/* Text — left aligned */}
            <div>
              <div className="inline-flex items-center gap-2 mb-8">
                <span
                  className="text-[11px] uppercase tracking-[0.08em] font-medium text-[#956400] bg-[#FBF3DB] px-3 py-1"
                  style={{ borderRadius: "9999px" }}
                >
                  {city}{state ? `, ${state}` : ""}
                </span>
              </div>

              <h1
                className="text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem] text-[#111] leading-[1.08] mb-6"
                style={{
                  fontFamily: "'Instrument Serif', 'Playfair Display', 'Newsreader', serif",
                  letterSpacing: "-0.03em",
                  fontWeight: 400,
                }}
              >
                {config.heroHeading(city)}
              </h1>

              <p className="text-[17px] text-[#787774] leading-[1.65] max-w-[50ch] mb-8">
                {config.heroSubheading}
              </p>

              {rating > 0 && (
                <div className="flex items-center gap-3 mb-10 text-sm text-[#787774]">
                  <span className="text-[#111] font-medium">{rating}/5</span>
                  <span className="text-[#EAEAEA]">/</span>
                  <span>{reviewCount}+ client reviews</span>
                </div>
              )}

              <div className="flex gap-3">
                <a
                  href="#"
                  className="bg-[#111] text-white px-7 py-3 text-[14px] font-medium hover:bg-[#333] transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  Book a Consultation
                </a>
                <a
                  href="#"
                  className="border border-[#EAEAEA] text-[#2F3437] px-7 py-3 text-[14px] font-medium hover:border-[#ccc] transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  View Work
                </a>
              </div>
            </div>

            {/* Hero image — right */}
            <div className="relative">
              <div
                className="bg-[#F0EFEB] aspect-[3/4] flex items-center justify-center text-[#C4C2BD] text-sm border border-[#EAEAEA]"
                style={{ borderRadius: "8px" }}
              >
                [{config.name} hero image]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#EAEAEA]" />
      </div>

      {/* Services — asymmetric bento grid */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] uppercase tracking-[0.08em] font-medium text-[#1F6C9F] bg-[#E1F3FE] px-3 py-1 inline-block mb-5"
              style={{ borderRadius: "9999px" }}
            >
              Services
            </span>
            <h2
              className="text-[2.2rem] md:text-[2.8rem] text-[#111] leading-[1.1] max-w-lg"
              style={{
                fontFamily: "'Instrument Serif', 'Playfair Display', 'Newsreader', serif",
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              What we do
            </h2>
          </div>

          {/* 2-column zig-zag, not 3 equal cards */}
          <div className="grid md:grid-cols-2 gap-px bg-[#EAEAEA] border border-[#EAEAEA]" style={{ borderRadius: "12px", overflow: "hidden" }}>
            {config.services.map((service) => (
              <div key={service.title} className="bg-white p-8 md:p-10 group">
                {/* Service image placeholder */}
                <div
                  className="w-full h-48 bg-[#F7F6F3] mb-6 flex items-center justify-center text-[#C4C2BD] text-xs border border-[#EAEAEA]"
                  style={{ borderRadius: "8px" }}
                >
                  [{service.title} image]
                </div>
                <h3 className="text-base font-semibold text-[#111] mb-2 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-[15px] text-[#787774] leading-[1.6]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 px-6 bg-white border-y border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-16 md:gap-24 items-start">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.08em] font-medium text-[#346538] bg-[#EDF3EC] px-3 py-1 inline-block mb-5"
                style={{ borderRadius: "9999px" }}
              >
                Process
              </span>
              <h2
                className="text-[2.2rem] md:text-[2.8rem] text-[#111] leading-[1.1] mb-6"
                style={{
                  fontFamily: "'Instrument Serif', 'Playfair Display', 'Newsreader', serif",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                How we work together
              </h2>
              <p className="text-[#787774] text-[15px] leading-[1.65] max-w-md">
                Every project follows a clear, collaborative process — no surprises, no guesswork.
              </p>
            </div>

            <div>
              {config.processSteps.map((step, i) => (
                <div
                  key={step.title}
                  className={`py-7 ${i < config.processSteps.length - 1 ? "border-b border-[#EAEAEA]" : ""}`}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-[12px] font-medium text-[#787774] bg-[#F7F6F3] border border-[#EAEAEA] mt-0.5"
                      style={{ borderRadius: "4px", fontFamily: "'Geist Mono', monospace" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#111] mb-1">{step.title}</h3>
                      <p className="text-[14px] text-[#787774] leading-[1.6]">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.08em] font-medium text-[#9F2F2D] bg-[#FDEBEC] px-3 py-1 inline-block mb-5"
                style={{ borderRadius: "9999px" }}
              >
                Portfolio
              </span>
              <h2
                className="text-[2.2rem] md:text-[2.8rem] text-[#111] leading-[1.1]"
                style={{
                  fontFamily: "'Instrument Serif', 'Playfair Display', 'Newsreader', serif",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Selected work
              </h2>
            </div>
          </div>

          {/* Asymmetric masonry-ish grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div
              className="col-span-2 row-span-2 bg-[#F0EFEB] aspect-[4/3] flex items-center justify-center text-[#C4C2BD] text-sm border border-[#EAEAEA]"
              style={{ borderRadius: "8px" }}
            >
              [Featured project image]
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#F0EFEB] aspect-square flex items-center justify-center text-[#C4C2BD] text-xs border border-[#EAEAEA]"
                style={{ borderRadius: "8px" }}
              >
                [Project {i + 2}]
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-white border-y border-[#EAEAEA]">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <h2
                className="text-[2rem] md:text-[2.5rem] text-[#111] leading-[1.1] mb-4"
                style={{
                  fontFamily: "'Instrument Serif', 'Playfair Display', 'Newsreader', serif",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                {config.ctaHeading}
              </h2>
              <p className="text-[15px] text-[#787774] leading-[1.65] max-w-md">
                {config.ctaSubheading}
              </p>
            </div>
            <a
              href="#"
              className="bg-[#111] text-white px-8 py-3.5 text-[14px] font-medium hover:bg-[#333] transition-colors whitespace-nowrap"
              style={{ borderRadius: "4px" }}
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div className="md:col-span-2">
              <p className="font-semibold text-[#111] text-base mb-2">{name}</p>
              <p className="text-[#787774] leading-relaxed max-w-sm">
                {config.heroSubheading.slice(0, 100)}...
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#111] mb-3 text-xs uppercase tracking-[0.08em]">
                Contact
              </p>
              <div className="text-[#787774] space-y-1.5 text-[14px]">
                <p>{business.address || `${city}${state ? `, ${state}` : ""}`}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#111] mb-3 text-xs uppercase tracking-[0.08em]">
                Services
              </p>
              <ul className="text-[#787774] space-y-1.5 text-[14px]">
                {config.services.slice(0, 4).map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[#EAEAEA] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[13px] text-[#C4C2BD]">
              Preview website built for {name}
            </span>
            {diagnosis && (
              <span className="text-[13px] text-[#956400]">
                Current site: {business.performance}/100 — This loads in under 1s
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
