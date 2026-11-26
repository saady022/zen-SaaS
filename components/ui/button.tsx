import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold leading-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<Variant, string> = {
  primary: "bg-clay text-[#fdf6ee] hover:bg-clay-hover rounded-pill",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-canvas rounded-pill",
  ghost: "text-ink hover:bg-surface-2 rounded-pill",
  link: "text-ink underline underline-offset-[5px] decoration-clay hover:text-clay",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.95rem] px-5 py-2.5",
  lg: "text-base px-7 py-3",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variantStyles[variant], variant !== "link" && sizeStyles[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}
