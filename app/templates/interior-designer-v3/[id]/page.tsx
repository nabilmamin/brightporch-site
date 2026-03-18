import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";

interface Diagnosis {
  summary: string;
  problems: { label: string; explanation: string; severity: string }[];
  recommendation: string;
}

export default async function InteriorDesignerV3({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  let diagnosis: Diagnosis | null = null;
  if (business.diagnosis_json) {
    try {
      diagnosis = JSON.parse(business.diagnosis_json);
    } catch {
      /* ignore */
    }
  }

  const name = business.name || "Your Studio";
  const city = business.city || "Your City";
  const state = business.state || "";
  const phone = business.phone || "(555) 000-0000";
  const rating = business.rating ?? 0;
  const reviewCount = business.reviews_count ?? 0;

  return (
    <div className="min-h-[100dvh] bg-[#FAF8F5]">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Josefin+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-josefin { font-family: 'Josefin Sans', sans-serif; }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-cinzel text-[15px] tracking-[0.15em] text-[#3C3328]">
            {name.toUpperCase()}
          </span>
          <div className="flex items-center gap-8">
            <span className="hidden md:block font-josefin text-sm text-[#78716C] tracking-wide">
              {phone}
            </span>
            <a
              href="#"
              className="font-josefin text-sm tracking-[0.08em] uppercase text-[#3C3328] border-b border-[#3C3328] pb-0.5 hover:text-[#D97706] hover:border-[#D97706] transition-colors cursor-pointer"
            >
              Inquire
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — full bleed image with overlaid text */}
      <section className="relative min-h-[100dvh] flex items-end">
        {/* Hero image */}
        <div className="absolute inset-0">
          <img
            src="/images/luxury/hero-interior-designer.png"
            alt="Interior design showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1812]/80 via-[#1C1812]/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
          <div className="max-w-2xl">
            <span className="font-josefin text-[11px] tracking-[0.25em] uppercase text-[#D97706] mb-4 block">
              Interior Design Studio &middot; {city}{state ? `, ${state}` : ""}
            </span>
            <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6 tracking-tight">
              Interiors that<br />tell your story
            </h1>
            <p className="font-josefin text-base md:text-lg text-white/70 leading-relaxed max-w-md mb-8">
              We design spaces that balance beauty and function — rooms that feel like they were always meant to be yours.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="font-josefin text-sm tracking-[0.08em] uppercase bg-[#D97706] text-white px-7 py-3.5 hover:bg-[#B45309] transition-colors cursor-pointer"
                style={{ borderRadius: "2px" }}
              >
                Book a Consultation
              </a>
              {rating > 0 && (
                <span className="font-josefin text-sm text-white/50">
                  {rating}/5 &middot; {reviewCount}+ reviews
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="bg-[#3C3328] py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-josefin text-base md:text-lg text-[#C9C0B4] leading-relaxed max-w-2xl mx-auto">
            Every home has a language. We listen to the architecture, the light, the way you live — and design interiors that speak fluently.
          </p>
        </div>
      </section>

      {/* Portfolio masonry grid */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-josefin text-[11px] tracking-[0.25em] uppercase text-[#D97706] block mb-3">
                Selected Work
              </span>
              <h2 className="font-cinzel text-3xl md:text-4xl text-[#3C3328] tracking-tight">
                Recent Projects
              </h2>
            </div>
          </div>

          {/* Asymmetric masonry */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
            <div className="col-span-2 md:col-span-7 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src="/images/luxury/portfolio-1.png" alt="Featured project" className="w-full h-full object-cover aspect-[4/3]" />
            </div>
            <div className="col-span-1 md:col-span-5 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src="/images/luxury/portfolio-2.png" alt="Project 2" className="w-full h-full object-cover aspect-[4/3]" />
            </div>
            <div className="col-span-1 md:col-span-4 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src="/images/luxury/portfolio-3.png" alt="Project 3" className="w-full h-full object-cover aspect-square" />
            </div>
            <div className="col-span-1 md:col-span-4 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src="/images/luxury/portfolio-4.png" alt="Project 4" className="w-full h-full object-cover aspect-square" />
            </div>
            <div className="col-span-1 md:col-span-4 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src="/images/luxury/portfolio-5.png" alt="Project 5" className="w-full h-full object-cover aspect-square" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <div className="md:sticky md:top-32">
              <span className="font-josefin text-[11px] tracking-[0.25em] uppercase text-[#D97706] block mb-3">
                Services
              </span>
              <h2 className="font-cinzel text-3xl md:text-4xl text-[#3C3328] tracking-tight mb-5">
                How we work
              </h2>
              <p className="font-josefin text-[15px] text-[#78716C] leading-relaxed">
                From the first conversation to the final styled shelf, we manage every detail so you don&apos;t have to.
              </p>
            </div>

            <div className="grid gap-px bg-[#EDECEA]" style={{ borderRadius: "3px", overflow: "hidden" }}>
              {[
                { title: "Full-Home Interiors", desc: "Furniture, finishes, lighting, textiles, and art — coordinated across every room for a cohesive home." },
                { title: "Kitchen & Bath Design", desc: "Custom layouts with materials chosen for both beauty and daily wear. Cabinetry, tile, fixtures, countertops." },
                { title: "Space Planning", desc: "Reimagine your floor plan for better flow, natural light, and rooms that work the way you actually live." },
                { title: "Material Curation", desc: "We source and spec every surface — fabric, stone, wood, metal — so nothing clashes and everything lasts." },
                { title: "Custom Furniture", desc: "Bespoke pieces designed to your dimensions, your material, your taste. For when nothing off-the-shelf will do." },
                { title: "Styling & Staging", desc: "The finishing layer that makes a space feel alive — or helps your home photograph and sell at its best." },
              ].map((service) => (
                <div key={service.title} className="bg-white p-7 md:p-9">
                  <h3 className="font-cinzel text-base text-[#3C3328] mb-2">{service.title}</h3>
                  <p className="font-josefin text-[14px] text-[#78716C] leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-josefin text-[11px] tracking-[0.25em] uppercase text-[#D97706] block mb-3">
              The Process
            </span>
            <h2 className="font-cinzel text-3xl md:text-4xl text-[#3C3328] tracking-tight">
              Four steps to your new space
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="overflow-hidden" style={{ borderRadius: "3px" }}>
              <img
                src="/images/luxury/process.png"
                alt="Design process"
                className="w-full object-cover aspect-[4/3]"
              />
            </div>

            <div className="space-y-0">
              {[
                { title: "Discovery", desc: "A relaxed conversation about your space, your habits, and what you want to change." },
                { title: "Concept & Direction", desc: "Mood boards, floor plans, and 3D renderings so you can feel the design before we move a thing." },
                { title: "Sourcing & Procurement", desc: "We order, track, and inspect every piece. Trade pricing means your budget goes further." },
                { title: "Install & Reveal", desc: "Our team places, hangs, and styles every detail. You walk in and it's done." },
              ].map((step, i) => (
                <div key={step.title} className={`py-6 ${i < 3 ? "border-b border-[#EDECEA]" : ""}`}>
                  <div className="flex items-start gap-5">
                    <span className="font-cinzel text-2xl text-[#D97706]/30 leading-none mt-0.5 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-cinzel text-base text-[#3C3328] mb-1">{step.title}</h3>
                      <p className="font-josefin text-[14px] text-[#78716C] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#3C3328]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="font-josefin text-[11px] tracking-[0.25em] uppercase text-[#D97706] block mb-4">
            Start Here
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl text-white tracking-tight mb-5">
            Ready to reimagine your space?
          </h2>
          <p className="font-josefin text-base text-[#A8A29E] leading-relaxed max-w-lg mx-auto mb-10">
            It starts with a conversation. Tell us about your home, your vision, and how you want to feel in it. No commitment, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="font-josefin text-sm tracking-[0.08em] uppercase bg-[#D97706] text-white px-9 py-4 hover:bg-[#B45309] transition-colors cursor-pointer"
              style={{ borderRadius: "2px" }}
            >
              Book a Consultation
            </a>
            <a
              href="#"
              className="font-josefin text-sm tracking-[0.08em] uppercase border border-white/20 text-white px-9 py-4 hover:bg-white/5 transition-colors cursor-pointer"
              style={{ borderRadius: "2px" }}
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2A2318] py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <span className="font-cinzel text-[13px] tracking-[0.15em] text-white/80 block mb-4">
                {name.toUpperCase()}
              </span>
              <p className="font-josefin text-sm text-white/40 leading-relaxed">
                {business.address || `${city}${state ? `, ${state}` : ""}`}
              </p>
              <p className="font-josefin text-sm text-white/40">{phone}</p>
            </div>
            <div>
              <span className="font-josefin text-[11px] tracking-[0.15em] uppercase text-white/30 block mb-4">
                Services
              </span>
              <ul className="font-josefin text-sm text-white/40 space-y-2">
                <li>Full-Home Interiors</li>
                <li>Kitchen & Bath</li>
                <li>Space Planning</li>
                <li>Custom Furniture</li>
              </ul>
            </div>
            <div>
              <span className="font-josefin text-[11px] tracking-[0.15em] uppercase text-white/30 block mb-4">
                Studio
              </span>
              <p className="font-josefin text-sm text-white/40 leading-relaxed">
                Serving {city}{state ? `, ${state}` : ""} and surrounding areas
              </p>
              {diagnosis && (
                <p className="mt-4 font-josefin text-[#D97706] text-xs">
                  Your current site scores {business.performance}/100 on mobile. This site loads in under 1s.
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-white/5 mt-10 pt-6 text-center">
            <span className="font-josefin text-xs text-white/20">
              Preview website built for {name}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
