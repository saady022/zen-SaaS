import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { steps } from "@/lib/data";

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-line bg-surface/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Up and running by this afternoon"
          description="No migration project, no implementation team. Three steps and your numbers are live."
        />

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.number} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink font-display text-lg font-extrabold">
                  {step.number}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-line-strong md:block" aria-hidden="true" />
                )}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
