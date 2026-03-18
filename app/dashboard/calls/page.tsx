import {
  getDiagnosedBusinesses,
  getCategories,
  getCities,
  ensureCallLogsTable,
} from "@/lib/db";
import CallSheet from "@/components/CallSheet";

const DASHBOARD_SECRET = process.env.DASHBOARD_SECRET || "";

export default async function CallsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; category?: string; city?: string }>;
}) {
  const params = await searchParams;

  if (!DASHBOARD_SECRET || params.token !== DASHBOARD_SECRET) {
    return (
      <div className="flex items-center justify-center min-h-screen dash-sans">
        <div className="text-center">
          <div className="text-6xl font-light mb-4" style={{ color: "var(--text-muted)" }}>401</div>
          <p className="text-sm tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Unauthorized</p>
        </div>
      </div>
    );
  }

  await ensureCallLogsTable();

  const [businesses, categories, cities] = await Promise.all([
    getDiagnosedBusinesses(params.category, params.city),
    getCategories(),
    getCities(),
  ]);

  const contacted = businesses.filter((b) => b.last_call_outcome).length;
  const interested = businesses.filter((b) => b.last_call_outcome === "interested").length;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 dash-sans">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--orange-warm)" }} />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--text-muted)" }}>Bright Porch</span>
          </div>
          <h1 className="text-[28px] font-semibold tracking-tight" style={{ color: "var(--cream)" }}>
            Call Sheet
          </h1>
        </div>
        <div className="flex gap-6">
          <div className="text-right">
            <div className="dash-mono text-2xl font-semibold" style={{ color: "var(--cream)" }}>{businesses.length}</div>
            <div className="text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--text-muted)" }}>Leads</div>
          </div>
          <div className="text-right">
            <div className="dash-mono text-2xl font-semibold" style={{ color: "var(--orange-warm)" }}>{contacted}</div>
            <div className="text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--text-muted)" }}>Contacted</div>
          </div>
          <div className="text-right">
            <div className="dash-mono text-2xl font-semibold" style={{ color: "var(--olive-soft)" }}>{interested}</div>
            <div className="text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--text-muted)" }}>Interested</div>
          </div>
        </div>
      </div>

      <CallSheet
        businesses={JSON.parse(JSON.stringify(businesses))}
        categories={categories}
        cities={cities}
        token={params.token!}
        currentCategory={params.category || ""}
        currentCity={params.city || ""}
      />
    </div>
  );
}
