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
  { src: "/images/home-builder/portfolio-4.jpg", title: "Modern Farmhouse" },
  { src: "/images/home-builder/portfolio-1.jpg", title: "Craftsman Build" },
  { src: "/images/home-builder/portfolio-2.jpg", title: "Contemporary Estate" },
  { src: "/images/home-builder/portfolio-3.jpg", title: "Open Concept Ranch" },
  { src: "/images/home-builder/portfolio-5.jpg", title: "Colonial Revival" },
];

const TESTIMONIALS = [
  {
    text: "They built our forever home. Every meeting they showed up prepared, every decision they walked us through. Came in on budget and the quality of the finish work is incredible.",
    name: "The Hendersons",
    title: "Custom Home",
  },
  {
    text: "We bought land and had no idea where to start. They handled everything from the site plan to the final walkthrough. Ten months later we moved in. No drama, no surprises.",
    name: "David & Sarah K.",
    title: "New Construction",
  },
  {
    text: "Third builder we talked to. The other two gave us vague numbers. These guys gave us a detailed scope, a real timeline, and stuck to both. That's rare.",
    name: "Michael T.",
    title: "Custom Build",
  },
];

const CREDENTIALS = [
  "Licensed General Contractor",
  "NAHB Member",
  "Fully Insured",
  "Energy Star Partner",
];

