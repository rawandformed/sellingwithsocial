# Handoff notes

## Positioning

- Every page leads with **Fire your agency.**
- The promise: everything an agency does, brought in-house in one mostly hands-off system. Six jobs: ideas, creating, scripting, launching, managing, maintaining.
- Never sell it as "AI". It is "the system". The word AI does not appear on the site.
- The main button is "Show me how", which leads into the six-step story.
- Price is **$297 a month, no setup fee**, shown only at the bottom (calculator, then pricing).
- Keep it light on text: one short line and one visual per step.

## Page order

1. Hero: the promise, no price.
2. The problem (scroll hold): a month with an agency.
3. How to fire your agency (scroll hold): the six jobs, one at a time.
4. Agency vs in-house table.
5. Founders.
6. Cost calculator, then pricing (dark, glass card).
7. Webinar, FAQ, final button.

Parked for later: a free "see your ads" lead magnet in the hero.

## Copy rules

- Plain words for business owners. Say what it does, not how it is built. "Tracking that tells Meta who became a customer", not the API name.
- No em dashes.
- No hype, no invented numbers, no testimonials until real ones exist.
- Every mock screen is an example and is labelled as one. "Harbor Plumbing" is not a customer.
- "Powered by HighLevel" appears in pricing, FAQ and footer.

## Claims to confirm before launch

- Month to month, cancel any time (comparison table, FAQ).
- Texts, calls and emails billed by usage (FAQ).
- The plan's feature list matches what the $297 plan actually unlocks.
- The system really does all six jobs at launch, including weekly ideas and video scripts.
- "Mostly hands-off" is a fair description (the owner still approves ads and films videos).
- Founder line: Alan runs two legal businesses in Sydney and an insulation business in the US; Kai runs e-commerce brands.
- "Live training every week" matches the real webinar schedule.
- "Video scripts and ideas" exists in the product at launch.
- Every platform feature named (missed-call text back, review requests, invoices, social scheduler, mobile app) is switched on in the $297 plan.

## Design

SWS Design System V1, Palette A.

- Colours: base `#fbfbf8`, ink `#101419`, blue `#5f92e2` / `#356ec6`, yellow `#ffcf34`, navy `#08162a`. No purple.
- Type: Bricolage Grotesque bold for headlines, Figtree for text and labels, Geist Mono for numbers only.
- Yellow highlight bar under a word on light backgrounds; on navy use yellow text with no bar.
- Space: off-white base, white bands with hairline borders, 1080px column, 120px section padding, 20px card radius.
- Glass cards sit over soft blurred glows. Two sections pin while you scroll (the problem, and the six jobs); with reduced motion they lay out as normal sections showing every step.

## Technical rules

- Each built page must stay one self-contained file so it can be pasted into GoHighLevel.
- Source lives in `src/`; run `python3 build.py` after any change and commit the built pages too.
- No frameworks or external scripts. Fonts load from Google Fonts.
- Check at 1440px and 390px wide before shipping: no sideways scroll, nothing hidden under the nav or the mobile buy bar.
