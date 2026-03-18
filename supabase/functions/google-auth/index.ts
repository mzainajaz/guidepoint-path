import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
].join(" ");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Verify admin
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
  } = await supabase.auth.getUser(token);
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

  const CLIENT_ID = Deno.env.get("clientid")!;
  const CLIENT_SECRET = Deno.env.get("clientsecret")!;

  const { action, code, redirect_uri } = await req.json();

  if (action === "get_auth_url") {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: redirect_uri,
      response_type: "code",
      scope: SCOPES,
      access_type: "offline",
      prompt: "consent",
    });
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    return new Response(JSON.stringify({ url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "exchange_code") {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return new Response(JSON.stringify({ error: tokenData.error_description || tokenData.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();

    await supabase.from("google_tokens").upsert(
      {
        user_id: user.id,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: expiresAt,
        scopes: SCOPES.split(" "),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "status") {
    const { data: tokens } = await supabase
      .from("google_tokens")
      .select("expires_at, scopes")
      .eq("user_id", user.id)
      .single();

    return new Response(
      JSON.stringify({
        connected: !!tokens,
        expires_at: tokens?.expires_at,
        scopes: tokens?.scopes,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (action === "disconnect") {
    await supabase.from("google_tokens").delete().eq("user_id", user.id);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Unknown action" }), {
    status: 400,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
