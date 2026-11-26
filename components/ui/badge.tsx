import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "clay" | "success" | "warning" | "danger" | "neutral";

const toneStyles: Record<Tone, string> = {
  clay: "bg-clay-soft text-clay-hover",
  success: "bg-success-soft text-[#3f5e3b]",
  warning: "bg-warning-soft text-[#8a6414]",
  danger: "bg-danger-soft text-[#8a3522]",
  neutral: "bg-surface-2 text-ink-muted",
};

const dotStyles: Record<Tone, string> = {
  clay: "bg-clay",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  neutral: "bg-ink-subtle",
};

export function Badge({
  tone = "neutral",
  dot = true,
  children,
  className,
}: {
  tone?: Tone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold",
        toneStyles[tone],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[tone])} />}
      {children}
    </span>
  );
}
