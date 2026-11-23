/**
 * Site config. Edit these values, nothing else needs to change.
 */
export const siteConfig = {
  /** Checkout link for the $297/month plan. While empty, buy buttons scroll to the offer section. */
  CHECKOUT_URL: "",
  /** Where "free webinar" links go. While empty, webinar links are hidden. */
  WEBINAR_URL: "",
  /** Next webinar date as shown on the page, e.g. "Friday 4 December, 4:30pm ET". */
  NEXT_WEBINAR: "",
} as const;

/** Section the buy button scrolls to while CHECKOUT_URL is empty. */
export const OFFER_ANCHOR = "#offer";

/** Where the buy button should point right now. */
export function checkoutHref(): string {
  return siteConfig.CHECKOUT_URL || OFFER_ANCHOR;
}
