import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";

const avatarTones = [
  "bg-clay-soft text-clay-hover",
  "bg-success-soft text-[#3f5e3b]",
  "bg-warning-soft text-[#8a6414]",
];

export function Testimonials() {
  return (
    <section id="testimonials" className="border-y border-line bg-surface/60 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Customers"
          title="Loved by teams who'd rather be building"
          description="Thousands of founders and operators run their day on Zen."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="flex flex-col gap-6 rounded-card border border-line bg-canvas p-7"
            >
              <span
                className="font-display text-5xl leading-none text-clay/40"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="-mt-6 flex-1 text-[1.05rem] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${avatarTones[i % avatarTones.length]}`}
                >
                  {t.initials}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-ink">{t.name}</span>
                  <span className="text-sm text-ink-muted">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
