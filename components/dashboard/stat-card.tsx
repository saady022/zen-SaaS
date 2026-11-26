import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Stat } from "@/lib/dashboard-data";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

function formatValue(stat: Stat) {
  if (stat.format === "currency") return formatCurrency(stat.value);
  if (stat.format === "percent") return `${stat.value}%`;
  return formatNumber(stat.value);
}

function Sparkline({ data }: { data: number[] }) {
  const w = 96;
  const h = 34;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const stepX = w / (data.length - 1);
  const points = data.map((p, i) => {
    const x = i * stepX;
    const y = h - 2 - ((p - min) / (max - min || 1)) * (h - 4);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-24" preserveAspectRatio="none" aria-hidden="true">
      <path
        d={points.join(" ")}
        fill="none"
        stroke="var(--color-clay)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatCard({ stat }: { stat: Stat }) {
  const isGood = stat.delta >= 0 === stat.positiveIsGood;
  const Arrow = stat.delta >= 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <p className="text-sm font-medium text-ink-muted">{stat.label}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        <p className="font-mono text-[1.7rem] font-semibold leading-none tracking-tight tabular-nums">
          {formatValue(stat)}
        </p>
        <Sparkline data={stat.spark} />
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-pill px-1.5 py-0.5 text-xs font-semibold",
            isGood ? "bg-success-soft text-[#3f5e3b]" : "bg-danger-soft text-[#8a3522]",
          )}
        >
          <Arrow className="h-3 w-3" />
          {stat.delta >= 0 ? "+" : ""}
          {stat.delta}%
        </span>
        <span className="text-xs text-ink-subtle">vs last month</span>
      </div>
    </div>
  );
}
