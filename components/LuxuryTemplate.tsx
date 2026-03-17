interface Service {
  title: string;
  desc: string;
}

interface VerticalConfig {
  name: string;
  tagline: string;
  heroHeading: (city: string) => string;
  heroSubheading: string;
  accentColor: string;
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

const palettes: Record<
  string,
  {
    primary: string;
    primaryHover: string;
    primaryText: string;
    accent: string;
    accentBg: string;
    warmBg: string;
  }
> = {
  sage: {
    primary: "bg-[#5C6B5A]",
    primaryHover: "hover:bg-[#4A5849]",
    primaryText: "text-[#5C6B5A]",
    accent: "text-[#8B9D83]",
    accentBg: "bg-[#5C6B5A]/5",
    warmBg: "bg-[#F7F5F0]",
  },
  stone: {
    primary: "bg-[#6B6560]",
    primaryHover: "hover:bg-[#5A544F]",
    primaryText: "text-[#6B6560]",
    accent: "text-[#9B918A]",
    accentBg: "bg-[#6B6560]/5",
    warmBg: "bg-[#F8F6F3]",
  },
  navy: {
    primary: "bg-[#2C3E50]",
    primaryHover: "hover:bg-[#1A2A3A]",
    primaryText: "text-[#2C3E50]",
    accent: "text-[#5D7B9D]",
    accentBg: "bg-[#2C3E50]/5",
    warmBg: "bg-[#F5F7FA]",
  },
  charcoal: {
    primary: "bg-[#3C3C3C]",
    primaryHover: "hover:bg-[#2A2A2A]",
    primaryText: "text-[#3C3C3C]",
    accent: "text-[#7A7A7A]",
    accentBg: "bg-[#3C3C3C]/5",
    warmBg: "bg-[#F9F8F6]",
  },
  terracotta: {
    primary: "bg-[#A0705C]",
    primaryHover: "hover:bg-[#8B5E4B]",
    primaryText: "text-[#A0705C]",
    accent: "text-[#C4988A]",
    accentBg: "bg-[#A0705C]/5",
    warmBg: "bg-[#FAF7F4]",
  },
};

export default function LuxuryTemplate({
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
  const p = palettes[config.accentColor] || palettes.sage;

  let diagnosis: { summary?: string } | null = null;
  if (business.diagnosis_json) {
    try {
      diagnosis = JSON.parse(business.diagnosis_json);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={`min-h-screen ${p.warmBg} font-[var(--font-geist-sans)]`}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold tracking-tight text-neutral-900">
              {name}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hidden sm:block text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {phone}
            </a>
            <a
              href="#"
              className={`${p.primary} ${p.primaryHover} text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors`}
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className={`text-sm font-medium ${p.accent} tracking-widest uppercase mb-6`}>
                {config.tagline}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6">
                {config.heroHeading(city)}
              </h1>
              <p className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-lg">
                {config.heroSubheading}
              </p>

              {rating > 0 && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(rating) ? "text-amber-400" : "text-neutral-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-400">
                    {rating}/5 &middot; {reviewCount}+ reviews
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className={`${p.primary} ${p.primaryHover} text-white px-8 py-3.5 rounded-full text-sm font-medium transition-colors text-center`}
                >
                  Book a Free Consultation
                </a>
                <a
                  href="#"
                  className="border border-neutral-200 text-neutral-700 px-8 py-3.5 rounded-full text-sm font-medium hover:border-neutral-300 transition-colors text-center"
                >
                  View Our Work
                </a>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="relative">
              <div className="bg-neutral-200 rounded-2xl aspect-[4/5] flex items-center justify-center text-neutral-400 text-sm">
                [{config.name} hero image]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className={`text-sm font-medium ${p.accent} tracking-widest uppercase mb-4`}>
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
              What We Offer
            </h2>
            <p className="text-neutral-500 leading-relaxed">
              Every project is approached with attention to detail and a commitment to bringing your vision to life.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.services.map((service) => (
              <div
                key={service.title}
                className={`${p.accentBg} rounded-2xl p-7 group hover:bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all`}
              >
                {/* Image placeholder */}
                <div className="w-full h-44 bg-neutral-200/50 rounded-xl mb-5 flex items-center justify-center text-neutral-300 text-xs">
                  [{service.title} image]
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <div className="bg-neutral-200 rounded-2xl aspect-square flex items-center justify-center text-neutral-400 text-sm order-2 md:order-1">
              [{config.name} process/workspace image]
            </div>

            <div className="order-1 md:order-2">
              <p className={`text-sm font-medium ${p.accent} tracking-widest uppercase mb-4`}>
                Our Process
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-10">
                How We Work
              </h2>

              <div className="space-y-8">
                {config.processSteps.map((step, i) => (
                  <div key={step.title} className="flex gap-5">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${p.accentBg} flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${p.primaryText}`}>
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className={`text-sm font-medium ${p.accent} tracking-widest uppercase mb-4`}>
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
              Recent Projects
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-neutral-100 rounded-xl aspect-[4/3] flex items-center justify-center text-neutral-300 text-xs"
              >
                [Project {i + 1} image]
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            {config.ctaHeading}
          </h2>
          <p className="text-lg text-neutral-500 mb-10 leading-relaxed">
            {config.ctaSubheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className={`${p.primary} ${p.primaryHover} text-white px-10 py-3.5 rounded-full text-sm font-medium transition-colors`}
            >
              Schedule a Consultation
            </a>
            <a
              href="#"
              className="border border-neutral-200 text-neutral-700 px-10 py-3.5 rounded-full text-sm font-medium hover:border-neutral-300 transition-colors"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-semibold text-neutral-900 text-base mb-2">{name}</p>
              <p className="text-neutral-400 leading-relaxed">
                {business.address || `${city}${state ? `, ${state}` : ""}`}
              </p>
              <p className="text-neutral-400">{phone}</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-700 mb-3">Services</p>
              <ul className="text-neutral-400 space-y-1.5">
                {config.services.slice(0, 4).map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-neutral-700 mb-3">Service Area</p>
              <p className="text-neutral-400">
                {city}
                {state ? `, ${state}` : ""} &amp; surrounding areas
              </p>
              {diagnosis && (
                <p className="mt-4 text-amber-600 text-xs font-medium">
                  Your current site scores {business.performance}/100 on mobile.
                  This site loads in under 1 second.
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-neutral-100 mt-8 pt-6 text-center text-neutral-300 text-xs">
            Preview website built for {name}
          </div>
        </div>
      </footer>
    </div>
  );
}
