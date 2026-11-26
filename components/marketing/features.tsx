import {
  LineChart,
  CreditCard,
  Users,
  TrendingUp,
  Zap,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { features } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  LineChart,
  CreditCard,
  Users,
  TrendingUp,
  Zap,
  ShieldCheck,
};

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need, nothing you don't"
          description="Six focused tools that replace the tangle of spreadsheets, dashboards and billing scripts you run today."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <Card key={feature.title} interactive className="flex flex-col gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clay-soft text-clay">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-ink-muted">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
