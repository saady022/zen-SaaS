import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z" />
      <path d="M6.5 17.5C10.5 13.5 13.5 10.5 17 8" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-ink",
        className,
      )}
    >
      <LogoMark className="h-[22px] w-[22px] text-ink" />
      Zen
    </span>
  );
}
