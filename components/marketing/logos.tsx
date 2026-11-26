import { Container } from "@/components/ui/container";
import { logos } from "@/lib/data";

export function Logos() {
  return (
    <section className="border-y border-line bg-surface/60">
      <Container className="py-10">
        <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
          Trusted by fast-moving teams
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {logos.map((name) => (
            <span
              key={name}
              className="font-display text-xl font-bold text-ink-muted/60 transition-colors hover:text-ink-muted"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
