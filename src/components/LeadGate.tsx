import { useState, useCallback } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Lock, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { trackLeadSubmission, trackFormStep } from "@/lib/analytics";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/i18n/context";
import { countryCodes, type CountryCode } from "@/data/countryCodes";

const STORAGE_KEY = "leadgate_submitted";

function isAlreadySubmitted(): boolean {
  try { return localStorage.getItem(STORAGE_KEY) === "true"; } catch { return false; }
}
function markSubmitted() {
  try { localStorage.setItem(STORAGE_KEY, "true"); } catch { /* silent */ }
}

const BUSINESS_TYPES = [
  { value: "consulting", label: "Consulting / Professional Services" },
  { value: "ecommerce", label: "E-Commerce / Online Retail" },
  { value: "it", label: "IT / Software / SaaS" },
  { value: "marketing", label: "Marketing / Media / Creative" },
  { value: "trading", label: "General Trading / Import-Export" },
  { value: "freelance", label: "Freelancing / Solo Practice" },
  { value: "holding", label: "Holding / Investment" },
  { value: "other", label: "Other / Not sure yet" },
];

const CONTACT_METHODS = [
  { value: "phone", label: "📞 Phone call" },
  { value: "whatsapp", label: "💬 WhatsApp" },
  { value: "email", label: "✉️ Email" },
];

const SETUP_PREFERENCES = [
  { value: "freezone", label: "Free Zone" },
  { value: "mainland", label: "Mainland" },
  { value: "educate", label: "Educate me — I'm not sure yet" },
];

const BUDGET_RANGES = [
  { value: "under-15k", label: "Under AED 15,000" },
  { value: "15k-30k", label: "AED 15,000 – 30,000" },
  { value: "30k-60k", label: "AED 30,000 – 60,000" },
  { value: "60k-plus", label: "AED 60,000+" },
  { value: "unsure", label: "Not sure yet" },
];

const ADDITIONAL_SERVICES = [
  { value: "office", label: "Office space" },
  { value: "banking", label: "Bank account opening" },
  { value: "relocation", label: "Relocation / visa support" },
  { value: "accounting", label: "Accounting / bookkeeping" },
  { value: "none", label: "None — just the licence" },
];

interface LeadGateProps {
  children: React.ReactNode;
}

