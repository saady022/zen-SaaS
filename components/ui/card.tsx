import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Add a subtle hover lift + border emphasis. */
  interactive?: boolean;
}

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface p-6",
        interactive &&
          "transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong",
        className,
      )}
      {...props}
    />
  );
}
