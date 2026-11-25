/**
 * Site config. Every link and fee the site uses lives here. Edit these values;
 * nothing else needs to change.
 */
export const siteConfig = {
  /** GoHighLevel order form for Self-serve ($249/month). */
  CHECKOUT_249_URL: "",
  /** GoHighLevel order form for Supported ($349/month). */
  CHECKOUT_349_URL: "",
  /** GoHighLevel order form for Done with you (onboarding fee, then $349/month). */
  CHECKOUT_ONBOARDING_URL: "",
  /** One-off onboarding fee for Done with you, in dollars. */
  ONBOARDING_FEE: 1000,
  /** One-time-offer onboarding price shown on /upgrade, in dollars. */
  UPSELL_FEE: 1100,
  /** Sales video. A video file (.mp4, .webm) or an embed link (YouTube, Vimeo, Wistia). */
  VSL_URL: "",
  /** Where onboarding buyers book their call. */
  BOOKING_URL: "",
  /** Intake form every buyer fills in after purchase. */
  INTAKE_FORM_URL: "",
  /** The self-serve library and community. */
  COMMUNITY_URL: "",
} as const;

/** Buy buttons scroll here while their checkout link is empty. */
export const PRICING_ANCHOR = "#pricing";

export const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Link props for a buy button: the real checkout in a new tab, or a scroll to pricing. */
export function buyLink(url: string) {
  return url
    ? ({ href: url, target: "_blank", rel: "noopener" } as const)
    : ({ href: PRICING_ANCHOR } as const);
}