const LeadGate = ({ children }: LeadGateProps) => {
  const t = useT();
  const lg = t.leadGate;
  const [submitted, setSubmitted] = useState(isAlreadySubmitted);
  const [step, setStep] = useState(0);

  // Step 0: contact info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [country, setCountry] = useState("");

  // Step 1: business details
  const [businessType, setBusinessType] = useState("");
  const [contactPref, setContactPref] = useState<string[]>([]);
  const [setupPref, setSetupPref] = useState("");

  // Step 2: budget & services
  const [budget, setBudget] = useState("");
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleArrayValue = (arr: string[], val: string, setter: (v: string[]) => void) => {
    if (val === "none") {
      setter(arr.includes("none") ? [] : ["none"]);
      return;
    }
    const without = arr.filter((v) => v !== "none");
    setter(without.includes(val) ? without.filter((v) => v !== val) : [...without, val]);
  };

  const validateStep0 = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = lg.fieldRequired;
    if (!email.trim() || !z.string().email().safeParse(email.trim()).success) errs.email = lg.invalidEmail;
    const fullPhone = `${selectedCountry.dial} ${phone}`;
    if (!phone.trim() || phone.trim().length < 4) errs.phone = lg.invalidPhone;
    if (!country.trim()) errs.country = lg.fieldRequired;
    if (Object.keys(errs).length) { setErrors(errs); return false; }
    setErrors({});
    return true;
  }, [name, email, phone, country, selectedCountry, lg]);

  const validateStep1 = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!businessType) errs.businessType = lg.fieldRequired;
    if (contactPref.length === 0) errs.contactPref = lg.fieldRequired;
    if (!setupPref) errs.setupPref = lg.fieldRequired;
    if (Object.keys(errs).length) { setErrors(errs); return false; }
    setErrors({});
    return true;
  }, [businessType, contactPref, setupPref, lg]);

  const handleNext = useCallback(() => {
    if (step === 0 && validateStep0()) { trackFormStep(0, 3); setStep(1); }
    else if (step === 1 && validateStep1()) { trackFormStep(1, 3); setStep(2); }
  }, [step, validateStep0, validateStep1]);

  const handleSubmit = useCallback(() => {
    // Step 2 has no required fields, just submit
    const fullPhone = `${selectedCountry.dial} ${phone.trim()}`;
    const sp = new URLSearchParams(window.location.search);

    supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim(),
      phone: fullPhone,
      country: country.trim(),
      business_type: businessType,
      contact_preference: contactPref,
      setup_preference: setupPref,
      budget: budget || null,
      additional_services: additionalServices.length ? additionalServices : null,
      source_url: window.location.href,
      utm_source: sp.get("utm_source") || null,
      utm_medium: sp.get("utm_medium") || null,
      utm_campaign: sp.get("utm_campaign") || null,
      utm_term: sp.get("utm_term") || null,
      utm_content: sp.get("utm_content") || null,
      referrer: document.referrer || null,
      landing_page: window.location.pathname,
      user_agent: navigator.userAgent,
    } as any).then(() => {});

    markSubmitted();
    setSubmitted(true);
  }, [name, email, phone, selectedCountry, country, businessType, contactPref, setupPref, budget, additionalServices]);

  if (submitted) return <>{children}</>;

  const TOTAL_STEPS = 3;

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="pointer-events-none select-none blur-sm opacity-40 max-h-[60vh] overflow-hidden" aria-hidden>
        {children}
      </div>

      {/* Gate overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 flex items-start justify-center pt-8 md:pt-12 z-10"
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="badge-pill mb-3">
              <Lock className="h-3 w-3" />
              {lg.freeAccess}
            </div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">
              {lg.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {lg.subtitle}
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-accent" : "bg-secondary"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0: Contact info */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Step 1 of {TOTAL_STEPS} — Your details</p>

                {/* Name */}
                <div>
                  <Label htmlFor="lead-name" className="text-sm font-medium text-foreground">{lg.nameLabel}</Label>
                  <Input id="lead-name" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} placeholder={lg.namePlaceholder} maxLength={100} className={errors.name ? "border-destructive" : ""} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="lead-email" className="text-sm font-medium text-foreground">{lg.emailLabel}</Label>
                  <Input id="lead-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} placeholder={lg.emailPlaceholder} maxLength={255} className={errors.email ? "border-destructive" : ""} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="lead-phone" className="text-sm font-medium text-foreground">{lg.phoneLabel}</Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button type="button" onClick={() => setCountryOpen(!countryOpen)} className="flex items-center gap-1 h-10 px-3 border border-border rounded-md bg-background text-sm hover:bg-secondary transition-colors min-w-[100px]">
                        <span>{selectedCountry.flag}</span>
                        <span className="text-muted-foreground">{selectedCountry.dial}</span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground ml-auto" />
                      </button>
                      <AnimatePresence>
                        {countryOpen && (
                          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute top-12 left-0 z-50 w-64 max-h-48 overflow-auto border border-border rounded-lg bg-card shadow-xl">
                            {countryCodes.map((c) => (
                              <button key={c.code} type="button" onClick={() => { setSelectedCountry(c); setCountryOpen(false); }} className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors text-left ${selectedCountry.code === c.code ? "bg-accent/5 text-accent" : "text-foreground"}`}>
                                <span>{c.flag}</span>
                                <span className="flex-1 truncate">{c.name}</span>
                                <span className="text-muted-foreground text-xs">{c.dial}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Input id="lead-phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }} placeholder={lg.phonePlaceholder} maxLength={20} className={`flex-1 ${errors.phone ? "border-destructive" : ""}`} />
                  </div>
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>

                {/* Country of residence */}
                <div>
                  <Label htmlFor="lead-country" className="text-sm font-medium text-foreground">{lg.countryLabel}</Label>
                  <Input id="lead-country" value={country} onChange={(e) => { setCountry(e.target.value); setErrors((p) => ({ ...p, country: "" })); }} placeholder={lg.countryPlaceholder} maxLength={80} className={errors.country ? "border-destructive" : ""} />
                  {errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}
                </div>

                <Button onClick={handleNext} className="w-full bg-white text-black hover:bg-white/88 h-11 text-sm font-medium rounded-full tracking-wide">
                  {lg.continueBtn} <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {/* Step 1: Business details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Step 2 of {TOTAL_STEPS} — Your business</p>

                {/* Business type */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">{lg.businessTypeLabel}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {BUSINESS_TYPES.map((bt) => (
                      <button key={bt.value} type="button" onClick={() => { setBusinessType(bt.value); setErrors((p) => ({ ...p, businessType: "" })); }}
                        className={`text-left text-sm px-3 py-2.5 rounded-lg border transition-all ${businessType === bt.value ? "border-accent bg-accent/5 text-foreground" : "border-border text-muted-foreground hover:border-accent/30"}`}
                      >
                        {bt.label}
                      </button>
                    ))}
                  </div>
                  {errors.businessType && <p className="text-xs text-destructive mt-1">{errors.businessType}</p>}
                </div>

                {/* Contact preference */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">{lg.contactPrefLabel}</Label>
                  <div className="flex gap-2 flex-wrap">
                    {CONTACT_METHODS.map((cm) => (
                      <button key={cm.value} type="button" onClick={() => { toggleArrayValue(contactPref, cm.value, setContactPref); setErrors((p) => ({ ...p, contactPref: "" })); }}
                        className={`text-sm px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${contactPref.includes(cm.value) ? "border-accent bg-accent/5 text-foreground" : "border-border text-muted-foreground hover:border-accent/30"}`}
                      >
                        {contactPref.includes(cm.value) && <Check className="h-3 w-3 text-accent" />}
                        {cm.label}
                      </button>
                    ))}
                  </div>
                  {errors.contactPref && <p className="text-xs text-destructive mt-1">{errors.contactPref}</p>}
                </div>

                {/* Setup preference */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">{lg.setupPrefLabel}</Label>
                  <div className="space-y-2">
                    {SETUP_PREFERENCES.map((sp) => (
                      <button key={sp.value} type="button" onClick={() => { setSetupPref(sp.value); setErrors((p) => ({ ...p, setupPref: "" })); }}
                        className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ${setupPref === sp.value ? "border-accent bg-accent/5 text-foreground" : "border-border text-muted-foreground hover:border-accent/30"}`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                  {errors.setupPref && <p className="text-xs text-destructive mt-1">{errors.setupPref}</p>}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)} className="flex-1 rounded-full">
                    <ArrowLeft className="h-4 w-4" /> {t.common.back}
                  </Button>
                  <Button onClick={handleNext} className="flex-1 bg-white text-black hover:bg-white/88 h-11 text-sm font-medium rounded-full tracking-wide">
                    {lg.continueBtn} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget & services */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Step 3 of {TOTAL_STEPS} — Budget & needs</p>

                {/* Budget */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">{lg.budgetLabel}</Label>
                  <div className="space-y-2">
                    {BUDGET_RANGES.map((br) => (
                      <button key={br.value} type="button" onClick={() => setBudget(br.value)}
                        className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-all ${budget === br.value ? "border-accent bg-accent/5 text-foreground" : "border-border text-muted-foreground hover:border-accent/30"}`}
                      >
                        {br.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional services */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">{lg.servicesLabel}</Label>
                  <div className="flex flex-wrap gap-2">
                    {ADDITIONAL_SERVICES.map((s) => (
                      <button key={s.value} type="button" onClick={() => toggleArrayValue(additionalServices, s.value, setAdditionalServices)}
                        className={`text-sm px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${additionalServices.includes(s.value) ? "border-accent bg-accent/5 text-foreground" : "border-border text-muted-foreground hover:border-accent/30"}`}
                      >
                        {additionalServices.includes(s.value) && <Check className="h-3 w-3 text-accent" />}
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full">
                    <ArrowLeft className="h-4 w-4" /> {t.common.back}
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-white text-black hover:bg-white/88 h-11 text-sm font-medium rounded-full tracking-wide">
                    {lg.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {lg.privacy}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadGate;
