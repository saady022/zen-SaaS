/**
 * Mock content for the Zen marketing site.
 * Every landing section is driven by the data here, so copy changes
 * never touch component markup.
 */

export const nav = {
  links: [
    { label: "Product", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "Customers", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ],
};

export const hero = {
  title: ["Run your whole", "business from", "one quiet place."],
  description:
    "Zen brings your numbers, billing and customers into one calm workspace, so you can stop juggling tools and run your business with a clear head.",
  primaryCta: "Start free trial",
  secondaryCta: "Book a demo",
  note: "Free for 14 days · no card required",
};

/** Fictional companies — avoids using real brands/logos. */
export const logos = ["Lumen", "Fathom", "Keystone", "Vela", "Orbit", "Mica"];

export interface Feature {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: "LineChart",
    title: "Live analytics",
    description:
      "Dashboards that move the moment your numbers do. Revenue, signups and usage, always current.",
  },
  {
    icon: "CreditCard",
    title: "Billing that runs itself",
    description:
      "Plans, invoices, trials and failed-payment recovery, handled automatically from day one.",
  },
  {
    icon: "Users",
    title: "Customer management",
    description:
      "Every member in one searchable table. Invite, filter, upgrade and support without the spreadsheets.",
  },
  {
    icon: "TrendingUp",
    title: "Revenue insight",
    description:
      "MRR, churn and cohort retention worked out for you, so you always know which way things are going.",
  },
  {
    icon: "Zap",
    title: "Automations",
    description:
      "Turn repetitive work into quiet background rules. Onboarding, nudges and alerts that fire on their own.",
  },
  {
    icon: "ShieldCheck",
    title: "Roles & access",
    description:
      "Give each teammate exactly what they need. Granular permissions and an audit trail on every change.",
  },
];

export interface Step {
  number: string;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    number: "01",
    title: "Connect your tools",
    description:
      "Link your payments and the tools you already use. Zen starts pulling everything together within minutes.",
  },
  {
    number: "02",
    title: "See it all in one view",
    description:
      "Revenue, usage and people land in a single workspace, reconciled and up to date, with nothing left to export.",
  },
  {
    number: "03",
    title: "Act with confidence",
    description:
      "Automate the busywork, spot what needs attention and make the call, backed by numbers you can trust.",
  },
];

export interface Plan {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    name: "Starter",
    price: 19,
    tagline: "For founders validating a new idea.",
    features: [
      "Up to 500 customers",
      "Core revenue analytics",
      "Automatic billing sync",
      "Email support",
    ],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: 49,
    tagline: "For teams finding their stride.",
    features: [
      "Up to 10,000 customers",
      "Cohort & churn reports",
      "Automations & workflows",
      "Roles & permissions",
      "Priority support",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Scale",
    price: 99,
    tagline: "For businesses running at full speed.",
    features: [
      "Unlimited customers",
      "Advanced revenue insight",
      "Audit log & SSO",
      "Custom data exports",
      "Dedicated success manager",
    ],
    cta: "Talk to sales",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced three tools and a very tired spreadsheet with Zen. Now the whole team reads from the same numbers.",
    name: "Priya Nair",
    role: "Founder, Keystone",
    initials: "PN",
  },
  {
    quote:
      "Billing used to eat a day a week. Zen quietly runs it now, and the failed-payment recovery paid for itself in a month.",
    name: "Marcus Hale",
    role: "COO, Vela",
    initials: "MH",
  },
  {
    quote:
      "The cohort reports changed how we think about retention. I finally understand which customers stay and why.",
    name: "Sofia Almeida",
    role: "Head of Growth, Orbit",
    initials: "SA",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How long does it take to set up?",
    answer:
      "Most teams are up and running in under fifteen minutes. Connect your payments and tools, and Zen fills in your history automatically.",
  },
  {
    question: "Do I need a credit card to try it?",
    answer:
      "No. Every plan starts with a 14-day free trial and no card up front. You only add billing details if you decide to keep going.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Any time, in either direction. Upgrades apply instantly and downgrades take effect at the end of your current cycle, prorated automatically.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your data is encrypted in transit and at rest. We support SSO on the Scale plan and keep a full audit log of every change your team makes.",
  },
  {
    question: "Which tools does Zen connect to?",
    answer:
      "Payments through Stripe out of the box, plus the tools you already use. New integrations land every month.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "Nothing breaks. Your workspace moves to a read-only state until you pick a plan, so you never lose a thing.",
  },
];

export const footer = {
  tagline: "A calm place to run your business.",
  columns: [
    {
      title: "Product",
      links: ["Features", "Pricing", "Changelog", "Integrations", "Status"],
    },
    {
      title: "Company",
      links: ["About", "Customers", "Careers", "Blog", "Contact"],
    },
    {
      title: "Resources",
      links: ["Docs", "Guides", "API reference", "Community", "Support"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Cookies"],
    },
  ],
};
