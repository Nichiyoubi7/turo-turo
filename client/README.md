# Turo Turo — Nuxt 3 + Tailwind CSS

Rebuild of the Turo Turo landing page (educational materials commission site)
using Nuxt 3 and Tailwind CSS, matching the karinderya/menu-board design
direction from the original static HTML version.

## Stack
- Nuxt 3 (Vue 3, TypeScript)
- Tailwind CSS (via `@nuxtjs/tailwindcss`)
- No backend yet — the "Order sa Facebook" buttons are placeholder links.
  A Laravel + PostgreSQL order-intake API is the planned phase 2.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Project structure

```
app.vue                  Root layout, assembles all sections
components/
  AppHeader.vue           Awning nav + hamburger + mobile dropdown menu
  HeroBoard.vue            Chalkboard-style hero
  AboutSection.vue         "Who's behind this" + order-slip mockup
  MenuSection.vue          Reusable menu-list section (used for both
                            the K-12 menu and the College menu)
  HowItWorks.vue           3-step "how to order" counter steps
  SamplesSection.vue       Sample work trays (swap placeholders with
                            real screenshots when you have them)
  TestimonialReceipt.vue   Testimonial styled as a torn receipt
  ContactSection.vue       Final CTA section
  AppFooter.vue            Footer
  StickyOrder.vue          Floating "Order Now" button, scroll-triggered
  TuroMark.vue             Shared logo icon (cursor pointing at a document)
data/
  menuK12.ts               Elementary–Senior High services/pricing
  menuCollege.ts            College/university services/pricing
```

## Things to customize before going live

- Replace `[Your Name]` in `AboutSection.vue` and `AppFooter.vue`
- Replace `[City, Philippines]` in `AppFooter.vue`
- Replace the `href="#"` Facebook links in `HeroBoard.vue` and
  `ContactSection.vue`
- Edit `data/menuK12.ts` and `data/menuCollege.ts` for real pricing
- Swap the placeholder tiles in `SamplesSection.vue` for real screenshots
  (this is the single highest-trust element on the page)

## Brand tokens

Defined in `tailwind.config.js` — `cream`, `charcoal`, `charcoal-2`, `red`
(with `red-dark`), `gold`, `steel`, plus font families `poster` (Bungee),
`marker` (Permanent Marker), `script` (Caveat), `body` (Work Sans), and
`mono` (Space Mono).

## Deploying

Static-generatable (`npm run generate`) and deploys cleanly to Vercel,
same as the "2405 and Beyond" blog frontend.

## Backend integration

- `composables/useApi.ts` — shared fetch wrapper reading `runtimeConfig.public.apiBase` (same pattern as OBRA)
- `stores/order.ts` — Pinia store handling order submission state
- `components/OrderForm.vue` — the actual order form, wired into `ContactSection.vue`
- Set `NUXT_PUBLIC_API_BASE` in your env to point at the real API once it's deployed (defaults to `http://localhost:8000/api` for local dev against the Laravel backend in `../api`)
