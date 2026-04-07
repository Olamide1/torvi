/**
 * Server-side conversion events — fires to Meta CAPI and TikTok Events API.
 * Both silently no-op when the required env vars are absent, so this is safe
 * to call unconditionally; add the tokens when you're ready to run ads.
 *
 * Required env vars:
 *   META_PIXEL_ID          — your Meta Pixel ID (numeric string)
 *   META_CAPI_ACCESS_TOKEN — System User access token from Meta Business Manager
 *   TIKTOK_PIXEL_ID        — your TikTok Pixel ID
 *   TIKTOK_CAPI_TOKEN      — Events API access token from TikTok Business Center
 */

import crypto from "crypto";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

type ServerEvent = "Lead" | "Purchase" | "CompleteRegistration" | "InitiateCheckout" | "Subscribe";

interface ServerEventPayload {
  email: string;
  eventSourceUrl?: string;
  value?: number;
  currency?: string;
  orderId?: string;
}

// ─── Meta Conversions API ────────────────────────────────────────────────────

async function sendMetaEvent(event: ServerEvent, payload: ServerEventPayload) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) return;

  try {
    await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: event,
              event_time: Math.floor(Date.now() / 1000),
              action_source: "website",
              event_source_url: payload.eventSourceUrl,
              user_data: {
                em: [sha256(payload.email)],
              },
              custom_data:
                payload.value !== undefined
                  ? { value: payload.value, currency: payload.currency ?? "EUR", order_id: payload.orderId }
                  : undefined,
            },
          ],
        }),
      }
    );
  } catch {
    // Never let conversion tracking failures surface to the user
  }
}

// ─── TikTok Events API ───────────────────────────────────────────────────────

const TIKTOK_EVENT_MAP: Record<ServerEvent, string> = {
  Lead: "SubmitForm",
  Purchase: "CompletePayment",
  CompleteRegistration: "CompleteRegistration",
  InitiateCheckout: "InitiateCheckout",
  Subscribe: "Subscribe",
};

async function sendTikTokEvent(event: ServerEvent, payload: ServerEventPayload) {
  const pixelId = process.env.TIKTOK_PIXEL_ID;
  const token = process.env.TIKTOK_CAPI_TOKEN;
  if (!pixelId || !token) return;

  try {
    await fetch("https://business-api.tiktok.com/open_api/v1.3/pixel/track/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": token,
      },
      body: JSON.stringify({
        pixel_code: pixelId,
        event: TIKTOK_EVENT_MAP[event],
        timestamp: new Date().toISOString(),
        context: {
          user: { email: sha256(payload.email) },
          page: { url: payload.eventSourceUrl },
        },
        properties:
          payload.value !== undefined
            ? { value: payload.value, currency: payload.currency ?? "EUR", order_id: payload.orderId }
            : undefined,
      }),
    });
  } catch {
    // Never let conversion tracking failures surface to the user
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function serverTrackLead(email: string, sourceUrl?: string) {
  await Promise.all([
    sendMetaEvent("Lead", { email, eventSourceUrl: sourceUrl }),
    sendTikTokEvent("Lead", { email, eventSourceUrl: sourceUrl }),
  ]);
}

export async function serverTrackPurchase(
  email: string,
  value: number,
  orderId?: string,
  sourceUrl?: string
) {
  await Promise.all([
    sendMetaEvent("Purchase", { email, value, orderId, eventSourceUrl: sourceUrl }),
    sendTikTokEvent("Purchase", { email, value, orderId, eventSourceUrl: sourceUrl }),
  ]);
}

export async function serverTrackSubscribe(email: string, sourceUrl?: string) {
  await Promise.all([
    sendMetaEvent("Subscribe", { email, eventSourceUrl: sourceUrl }),
    sendTikTokEvent("Subscribe", { email, eventSourceUrl: sourceUrl }),
  ]);
}
