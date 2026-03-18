import { getBusiness } from "@/lib/db";
import { notFound } from "next/navigation";

interface Diagnosis {
  summary: string;
  problems: { label: string; explanation: string; severity: string }[];
  recommendation: string;
}

export default async function PlumberV2Template({
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

  const name = business.name || "Your Business";
  const city = business.city || "Your City";
  const state = business.state || "";
  const phone = business.phone || "(555) 000-0000";
  const rating = business.rating ?? 0;
  const reviewCount = business.reviews_count ?? 0;

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC]">
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .font-lexend { font-family: 'Lexend', sans-serif; }
        .font-source { font-family: 'Source Sans 3', sans-serif; }
      `}</style>

      {/* Top Strip */}
      <div className="bg-[#1E293B] text-white text-sm py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 font-source">
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Serving {city}{state ? `, ${state}` : ""} &amp; nearby
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              24/7 Emergency Service
            </span>
          </div>
          <a href="#" className="flex items-center gap-2 text-[#F97316] font-semibold font-lexend hover:text-orange-300 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            {phone}
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-lexend">
            <span className="text-xl font-bold text-[#1E293B]">{name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-sm font-source text-slate-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-[#F97316]" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
              <span className="ml-1.5 text-[#1E293B] font-medium">{rating}/5</span>
              <span className="text-slate-300 mx-1">|</span>
              <span>{reviewCount}+ reviews</span>
            </div>
            <a href="#" className="bg-[#F97316] hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold font-lexend transition-colors cursor-pointer">
              Free Estimate
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — asymmetric split */}
      <section className="bg-[#1E293B] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-8 items-center">
            {/* Text */}
            <div className="py-16 md:py-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded font-lexend">
                  Licensed &amp; Insured
                </span>
                <span className="bg-[#2563EB]/10 text-[#3B82F6] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded font-lexend">
                  24/7 Available
                </span>
              </div>

              <h1 className="font-lexend text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.08] mb-5 tracking-tight">
                {city} plumbing<br />
                <span className="text-[#F97316]">you can count on.</span>
              </h1>

              <p className="font-source text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                From burst pipes at 2am to full remodels — honest pricing, fast response, and work that lasts. No surprises on your bill.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#" className="bg-[#F97316] hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-base font-bold font-lexend transition-colors text-center cursor-pointer">
                  Get a Free Quote
                </a>
                <a href="#" className="border border-slate-500 text-white px-8 py-4 rounded-lg text-base font-semibold font-lexend hover:bg-white/5 transition-colors text-center cursor-pointer">
                  {phone}
                </a>
              </div>

              {/* Trust metrics */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-600/40">
                {[
                  { value: rating > 0 ? `${rating}★` : "5.0★", label: "Google Rating" },
                  { value: reviewCount > 0 ? `${reviewCount}+` : "100+", label: "Reviews" },
                  { value: "Same Day", label: "Service" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white font-lexend">{stat.value}</div>
                    <div className="text-sm text-slate-400 font-source mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden md:block relative h-full min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B] via-transparent to-transparent z-10" />
              <img
                src="/images/trades/hero.png"
                alt={`${name} professional plumber`}
                className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-slate-100 py-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-source text-slate-500">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Licensed & Insured" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "On-Time Guarantee" },
              { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "Upfront Pricing" },
              { icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5", label: "Satisfaction Guaranteed" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="font-medium text-[#1E293B]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#2563EB]/5 text-[#2563EB] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded font-lexend mb-4">
              Our Services
            </span>
            <h2 className="font-lexend text-3xl md:text-4xl font-bold text-[#1E293B] tracking-tight">
              What we fix, install &amp; maintain
            </h2>
          </div>

          {/* 2-column zig-zag layout */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Emergency Repairs", desc: "Burst pipes, gas leaks, overflows — we're there fast with a fully stocked truck. 24/7, no extra charge for nights or weekends." },
              { title: "Drain Cleaning", desc: "Camera inspection, hydro-jetting, and rooter service for stubborn clogs, slow drains, and sewer line backups." },
              { title: "Water Heaters", desc: "Tank and tankless installation, repair, and replacement. We size it right so you never run out of hot water." },
              { title: "Leak Detection", desc: "Thermal imaging and acoustic detection to find hidden leaks in walls, slabs, and underground without tearing up your home." },
              { title: "Pipe Repair & Repiping", desc: "Fix corroded, cracked, or burst pipes. Full-home repiping for older homes with outdated galvanized or polybutylene." },
              { title: "Fixtures & Remodels", desc: "Faucets, toilets, garbage disposals, and plumbing for kitchen and bathroom renovations." },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white border border-slate-100 rounded-xl p-7 hover:border-[#2563EB]/20 hover:shadow-[0_4px_16px_rgba(37,99,235,0.06)] transition-all cursor-default group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#2563EB]/5 rounded-lg flex items-center justify-center group-hover:bg-[#2563EB]/10 transition-colors">
                    <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-lexend text-base font-semibold text-[#1E293B] mb-1.5">{service.title}</h3>
                    <p className="font-source text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us — with team image */}
      <section className="bg-white py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/trades/team.png"
                alt={`${name} team`}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="inline-block bg-[#F97316]/5 text-[#F97316] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded font-lexend mb-4">
                Why Choose Us
              </span>
              <h2 className="font-lexend text-3xl md:text-4xl font-bold text-[#1E293B] tracking-tight mb-8">
                Why {city} calls {name}
              </h2>

              <div className="space-y-5">
                {[
                  { title: "Upfront, Honest Pricing", desc: "We quote before we start. The price we give is the price you pay — no surprises, no hidden fees." },
                  { title: "Fast Response, Same-Day Service", desc: "Most calls answered within 30 minutes. Emergency service available 24/7, 365 days a year." },
                  { title: "Licensed Master Plumbers", desc: "Every technician is licensed, insured, background-checked, and drug-tested for your peace of mind." },
                  { title: "We Stand Behind Our Work", desc: "Every job comes with a satisfaction guarantee. If something's not right, we come back and fix it — free." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-lexend text-base font-semibold text-[#1E293B] mb-1">{item.title}</h3>
                      <p className="font-source text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2563EB] py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-lexend text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Plumbing problem? We&apos;re on it.
          </h2>
          <p className="font-source text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Free estimates. Upfront pricing. Fast, same-day service when you need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#" className="bg-[#F97316] hover:bg-orange-600 text-white px-10 py-4 rounded-lg text-base font-bold font-lexend transition-colors cursor-pointer">
              Get a Free Estimate
            </a>
            <a href="#" className="border-2 border-white/30 text-white px-10 py-4 rounded-lg text-base font-bold font-lexend hover:bg-white/10 transition-colors cursor-pointer">
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E293B] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-sm font-source">
            <div>
              <p className="font-lexend font-bold text-white text-lg mb-3">{name}</p>
              <p className="text-slate-400 leading-relaxed">
                {business.address || `${city}${state ? `, ${state}` : ""}`}
              </p>
              <p className="text-slate-400">{phone}</p>
            </div>
            <div>
              <p className="font-lexend font-semibold text-slate-200 mb-3 text-sm">Services</p>
              <ul className="text-slate-400 space-y-1.5">
                <li>Emergency Repairs</li>
                <li>Drain Cleaning</li>
                <li>Water Heaters</li>
                <li>Leak Detection</li>
              </ul>
            </div>
            <div>
              <p className="font-lexend font-semibold text-slate-200 mb-3 text-sm">Service Area</p>
              <p className="text-slate-400 leading-relaxed">
                {city}{state ? `, ${state}` : ""} and surrounding communities
              </p>
              {diagnosis && (
                <p className="mt-4 text-[#F97316] text-xs font-medium">
                  Your current site scores {business.performance}/100 on mobile. This site loads in under 1 second.
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-500 text-xs font-source">
            Preview website built for {name}
          </div>
        </div>
      </footer>
    </div>
  );
}
