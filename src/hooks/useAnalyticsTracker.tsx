import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackPageView, trackScrollDepth } from "@/lib/analytics";

function getSessionId(): string {
  let sid = sessionStorage.getItem("_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("_sid", sid);
  }
  return sid;
}

function getUtmParams() {
  const sp = new URLSearchParams(window.location.search);
  return {
    utm_source: sp.get("utm_source") || null,
    utm_medium: sp.get("utm_medium") || null,
    utm_campaign: sp.get("utm_campaign") || null,
  };
}

export function useAnalyticsTracker() {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const scrollFired = useRef(new Set<number>());

  useEffect(() => {
    startTime.current = Date.now();
    scrollFired.current = new Set();

    // GA4 page view
    trackPageView(location.pathname);

    // Supabase page view
    const sessionId = getSessionId();
    const utm = getUtmParams();

    supabase.from("page_views").insert({
      session_id: sessionId,
      page_path: location.pathname,
      referrer: document.referrer || null,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      user_agent: navigator.userAgent,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      language: navigator.language,
    }).then(() => {});

    // Scroll depth tracking
    const thresholds = [25, 50, 75, 90, 100] as const;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      for (const t of thresholds) {
        if (pct >= t && !scrollFired.current.has(t)) {
          scrollFired.current.add(t);
          trackScrollDepth(t);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);
}
