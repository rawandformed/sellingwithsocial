# Handoff: Selling with Social website

Context for an AI assistant (e.g. Google AI Studio) or a developer picking up this repo. Read this first, then `index.html`.

## What this is
A single-page sales site for **Selling with Social**, a done-for-you growth service for phone-driven service businesses (plumbers, salons, clinics, restaurants, coaches). It answers calls, books jobs, takes deposits, asks for reviews and runs ads.

- **The page has one goal:** get the visitor to **book a call**. Every CTA says "Book a call".
- **One file, nothing to build:** `index.html`. The CSS and JS are inline. No framework, no build step and no dependencies apart from Google Fonts.
- **Repo:** `rawandformed/sellingwithsocial`, branch `main`.

## Rules to keep (do not break these)
1. **Keep it one file.** Don't split the CSS/JS out or add a framework or bundler. It has to paste into a GoHighLevel (GHL) custom-code element as is.
2. **No pricing on the page.** Cost questions go to the call (see the FAQ).
3. **No tech terms in visible copy.** Don't write CRM, API, automation, workflow, LLM and so on. Use plain owner language like "every call answered" and "get paid by text". (The `<title>` currently says "AI growth platform". Leave it unless asked.)
4. **Only one CTA, "Book a call".** No second offer, newsletter or free-trial button.
5. **Copy voice:** short sentences, second person, concrete outcomes, and no hype words.
6. **Keep the reduced-motion support.** `prefers-reduced-motion` has to show every section in its finished state without scroll holds.
7. **Must work on phones:** it has breakpoints at 900px and 640px, plus a sticky mobile booking bar.

## Brand (SWS Design System V1, Palette A)
The tokens live on `:root` at the top of `<style>`. Use the variables and don't hard-code colours.

| Token | Value | Use |
|---|---|---|
| `--base` | `#fbfbf8` | page background (off-white) |
| `--ink` / `--ink-2` / `--muted` | `#101419` / `#3f454d` / `#6b7177` | text |
| `--primary` / `--primary-strong` | `#5f92e2` / `#356ec6` | blue, eyebrows, focus |
| `--accent` | `#ffcf34` | yellow, main buttons, highlight underline |
| `--navy` / `--navy-2` | `#08162a` / `#0f2038` | dark "curtain" sections |
| `--success` / `--hot` | `#1f8a4c` / `#d9483b` | status tags |

- **Type:** Bricolage Grotesque (headings, `--font-display`), Figtree (body, `--font-sans`) and Geist Mono (numbers and times only, `--font-mono`).
- **Layout:** a 1040px column (`--col`), a 720px narrow column, 112px section padding and 20px card radius.
- **Look:** frosted-glass cards (`.glass`, `.glass-dark`) over soft blurred colour orbs (`.orbs`), with hairline bands between sections.

## Page map (top to bottom, in `index.html`)
| Section | id | Type | Notes |
|---|---|---|---|
| Nav | `#nav` | fixed glass bar | switches to the `on-dark` style over dark sections |
| Hero | `#hero` | static + intro animation | "Turn missed calls into booked jobs.", live example card `#live`, stat strip |
| The gap | `#gap` | **scroll hold** | a timer runs from 00:00 to 24h, with Hot → Warm → Cold → Gone heat stages |
| How it works | `#system` | **scroll hold** | 4-step flow (`#flow`) plus phone screens (`.screen`) |
| Features | `#features` | **scroll hold** | 7 tabs built from the JS array `P` |
| AI receptionist | `#ai` | dark curtain | sample call transcript `#call`, bubbles fade in with scroll |
| Industries | `#industries` | click tabs | 4 industries from the JS array `I`, with arrow-key navigation |
| Lead engine | `#engine` | **scroll hold** + dark curtain | 4 cards `.ecard` light up in turn |
| Process | (none) | static | 3 steps |
| Outcomes | (none) | static | **sample data, see TODO** |
| Founders | (none) | band | Kai and Alan, **photo placeholders** |
| Book a call | `#book` | dark curtain | offer stack `#stack`, the target of every CTA |
| FAQ | `#faq` | `<details>` | 5 questions |
| Final CTA | `#final` | static | |
| Footer | `.foot` | static | Company/Legal links are placeholders (`#top`) |
| Mobile bar | `#mbar` | fixed | shown after the hero, hidden during holds and over `#stack` |

## How the JS works (one IIFE at the bottom)
- **`BOOKING_URL`** (first line of the script): while it is `'#book'`, CTAs scroll to the booking section. Set it to a real URL and every `a.book` gets rewritten to that URL, opening in a new tab.
- **Content arrays:** `P` holds the 7 features and `I` the 4 industries. Each entry has a title (`t`), headline (`h`), paragraph (`p`), bullets (`li`) and mock-UI HTML (`m`); industries also have a button label (`c`). **To edit feature or industry copy, edit these arrays, not the HTML.**
- **Scroll holds:** each `[data-hold]` section is tall with a sticky inner scene. `tick()` works out progress `p` (0 to 1), sets the `--p` CSS variable and calls the matching handler in `H` (`gap`, `system`, `feat`, `engine`).
- **Curtains:** `[data-curtain]` sections get `--e` (0 to 1) as they enter, which drives the dark wipe.
- **Views:** `[data-view]` elements get handlers in `V` (`ai`, `final`) with a 0-to-1 visibility value.
- **Reveal:** `.rv` elements get the `.in` class through an IntersectionObserver.
- **Scrolling:** all of it runs through a single passive scroll listener throttled by `requestAnimationFrame`.

## TODO before launch
- [ ] Set `BOOKING_URL` to the real booking link.
- [ ] Replace the three sample outcomes (Peak Plumbing, Luna Salon, Clear Dental) with real, permissioned results, then remove the "[Sample results…]" note. The hero's "Live example · Peak Plumbing" card and the mock rows are also illustrative.
- [ ] Add photos of Kai and Alan in the founders section (`.founders .ph`).
- [ ] Wire up or remove the footer links (About, Community, Contact, Terms, Privacy). They all point to `#top`.

## Known issues
- **Industries CTA doesn't open in a new tab.** The button in `selI()` has two `class` attributes (`class="btn btn-ink btn-sm" class="book"`), so the browser drops `book`. Its href still uses `BOOKING_URL`, but the link won't open in a new tab. Fix: `class="btn btn-ink btn-sm book"` and add `target="_blank" rel="noopener"` when `BOOKING_URL !== '#book'`.

## Deploy
- **GHL:** paste the whole file into a funnel step's custom code element.
- **Static host** (GitHub Pages, Vercel, Netlify): serve `index.html` from the repo root.

## Checking a change
Open `index.html` in a browser and check:
1. Desktop (≥1200px) and phone (~390px) widths.
2. Scroll the full page slowly. Each hold should play smoothly and release.
3. Turn on reduced motion in the OS. Every section should show finished, with no sticky holds.
4. Click every "Book a call". It should go to `#book`, or to the booking URL in a new tab once one is set.
