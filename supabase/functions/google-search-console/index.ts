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

  // If token is still valid (with 5 min buffer)
  if (new Date(tokens.expires_at) > new Date(Date.now() + 5 * 60 * 1000)) {
    return tokens.access_token;
  }

  // Refresh the token
  const CLIENT_ID = Deno.env.get("clientid")!;
  const CLIENT_SECRET = Deno.env.get("clientsecret")!;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: tokens.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  if (data.error) return null;

  const expiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString();
  await supabase
    .from("google_tokens")
    .update({
      access_token: data.access_token,
      expires_at: expiresAt,
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

  const { action, site_url, start_date, end_date, language_prefix } = await req.json();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  if (action === "list_sites") {
    const res = await fetch("https://www.googleapis.com/webmasters/v3/sites", { headers });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "index_status") {
    // Use the URL Inspection-like approach via search analytics
    // Get pages with impressions grouped by page
    const body = {
      startDate: start_date || new Date(Date.now() - 28 * 86400000).toISOString().split("T")[0],
      endDate: end_date || new Date().toISOString().split("T")[0],
      dimensions: ["page"],
      rowLimit: 500,
      ...(language_prefix && language_prefix !== "all"
        ? { dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: `/${language_prefix}/` }] }] }
        : {}),
    };

    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site_url)}/searchAnalytics/query`,
      { method: "POST", headers, body: JSON.stringify(body) }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "search_queries") {
    const body = {
      startDate: start_date || new Date(Date.now() - 28 * 86400000).toISOString().split("T")[0],
      endDate: end_date || new Date().toISOString().split("T")[0],
      dimensions: ["query"],
      rowLimit: 50,
      ...(language_prefix && language_prefix !== "all"
        ? { dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: `/${language_prefix}/` }] }] }
        : {}),
    };

    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site_url)}/searchAnalytics/query`,
      { method: "POST", headers, body: JSON.stringify(body) }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "performance_by_country") {
    const body = {
      startDate: start_date || new Date(Date.now() - 28 * 86400000).toISOString().split("T")[0],
      endDate: end_date || new Date().toISOString().split("T")[0],
      dimensions: ["country"],
      rowLimit: 25,
    };

    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site_url)}/searchAnalytics/query`,
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
