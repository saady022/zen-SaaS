"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label="Zen home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-ink transition-colors hover:text-clay"
          >
            Sign in
          </Link>
          <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
            Start free
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-line bg-canvas md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="px-3 text-sm font-semibold text-ink"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className={buttonVariants({ className: "w-full" })}
            >
              Start free
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
