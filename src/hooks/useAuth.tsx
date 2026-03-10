import { useState, useEffect, createContext, useContext, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContext {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthContext>({
  user: null, session: null, isAdmin: false, loading: true,
  signIn: async () => ({ error: null }), signUp: async () => ({ error: null }), signOut: async () => {},
});

export const useAuth = () => useContext(AuthCtx);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const adminCheckId = useRef(0);

  const checkAdmin = useCallback(async (uid: string | null) => {
    const thisCheck = ++adminCheckId.current;
    if (!uid) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: uid,
        _role: "admin",
      });
      // Only apply if this is still the latest check
      if (thisCheck !== adminCheckId.current) return;
      if (error) {
        console.error("checkAdmin error:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (err) {
      if (thisCheck !== adminCheckId.current) return;
      console.error("checkAdmin exception:", err);
      setIsAdmin(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    // 1. Set up listener first (Supabase best practice)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, sess) => {
        if (!mounted) return;
        setSession(sess);
        setUser(sess?.user ?? null);
        // Defer admin check to avoid blocking auth state change
        // Use setTimeout(0) to break out of the onAuthStateChange callback
        setTimeout(() => {
          if (mounted) checkAdmin(sess?.user?.id ?? null);
        }, 0);
      }
    );

    // 2. Get initial session
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (!mounted) return;
      setSession(sess);
      setUser(sess?.user ?? null);
      checkAdmin(sess?.user?.id ?? null);
    }).catch((err) => {
      console.error("getSession error:", err);
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkAdmin]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthCtx.Provider value={{ user, session, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
};
