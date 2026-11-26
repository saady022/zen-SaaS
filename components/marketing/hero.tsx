import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { hero } from "@/lib/data";

const avatars = [
  { initials: "PN", className: "bg-clay-soft text-clay-hover" },
  { initials: "MH", className: "bg-success-soft text-[#3f5e3b]" },
  { initials: "SA", className: "bg-warning-soft text-[#8a6414]" },
  { initials: "JK", className: "bg-panel text-ink-muted" },
];

export function Hero() {
  const lastLine = hero.title.length - 1;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* line-art accent, decorative */}
      <svg
        className="pointer-events-none absolute -right-6 top-10 hidden h-64 w-64 text-ink/15 lg:block"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M150 40l4-13 4 13 13 4-13 4-4 13-4-13-13-4z" />
        <path d="M40 150c-12-5-25-9-25-29 0-17 17-24 29-17 2-22 39-25 44-3 17-5 30 7 25 24-5 17-22 19-34 19" />
        <path d="M30 150h120" />
        <circle cx="86" cy="96" r="2.5" />
        <circle cx="104" cy="104" r="2.5" />
      </svg>

      <Container className="relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
            {hero.title.map((line, i) => (
              <span key={line} className="block">
                {i === lastLine ? (
                  <span className="relative inline-block">
                    {line}
                    <svg
                      className="absolute -bottom-1 left-0 h-3 w-full text-clay"
                      viewBox="0 0 300 12"
                      preserveAspectRatio="none"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8c60-6 234-6 294-2"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#pricing" className={buttonVariants({ variant: "outline", size: "lg" })}>
              {hero.secondaryCta}
            </Link>
          </div>

          <p className="mt-5 text-sm text-ink-subtle">{hero.note}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex -space-x-2">
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-canvas text-xs font-semibold ${a.className}`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-0.5 text-clay">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-sm text-ink-muted">
                Trusted by <strong className="font-semibold text-ink">2,000+</strong> teams
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
