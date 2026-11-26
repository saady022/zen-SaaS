import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import {
  overviewStats,
  planBreakdown,
  recentActivity,
  currentUser,
} from "@/lib/dashboard-data";
import { formatNumber } from "@/lib/utils";

export default function DashboardOverview() {
  const totalPlans = planBreakdown.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          Good to see you, {currentUser.name.split(" ")[0]}
        </h2>
        <p className="mt-1 text-ink-muted">Here&rsquo;s how Zen is doing today.</p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </div>

      {/* chart */}
      <RevenueChart />

      {/* secondary row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* plan breakdown */}
        <div className="rounded-card border border-line bg-surface p-5 sm:p-6 lg:col-span-2">
          <h2 className="text-lg font-bold">Customers by plan</h2>
          <p className="mt-0.5 text-sm text-ink-muted">{formatNumber(totalPlans)} total</p>
          <div className="mt-6 flex flex-col gap-5">
            {planBreakdown.map((p) => {
              const pct = Math.round((p.count / totalPlans) * 100);
              return (
                <div key={p.plan} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{p.plan}</span>
                    <span className="font-mono text-ink-muted tabular-nums">
                      {formatNumber(p.count)} · {pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-pill bg-canvas">
                    <div
                      className="h-full rounded-pill"
                      style={{ width: `${pct}%`, backgroundColor: p.tone }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* recent activity */}
        <div className="rounded-card border border-line bg-surface p-5 sm:p-6 lg:col-span-3">
          <h2 className="text-lg font-bold">Recent activity</h2>
          <ul className="mt-5 flex flex-col divide-y divide-line">
            {recentActivity.map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-panel text-xs font-semibold text-ink-muted">
                  {a.initials}
                </span>
                <p className="flex-1 text-sm text-ink">
                  <span className="font-semibold">{a.name}</span>{" "}
                  <span className="text-ink-muted">{a.action}</span>
                </p>
                <span className="font-mono text-xs text-ink-subtle">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