export default function HomeBuilderV2({ business }: { business: BusinessData }) {
  const name = business.name || "Your Home Builder";
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
    <div className="min-h-[100dvh] bg-[#FAF9F6] text-[#2A2A2A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E8E5DF]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-lg tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{name}</span>
            <span className="hidden md:block w-px h-4 bg-[#D4D0C8]" />
            <span className="hidden md:block text-[11px] tracking-[0.15em] uppercase text-[#8C8577]" style={{ fontFamily: "'Inter', sans-serif" }}>Custom Home Builder</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={telHref} className="hidden md:block text-[13px] text-[#8C8577] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>{phone}</a>
            <a href="#contact" className="bg-[#1A1A1A] text-white px-6 py-2.5 text-[12px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Start Your Build</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-end pt-20">
        <div className="absolute inset-0">
          <img src="/images/home-builder/hero.jpg" alt="Custom built home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-white/40" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/70" style={{ fontFamily: "'Inter', sans-serif" }}>{location}</span>
            </div>
            <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] text-white leading-[1.05] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              Built from the <em style={{ fontStyle: "italic" }}>ground up</em>, built to last
            </h1>
            <p className="text-[17px] md:text-[19px] text-white/75 leading-[1.7] max-w-xl mb-10" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
              Custom homes, start to finish. We handle the lot, the plans, the permits,
              the build, and the details — so you get the house you want without the headaches.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="bg-white text-[#1A1A1A] px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:bg-white/90 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Start Your Project</a>
              <a href="#portfolio" className="border border-white/30 text-white px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:border-white/60 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>View Our Work</a>
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
                <span className="text-[13px] text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>{rating} from {reviewCount} reviews</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About / Builder */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden" style={{ borderRadius: "4px" }}>
                <img src="/images/home-builder/builder-portrait.jpg" alt="Lead builder" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white shadow-lg px-6 py-4 border border-[#E8E5DF]" style={{ borderRadius: "4px" }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#6B8F71]" />
                  <span className="text-[11px] tracking-[0.1em] uppercase text-[#8C8577]" style={{ fontFamily: "'Inter', sans-serif" }}>Taking New Projects</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block" style={{ fontFamily: "'Inter', sans-serif" }}>About Us</span>
              <h2 className="text-[2.2rem] md:text-[3rem] text-[#1A1A1A] leading-[1.1] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                We build homes. <span className="text-[#8C8577]">Not excuses.</span>
              </h2>
              <div className="space-y-5 text-[16px] text-[#5A5549] leading-[1.75]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                <p>
                  A custom home is the biggest purchase most people make. We take that seriously.
                  Clear budgets, honest timelines, and a crew that takes pride in the finish work.
                </p>
                <p>
                  Based in {city}, we build a limited number of homes each year so every client
                  gets our full attention. You work with us directly — not a sales rep who
                  disappears after you sign.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {CREDENTIALS.map((cred) => (
                  <span key={cred} className="text-[11px] tracking-[0.06em] uppercase text-[#8C8577] border border-[#D4D0C8] px-4 py-2" style={{ fontFamily: "'Inter', sans-serif", borderRadius: "2px" }}>{cred}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block" style={{ fontFamily: "'Inter', sans-serif" }}>Services</span>
              <h2 className="text-[2.2rem] md:text-[3rem] text-white leading-[1.1] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                From empty lot to <em style={{ fontStyle: "italic" }}>move-in day</em>
              </h2>
              <p className="text-[16px] text-white/50 leading-[1.75] max-w-md" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                Full-service custom home building. We handle the plans, the permits,
                the subs, the inspections, and the punch list.
              </p>
            </div>
            <div className="space-y-0">
              {[
                { title: "Custom Home Builds", desc: "Ground-up construction on your lot or ours. Every home designed and built to your specifications." },
                { title: "Architectural Planning", desc: "We work with architects or bring our own. Floor plans, elevations, and engineering — all coordinated." },
                { title: "Lot Selection & Site Work", desc: "Help finding the right lot, plus grading, utilities, and foundation work." },
                { title: "Major Renovations", desc: "Additions, structural changes, full gut-and-rebuild. When it's bigger than a remodel." },
                { title: "Finish Work & Detailing", desc: "Trim, cabinetry, tile, fixtures. The details that make a house feel like your house." },
                { title: "Warranty & Support", desc: "We stand behind our work. Structural warranty included, and we pick up the phone after you move in." },
              ].map((service, i) => (
                <div key={service.title} className={`py-6 flex items-start gap-6 ${i > 0 ? "border-t border-white/10" : ""}`}>
                  <span className="text-[13px] text-white/25 mt-1 flex-shrink-0 w-6" style={{ fontFamily: "'Inter', sans-serif" }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[15px] text-white mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{service.title}</h3>
                    <p className="text-[14px] text-white/40 leading-[1.65]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block" style={{ fontFamily: "'Inter', sans-serif" }}>Portfolio</span>
            <h2 className="text-[2.2rem] md:text-[3rem] text-[#1A1A1A] leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>Homes we&apos;ve built</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 row-span-2 group relative overflow-hidden" style={{ borderRadius: "4px" }}>
              <img src={PORTFOLIO_PROJECTS[0].src} alt={PORTFOLIO_PROJECTS[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white text-[15px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{PORTFOLIO_PROJECTS[0].title}</p>
              </div>
            </div>
            {PORTFOLIO_PROJECTS.slice(1).map((project) => (
              <div key={project.title} className="group relative aspect-square overflow-hidden" style={{ borderRadius: "4px" }}>
                <img src={project.src} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-[14px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{project.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C8577] mb-6 block" style={{ fontFamily: "'Inter', sans-serif" }}>Client Stories</span>
            <h2 className="text-[2.2rem] md:text-[3rem] text-[#1A1A1A] leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white p-8 md:p-10" style={{ borderRadius: "4px" }}>
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#D4A853]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[15px] text-[#3A3A3A] leading-[1.75] mb-8" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-[14px] text-[#1A1A1A]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{t.name}</p>
                  <p className="text-[12px] text-[#8C8577] tracking-[0.05em]" style={{ fontFamily: "'Inter', sans-serif" }}>{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.1] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
            Ready to build <em style={{ fontStyle: "italic" }}>your home?</em>
          </h2>
          <p className="text-[17px] text-white/50 leading-[1.7] max-w-lg mx-auto mb-10" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
            Tell us about your project — the lot, the timeline, the budget.
            We&apos;ll give you a straight answer on what&apos;s possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={telHref} className="bg-white text-[#1A1A1A] px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:bg-white/90 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Schedule a Call</a>
            <a href={telHref} className="border border-white/20 text-white px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase hover:border-white/40 transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{phone}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[#141414] text-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <p className="text-white text-lg mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{name}</p>
              <p className="text-[14px] leading-[1.7] max-w-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                Custom home builder serving {city} and surrounding areas.
                Ground-up construction, major renovations, and finish work.
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-white/25 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Contact</p>
              <div className="space-y-2 text-[14px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                <p>{business.address || location}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-white/25 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Services</p>
              <ul className="space-y-2 text-[14px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                <li>Custom Homes</li>
                <li>Renovations</li>
                <li>Architectural Planning</li>
                <li>Finish Work</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[12px] text-white/20" style={{ fontFamily: "'Inter', sans-serif" }}>Preview website built for {name}</span>
            {diagnosis && <span className="text-[12px] text-[#D4A853]" style={{ fontFamily: "'Inter', sans-serif" }}>Current site: {business.performance}/100 — This loads in under 1s</span>}
          </div>
        </div>
      </footer>
    </div>
  );
}
