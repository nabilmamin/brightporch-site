export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-[var(--font-geist-sans)]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4">
        <div className="w-full max-w-4xl">
          <div className="rounded-full bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] px-6 py-3 flex items-center justify-between">
            <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
              Bright Porch
            </span>
            <a
              href="mailto:hello@brightporch.dev"
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-neutral-900 text-white pl-5 pr-1.5 py-1.5 text-[13px] font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-neutral-800 active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-50/60 to-orange-50/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-sky-50/40 to-blue-50/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 text-center py-32">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900/[0.04] px-4 py-1.5 mb-8">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500">
              Web Design for Local Businesses
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] mb-6">
            Your business deserves
            <br />
            <span className="text-neutral-400">a better front door.</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
            We build fast, modern websites for local businesses. Designed to
            turn visitors into customers.
          </p>

          <a
            href="mailto:hello@brightporch.dev"
            className="group relative inline-flex items-center gap-3 rounded-full bg-neutral-900 text-white pl-7 pr-2 py-2 text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-neutral-800 active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
          >
            <span>Start a Project</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-neutral-900/[0.04] px-4 py-1.5 mb-5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500">
                What We Do
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
              Websites that work
              <br />
              <span className="text-neutral-400">as hard as you do.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Lightning Fast",
                desc: "Your site loads in under a second. No more losing customers to slow pages.",
              },
              {
                title: "Mobile First",
                desc: "Over 60% of your customers search on their phone. Your site will look perfect on every device.",
              },
              {
                title: "Built to Convert",
                desc: "Clear calls to action, easy contact forms, and click-to-call — designed to get you more jobs.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-[1.5rem] bg-white ring-1 ring-black/[0.04] shadow-[0_1px_10px_rgba(0,0,0,0.03)] p-1.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <div className="rounded-[calc(1.5rem-0.375rem)] bg-gradient-to-b from-neutral-50/80 to-white p-7">
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-neutral-900 p-2">
            <div className="rounded-[calc(2rem-0.5rem)] bg-gradient-to-b from-neutral-800 to-neutral-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] p-10 sm:p-16 text-center">
              <div className="inline-flex items-center rounded-full bg-white/[0.06] px-4 py-1.5 mb-5 ring-1 ring-white/[0.08]">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-400">
                  Who We Help
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Local businesses
                <br />
                that deserve better.
              </h2>
              <p className="text-lg text-neutral-400 max-w-lg mx-auto leading-relaxed mb-10">
                Plumbers, electricians, roofers, contractors, landscapers,
                designers — if your website isn&apos;t working for you, we&apos;ll build
                one that does.
              </p>
              <a
                href="mailto:hello@brightporch.dev"
                className="group relative inline-flex items-center gap-3 rounded-full bg-white text-neutral-900 pl-7 pr-2 py-2 text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-neutral-100 active:scale-[0.98]"
              >
                <span>Let&apos;s Talk</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <span className="font-semibold text-neutral-900">Bright Porch</span>
          <span>Fast, modern websites for local businesses.</span>
          <a
            href="mailto:hello@brightporch.dev"
            className="hover:text-neutral-900 transition-colors duration-500"
          >
            hello@brightporch.dev
          </a>
        </div>
      </footer>
    </div>
  );
}
