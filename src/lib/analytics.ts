/* eslint-disable @typescript-eslint/no-explicit-any */

type EventParams = Record<string, string | number | boolean | undefined>;

// ─── Low-level GA4 custom event ──────────────────────────────────────────────
export function trackEvent(event: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  (window as any).gtag?.("event", event, params);
}

// ─── Unified conversion events ────────────────────────────────────────────────
// Fires the same conversion across GA4, Meta Pixel, and TikTok Pixel
// using each platform's standard event names so ad optimisation works correctly.

type ConversionEvent =
  | "view_content"
  | "lead"
  | "complete_registration"
  | "initiate_checkout"
  | "purchase"
  | "subscribe";

interface ConversionParams {
  role?: string;
  content_name?: string;
  value?: number;
  currency?: string;
}

const GA4_MAP: Record<ConversionEvent, string> = {
  view_content: "view_item",
  lead: "generate_lead",
  complete_registration: "sign_up",
  initiate_checkout: "begin_checkout",
  purchase: "purchase",
  subscribe: "subscribe",
};

const META_MAP: Record<ConversionEvent, string> = {
  view_content: "ViewContent",
  lead: "Lead",
  complete_registration: "CompleteRegistration",
  initiate_checkout: "InitiateCheckout",
  purchase: "Purchase",
  subscribe: "Subscribe",
};

const TIKTOK_MAP: Record<ConversionEvent, string> = {
  view_content: "ViewContent",
  lead: "SubmitForm",
  complete_registration: "CompleteRegistration",
  initiate_checkout: "InitiateCheckout",
  purchase: "CompletePayment",
  subscribe: "Subscribe",
};

export function trackConversion(event: ConversionEvent, params?: ConversionParams) {
  if (typeof window === "undefined") return;
  const w = window as any;
  const currency = params?.currency ?? "EUR";
  const contentName = params?.content_name ?? params?.role;

  // GA4
  w.gtag?.("event", GA4_MAP[event], {
    value: params?.value,
    currency,
    content_name: contentName,
  });

  // Meta Pixel
  w.fbq?.("track", META_MAP[event], {
    value: params?.value,
    currency,
    content_name: contentName,
  });

  // TikTok Pixel
  w.ttq?.track?.(TIKTOK_MAP[event], {
    value: params?.value,
    currency,
    content_name: contentName,
  });
}
