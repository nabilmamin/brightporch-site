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

const PORTFOLIO_PROJECTS = [
  { src: "/images/interior-designer/portfolio-hero.jpg", title: "Modern Living Room", location: "Buckhead" },
  { src: "/images/interior-designer/portfolio-1.jpg", title: "Kitchen Renovation", location: "Midtown" },
  { src: "/images/interior-designer/portfolio-2.jpg", title: "Primary Suite", location: "Brookhaven" },
  { src: "/images/interior-designer/portfolio-3.jpg", title: "Open Floor Plan", location: "Ansley Park" },
  { src: "/images/interior-designer/portfolio-4.jpg", title: "Cozy Reading Nook", location: "Virginia Highland" },
  { src: "/images/interior-designer/portfolio-5.jpg", title: "Dining Room", location: "Druid Hills" },
];

const TESTIMONIALS = [
  {
    text: "She transformed our dated living room into something we never want to leave. Every detail was considered — the textures, the light, how the room flows when we entertain.",
    name: "Sarah M.",
    neighborhood: "Buckhead",
    title: "Homeowner",
  },
  {
    text: "We gave her a blank slate and a tight timeline. She delivered a home that feels like us — warm, collected, not a showroom. Our friends can't believe it's the same house.",
    name: "David & Rachel K.",
    neighborhood: "Midtown",
    title: "New Construction",
  },
  {
    text: "Working with her was like having a creative partner who also happens to be incredibly organized. On budget, on time, and the result exceeded every expectation.",
    name: "James L.",
    neighborhood: "Ansley Park",
    title: "Full-Home Renovation",
  },
];

const CREDENTIALS = [
  "ASID Professional Member",
  "Best of Houzz Design",
  "AD PRO Directory",
  "NKBA Certified",
];

