import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function getValidAccessToken(supabase: any, userId: string): Promise<string | null> {
  const { data: tokens } = await supabase
    .from("google_tokens")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!tokens) return null;

  if (new Date(tokens.expires_at) > new Date(Date.now() + 5 * 60 * 1000)) {
    return tokens.access_token;
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: Deno.env.get("clientid")!,
      client_secret: Deno.env.get("clientsecret")!,
      refresh_token: tokens.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  if (data.error) return null;

  await supabase
    .from("google_tokens")
    .update({
      access_token: data.access_token,
      expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  return data.access_token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: isAdmin } = await supabase.rpc("has_role", {
    _user_id: user.id,
    _role: "admin",
  });
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const accessToken = await getValidAccessToken(supabase, user.id);
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Google not connected" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { action, property_id, start_date, end_date } = await req.json();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  if (action === "list_properties") {
    const res = await fetch(
      "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
      { headers }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "traffic_overview") {
    const body = {
      dateRanges: [{
        startDate: start_date || "28daysAgo",
        endDate: end_date || "today",
      }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
        { name: "screenPageViews" },
      ],
      dimensions: [{ name: "date" }],
      orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
    };

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/${property_id}:runReport`,
      { method: "POST", headers, body: JSON.stringify(body) }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "top_pages") {
    const body = {
      dateRanges: [{
        startDate: start_date || "28daysAgo",
        endDate: end_date || "today",
      }],
      metrics: [
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
        { name: "bounceRate" },
      ],
      dimensions: [{ name: "pagePath" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
    };

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/${property_id}:runReport`,
      { method: "POST", headers, body: JSON.stringify(body) }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "conversions") {
    const body = {
      dateRanges: [{
        startDate: start_date || "28daysAgo",
        endDate: end_date || "today",
      }],
      metrics: [
        { name: "conversions" },
        { name: "totalUsers" },
      ],
      dimensions: [{ name: "eventName" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: {
            values: ["generate_lead", "cta_click", "form_progress", "tool_interaction"],
          },
        },
      },
    };

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/${property_id}:runReport`,
      { method: "POST", headers, body: JSON.stringify(body) }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "traffic_sources") {
    const body = {
      dateRanges: [{
        startDate: start_date || "28daysAgo",
        endDate: end_date || "today",
      }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
      ],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    };

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/${property_id}:runReport`,
      { method: "POST", headers, body: JSON.stringify(body) }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Unknown action" }), {
    status: 400,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
