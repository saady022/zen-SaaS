"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueSeries } from "@/lib/dashboard-data";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

type Metric = "revenue" | "customers";

const CLAY = "#bc5a3c";
const LINE = "#e1d7c6";
const INK_SUBTLE = "#a79c8c";

function CustomTooltip({
  active,
  payload,
  label,
  metric,
}: {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string | number;
  metric: Metric;
}) {
  if (!active || !payload?.length) return null;
  const value = payload[0]?.value ?? 0;
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 shadow-[0_8px_24px_-12px_rgba(31,27,22,0.4)]">
      <p className="font-mono text-xs text-ink-subtle">{label}</p>
      <p className="mt-0.5 font-mono text-sm font-semibold text-ink">
        {metric === "revenue" ? formatCurrency(value) : `${formatNumber(value)} customers`}
      </p>
    </div>
  );
}

export function RevenueChart() {
  const [metric, setMetric] = useState<Metric>("revenue");

  return (
    <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">Revenue analytics</h2>
          <p className="mt-0.5 text-sm text-ink-muted">Monthly performance over the last year</p>
        </div>
        <div className="inline-flex rounded-pill border border-line bg-canvas p-1">
          {(["revenue", "customers"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
              className={cn(
                "rounded-pill px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors",
                metric === m ? "bg-clay text-[#fdf6ee]" : "text-ink-muted hover:text-ink",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CLAY} stopOpacity={0.2} />
                <stop offset="100%" stopColor={CLAY} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={LINE} strokeDasharray="4 4" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: INK_SUBTLE, fontSize: 12 }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={52}
              tick={{ fill: INK_SUBTLE, fontSize: 12 }}
              tickFormatter={(v: number) =>
                metric === "revenue" ? `$${Math.round(v / 1000)}k` : formatNumber(v)
              }
            />
            <Tooltip
              cursor={{ stroke: CLAY, strokeWidth: 1, strokeDasharray: "4 4" }}
              content={<CustomTooltip metric={metric} />}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={CLAY}
              strokeWidth={2.5}
              fill="url(#revFill)"
              activeDot={{ r: 4, fill: CLAY, stroke: "#fdf6ee", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
