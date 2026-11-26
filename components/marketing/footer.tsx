import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { footer } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {footer.tagline}
            </p>
            <NewsletterForm />
          </div>

          {footer.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-ink-muted transition-colors hover:text-clay"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-subtle">
            &copy; {new Date().getFullYear()} Zen Labs, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-ink-muted">
            <a href="#" className="transition-colors hover:text-clay">Privacy</a>
            <a href="#" className="transition-colors hover:text-clay">Terms</a>
            <a href="#" className="transition-colors hover:text-clay">Status</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
