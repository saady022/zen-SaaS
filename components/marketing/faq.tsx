"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything you might want to know before you start."
        />

        <div className="mt-12 divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[1.05rem] font-semibold text-ink">{item.question}</span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-clay transition-transform duration-200",
                      isOpen && "rotate-45",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-8 text-[0.98rem] leading-relaxed text-ink-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
