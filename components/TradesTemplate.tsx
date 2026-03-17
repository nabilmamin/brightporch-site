interface Service {
  title: string;
  desc: string;
}

interface VerticalConfig {
  name: string;
  tagline: string;
  heroHeading: (city: string) => string;
  heroSubheading: string;
  accentColor: string; // tailwind color name (e.g. "blue", "orange")
  services: Service[];
  whyUs: { title: string; desc: string }[];
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

// Color maps for each accent
const colors: Record<
  string,
  {
    bg: string;
    bgDark: string;
    text: string;
    badge: string;
    button: string;
    buttonHover: string;
    accent: string;
    light: string;
  }
> = {
  blue: {
    bg: "bg-blue-600",
    bgDark: "bg-blue-800",
    text: "text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    button: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
    accent: "border-blue-600",
    light: "bg-blue-50",
  },
  orange: {
    bg: "bg-orange-600",
    bgDark: "bg-orange-800",
    text: "text-orange-600",
    badge: "bg-orange-50 text-orange-700",
    button: "bg-orange-600",
    buttonHover: "hover:bg-orange-700",
    accent: "border-orange-600",
    light: "bg-orange-50",
  },
  red: {
    bg: "bg-red-600",
    bgDark: "bg-red-800",
    text: "text-red-600",
    badge: "bg-red-50 text-red-700",
    button: "bg-red-600",
    buttonHover: "hover:bg-red-700",
    accent: "border-red-600",
    light: "bg-red-50",
  },
  amber: {
    bg: "bg-amber-600",
    bgDark: "bg-amber-800",
    text: "text-amber-600",
    badge: "bg-amber-50 text-amber-700",
    button: "bg-amber-600",
    buttonHover: "hover:bg-amber-700",
    accent: "border-amber-600",
    light: "bg-amber-50",
  },
};

export default function TradesTemplate({
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
  const c = colors[config.accentColor] || colors.blue;

  let diagnosis: { summary?: string } | null = null;
  if (business.diagnosis_json) {
    try {
      diagnosis = JSON.parse(business.diagnosis_json);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-screen bg-white font-[var(--font-geist-sans)]">
      {/* Top Bar */}
      <div className={`${c.bg} text-white text-sm py-2 px-4 text-center`}>
        <span className="font-medium">
          Serving {city}
          {state ? `, ${state}` : ""} &amp; Surrounding Areas
        </span>
        <span className="mx-3 opacity-50">|</span>
        <span>Licensed &amp; Insured</span>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">{name}</span>
            <span className={`block text-xs ${c.text} font-medium tracking-wide uppercase`}>
              {config.tagline}
            </span>
          </div>
          <a
            href={`tel:${phone}`}
            className={`${c.button} ${c.buttonHover} text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors`}
          >
            Call {phone}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/60 z-10" />
        <div className="absolute inset-0 bg-gray-800 z-0">
          {/* TODO: AI-generated hero image for {config.name} */}
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            [{config.name} hero image]
          </div>
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            {rating > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-600"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-300">
                  {rating}/5 from {reviewCount}+ reviews
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {config.heroHeading(city)}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {config.heroSubheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${phone}`}
                className={`${c.button} ${c.buttonHover} text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-colors`}
              >
                Get a Free Quote
              </a>
              <a
                href={`tel:${phone}`}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg text-center hover:bg-white/10 transition-colors"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className={`${c.light} py-6 border-b border-gray-100`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Licensed & Insured", icon: "✓" },
              { label: "Free Estimates", icon: "$0" },
              { label: "Same-Day Service", icon: "⚡" },
              {
                label:
                  rating > 0
                    ? `${rating}★ Rating`
                    : "Top Rated",
                icon: "★",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2">
                <span className={`${c.text} font-bold text-lg`}>{item.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${c.badge} mb-4`}>
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What We Do
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.services.map((service) => (
              <div
                key={service.title}
                className={`bg-white border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-md transition-all group`}
              >
                {/* Image placeholder */}
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-xs">
                  [{service.title} image]
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="bg-gray-200 rounded-2xl h-80 md:h-96 flex items-center justify-center text-gray-400">
              [{config.name} team/work image]
            </div>

            <div>
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${c.badge} mb-4`}>
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Why {city} Trusts {name}
              </h2>

              <div className="space-y-6">
                {config.whyUs.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 ${c.light} rounded-lg flex items-center justify-center`}>
                      <span className={`${c.text} font-bold`}>✓</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`bg-gray-900 py-16 md:py-24 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {config.ctaHeading}
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            {config.ctaSubheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phone}`}
              className={`${c.button} ${c.buttonHover} text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors`}
            >
              Call {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-bold text-white text-lg mb-2">{name}</p>
              <p className="text-gray-400">{business.address || `${city}${state ? `, ${state}` : ""}`}</p>
              <p className="text-gray-400">{phone}</p>
            </div>
            <div>
              <p className="font-bold text-gray-300 mb-2">Services</p>
              <ul className="text-gray-500 space-y-1">
                {config.services.slice(0, 4).map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-300 mb-2">Service Area</p>
              <p className="text-gray-500">
                {city}
                {state ? `, ${state}` : ""} &amp; surrounding areas
              </p>
              {diagnosis && (
                <p className="mt-4 text-amber-500 text-xs font-medium">
                  Your current site scores {business.performance}/100 on mobile.
                  This site loads in under 1 second.
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-600 text-xs">
            This is a preview website built for {name}.
          </div>
        </div>
      </footer>
    </div>
  );
}
