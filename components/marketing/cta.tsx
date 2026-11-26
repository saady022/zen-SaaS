import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Cta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-card bg-clay px-8 py-14 text-center sm:px-14">
          <svg
            className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 text-[#fdf6ee]/15"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M100 20l8 26 26 8-26 8-8 26-8-26-26-8 26-8z" />
            <circle cx="150" cy="150" r="16" />
            <path d="M40 150c10-8 24-8 34 0" />
          </svg>

          <h2 className="mx-auto max-w-2xl text-3xl text-[#fdf6ee] sm:text-4xl">
            Run your business from one calm place
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[1.05rem] text-[#fdf6ee]/80">
            Start your free trial today. Fourteen days, every feature, no card required.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-pill bg-[#fdf6ee] px-7 py-3 text-[0.95rem] font-semibold text-clay-hover transition-colors hover:bg-white"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-[#fdf6ee]/50 px-7 py-3 text-[0.95rem] font-semibold text-[#fdf6ee] transition-colors hover:bg-white/10"
            >
              View pricing
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
