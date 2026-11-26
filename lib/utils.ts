import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (dedupes conflicting utilities). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as compact USD, e.g. 48290 -> "$48,290". */
export function formatCurrency(value: number, opts: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    ...opts,
  }).format(value);
}

/** Format a plain number with thousands separators, e.g. 2847 -> "2,847". */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
