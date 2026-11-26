# Selling with Social · website

Launch landing page for Selling with Social (sellingwithsocial.com).

React + Vite + TypeScript + Tailwind CSS v4, shadcn folder structure, framer-motion. One page, no router.

This branch (`ai-studio-vite`) is the Vite version, made for HighLevel AI Studio Git Sync. The Next.js version lives on `claude/launch-landing`.

## Run it

```bash
npm install
```

```bash
npm run dev
```

## Build

```bash
npm run build
```

The built site is written to `dist/`.

## Where things live

- `index.html` : the page shell. Loads the fonts from Google Fonts and `src/main.tsx`.
- `vite.config.ts` : Vite, React and Tailwind plugins, and the `@` alias for `src`.
- `src/main.tsx`, `src/App.tsx` : entry point and the page.
- `src/index.css` : Tailwind import, brand tokens, and the glass, eyebrow and highlight utilities.
- `src/components/sections/` : one file per page section.
- `src/components/ui/` : shared UI pieces (shadcn structure), including ContainerScroll and PeakChart.
- `src/components/site/` : nav and footer.
- `src/lib/config.ts` : checkout links, fees, video link and proof stats. Checkout links are empty for now; while a link is empty its Get started button stays on the pricing section.
- `src/assets/` : logos.
- `reference/original-index.html` : the original single-file site, kept as a visual reference. Not served.

## Brand

SWS Design System V1, Palette A. Bricolage Grotesque (headlines), Figtree (text), Geist Mono (numbers only). Tokens are in `src/index.css`.
