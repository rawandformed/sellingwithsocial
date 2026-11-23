# Selling with Social · website

Marketing site for Selling with Social (sellingwithsocial.com).

Next.js (App Router) + TypeScript + Tailwind CSS v4, shadcn folder structure, framer-motion.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `app/` : layout, page and `globals.css` (brand tokens and the glass, eyebrow and highlight utilities).
- `components/ui/` : shared UI pieces (shadcn structure).
- `components/sections/` : one file per page section.
- `components/site/` : nav and footer.
- `lib/config.ts` : `CHECKOUT_URL`, `WEBINAR_URL`, `NEXT_WEBINAR`. All empty for now. While `CHECKOUT_URL` is empty the buy button scrolls to the offer section.
- `public/assets/` : logos.
- `reference/original-index.html` : the original single-file site. Kept as the visual reference for the port. Not served.

## Brand

SWS Design System V1, Palette A. Bricolage Grotesque (headlines), Figtree (text), Geist Mono (numbers only). Tokens are in `app/globals.css`.

## Before writing Next.js code

This project uses Next.js 16. Read the docs for the installed version in `node_modules/next/dist/docs/` first (see `AGENTS.md`).