export default function InteriorDesignerV3({ business }: { business: BusinessData }) {
  const name = business.name || "Your Design Studio";
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
    <div className="min-h-[100dvh] bg-[#FAF9F6] text-[#2A2A2A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      {/* Nav — minimal, editorial */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E8E5DF]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span
              className="text-lg tracking-tight text-[#1A1A1A]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
            >
              {name}
            </span>
            <span className="hidden md:block w-px h-4 bg-[#D4D0C8]" />
            <span
              className="hidden md:block text-[11px] tracking-[0.15em] uppercase text-[#8C8577]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Interior Design
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${phone}`} className="hidden md:block text-[13px] text-[#8C8577] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              {phone}
            </a>
            <a
              href="#contact"
              className="bg-[#1A1A1A] text-white px-6 py-2.5 text-[12px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Book Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — full-width image with overlaid text */}
      <section className="relative min-h-[100dvh] flex items-end pt-20">
        <div className="absolute inset-0">
          <img
            src="/images/interior-designer/hero.jpg"
            alt="Luxury interior design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-white/40" />
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-white/70"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {location}
              </span>
            </div>
            <h1
              className="text-[3rem] md:text-[4rem] lg:text-[5rem] text-white leading-[1.05] mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Interiors that{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>feel</em> like home
            </h1>
            <p
              className="text-[17px] md:text-[19px] text-white/75 leading-[1.7] max-w-xl mb-10"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              We design spaces that balance beauty with how you actually live —
              considered, personal, and built to last.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="bg-white text-[#1A1A1A] px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:bg-white/90 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Start Your Project
              </a>
              <a
                href="#portfolio"
                className="border border-white/30 text-white px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:border-white/60 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                View Portfolio
              </a>
            </div>
            {rating > 0 && (
              <div className="mt-8 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-[#D4A853]" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {rating} from {reviewCount} reviews
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meet the Designer */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden" style={{ borderRadius: "4px" }}>
                <img
                  src="/images/interior-designer/designer-portrait.jpg"
                  alt="Lead designer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating credentials */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white shadow-lg px-6 py-4 border border-[#E8E5DF]" style={{ borderRadius: "4px" }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#6B8F71]" />
                  <span className="text-[11px] tracking-[0.1em] uppercase text-[#8C8577]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Accepting New Clients
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                About the Studio
              </span>
              <h2
                className="text-[2.2rem] md:text-[3rem] text-[#1A1A1A] leading-[1.1] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
              >
                Design is personal.{" "}
                <span className="text-[#8C8577]">So is how we work.</span>
              </h2>
              <div className="space-y-5 text-[16px] text-[#5A5549] leading-[1.75]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                <p>
                  Every home tells a story. Our job is to make sure yours reads exactly how you want it to —
                  warm and collected, or bold and minimal, or somewhere only you can define.
                </p>
                <p>
                  Based in {city}, we take on a limited number of projects each year so every client
                  gets our full attention. From the first conversation to the final reveal,
                  you work directly with us — not a junior associate.
                </p>
              </div>
              {/* Credential badges */}
              <div className="mt-10 flex flex-wrap gap-3">
                {CREDENTIALS.map((cred) => (
                  <span
                    key={cred}
                    className="text-[11px] tracking-[0.06em] uppercase text-[#8C8577] border border-[#D4D0C8] px-4 py-2"
                    style={{ fontFamily: "'Inter', sans-serif", borderRadius: "2px" }}
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — visual, not grid */}
      <section className="py-24 md:py-32 px-6 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Services
              </span>
              <h2
                className="text-[2.2rem] md:text-[3rem] text-white leading-[1.1] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
              >
                From blank rooms to{" "}
                <em style={{ fontStyle: "italic" }}>finished homes</em>
              </h2>
              <p
                className="text-[16px] text-white/50 leading-[1.75] max-w-md"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                Full-service interior design for discerning homeowners who want a space
                that works as well as it looks.
              </p>
            </div>
            <div className="space-y-0">
              {[
                { title: "Full-Home Interiors", desc: "End-to-end design for every room — furniture, finishes, lighting, textiles, and art." },
                { title: "Kitchen & Bath", desc: "Custom layouts with hand-selected materials, cabinetry, and fixtures built for daily life." },
                { title: "Space Planning", desc: "Rethink your floor plan for better flow, natural light, and rooms that actually work." },
                { title: "Material Curation", desc: "We source and specify every surface — fabric, stone, wood, metal — so nothing clashes." },
                { title: "Custom Furniture", desc: "Bespoke pieces designed for your dimensions, your taste, and no one else's." },
                { title: "Styling & Install", desc: "Final-layer styling on reveal day — every object placed, every cushion fluffed." },
              ].map((service, i) => (
                <div
                  key={service.title}
                  className={`py-6 flex items-start gap-6 ${i > 0 ? "border-t border-white/10" : ""}`}
                >
                  <span
                    className="text-[13px] text-white/25 mt-1 flex-shrink-0 w-6"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="text-[15px] text-white mb-1"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-[14px] text-white/40 leading-[1.65]"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                    >
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio — large images with location labels */}
      <section id="portfolio" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span
              className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Portfolio
            </span>
            <h2
              className="text-[2.2rem] md:text-[3rem] text-[#1A1A1A] leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
            >
              Selected work
            </h2>
          </div>

          {/* Masonry grid with labels */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Feature project — large */}
            <div className="col-span-2 row-span-2 group relative overflow-hidden" style={{ borderRadius: "4px" }}>
              <img
                src={PORTFOLIO_PROJECTS[0].src}
                alt={PORTFOLIO_PROJECTS[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white text-[15px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  {PORTFOLIO_PROJECTS[0].title}
                </p>
                <p className="text-white/60 text-[12px] tracking-[0.1em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {PORTFOLIO_PROJECTS[0].location}, {city}
                </p>
              </div>
            </div>

            {/* Smaller project cards */}
            {PORTFOLIO_PROJECTS.slice(1).map((project) => (
              <div key={project.title} className="group relative aspect-square overflow-hidden" style={{ borderRadius: "4px" }}>
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-[14px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    {project.title}
                  </p>
                  <p className="text-white/60 text-[11px] tracking-[0.1em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — editorial layout */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                How We Work
              </span>
              <h2
                className="text-[2.2rem] md:text-[3rem] text-[#1A1A1A] leading-[1.1] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
              >
                A clear path from{" "}
                <em style={{ fontStyle: "italic" }}>vision</em> to reveal
              </h2>
              <div className="aspect-[4/3] overflow-hidden" style={{ borderRadius: "4px" }}>
                <img
                  src="/images/interior-designer/process.jpg"
                  alt="Design consultation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {[
                {
                  title: "Discovery",
                  desc: "A relaxed conversation about your space, your habits, and what you want to change. We visit your home, take measurements, and listen.",
                },
                {
                  title: "Concept & Direction",
                  desc: "Mood boards, material palettes, and 3D renderings so you can feel the design before anything moves. No surprises.",
                },
                {
                  title: "Sourcing & Procurement",
                  desc: "We order, track, and inspect every piece. Trade-only pricing means your budget goes further than retail ever could.",
                },
                {
                  title: "Install & Reveal",
                  desc: "Our team places, hangs, and styles every detail. You walk in and it's done — down to the last candle.",
                },
              ].map((step, i) => (
                <div key={step.title} className={`py-8 ${i > 0 ? "border-t border-[#E8E5DF]" : ""}`}>
                  <div className="flex items-start gap-6">
                    <span
                      className="text-[2rem] text-[#D4D0C8] leading-none mt-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="text-[15px] text-[#1A1A1A] mb-2"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-[14px] text-[#8C8577] leading-[1.7]"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — editorial cards with neighborhoods */}
      <section className="py-24 md:py-32 px-6 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span
              className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Client Stories
            </span>
            <h2
              className="text-[2.2rem] md:text-[3rem] text-[#1A1A1A] leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
            >
              In their own words
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white p-8 md:p-10" style={{ borderRadius: "4px" }}>
                {/* Stars */}
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#D4A853]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-[15px] text-[#3A3A3A] leading-[1.75] mb-8"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p
                    className="text-[14px] text-[#1A1A1A]"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[12px] text-[#8C8577] tracking-[0.05em]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {t.title} — {t.neighborhood}, {city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full-width warm tone */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.1] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Ready to love your home?
          </h2>
          <p
            className="text-[17px] text-white/50 leading-[1.7] max-w-lg mx-auto mb-10"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            Tell us about your space, your timeline, and your vision.
            We&apos;ll take it from there.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone}`}
              className="bg-white text-[#1A1A1A] px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:bg-white/90 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Schedule a Call
            </a>
            <a
              href={`tel:${phone}`}
              className="border border-white/20 text-white px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:border-white/40 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[#141414] text-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <p
                className="text-white text-lg mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                {name}
              </p>
              <p className="text-[14px] leading-[1.7] max-w-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                We design spaces that balance beauty with how you actually live.
                Based in {city}, serving clients who value intention over trends.
              </p>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.15em] uppercase text-white/25 mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
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
                className="text-[11px] tracking-[0.15em] uppercase text-white/25 mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Services
              </p>
              <ul className="space-y-2 text-[14px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                <li>Full-Home Interiors</li>
                <li>Kitchen & Bath Design</li>
                <li>Space Planning</li>
                <li>Custom Furniture</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[12px] text-white/20" style={{ fontFamily: "'Inter', sans-serif" }}>
              Preview website built for {name}
            </span>
            {diagnosis && (
              <span className="text-[12px] text-[#D4A853]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Current site: {business.performance}/100 — This loads in under 1s
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
