type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag?.("event", event, params);
}
