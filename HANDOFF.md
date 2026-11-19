# Handoff notes

## Positioning

- The product is Selling with Social: run your own Facebook and Instagram ads in-house.
- Every page leads with **Fire your agency.**
- The ad launcher is the hero of the product. Everything else (tracking, instant replies, reactivating an old list, weekly training) supports it and comes second.
- Price is **$297 a month, no setup fee**, but it is never shown up front. The page sells first: the price first appears in the cost calculator directly above the pricing section. Everything before that says "Get started".
- Buyers get instant access and land in the ad launcher. No "book a call".

## Page order (same sell-through as the previous site)

1. Hero: the promise, no price.
2. The problem (scroll hold): a month with an agency, day 1 to day 30.
3. The fix (scroll hold): the ad launcher in four steps.
4. What's inside (scroll hold): seven features, one at a time.
5. Better leads (dark): tracking that tells Meta who buys.
6. Made for how you work: example headlines by industry.
7. The ad is only the start (dark): launch, reply, track, reactivate.
8. The process: three steps.
9. Agency vs in-house table.
10. Founders.
11. Cost calculator, then pricing (dark, glass card).
12. Webinar, FAQ, final call to action.

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
- Glass cards sit over soft blurred glows. Three sections pin while you scroll (problem, ad launcher, what's inside); with reduced motion they lay out as normal sections showing every step.

## Technical rules

- Each built page must stay one self-contained file so it can be pasted into GoHighLevel.
- Source lives in `src/`; run `python3 build.py` after any change and commit the built pages too.
- No frameworks or external scripts. Fonts load from Google Fonts.
- Check at 1440px and 390px wide before shipping: no sideways scroll, nothing hidden under the nav or the mobile buy bar.
