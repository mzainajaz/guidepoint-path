import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === "reset") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        toast.success("Password reset link sent! Check your email.");
        setMode("login");
      }
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const result = await signUp(email, password);
      if (result.error) {
        // If user already exists, suggest login instead
        if (result.error.toLowerCase().includes("already")) {
          setError("Account already exists. Try signing in or resetting your password.");
        } else {
          setError(result.error);
        }
        setLoading(false);
      } else {
        const loginResult = await signIn(email, password);
        if (loginResult.error) {
          setError("Account created! Please sign in.");
          setMode("login");
          setLoading(false);
        } else {
          navigate("/admin");
        }
      }
    } else {
      const result = await signIn(email, password);
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        navigate("/admin");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm mx-4">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground">
              {mode === "signup" ? "Create Account" : mode === "reset" ? "Reset Password" : "Admin Login"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "signup" ? "Create your admin account" : mode === "reset" ? "Enter your email to receive a reset link" : "Sign in to access the dashboard"}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            {mode !== "reset" && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : mode === "signup" ? "Create Account" : mode === "reset" ? "Send Reset Link" : "Sign In"}
            </Button>
            <div className="flex flex-col gap-1 items-center">
              {mode === "login" && (
                <>
                  <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => { setMode("reset"); setError(null); }}>
                    Forgot password?
                  </button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => { setMode("signup"); setError(null); }}>
                    Need an account? Sign up
                  </button>
                </>
              )}
              {mode !== "login" && (
                <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => { setMode("login"); setError(null); }}>
                  Back to sign in
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
