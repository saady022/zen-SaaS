# Zen

A technical assessment build: a **SaaS product landing page** and a **functional admin dashboard**, designed as one coherent product with a warm, editorial identity — deliberately crafted rather than templated.

**Live demo:** https://zen-saa-s.vercel.app · **Repo:** https://github.com/saady022/zen-SaaS

**Landing:** [/](https://zen-saa-s.vercel.app) · **Dashboard:** [/dashboard](https://zen-saa-s.vercel.app/dashboard)

---

## Highlights

- **One design system, two surfaces.** The marketing site and the admin app share the same tokens, typography and components, so they read as a single product.
- **Original, non-templated UI.** Warm bone canvas, a clay accent, a grotesque display face (Bricolage Grotesque) over a humanist body (Hanken Grotesk), flat surfaces with hairline borders, hand-drawn line-art accents.
- **Clean, reusable components.** Every section and widget is a small component fed by data from `lib/`, so content changes never touch markup.
- **Real functionality.** The dashboard's user management runs full create / read / update / delete against a mock API, with live search and filtering.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Charts | Recharts |
| Icons | lucide-react |
| Fonts | Bricolage Grotesque · Hanken Grotesk · JetBrains Mono (via `next/font`) |

No UI kit, no state library — just a small hand-rolled component layer.

## Features

### Task 1 — Landing page (`/`)
Navbar with mobile menu · hero with CTA · product/dashboard mockup · features grid · how-it-works · three pricing plans · testimonials · FAQ accordion · closing CTA · footer with newsletter. Fully responsive, with smooth scroll and hover/entrance interactions.

### Task 2 — Admin dashboard (`/dashboard`)
- **Overview** — four statistic cards with sparklines, a revenue analytics chart (toggle between revenue and customers), a customers-by-plan breakdown and a recent-activity feed.
- **Customers** (`/dashboard/users`) — searchable, filterable table with working **add / edit / delete** through a mock API.
- **Settings** (`/dashboard/settings`) — profile form, notification toggles, security options and a danger zone.
- Persistent sidebar navigation with active states and a mobile drawer. Fully responsive.

## Mock API

An in-memory store backs REST route handlers:

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/users` | List customers |
| `POST` | `/api/users` | Create a customer |
| `PATCH` | `/api/users/:id` | Update a customer |
| `DELETE` | `/api/users/:id` | Delete a customer |

## Project structure

```
app/
  page.tsx          → landing page at /
  dashboard/        → shell + overview, users, settings
  api/users/        → mock REST API
components/
  ui/               → primitives (Button, Card, Badge, Input, Modal, Switch…)
  marketing/        → landing sections
  dashboard/        → sidebar, topbar, stat card, chart, users table…
lib/
  data.ts           → landing content
  dashboard-data.ts → stats, revenue, seed users
  users-store.ts    → in-memory store for the mock API
  utils.ts          → helpers (cn, formatters)
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Build with `npm run build`.

## Design notes

The accent (clay / terracotta) carries the warmth and appears sparingly — pills, underlines, one accent panel. Neutrals are warm, not grey. Semantic states (success, warning, danger) are earthy so dashboard status sits inside the palette rather than fighting it. Numbers use a monospace face with tabular figures for clean alignment.
