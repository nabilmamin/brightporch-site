export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-white">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .font-archivo { font-family: 'Archivo', sans-serif; }
        .font-space { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0F0F0F] rounded-sm flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-archivo text-[15px] font-bold text-[#0F0F0F] tracking-tight">
              Bright Porch
            </span>
          </div>
          <a
            href="mailto:hello@brightporch.dev"
            className="font-space text-[13px] font-medium text-white bg-[#0F0F0F] px-5 py-2.5 rounded-sm hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#0F0F0F]" />
              <span className="font-space text-[13px] font-medium text-[#0F0F0F] tracking-wide uppercase">
                Web Design Studio
              </span>
            </div>

            <h1 className="font-archivo text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-900 text-[#0F0F0F] leading-[0.95] tracking-tight mb-8">
              We build websites<br />
              that bring in<br />
              <span className="text-[#2563EB]">customers.</span>
            </h1>

            <p className="font-space text-lg md:text-xl text-[#666] leading-relaxed max-w-lg mb-10">
              Fast, modern websites for local businesses. Designed to rank on Google, load instantly, and turn visitors into phone calls.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:hello@brightporch.dev"
                className="font-space text-[14px] font-medium text-white bg-[#0F0F0F] px-8 py-4 rounded-sm hover:bg-[#2A2A2A] transition-colors cursor-pointer text-center"
              >
                Start a Project
              </a>
              <a
                href="mailto:hello@brightporch.dev"
                className="font-space text-[14px] font-medium text-[#0F0F0F] border border-[#E0E0E0] px-8 py-4 rounded-sm hover:border-[#999] transition-colors cursor-pointer text-center"
              >
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="border-y border-[#F0F0F0] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "< 1s", label: "Average Load Time" },
              { value: "90+", label: "Performance Score" },
              { value: "9", label: "Industries Served" },
              { value: "24hr", label: "Turnaround on Quotes" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-archivo text-3xl md:text-4xl font-800 text-[#0F0F0F] tracking-tight">
                  {stat.value}
                </div>
                <div className="font-space text-sm text-[#999] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#0F0F0F]" />
                <span className="font-space text-[12px] font-medium text-[#0F0F0F] tracking-wide uppercase">
                  What We Do
                </span>
              </div>
              <h2 className="font-archivo text-3xl md:text-4xl font-800 text-[#0F0F0F] tracking-tight leading-tight">
                Websites that<br />work as hard<br />as you do.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-[#F0F0F0]">
              {[
                {
                  title: "Speed",
                  desc: "Your site loads in under a second. 53% of visitors leave if a page takes longer than 3 seconds. We don't let that happen.",
                },
                {
                  title: "Search Visibility",
                  desc: "Proper SEO structure, meta tags, and content hierarchy so Google actually knows you exist and ranks you above competitors.",
                },
                {
                  title: "Mobile First",
                  desc: "Over 60% of your customers search on their phone. Every site we build looks and works perfectly on every screen size.",
                },
                {
                  title: "Conversion Focused",
                  desc: "Click-to-call buttons, clear service pages, and contact forms placed where people actually use them. Built to generate leads.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white p-8 md:p-10">
                  <h3 className="font-archivo text-lg font-700 text-[#0F0F0F] mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-space text-[15px] text-[#666] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[#0F0F0F] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-white/30" />
              <span className="font-space text-[12px] font-medium text-white/50 tracking-wide uppercase">
                Industries
              </span>
            </div>
            <h2 className="font-archivo text-3xl md:text-4xl font-800 text-white tracking-tight">
              Built for businesses that<br />do real work.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10">
            {[
              "Plumbers",
              "HVAC",
              "Electricians",
              "Roofers",
              "Interior Designers",
              "Custom Home Builders",
              "Landscape Architects",
              "Pool Builders",
              "Kitchen & Bath Remodelers",
            ].map((industry) => (
              <div
                key={industry}
                className="bg-[#0F0F0F] p-6 md:p-8 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-archivo text-base md:text-lg font-600 text-white/80 group-hover:text-[#2563EB] transition-colors">
                    {industry}
                  </span>
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-[#2563EB] transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#0F0F0F]" />
              <span className="font-space text-[12px] font-medium text-[#0F0F0F] tracking-wide uppercase">
                How It Works
              </span>
            </div>
            <h2 className="font-archivo text-3xl md:text-4xl font-800 text-[#0F0F0F] tracking-tight">
              Three steps. That&apos;s it.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-[#F0F0F0]" style={{ borderRadius: "2px" }}>
            {[
              {
                num: "01",
                title: "We audit your site",
                desc: "We run your website through performance and SEO analysis. You get a clear picture of what's working and what's costing you customers.",
              },
              {
                num: "02",
                title: "We build your new site",
                desc: "Custom design tailored to your business and industry. Fast-loading, mobile-optimized, and built to convert visitors into calls.",
              },
              {
                num: "03",
                title: "You get more customers",
                desc: "Your site goes live, ranks higher on Google, loads instantly, and starts generating leads from day one.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`p-8 md:p-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-[#F0F0F0]" : ""}`}
              >
                <span className="font-archivo text-5xl font-900 text-[#F0F0F0] block mb-4 select-none">
                  {step.num}
                </span>
                <h3 className="font-archivo text-lg font-700 text-[#0F0F0F] mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-space text-[15px] text-[#666] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#F0F0F0] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-end">
            <div>
              <h2 className="font-archivo text-4xl md:text-5xl lg:text-6xl font-900 text-[#0F0F0F] tracking-tight leading-[0.95] mb-6">
                Your website should<br />
                be your best<br />
                <span className="text-[#2563EB]">salesperson.</span>
              </h2>
              <p className="font-space text-lg text-[#666] leading-relaxed max-w-lg">
                If it&apos;s not bringing in customers, let&apos;s fix that. Free audit, honest assessment, no pressure.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@brightporch.dev"
                className="font-space text-[14px] font-medium text-white bg-[#0F0F0F] px-8 py-4 rounded-sm hover:bg-[#2A2A2A] transition-colors cursor-pointer text-center"
              >
                Get a Free Audit
              </a>
              <a
                href="mailto:hello@brightporch.dev"
                className="font-space text-[14px] font-medium text-[#666] text-center py-2 hover:text-[#0F0F0F] transition-colors cursor-pointer"
              >
                hello@brightporch.dev
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white/10 rounded-sm flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-archivo text-sm font-bold text-white/60">
              Bright Porch
            </span>
          </div>
          <div className="font-space text-sm text-white/30 flex flex-wrap gap-x-6 gap-y-2">
            <span>Fast websites for local businesses</span>
            <span>hello@brightporch.dev</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
