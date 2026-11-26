"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
      className="mt-5"
    >
      <label htmlFor="newsletter" className="text-sm font-semibold text-ink">
        Get product updates
      </label>
      {sent ? (
        <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-success">
          <Check className="h-4 w-4" /> You&rsquo;re on the list. Talk soon.
        </p>
      ) : (
        <div className="mt-3 flex max-w-sm items-center gap-2">
          <input
            id="newsletter"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-pill border-[1.5px] border-line-strong bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:border-clay focus:outline-none focus:ring-[3px] focus:ring-clay-soft"
          />
          <button
            type="submit"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay text-[#fdf6ee] transition-colors hover:bg-clay-hover"
            aria-label="Subscribe"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </form>
  );
}
