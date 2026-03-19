export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A]">
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
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-archivo text-[15px] font-bold text-white tracking-tight">
              Bright Porch
            </span>
          </div>
          <a
            href="mailto:hello@brightporch.dev"
            className="font-space text-[13px] font-medium text-[#0A0A0A] bg-white px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors cursor-pointer"
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
              <div className="h-px w-12 bg-white/30" />
              <span className="font-space text-[13px] font-medium text-white/50 tracking-wide uppercase">
                Software Studio
              </span>
            </div>

            <h1 className="font-archivo text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-900 text-white leading-[0.95] tracking-tight mb-8">
              We build software<br />
              that solves<br />
              <span className="text-[#2563EB]">real problems.</span>
            </h1>

            <p className="font-space text-lg md:text-xl text-white/40 leading-relaxed max-w-lg mb-10">
              Websites, tools, and SaaS products for businesses with specific pain points. We find the problem, build the solution, and ship it fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:hello@brightporch.dev"
                className="font-space text-[14px] font-medium text-[#0A0A0A] bg-white px-8 py-4 rounded-sm hover:bg-white/90 transition-colors cursor-pointer text-center"
              >
                Work With Us
              </a>
              <a
                href="/templates/plumber/1"
                className="font-space text-[14px] font-medium text-white border border-white/15 px-8 py-4 rounded-sm hover:border-white/30 transition-colors cursor-pointer text-center"
              >
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="border-y border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "< 1s", label: "Average Load Time" },
              { value: "90+", label: "Performance Score" },
              { value: "9", label: "Verticals Shipped" },
              { value: "2", label: "Products in Pipeline" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-archivo text-3xl md:text-4xl font-800 text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="font-space text-sm text-white/30 mt-1">
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
                <div className="h-px w-8 bg-white/30" />
                <span className="font-space text-[12px] font-medium text-white/50 tracking-wide uppercase">
                  What We Do
                </span>
              </div>
              <h2 className="font-archivo text-3xl md:text-4xl font-800 text-white tracking-tight leading-tight">
                Software that<br />works as hard<br />as you do.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-white/10">
              {[
                {
                  title: "Websites",
                  desc: "Fast, modern sites for local businesses. Under 1-second load times, mobile-first, built to convert visitors into calls.",
                },
                {
                  title: "SaaS Products",
                  desc: "We identify real pain points in specific industries, validate them, and build focused software tools that solve one problem well.",
                },
                {
                  title: "Automation",
                  desc: "Workflows that replace manual busywork. Outreach, scheduling, reporting — if you're doing it by hand, we can probably automate it.",
                },
                {
                  title: "Research & Validation",
                  desc: "Before we build anything, we find real people with real problems. Data-driven validation so we ship things people actually want.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#0A0A0A] p-8 md:p-10">
                  <h3 className="font-archivo text-lg font-700 text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-space text-[15px] text-white/35 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[#111111] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-white/20" />
              <span className="font-space text-[12px] font-medium text-white/40 tracking-wide uppercase">
                Verticals
              </span>
            </div>
            <h2 className="font-archivo text-3xl md:text-4xl font-800 text-white tracking-tight">
              Industries we build for.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
            {[
              "Plumbers",
              "HVAC",
              "Electricians",
              "Roofers",
              "Interior Designers",
              "Custom Home Builders",
              "Landscape Architects",
              "Pool Builders",
              "Remodelers",
            ].map((industry) => (
              <div
                key={industry}
                className="bg-[#111111] p-6 md:p-8 group"
              >
                <span className="font-archivo text-base md:text-lg font-600 text-white/60 group-hover:text-[#2563EB] transition-colors">
                  {industry}
                </span>
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
              <div className="h-px w-8 bg-white/30" />
              <span className="font-space text-[12px] font-medium text-white/50 tracking-wide uppercase">
                How It Works
              </span>
            </div>
            <h2 className="font-archivo text-3xl md:text-4xl font-800 text-white tracking-tight">
              Three steps. That&apos;s it.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-white/10" style={{ borderRadius: "2px" }}>
            {[
              {
                num: "01",
                title: "We find the problem",
                desc: "We research real pain points — what people are actually struggling with in your industry. Not guesses. Real data from real conversations.",
              },
              {
                num: "02",
                title: "We build the solution",
                desc: "Whether it's a website, a tool, or a full product — we design and ship fast. You see progress in days, not months.",
              },
              {
                num: "03",
                title: "You see the results",
                desc: "More customers, less manual work, problems actually solved. We measure what matters and iterate until it's right.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`p-8 md:p-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/10" : ""}`}
              >
                <span className="font-archivo text-5xl font-900 text-white/10 block mb-4 select-none">
                  {step.num}
                </span>
                <h3 className="font-archivo text-lg font-700 text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-space text-[15px] text-white/35 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-end">
            <div>
              <h2 className="font-archivo text-4xl md:text-5xl lg:text-6xl font-900 text-white tracking-tight leading-[0.95] mb-6">
                Got a problem<br />
                worth<br />
                <span className="text-[#2563EB]">solving?</span>
              </h2>
              <p className="font-space text-lg text-white/35 leading-relaxed max-w-lg">
                Tell us what&apos;s broken. We&apos;ll tell you if we can fix it and what it would take.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@brightporch.dev"
                className="font-space text-[14px] font-medium text-[#0A0A0A] bg-white px-8 py-4 rounded-sm hover:bg-white/90 transition-colors cursor-pointer text-center"
              >
                Let&apos;s Talk
              </a>
              <a
                href="mailto:hello@brightporch.dev"
                className="font-space text-[14px] font-medium text-white/35 text-center py-2 hover:text-white transition-colors cursor-pointer"
              >
                hello@brightporch.dev
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white/10 rounded-sm flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-archivo text-sm font-bold text-white/50">
              Bright Porch
            </span>
          </div>
          <div className="font-space text-sm text-white/20 flex flex-wrap gap-x-6 gap-y-2">
            <span>Software studio</span>
            <span>hello@brightporch.dev</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
