import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call Sheet — Bright Porch",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{
      background: "#f5f0e8",
      color: "#3a3530",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .dash-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .dash-mono { font-family: 'JetBrains Mono', monospace; }

        :root {
          --bg-deep: #f5f0e8;
          --bg-surface: #ece6db;
          --bg-raised: #ffffff;
          --border: rgba(60,50,40,0.10);
          --border-strong: rgba(60,50,40,0.20);
          --text-primary: #3a3530;
          --text-secondary: #6b6158;
          --text-muted: #9c9083;
          --cream: #3a3530;
          --burgundy: #8b2942;
          --burgundy-soft: #a83a56;
          --orange-warm: #b85a1e;
          --orange-muted: #9e4e1c;
          --olive: #4a5c2a;
          --olive-soft: #5c6b3a;
        }
      `}</style>
      {children}
    </div>
  );
}
