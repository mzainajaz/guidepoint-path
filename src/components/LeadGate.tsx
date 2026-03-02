import { useState, useCallback } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/i18n/context";
import { countryCodes, type CountryCode } from "@/data/countryCodes";

const STORAGE_KEY = "leadgate_submitted";

const leadSchema = z.object({
  name: z.string().trim().min(1, "required").max(100),
  email: z.string().trim().email("invalid_email").max(255),
  phone: z.string().trim().min(4, "required").max(20).regex(/^[0-9\s\-+()]+$/, "invalid_phone"),
});

type LeadData = z.infer<typeof leadSchema>;

function isAlreadySubmitted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function markSubmitted() {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // silent
  }
}

interface LeadGateProps {
  children: React.ReactNode;
}

const LeadGate = ({ children }: LeadGateProps) => {
  const t = useT();
  const lg = t.leadGate;
  const [submitted, setSubmitted] = useState(isAlreadySubmitted);
  const [form, setForm] = useState<LeadData>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [countryOpen, setCountryOpen] = useState(false);

  const handleChange = useCallback((field: keyof LeadData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = `${selectedCountry.dial} ${form.phone}`;
    const result = leadSchema.safeParse({ ...form, phone: fullPhone });
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LeadData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LeadData;
        fieldErrors[field] = err.message === "invalid_email" ? lg.invalidEmail
          : err.message === "invalid_phone" ? lg.invalidPhone
          : lg.fieldRequired;
      });
      setErrors(fieldErrors);
      return;
    }
    // Save lead to database with URL params
    const sp = new URLSearchParams(window.location.search);
    supabase.from("leads").insert({
      name: result.data.name,
      email: result.data.email,
      phone: fullPhone,
      source_url: window.location.href,
      utm_source: sp.get("utm_source") || null,
      utm_medium: sp.get("utm_medium") || null,
      utm_campaign: sp.get("utm_campaign") || null,
      utm_term: sp.get("utm_term") || null,
      utm_content: sp.get("utm_content") || null,
      referrer: document.referrer || null,
      landing_page: window.location.pathname,
      user_agent: navigator.userAgent,
    }).then(() => {});

    markSubmitted();
    setSubmitted(true);
  }, [form, selectedCountry, lg]);

  if (submitted) return <>{children}</>;

  return (
    <div className="relative">
      {/* Blurred preview behind */}
      <div className="pointer-events-none select-none blur-sm opacity-40 max-h-[60vh] overflow-hidden" aria-hidden>
        {children}
      </div>

      {/* Gate overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 flex items-start justify-center pt-8 md:pt-16 z-10"
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
              <Lock className="h-3 w-3" />
              {lg.freeAccess}
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {lg.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              To proceed, please share the following details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <Label htmlFor="lead-name" className="text-sm font-medium text-foreground">
                {lg.nameLabel}
              </Label>
              <Input
                id="lead-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={lg.namePlaceholder}
                maxLength={100}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="lead-email" className="text-sm font-medium text-foreground">
                {lg.emailLabel}
              </Label>
              <Input
                id="lead-email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={lg.emailPlaceholder}
                maxLength={255}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            {/* Phone with country selector */}
            <div>
              <Label htmlFor="lead-phone" className="text-sm font-medium text-foreground">
                {lg.phoneLabel}
              </Label>
              <div className="flex gap-2">
                {/* Country code dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryOpen(!countryOpen)}
                    className="flex items-center gap-1 h-10 px-3 border border-border rounded-md bg-background text-sm hover:bg-secondary transition-colors min-w-[100px]"
                  >
                    <span>{selectedCountry.flag}</span>
                    <span className="text-muted-foreground">{selectedCountry.dial}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground ml-auto" />
                  </button>
                  <AnimatePresence>
                    {countryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute top-12 left-0 z-50 w-64 max-h-56 overflow-auto border border-border rounded-lg bg-card shadow-xl"
                      >
                        {countryCodes.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => { setSelectedCountry(c); setCountryOpen(false); }}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors text-left ${
                              selectedCountry.code === c.code ? "bg-accent/5 text-accent" : "text-foreground"
                            }`}
                          >
                            <span>{c.flag}</span>
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className="text-muted-foreground text-xs">{c.dial}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Input
                  id="lead-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder={lg.phonePlaceholder}
                  maxLength={20}
                  className={`flex-1 ${errors.phone ? "border-destructive" : ""}`}
                />
              </div>
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11 text-sm font-semibold"
            >
              {lg.cta} <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              {lg.privacy}
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadGate;
