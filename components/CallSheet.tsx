"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

function cleanUrl(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return `${u.origin}${u.pathname}`;
  } catch {
    return url.split("?")[0];
  }
}

const CATEGORY_TO_TEMPLATE: Record<string, string> = {
  "plumber": "plumber",
  "roofing contractor": "roofer",
  "swimming pool contractor": "pool-builder",
  "interior designer": "interior-designer",
  "interior decorator": "interior-designer",
  "custom home builder": "home-builder",
  "home builder": "home-builder",
  "electrician": "electrician",
  "hvac contractor": "hvac",
  "landscape architect": "landscape-architect",
  "remodeler": "remodeler",
  "kitchen remodeler": "remodeler",
  "bathroom remodeler": "remodeler",
};

function getTemplateUrl(category: string, id: number): string | null {
  const slug = CATEGORY_TO_TEMPLATE[category.toLowerCase()];
  return slug ? `/templates/${slug}/${id}` : null;
}

interface Diagnosis {
  summary: string;
  problems: {
    label: string;
    explanation: string;
    impact: string;
    severity: "high" | "medium" | "low";
  }[];
  recommendation: string;
}

interface Business {
  id: number;
  name: string;
  category: string;
  city: string;
  state: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  performance: number | null;
  seo: number | null;
  is_mobile_friendly: number | null;
  diagnosis_json: string | null;
  last_call_outcome: string | null;
  last_call_at: string | null;
}

const OUTCOMES = [
  { value: "called", label: "Called" },
  { value: "interested", label: "Interested" },
  { value: "not_interested", label: "Not Interested" },
  { value: "no_answer", label: "No Answer" },
  { value: "callback", label: "Callback" },
  { value: "voicemail", label: "Voicemail" },
];

function ScoreBar({ score }: { score: number | null }) {
  if (score === null) return <span style={{ color: "var(--text-muted)" }} className="text-xs">—</span>;
  const pct = Math.min(score, 100);
  const color =
    score >= 90 ? "var(--olive-soft)"
    : score >= 50 ? "var(--orange-warm)"
    : "var(--burgundy-soft)";
  const textColor =
    score >= 90 ? "var(--olive-soft)"
    : score >= 50 ? "var(--orange-warm)"
    : "var(--burgundy-soft)";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="dash-mono text-xs font-medium w-7 text-right" style={{ color: textColor }}>{score}</span>
    </div>
  );
}

function OutcomePill({ outcome }: { outcome: string }) {
  const styles: Record<string, { bg: string; text: string; ring: string }> = {
    interested: { bg: "rgba(92,107,58,0.12)", text: "var(--olive-soft)", ring: "rgba(92,107,58,0.25)" },
    callback: { bg: "rgba(196,99,42,0.1)", text: "var(--orange-warm)", ring: "rgba(196,99,42,0.2)" },
    called: { bg: "rgba(139,115,85,0.08)", text: "var(--text-secondary)", ring: "var(--border)" },
    no_answer: { bg: "rgba(139,115,85,0.05)", text: "var(--text-muted)", ring: "var(--border)" },
    voicemail: { bg: "rgba(139,115,85,0.05)", text: "var(--text-muted)", ring: "var(--border)" },
    not_interested: { bg: "rgba(139,41,66,0.1)", text: "var(--burgundy-soft)", ring: "rgba(139,41,66,0.2)" },
  };
  const s = styles[outcome] || styles.called;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase"
      style={{ background: s.bg, color: s.text, boxShadow: `inset 0 0 0 1px ${s.ring}` }}
    >
      {outcome.replace(/_/g, " ")}
    </span>
  );
}

function SeverityBar({ severity }: { severity: string }) {
  const config: Record<string, { color: string; width: string; label: string }> = {
    high: { color: "var(--burgundy-soft)", width: "100%", label: "HIGH" },
    medium: { color: "var(--orange-warm)", width: "66%", label: "MED" },
    low: { color: "var(--olive-soft)", width: "33%", label: "LOW" },
  };
  const c = config[severity] || config.low;
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] font-semibold tracking-widest" style={{ color: c.color }}>{c.label}</span>
      <div className="w-10 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div className="h-full rounded-full" style={{ width: c.width, background: c.color }} />
      </div>
    </div>
  );
}

