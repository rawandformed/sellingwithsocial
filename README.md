# Selling with Social · website

Single-page sales site for Selling with Social. One self-contained file: `index.html`.

## Before going live
- Paste the booking link into `BOOKING_URL` near the top of the `<script>` in `index.html`. Every "Book a call" button uses it and opens in a new tab.
- Replace the sample outcomes (marked as samples on the page) with real, permissioned results.
- Add photos of Kai and Alan in the founders section.

## What's in it
- Brand: SWS Design System V1, Palette A. Bricolage Grotesque (display), Figtree (text), Geist Mono (data).
- Four scroll holds: the gap timer, the system walkthrough, the 7 outcomes, the lead engine.
- Frosted-glass cards, curtain transitions into the dark sections, mobile booking bar.
- No pricing and no tech terms on the page by design. The single CTA is "Book a call".
- `prefers-reduced-motion` removes the holds and shows each section finished.

## Deploy
- GHL: paste the file's contents into a funnel step's custom code element, or
- any static host (Vercel, Netlify, GitHub Pages): serve `index.html` as is.
