import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return {};
  return {
    title: `${business.name} — Licensed Plumber in ${business.city}, ${business.state}`,
    description: `${business.name} provides professional plumbing services in ${business.city}, ${business.state}. 24/7 emergency service, upfront pricing, licensed & insured.`,
  };
}

export default async function PlumberTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(parseInt(id, 10));
  if (!business) return notFound();

  const name = business.name || "Your Business";
  const city = business.city || "Your City";
  const state = business.state || "";
  const phone = business.phone || "(555) 000-0000";
  const rating = business.rating ?? 0;
  const reviewCount = business.reviews_count ?? 0;
  const address = business.address || `${city}${state ? `, ${state}` : ""}`;
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .font-lexend { font-family: 'Lexend', sans-serif; }
        .font-source { font-family: 'Source Sans 3', sans-serif; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-section {
          animation: fade-in-up 0.6s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-section { animation: none; }
        }
      `}</style>

      {/* ─── 1. Top Bar ─── */}
      <div className="bg-[#1a2744] text-white text-sm py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5 font-source">
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {city}{state ? `, ${state}` : ""}
            </span>
            <span className="hidden sm:flex items-center gap-2 text-[#d4930d]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Licensed &amp; Insured
            </span>
          </div>
          <a
            href={telHref}
            className="flex items-center gap-2 text-[#d4930d] font-semibold font-lexend hover:text-amber-300 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {phone}
          </a>
        </div>
      </div>

      {/* ─── 2. Sticky Nav ─── */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <span className="font-lexend text-xl font-bold text-[#1a2744]">{name}</span>
          <div className="flex items-center gap-4">
            {/* Rating in nav — desktop only */}
            <div className="hidden md:flex items-center gap-1 text-sm font-source text-slate-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < fullStars ? "text-[#d4930d]" : i === fullStars && hasHalf ? "text-[#d4930d]/50" : "text-slate-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {rating > 0 && (
                <>
                  <span className="ml-1.5 text-[#1a2744] font-medium">{rating}</span>
                  <span className="text-slate-300 mx-1">·</span>
                  <span>{reviewCount} reviews</span>
                </>
              )}
            </div>
            <a
              href={telHref}
              className="bg-[#d4930d] hover:bg-[#b87d0b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold font-lexend transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </nav>

      {/* ─── 3. Hero ─── */}
      <section className="relative bg-[#1a2744] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1661342460125-3459f38b2003?w=1600&q=80&fm=jpg"
            alt="Professional plumber at work"
            className="w-full h-full object-cover object-[center_15%] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2744] via-[#1a2744]/90 to-[#1a2744]/70" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl animate-section">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-[#d4930d]/15 text-[#d4930d] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded font-lexend border border-[#d4930d]/20">
                Licensed &amp; Insured
              </span>
              <span className="bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded font-lexend border border-white/10">
                24/7 Emergency
              </span>
            </div>

            <h1 className="font-lexend text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.08] mb-5 tracking-tight">
              {city}&rsquo;s Trusted<br />
              <span className="text-[#d4930d]">Plumbing Experts</span>
            </h1>

            <p className="font-source text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-lg">
              From burst pipes at 2&nbsp;AM to full remodels — honest pricing, fast
              response, and work guaranteed to last.
            </p>

            {/* Google rating inline */}
            {rating > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < fullStars ? "text-[#d4930d]" : "text-white/20"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-lexend text-white font-semibold">{rating}</span>
                <span className="text-slate-400 font-source">from {reviewCount} Google reviews</span>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={telHref}
                className="bg-[#d4930d] hover:bg-[#b87d0b] text-white px-8 py-4 rounded-lg text-base font-bold font-lexend transition-colors text-center shadow-lg shadow-[#d4930d]/20"
              >
                Get Your Free Estimate
              </a>
              <a
                href={telHref}
                className="border border-white/30 text-white px-8 py-4 rounded-lg text-base font-semibold font-lexend hover:bg-white/5 transition-colors text-center"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Trust Bar ─── */}
      <section className="bg-[#f8f9fb] border-b border-slate-100 py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7 text-[#d4930d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "24/7 Available",
                desc: "Emergency calls answered day & night",
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-[#d4930d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: "Licensed & Insured",
                desc: "Fully licensed, bonded, and insured",
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-[#d4930d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
                title: rating > 0 ? `${rating}★ Rated` : "Top Rated",
                desc: reviewCount > 0 ? `${reviewCount} reviews on Google` : "Trusted by homeowners",
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-[#d4930d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 1.545 2.065 2.783 3.565 3.565l1.186-.592a1.635 1.635 0 011.71.163l2.1 1.575a1.636 1.636 0 01.163 2.472l-.834.834a3.272 3.272 0 01-3.91.573 18.508 18.508 0 01-7.378-7.378 3.272 3.272 0 01.573-3.91l.834-.834a1.636 1.636 0 012.472.163l1.575 2.1a1.636 1.636 0 01.163 1.71l-.592 1.186z" />
                  </svg>
                ),
                title: "100% Satisfaction",
                desc: "We guarantee every job we do",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1a2744]/5 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="font-lexend text-sm font-semibold text-[#1a2744]">{item.title}</p>
                  <p className="font-source text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Services ─── */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto animate-section">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#d4930d]/10 text-[#d4930d] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full font-lexend mb-4">
              Our Services
            </span>
            <h2 className="font-lexend text-3xl md:text-4xl font-bold text-[#1a2744] tracking-tight">
              What we fix, install &amp; maintain
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Emergency Repairs",
                desc: "Burst pipes, gas leaks, and overflows — we arrive fast with a fully stocked truck. 24/7 with no after-hours fees.",
                icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z",
                image: "https://plus.unsplash.com/premium_photo-1723874634715-246be2bb20ff?w=600&q=80&fm=jpg",
              },
              {
                title: "Water Heaters",
                desc: "Tank and tankless installation, repair, and replacement. We size it right so you never run out of hot water.",
                icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z",
                image: "https://plus.unsplash.com/premium_photo-1682125979416-7633eff814c9?w=600&q=80&fm=jpg",
              },
              {
                title: "Drain Cleaning",
                desc: "Camera inspection, hydro-jetting, and rooter service for stubborn clogs, slow drains, and sewer line backups.",
                icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636",
                image: "https://plus.unsplash.com/premium_photo-1734029815125-58149f75742e?w=600&q=80&fm=jpg",
              },
              {
                title: "Leak Detection",
                desc: "Thermal imaging and acoustic detection to find hidden leaks in walls, slabs, and underground — no demolition needed.",
                icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
                image: "https://images.unsplash.com/photo-1650246363606-a2402ec42b08?w=600&q=80&fm=jpg",
              },
              {
                title: "Pipe Repair & Repiping",
                desc: "Fix corroded, cracked, or burst pipes. Full-home repiping for older homes with outdated galvanized or polybutylene.",
                icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085",
                image: "https://images.unsplash.com/photo-1560883123-04646fef95df?w=600&q=80&fm=jpg",
              },
              {
                title: "Bathroom & Kitchen",
                desc: "Faucets, toilets, garbage disposals, and complete plumbing for kitchen and bathroom renovations.",
                icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819",
                image: "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?w=600&q=80&fm=jpg",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#1a2744]/5 transition-all duration-300"
              >
                <div className="h-44 overflow-hidden bg-slate-50">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-lexend text-base font-semibold text-[#1a2744] mb-2">
                    {service.title}
                  </h3>
                  <p className="font-source text-sm text-slate-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Why Choose Us ─── */}
      <section className="bg-[#f8f9fb] py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto animate-section">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-[#1a2744]/10">
              <img
                src="https://images.unsplash.com/photo-1659353589251-8da8f0a93599?w=800&q=80&fm=jpg"
                alt={`${name} team`}
                className="w-full h-auto"
              />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block bg-[#d4930d]/10 text-[#d4930d] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full font-lexend mb-4">
                Why Choose Us
              </span>
              <h2 className="font-lexend text-3xl md:text-4xl font-bold text-[#1a2744] tracking-tight mb-8">
                Why {city} trusts {name}
              </h2>

              <div className="space-y-5">
                {[
                  {
                    title: "Upfront, Honest Pricing",
                    desc: "We quote before we start. The price we give is the price you pay — no hidden fees, ever.",
                  },
                  {
                    title: "Same-Day Service",
                    desc: "Most calls answered within 30 minutes. Emergency service available 24/7, 365 days a year.",
                  },
                  {
                    title: "Background-Checked Plumbers",
                    desc: "Every technician is licensed, insured, background-checked, and drug-tested for your peace of mind.",
                  },
                  {
                    title: "Work Guaranteed",
                    desc: "Every job backed by our satisfaction guarantee. Not right? We come back and fix it — free.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-6 h-6 rounded-full bg-[#d4930d]/15 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-[#d4930d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-lexend text-base font-semibold text-[#1a2744] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-source text-sm text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Reviews / Social Proof ─── */}
      {rating > 0 && (
        <section className="py-20 md:py-28 px-4 bg-white">
          <div className="max-w-4xl mx-auto animate-section">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#d4930d]/10 text-[#d4930d] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full font-lexend mb-4">
                Customer Reviews
              </span>
              <h2 className="font-lexend text-3xl md:text-4xl font-bold text-[#1a2744] tracking-tight">
                What our customers say
              </h2>
            </div>

            {/* Big rating card */}
            <div className="bg-[#1a2744] rounded-2xl p-8 md:p-12 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-8 h-8 ${i < fullStars ? "text-[#d4930d]" : "text-white/15"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-lexend text-5xl md:text-6xl font-extrabold text-white mb-2">
                {rating}
              </p>
              <p className="font-source text-lg text-slate-300 mb-6">
                out of 5 · based on {reviewCount} Google reviews
              </p>

              {/* Google attribution */}
              <div className="flex items-center justify-center gap-2 text-slate-400 font-source text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Verified Google Reviews
              </div>
            </div>

            {/* Sample review quotes */}
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              {[
                {
                  text: "Showed up same day and fixed our leak fast. Honest pricing, no surprises. Will call again.",
                  author: "Homeowner",
                },
                {
                  text: "Professional, on time, and cleaned up after themselves. Best plumber we've used in years.",
                  author: "Homeowner",
                },
                {
                  text: "Emergency call at midnight — they answered and were here within the hour. Lifesavers.",
                  author: "Homeowner",
                },
              ].map((review, i) => (
                <div key={i} className="bg-[#f8f9fb] rounded-xl p-6 border border-slate-100">
                  <div className="flex items-center gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-[#d4930d]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-source text-sm text-slate-600 leading-relaxed italic mb-3">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="font-lexend text-xs font-medium text-slate-400">
                    — {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 8. CTA ─── */}
      <section className="bg-[#1a2744] py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center animate-section">
          <h2 className="font-lexend text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to fix your plumbing?
          </h2>
          <p className="font-source text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            Free estimates. Upfront pricing. Same-day service when you need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={telHref}
              className="bg-[#d4930d] hover:bg-[#b87d0b] text-white px-10 py-4 rounded-lg text-base font-bold font-lexend transition-colors shadow-lg shadow-[#d4930d]/20"
            >
              Get a Free Estimate
            </a>
            <a
              href={telHref}
              className="border-2 border-white/20 text-white px-10 py-4 rounded-lg text-base font-bold font-lexend hover:bg-white/5 transition-colors"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─── 9. Footer ─── */}
      <footer className="bg-[#111c30] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm font-source">
            {/* Business info */}
            <div>
              <p className="font-lexend font-bold text-white text-lg mb-3">{name}</p>
              <p className="text-slate-400 leading-relaxed">{address}</p>
              <a href={telHref} className="text-[#d4930d] hover:text-amber-300 transition-colors block mt-2 font-medium">
                {phone}
              </a>
            </div>

            {/* Services */}
            <div>
              <p className="font-lexend font-semibold text-slate-200 mb-3 text-sm">Services</p>
              <ul className="text-slate-400 space-y-1.5">
                <li>Emergency Repairs</li>
                <li>Water Heaters</li>
                <li>Drain Cleaning</li>
                <li>Leak Detection</li>
                <li>Pipe Repair</li>
                <li>Bathroom &amp; Kitchen</li>
              </ul>
            </div>

            {/* Service area */}
            <div>
              <p className="font-lexend font-semibold text-slate-200 mb-3 text-sm">Service Area</p>
              <p className="text-slate-400 leading-relaxed">
                {city}{state ? `, ${state}` : ""} and surrounding communities
              </p>
            </div>

            {/* Hours */}
            <div>
              <p className="font-lexend font-semibold text-slate-200 mb-3 text-sm">Hours</p>
              <ul className="text-slate-400 space-y-1.5">
                <li>Mon–Fri: 7AM–6PM</li>
                <li>Sat: 8AM–4PM</li>
                <li className="text-[#d4930d] font-medium">24/7 Emergency Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs font-source gap-2">
            <span>&copy; {new Date().getFullYear()} {name}. All rights reserved.</span>
            {business.performance !== null && business.performance < 70 && (
              <span className="text-[#d4930d]">
                Your current site scores {business.performance}/100 on mobile speed. This one loads instantly.
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
