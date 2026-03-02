import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    startTime.current = Date.now();

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
  }, [location.pathname]);
}
