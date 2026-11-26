import { LayoutDashboard, LineChart, Users, CreditCard, Settings, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: LineChart, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: CreditCard, label: "Billing" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  { label: "Monthly revenue", value: "$48,290", delta: "+12.4%", up: true },
  { label: "Active customers", value: "2,847", delta: "+4.1%", up: true },
  { label: "Churn rate", value: "1.8%", delta: "-0.3%", up: true },
];

// 12-point revenue series, drawn to scale in the chart below.
const series = [28, 32, 30, 38, 42, 40, 48, 52, 49, 58, 62, 70];

function buildPath(points: number[], w: number, h: number, pad = 4) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = (w - pad * 2) / (points.length - 1);
  return points
    .map((p, i) => {
      const x = pad + i * stepX;
      const y = h - pad - ((p - min) / (max - min)) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function DashboardPreview() {
  const W = 560;
  const H = 150;
  const line = buildPath(series, W, H);
  const area = `${line} L${W - 4} ${H - 4} L4 ${H - 4} Z`;

  return (
    <section className="pb-8 pt-20 sm:pt-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>The dashboard</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl">A workspace your whole team can read</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-ink-muted">
            One clear view of revenue, customers and billing. No exports, no reconciling, no second-guessing.
          </p>
        </div>

        {/* Framed product mockup */}
        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-card border border-line-strong bg-surface shadow-[0_28px_70px_-30px_rgba(31,27,22,0.45)]">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-danger/60" />
            <span className="h-3 w-3 rounded-full bg-warning/60" />
            <span className="h-3 w-3 rounded-full bg-success/60" />
            <div className="ml-4 hidden items-center gap-2 rounded-pill bg-canvas px-3 py-1 text-xs text-ink-subtle sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              app.zen.io/overview
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[190px_1fr]">
            {/* sidebar */}
            <aside className="hidden flex-col gap-1 border-r border-line bg-surface-2/60 p-4 md:flex">
              {navItems.map(({ icon: Icon, label, active }) => (
                <span
                  key={label}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium ${
                    active ? "bg-clay-soft text-clay-hover" : "text-ink-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
              ))}
            </aside>

            {/* main */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold">Overview</h3>
                <div className="flex items-center gap-3">
                  <span className="hidden items-center gap-2 rounded-pill border border-line bg-canvas px-3 py-1.5 text-xs text-ink-subtle sm:flex">
                    <Search className="h-3.5 w-3.5" />
                    Search
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-panel text-xs font-semibold text-ink-muted">
                    TK
                  </span>
                </div>
              </div>

              {/* stat cards */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-line bg-canvas p-4">
                    <p className="text-xs font-medium text-ink-muted">{s.label}</p>
                    <p className="mt-2 font-mono text-xl font-semibold tabular-nums">{s.value}</p>
                    <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-success">
                      {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {s.delta}
                    </p>
                  </div>
                ))}
              </div>

              {/* chart */}
              <div className="mt-4 rounded-xl border border-line bg-canvas p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Revenue</p>
                  <span className="font-mono text-xs text-ink-subtle">Last 12 months</span>
                </div>
                <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-36 w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="prevArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#bc5a3c" stopOpacity="0.18" />
                      <stop offset="1" stopColor="#bc5a3c" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((f) => (
                    <line key={f} x1="4" x2={W - 4} y1={H * f} y2={H * f} stroke="#e1d7c6" strokeWidth="1" />
                  ))}
                  <path d={area} fill="url(#prevArea)" />
                  <path d={line} fill="none" stroke="#bc5a3c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
