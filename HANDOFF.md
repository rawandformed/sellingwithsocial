# Handoff notes

## Positioning

- The product is Selling with Social: run your own Facebook and Instagram ads in-house.
- Every page leads with **Fire your agency.**
- The ad launcher is the hero of the product. Everything else (tracking, instant replies, reactivating an old list, weekly training) supports it and comes second.
- Price is public: **$297 a month, no setup fee.** Buyers get instant access and land in the ad launcher.
- Two calls to action only: **Start for $297/mo** (primary) and the **free webinar** (secondary). No "book a call".

This replaces the earlier version of the site (speed to lead, no pricing, single "Book a call" button).

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
- The four launcher steps match the real ad launcher flow.
- Founder line: Alan runs two legal businesses in Sydney and an insulation business in the US; Kai runs e-commerce brands.
- "Live training every week" matches the real webinar schedule.

## Design

SWS Design System V1, Palette A.

- Colours: base `#fbfbf8`, ink `#101419`, blue `#5f92e2` / `#356ec6`, yellow `#ffcf34`, navy `#08162a`. No purple.
- Type: Bricolage Grotesque bold for headlines, Figtree for text and labels, Geist Mono for numbers only.
- Yellow highlight bar under a word on light backgrounds; on navy use yellow text with no bar.
- Space: off-white base, white bands with hairline borders, 1080px column, 120px section padding, 20px card radius.
- Glass cards sit over soft blurred glows. Only the ad launcher section pins while you scroll; with reduced motion it lays out as a normal section showing every step.

## Technical rules

- Each built page must stay one self-contained file so it can be pasted into GoHighLevel.
- Source lives in `src/`; run `python3 build.py` after any change and commit the built pages too.
- No frameworks or external scripts. Fonts load from Google Fonts.
- Check at 1440px and 390px wide before shipping: no sideways scroll, nothing hidden under the nav or the mobile buy bar.