export default function CallSheet({
  businesses,
  categories,
  cities,
  token,
  currentCategory,
  currentCity,
}: {
  businesses: Business[];
  categories: string[];
  cities: string[];
  token: string;
  currentCategory: string;
  currentCity: string;
}) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [outcome, setOutcome] = useState("called");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"combined" | "perf" | "seo">("combined");
  const [sortAsc, setSortAsc] = useState(true);

  function handleSort(col: "perf" | "seo") {
    if (sortBy === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(col);
      setSortAsc(true);
    }
  }

  const sortedBusinesses = [...businesses].sort((a, b) => {
    let aVal: number, bVal: number;
    if (sortBy === "perf") {
      aVal = a.performance ?? 100;
      bVal = b.performance ?? 100;
    } else if (sortBy === "seo") {
      aVal = a.seo ?? 100;
      bVal = b.seo ?? 100;
    } else {
      aVal = (a.performance ?? 100) + (a.seo ?? 100);
      bVal = (b.performance ?? 100) + (b.seo ?? 100);
    }
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  function navigate(category: string, city: string) {
    const params = new URLSearchParams();
    params.set("token", token);
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    router.push(`/dashboard/calls?${params.toString()}`);
  }

  async function logCall(businessId: number) {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/dashboard/calls?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId, outcome, notes }),
      });
      if (res.ok) {
        setFlash(`Logged: ${outcome.replace(/_/g, " ")}`);
        setNotes("");
        setOutcome("called");
        setTimeout(() => setFlash(null), 2500);
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  function parseDiagnosis(json: string | null): Diagnosis | null {
    if (!json) return null;
    try { return JSON.parse(json); } catch { return null; }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md" style={{ background: "var(--bg-surface)", boxShadow: "inset 0 0 0 1px var(--border)" }}>
          <svg className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <select
            value={currentCategory}
            onChange={(e) => navigate(e.target.value, currentCity)}
            className="bg-transparent text-sm focus:outline-none cursor-pointer appearance-none pr-4"
            style={{ color: "var(--text-secondary)" }}
          >
            <option value="" style={{ background: "var(--bg-surface)" }}>All categories</option>
            {categories.map((c) => (
              <option key={c} value={c} style={{ background: "var(--bg-surface)" }}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md" style={{ background: "var(--bg-surface)", boxShadow: "inset 0 0 0 1px var(--border)" }}>
          <svg className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <select
            value={currentCity}
            onChange={(e) => navigate(currentCategory, e.target.value)}
            className="bg-transparent text-sm focus:outline-none cursor-pointer appearance-none pr-4"
            style={{ color: "var(--text-secondary)" }}
          >
            <option value="" style={{ background: "var(--bg-surface)" }}>All cities</option>
            {cities.map((c) => (
              <option key={c} value={c} style={{ background: "var(--bg-surface)" }}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => { setSortBy("combined"); setSortAsc(true); }}
          className="ml-auto flex items-center gap-1.5 text-[11px] tracking-wide transition-colors"
          style={{ color: sortBy === "combined" ? "var(--orange-warm)" : "var(--text-muted)" }}
        >
          <svg className={`w-3 h-3 transition-transform ${sortAsc ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {sortBy === "combined" ? "Worst combined" : sortBy === "perf" ? "By performance" : "By SEO"} — {sortAsc ? "worst first" : "best first"}
        </button>
      </div>

      {/* Flash */}
      {flash && (
        <div className="mb-4 px-4 py-2.5 rounded-lg text-sm dash-mono flex items-center gap-2"
          style={{ background: "rgba(92,107,58,0.08)", border: "1px solid rgba(92,107,58,0.15)", color: "var(--olive-soft)" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--olive-soft)" }} />
          {flash}
        </div>
      )}

      {/* Table header */}
      <div className="grid grid-cols-[1fr_120px_120px_160px_100px_40px] gap-3 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <span style={{ color: "var(--text-muted)" }}>Business</span>
        <button
          onClick={() => handleSort("perf")}
          className="text-left flex items-center gap-1 transition-colors"
          style={{ color: sortBy === "perf" ? "var(--orange-warm)" : "var(--text-muted)" }}
        >
          Perf
          {sortBy === "perf" && (
            <svg className={`w-3 h-3 transition-transform ${sortAsc ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </button>
        <button
          onClick={() => handleSort("seo")}
          className="text-left flex items-center gap-1 transition-colors"
          style={{ color: sortBy === "seo" ? "var(--orange-warm)" : "var(--text-muted)" }}
        >
          SEO
          {sortBy === "seo" && (
            <svg className={`w-3 h-3 transition-transform ${sortAsc ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </button>
        <span style={{ color: "var(--text-muted)" }}>Phone</span>
        <span style={{ color: "var(--text-muted)" }}>Status</span>
        <span></span>
      </div>

      {/* Rows */}
      <div>
        {sortedBusinesses.map((biz, index) => {
          const expanded = expandedId === biz.id;
          const diagnosis = parseDiagnosis(biz.diagnosis_json);

          return (
            <div
              key={biz.id}
              className="transition-colors duration-150"
              style={{
                borderBottom: "1px solid var(--border)",
                background: expanded ? "var(--bg-surface)" : "transparent",
              }}
              onMouseEnter={(e) => { if (!expanded) e.currentTarget.style.background = "rgba(60,50,40,0.04)"; }}
              onMouseLeave={(e) => { if (!expanded) e.currentTarget.style.background = "transparent"; }}
            >
              <button
                onClick={() => setExpandedId(expanded ? null : biz.id)}
                className="w-full grid grid-cols-[1fr_120px_120px_160px_100px_40px] gap-3 items-center px-4 py-3 text-left group"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate text-[15px]" style={{ color: "var(--cream)" }}>
                      {biz.name}
                    </span>
                    {biz.is_mobile_friendly === 0 && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase"
                        style={{ background: "rgba(196,99,42,0.1)", color: "var(--orange-warm)", boxShadow: "inset 0 0 0 1px rgba(196,99,42,0.2)" }}>
                        No mobile
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{biz.category}</span>
                    <span style={{ color: "var(--border-strong)" }}>·</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{biz.city}, {biz.state}</span>
                  </div>
                </div>

                <div className="min-w-[100px]"><ScoreBar score={biz.performance} /></div>
                <div className="min-w-[100px]"><ScoreBar score={biz.seo} /></div>

                <div>
                  {biz.phone ? (
                    <a
                      href={`tel:${biz.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="dash-mono text-[13px] transition-colors"
                      style={{ color: "var(--orange-warm)" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--cream)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--orange-warm)"}
                    >
                      {biz.phone}
                    </a>
                  ) : (
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>—</span>
                  )}
                </div>

                <div>
                  {biz.last_call_outcome ? (
                    <OutcomePill outcome={biz.last_call_outcome} />
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase"
                      style={{ color: "var(--text-muted)", boxShadow: "inset 0 0 0 1px var(--border)" }}>
                      New
                    </span>
                  )}
                </div>

                <div className="flex justify-end">
                  <svg
                    className={`w-4 h-4 transition-all duration-200 ${expanded ? "rotate-180" : ""}`}
                    style={{ color: "var(--text-muted)" }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded */}
              {expanded && (
                <div className="px-4 pb-5">
                  <div className="grid grid-cols-[1fr_340px] gap-8">
                    {/* Diagnosis */}
                    <div className="space-y-5">
                      {diagnosis ? (
                        <>
                          <p className="text-[14px] leading-relaxed pl-4" style={{
                            color: "var(--text-secondary)",
                            borderLeft: "2px solid var(--orange-muted)",
                          }}>
                            {diagnosis.summary}
                          </p>

                          <div>
                            <div className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
                              Issues Found
                            </div>
                            <div className="space-y-3">
                              {diagnosis.problems.map((p, i) => (
                                <div key={i} className="rounded-lg px-4 py-3" style={{
                                  background: "var(--bg-raised)",
                                  boxShadow: "inset 0 0 0 1px var(--border)",
                                }}>
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-medium" style={{ color: "var(--cream)" }}>{p.label}</span>
                                    <SeverityBar severity={p.severity} />
                                  </div>
                                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.explanation}</p>
                                  <p className="text-xs mt-1.5 flex items-start gap-1.5" style={{ color: "var(--text-muted)" }}>
                                    <svg className="w-3 h-3 mt-0.5 shrink-0" style={{ color: "var(--orange-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                    {p.impact}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-lg px-4 py-3" style={{
                            background: "rgba(92,107,58,0.06)",
                            boxShadow: "inset 0 0 0 1px rgba(92,107,58,0.12)",
                          }}>
                            <div className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-1.5" style={{ color: "rgba(122,140,80,0.6)" }}>
                              Recommendation
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--olive-soft)" }}>{diagnosis.recommendation}</p>
                          </div>
                        </>
                      ) : (
                        <div className="py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                          No diagnosis data available
                        </div>
                      )}
                    </div>

                    {/* Call panel */}
                    <div>
                      <div className="rounded-xl p-5 sticky top-6" style={{
                        background: "var(--bg-raised)",
                        boxShadow: "inset 0 0 0 1px var(--border)",
                      }}>
                        <div className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
                          Log Call
                        </div>

                        {/* Contact buttons */}
                        <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
                          {biz.phone && (
                            <a
                              href={`tel:${biz.phone}`}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm dash-mono font-medium transition-colors"
                              style={{
                                background: "rgba(196,99,42,0.1)",
                                color: "var(--orange-warm)",
                                boxShadow: "inset 0 0 0 1px rgba(196,99,42,0.2)",
                              }}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {biz.phone}
                            </a>
                          )}
                          {biz.website && (
                            <a
                              href={cleanUrl(biz.website)}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors"
                              style={{
                                background: "var(--bg-surface)",
                                color: "var(--text-muted)",
                                boxShadow: "inset 0 0 0 1px var(--border)",
                              }}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Their Site
                            </a>
                          )}
                          {getTemplateUrl(biz.category, biz.id) && (
                            <a
                              href={getTemplateUrl(biz.category, biz.id)!}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                              style={{
                                background: "rgba(92,107,58,0.1)",
                                color: "var(--olive-soft)",
                                boxShadow: "inset 0 0 0 1px rgba(92,107,58,0.2)",
                              }}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Our Template
                            </a>
                          )}
                        </div>

                        {/* Outcome grid */}
                        <div className="grid grid-cols-3 gap-1.5 mb-4">
                          {OUTCOMES.map((o) => (
                            <button
                              key={o.value}
                              onClick={() => setOutcome(o.value)}
                              className="px-2 py-2 rounded-md text-[11px] font-medium tracking-wide transition-all duration-150"
                              style={outcome === o.value ? {
                                background: "rgba(196,99,42,0.12)",
                                color: "var(--orange-warm)",
                                boxShadow: "inset 0 0 0 1px rgba(196,99,42,0.25)",
                              } : {
                                background: "rgba(139,115,85,0.05)",
                                color: "var(--text-muted)",
                              }}
                            >
                              {o.label}
                            </button>
                          ))}
                        </div>

                        {/* Notes */}
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Notes..."
                          rows={2}
                          className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none resize-none mb-3"
                          style={{
                            background: "rgba(139,115,85,0.05)",
                            boxShadow: "inset 0 0 0 1px var(--border)",
                            color: "var(--cream)",
                          }}
                        />

                        {/* Submit */}
                        <button
                          onClick={() => logCall(biz.id)}
                          disabled={submitting}
                          className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
                          style={{
                            background: submitting ? "var(--bg-surface)" : "var(--orange-warm)",
                            color: submitting ? "var(--text-muted)" : "#12100e",
                          }}
                        >
                          {submitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Logging...
                            </span>
                          ) : "Log Call"}
                        </button>

                        {/* Meta */}
                        <div className="mt-4 pt-3 space-y-1.5" style={{ borderTop: "1px solid var(--border)" }}>
                          {biz.email && (
                            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {biz.email}
                            </div>
                          )}
                          {biz.last_call_at && (
                            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Last called {new Date(biz.last_call_at).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {businesses.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-4xl mb-3" style={{ color: "var(--text-muted)" }}>0</div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No businesses match current filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
