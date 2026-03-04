import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadGate from "@/components/LeadGate";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SEOHead, { serviceSchema } from "@/components/SEOHead";

const MANDATORY_THRESHOLD = 375000;
const VOLUNTARY_THRESHOLD = 187500;

interface VatQuestion {
  id: string;
  question: string;
  help?: string;
  options: { value: string; label: string }[];
}

const vatQuestions: VatQuestion[] = [
  {
    id: "revenue",
    question: "What is your expected annual revenue (or taxable supplies)?",
    help: "Include all goods and services sold, even if not yet invoiced.",
    options: [
      { value: "under187", label: "Under AED 187,500" },
      { value: "187to375", label: "AED 187,500 – 375,000" },
      { value: "over375", label: "Above AED 375,000" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "location",
    question: "Where is your business based?",
    options: [
      { value: "mainland", label: "UAE Mainland" },
      { value: "freezone", label: "Free Zone (non-designated)" },
      { value: "designated", label: "Designated Zone (e.g., JAFZA, DAFZ)" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "clients",
    question: "Who are your primary clients?",
    options: [
      { value: "uae", label: "UAE-based businesses or consumers" },
      { value: "international", label: "International / outside UAE" },
      { value: "mixed", label: "Mix of both" },
    ],
  },
  {
    id: "imports",
    question: "Do you import goods into the UAE?",
    options: [
      { value: "yes", label: "Yes, regularly" },
      { value: "sometimes", label: "Occasionally" },
      { value: "no", label: "No" },
    ],
  },
];

type Verdict = "mandatory" | "voluntary" | "not-required" | "review";

const VatHelper = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const showResults = step >= vatQuestions.length;

  const verdict: Verdict = useMemo(() => {
    if (answers.revenue === "over375") return "mandatory";
    if (answers.revenue === "187to375") return "voluntary";
    if (answers.revenue === "under187") {
      if (answers.imports === "yes") return "review";
      return "not-required";
    }
    return "review";
  }, [answers]);

  const verdictConfig = {
    mandatory: {
      icon: AlertTriangle,
      color: "text-destructive",
      bg: "bg-destructive/10 border-destructive/30",
      title: "VAT registration is likely mandatory",
      description: `Your taxable supplies exceed AED ${MANDATORY_THRESHOLD.toLocaleString()}. You are required to register for VAT within 30 days of exceeding the threshold.`,
    },
    voluntary: {
      icon: Info,
      color: "text-accent",
      bg: "bg-accent/10 border-accent/30",
      title: "You may voluntarily register for VAT",
      description: `Your revenue is between AED ${VOLUNTARY_THRESHOLD.toLocaleString()} and AED ${MANDATORY_THRESHOLD.toLocaleString()}. Registration is optional but can allow you to recover input VAT.`,
    },
    "not-required": {
      icon: CheckCircle2,
      color: "text-accent",
      bg: "bg-accent/10 border-accent/30",
      title: "VAT registration is likely not required",
      description: `Your taxable supplies appear below the voluntary threshold of AED ${VOLUNTARY_THRESHOLD.toLocaleString()}. Monitor your revenue — registration becomes mandatory at AED ${MANDATORY_THRESHOLD.toLocaleString()}.`,
    },
    review: {
      icon: Info,
      color: "text-foreground",
      bg: "bg-secondary border-border",
      title: "We recommend a professional review",
      description: "Based on your answers, there are factors that may affect your VAT obligations. A qualified tax advisor can provide a definitive assessment.",
    },
  };

  const vc = verdictConfig[verdict];

  return (
    <>
      <SEOHead
        title="UAE VAT Decision Helper — Do You Need to Register?"
        description="Answer four questions to understand your likely UAE VAT registration status. Covers mandatory and voluntary thresholds with clear next steps."
        schema={[serviceSchema({ name: "VAT Decision Helper", description: "Interactive VAT registration assessment tool", url: "/tools/vat-helper" })]}
      />
      <Header />
      <main className="page-offset min-h-screen bg-background">
        <div className="container py-12 max-w-3xl">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            VAT Decision Helper
          </h1>
          <p className="text-muted-foreground mb-10">
            Answer four questions to understand your likely VAT registration status.
          </p>

          {/* Progress */}
          <LeadGate>
          {!showResults && (
            <div className="flex gap-1 mb-10">
              {vatQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Questions */}
          {!showResults && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {vatQuestions[step].question}
              </h2>
              {vatQuestions[step].help && (
                <p className="text-sm text-muted-foreground">{vatQuestions[step].help}</p>
              )}
              <RadioGroup
                value={answers[vatQuestions[step].id] || ""}
                onValueChange={(v) => setAnswers({ ...answers, [vatQuestions[step].id]: v })}
                className="space-y-3"
              >
                {vatQuestions[step].options.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`vat-${opt.value}`}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                      answers[vatQuestions[step].id] === opt.value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} id={`vat-${opt.value}`} />
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
              <div className="flex justify-between">
                {step > 0 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                ) : <div />}
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!answers[vatQuestions[step].id]}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {step === vatQuestions.length - 1 ? "See result" : "Next"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="space-y-8">
              {/* Verdict card */}
              <div className={`border rounded-xl p-8 ${vc.bg}`}>
                <div className="flex items-start gap-4">
                  <vc.icon className={`h-8 w-8 ${vc.color} shrink-0 mt-0.5`} />
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-2">{vc.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{vc.description}</p>
                  </div>
                </div>
              </div>

              {/* Key thresholds */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-border rounded-xl p-6 bg-card">
                  <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Mandatory threshold</span>
                  <span className="font-display text-2xl font-bold text-foreground block mt-1">
                    AED {MANDATORY_THRESHOLD.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">Annual taxable supplies</span>
                </div>
                <div className="border border-border rounded-xl p-6 bg-card">
                  <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Voluntary threshold</span>
                  <span className="font-display text-2xl font-bold text-foreground block mt-1">
                    AED {VOLUNTARY_THRESHOLD.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">Annual taxable supplies</span>
                </div>
              </div>

              {/* Context cards */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-foreground">What you should know</h3>
                {[
                  { title: "VAT Rate", text: "UAE VAT is 5% on most goods and services. Some categories are zero-rated or exempt." },
                  { title: "Registration Timeline", text: "You must register within 30 days of exceeding the mandatory threshold. Late registration attracts a penalty of AED 10,000." },
                  { title: "Filing Frequency", text: "Most businesses file quarterly. Annual filing may be available for smaller businesses." },
                  { title: "Designated Zones", text: "Goods within and between designated zones can be treated as outside the UAE for VAT purposes, subject to conditions." },
                  { title: "Input VAT Recovery", text: "Registered businesses can recover VAT paid on business expenses, making voluntary registration beneficial in some cases." },
                ].map((item) => (
                  <div key={item.title} className="border border-border rounded-lg p-4 bg-card">
                    <span className="text-sm font-semibold text-foreground block mb-1">{item.title}</span>
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/50 border border-border rounded-xl p-6">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Disclaimer:</strong> This tool provides directional guidance only and does not constitute tax advice. 
                  VAT obligations depend on your specific business circumstances. Consult a qualified tax advisor or refer to the 
                  <a href="https://tax.gov.ae" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">Federal Tax Authority (FTA)</a> for definitive guidance.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => { setStep(0); setAnswers({}); }}>
                  <ArrowLeft className="h-4 w-4" /> Start over
                </Button>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/taxes/vat">Read full VAT guide</Link>
                </Button>
              </div>
            </div>
          )}
          </LeadGate>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VatHelper;
