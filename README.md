# sellingwithsocial.com

Marketing site for Selling with Social. One message: **Fire your agency.** Run your own Facebook and Instagram ads with AI, $297 a month, no setup fee.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing page. Sells problem to solution first; price appears only at the bottom. |
| `webinar.html` | Free webinar registration. |
| `thank-you.html` | Shown after registering. |

Each page in the repo root is one self-contained file (CSS, JS and logos inlined). Host them on any static host, or paste a whole file into a GoHighLevel custom-code element.

## Before going live

Edit `src/config.js`, then run `python3 build.py`.

1. `CHECKOUT_URL`: the GoHighLevel SaaS checkout link for the $297 plan. Until it is set, buy buttons only scroll to the pricing section.
2. `WEBINAR_WEBHOOK`: a GoHighLevel inbound webhook. It receives `first_name`, `email`, `phone`, `source` as a form-encoded POST. Until it is set, the form says it is not connected and registers nobody. Send one test registration and confirm the contact appears.
3. `NEXT_WEBINAR`: date and time text, for example `Friday 4 December, 4:30pm ET`.
4. Meta Pixel: paste the base code where each page says `<!-- Meta Pixel -->`.
5. Replace the two founder photo placeholders in `src/pages/index.html`.
6. Add Terms and Privacy pages and link them in `src/footer.html`.

## Editing

Edit files in `src/`, never the built pages in the root.

```
src/config.js       links and webinar date
src/base.css        brand tokens and shared styles
src/index.css/.js   landing page
src/funnel.css      webinar and thank-you pages
src/footer.html     shared footer
src/pages/*.html    page markup
assets/             logos (inlined at build)
python3 build.py    writes index.html, webinar.html, thank-you.html
```

See `HANDOFF.md` for the brand and copy rules.
