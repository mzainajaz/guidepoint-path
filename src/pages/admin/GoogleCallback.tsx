import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      setStatus("error");
      setErrorMsg(error);
      return;
    }

    if (!code || !session) {
      setStatus("error");
      setErrorMsg("Missing authorization code or session.");
      return;
    }

    const exchange = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("google-auth", {
          body: {
            action: "exchange_code",
            code,
            redirect_uri: `${window.location.origin}/admin/google-callback`,
          },
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        if (fnError || data?.error) {
          setStatus("error");
          setErrorMsg(data?.error || fnError?.message || "Token exchange failed");
          return;
        }

        setStatus("success");
        setTimeout(() => navigate("/admin/search-performance"), 1500);
      } catch (e: any) {
        setStatus("error");
        setErrorMsg(e.message || "Unexpected error");
      }
    };

    exchange();
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card border border-border rounded-xl p-8 text-center max-w-sm space-y-3">
        {status === "loading" && (
          <>
            <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Connecting Google account…</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-3xl">✓</div>
            <p className="text-sm text-foreground font-medium">Connected! Redirecting…</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-3xl">✕</div>
            <p className="text-sm text-destructive font-medium">Connection failed</p>
            <p className="text-xs text-muted-foreground">{errorMsg}</p>
            <button onClick={() => navigate("/admin/search-performance")} className="text-xs text-accent underline mt-2">
              Back to dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
