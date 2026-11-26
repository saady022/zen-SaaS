import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { plans } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title="Simple pricing that grows with you"
          description="Start free for 14 days. Switch plans or cancel whenever you like."
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col gap-6 rounded-card border p-7",
                plan.featured
                  ? "border-clay bg-surface shadow-[0_24px_60px_-34px_rgba(188,90,60,0.6)] md:-mt-4 md:pb-9"
                  : "border-line bg-surface",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center rounded-pill bg-clay px-3 py-1 text-xs font-semibold text-[#fdf6ee]">
                  Most popular
                </span>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-ink-muted">{plan.tagline}</p>
              </div>

              <div className="flex items-end gap-1">
                <span className="font-display text-5xl font-extrabold tracking-tight">
                  ${plan.price}
                </span>
                <span className="mb-1.5 text-sm text-ink-muted">/month</span>
              </div>

              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: plan.featured ? "primary" : "outline",
                  className: "w-full",
                })}
              >
                {plan.cta}
              </Link>

              <ul className="flex flex-col gap-3 border-t border-line pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.95rem]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" strokeWidth={2.5} />
                    <span className="text-ink">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
