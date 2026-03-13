import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (per isolate lifetime)
const ipCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max submissions per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function sanitize(val: unknown, maxLen = 200): string | null {
  if (typeof val !== "string") return null;
  const trimmed = val.trim().slice(0, maxLen);
  return trimmed || null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();

    // Validate required fields
    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 255);
    const phone = sanitize(body.phone, 30);
    const country = sanitize(body.country, 80);

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: "Name is required (min 2 chars)." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || !validateEmail(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!phone || phone.length < 6) {
      return new Response(JSON.stringify({ error: "Valid phone number is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!country) {
      return new Response(JSON.stringify({ error: "Country is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Optional fields
    const business_type = sanitize(body.business_type, 50);
    const setup_preference = sanitize(body.setup_preference, 50);
    const budget = sanitize(body.budget, 50);
    const source_url = sanitize(body.source_url, 500);
    const utm_source = sanitize(body.utm_source, 100);
    const utm_medium = sanitize(body.utm_medium, 100);
    const utm_campaign = sanitize(body.utm_campaign, 100);
    const utm_term = sanitize(body.utm_term, 100);
    const utm_content = sanitize(body.utm_content, 100);
    const referrer = sanitize(body.referrer, 500);
    const landing_page = sanitize(body.landing_page, 500);
    const user_agent = sanitize(body.user_agent, 500);

    // Validate arrays
    const contact_preference = Array.isArray(body.contact_preference)
      ? body.contact_preference.filter((v: unknown) => typeof v === "string").slice(0, 5).map((v: string) => v.slice(0, 50))
      : [];
    const additional_services = Array.isArray(body.additional_services)
      ? body.additional_services.filter((v: unknown) => typeof v === "string").slice(0, 10).map((v: string) => v.slice(0, 50))
      : null;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await sb.from("leads").insert({
      name,
      email,
      phone,
      country,
      business_type,
      contact_preference,
      setup_preference,
      budget,
      additional_services,
      source_url,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
      landing_page,
      user_agent,
      ip_address: ip,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-lead error:", e);
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
