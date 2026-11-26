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
  /** Waitlist form. Buy buttons go here while their checkout link is empty. */
  WAITLIST_URL: "",
} as const;

/**
 * Proof strip under the hero. These are placeholders in [brackets].
 * Replace them with real, permissioned results before launch.
 */
export const proofStats = [
  { value: "[00%]", label: "more leads from the same ads" },
  { value: "[$00k]", label: "added revenue in [00] days" },
  { value: "[00]", label: "bookings a month" },
];

/** Buy buttons scroll here while their checkout link is empty. */
export const PRICING_ANCHOR = "#pricing";

export const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/**
 * What a plan's button does. With a checkout link it is a buy button that opens
 * the order form. Without one it is a waitlist button that opens the waitlist
 * form (or stays on pricing until WAITLIST_URL is set). It never fakes a checkout.
 */
export function planAction(checkoutUrl: string, buyLabel: string) {
  if (checkoutUrl) {
    return { kind: "buy", label: buyLabel, link: { href: checkoutUrl, target: "_blank", rel: "noopener" } } as const;
  }
  const w = siteConfig.WAITLIST_URL as string;
  return {
    kind: "waitlist",
    label: "Join the waitlist",
    link: w ? { href: w, target: "_blank", rel: "noopener" } : { href: PRICING_ANCHOR },
  } as const;
}
