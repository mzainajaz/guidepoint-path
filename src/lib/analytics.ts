/**
 * GA4 Data Layer & Analytics Utility
 *
 * Centralised helper for sending GA4 events via gtag().
 * All conversion and custom events flow through here so
 * the data layer stays consistent and auditable.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

// ─── Page view (called by useAnalyticsTracker on every route change) ───
export function trackPageView(path: string, title?: string) {
  gtag("event", "page_view", {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
  fbq("track", "PageView");
}

// ─── Lead conversion ───
export function trackLeadSubmission(params: {
  business_type?: string;
  setup_preference?: string;
  budget?: string;
  country?: string;
  source?: string;
}) {
  // Primary conversion event
  gtag("event", "generate_lead", {
    currency: "AED",
    value: 1,
    ...params,
  });

  // Meta Pixel lead event
  fbq("track", "Lead", {
    content_name: params.business_type || "general",
    content_category: params.setup_preference || "unknown",
    currency: "AED",
    value: 1,
  });

  pushToDataLayer("lead_submission", params);
}

// ─── Tool usage events ───
export function trackToolUsage(
  tool: "cost_estimator" | "zone_picker" | "vat_helper",
  action: string,
  params?: Record<string, unknown>
) {
  gtag("event", "tool_interaction", {
    tool_name: tool,
    tool_action: action,
    ...params,
  });
}

// ─── CTA / engagement events ───
export function trackCTAClick(
  cta_id: string,
  cta_text: string,
  location?: string
) {
  gtag("event", "cta_click", {
    cta_id,
    cta_text,
    cta_location: location || "unknown",
  });
  fbq("trackCustom", "CTAClick", { cta_id, cta_text });
}

// ─── Content engagement ───
export function trackContentView(
  content_type: "blog" | "guide" | "howto" | "comparison" | "freezone",
  slug: string
) {
  gtag("event", "content_view", {
    content_type,
    content_id: slug,
  });
  fbq("track", "ViewContent", {
    content_type,
    content_ids: [slug],
  });
}

// ─── Scroll depth (call at thresholds) ───
export function trackScrollDepth(depth: 25 | 50 | 75 | 90 | 100) {
  gtag("event", "scroll", {
    percent_scrolled: depth,
    page_path: window.location.pathname,
  });
}

// ─── Contact form step progression ───
export function trackFormStep(step: number, totalSteps: number) {
  gtag("event", "form_progress", {
    form_name: "lead_qualification",
    form_step: step + 1,
    form_total_steps: totalSteps,
  });
}

// ─── Generic dataLayer push (for GTM) ───
export function pushToDataLayer(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  }
}

// ─── Outbound link tracking ───
export function trackOutboundLink(url: string, label?: string) {
  gtag("event", "click", {
    event_category: "outbound",
    event_label: label || url,
    transport_type: "beacon",
  });
}
