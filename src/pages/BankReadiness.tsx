import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SEOHead, { serviceSchema } from "@/components/SEOHead";
import { useLocalePath } from "@/i18n/context";

interface Question {
  id: string;
  question: string;
  options: { label: string; risk: number }[];
}

const questions: Question[] = [
  {
    id: "nationality",
    question: "What is your nationality / passport country?",
    options: [
      { label: "EU / UK / US / Canada / Australia / NZ", risk: 0 },
      { label: "GCC / Arab country", risk: 0 },
      { label: "India / Pakistan / Philippines / South-East Asia", risk: 1 },
      { label: "CIS / Central Asia / Africa / sanctioned jurisdiction", risk: 2 },
    ],
  },
  {
    id: "industry",
    question: "What industry is your business in?",
    options: [
      { label: "Professional services (consulting, IT, marketing)", risk: 0 },
      { label: "E-commerce / online retail", risk: 1 },
      { label: "Trading / import-export", risk: 1 },
      { label: "Crypto / fintech / money services / cash-intensive", risk: 3 },
    ],
  },
  {
    id: "turnover",
    question: "What's your expected annual turnover?",
    options: [
      { label: "Less than AED 100,000", risk: 1 },
      { label: "AED 100,000 – 500,000", risk: 0 },
      { label: "AED 500,000 – 2,000,000", risk: 0 },
      { label: "AED 2,000,000+", risk: 0 },
    ],
  },
  {
    id: "countries",
    question: "Which countries will you transact with?",
    options: [
      { label: "UAE / GCC only", risk: 0 },
      { label: "EU / US / established markets", risk: 0 },
      { label: "Mixed — including emerging markets", risk: 1 },
      { label: "Sanctioned or high-risk countries (Iran, Syria, etc.)", risk: 3 },
    ],
  },
  {
    id: "documents",
    question: "Can you document your source of funds?",
    options: [
      { label: "Yes — salary slips, bank statements, investment records", risk: 0 },
      { label: "Partially — some documentation available", risk: 1 },
      { label: "Difficult — informal earnings or cash-based", risk: 2 },
      { label: "Unable to provide documentation", risk: 3 },
    ],
  },
];

const getRiskLevel = (score: number) => {
  if (score <= 2) return {
    level: "Low risk",
    color: "text-green-500",
    bg: "bg-green-500/10",
    icon: CheckCircle2,
    description: "Your profile is well-suited for UAE banking. Most banks will accept your application with standard documentation. Expect account opening within 2–4 weeks.",
    tips: ["Apply to 2–3 banks simultaneously to compare offers", "Have your business plan and projected cash flow ready", "Consider banks with digital onboarding for faster processing"],
  };
  if (score <= 5) return {
    level: "Medium risk",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    icon: AlertTriangle,
    description: "Your profile may face additional scrutiny. Some banks may decline, but many will accept with proper documentation. Preparation is key.",
    tips: ["Prepare a detailed source-of-funds letter with supporting documents", "Choose a banking-friendly free zone (IFZA, Meydan, RAKEZ)", "Consider using a PRO service to facilitate the introduction", "Have 3–6 months of personal bank statements ready"],
  };
  return {
    level: "High risk",
    color: "text-red-400",
    bg: "bg-red-400/10",
    icon: XCircle,
    description: "Your profile will face significant challenges with UAE banking. Plan for longer timelines and consider alternative approaches.",
    tips: ["Work with a specialist banking consultant", "Consider digital banks (Wio, Mashreq Neo) as faster alternatives", "Prepare comprehensive documentation before applying", "Consider restructuring your business to reduce risk flags", "Be prepared for enhanced due diligence — 4–8 week timelines"],
  };
};

const BankReadiness = () => {
  const lp = useLocalePath();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { risk: number; index: number }>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQ];
  const selectedAnswer = answers[currentQuestion?.id];

  const totalRisk = useMemo(() => {
    return Object.values(answers).reduce((a, b) => a + b.risk, 0);
  }, [answers]);

  const result = getRiskLevel(totalRisk);
  const ResultIcon = result.icon;

  const handleSelect = (risk: number, index: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: { risk, index } });
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <>
      <SEOHead
        title="Bank Account Readiness Tool — UAE Banking Risk Assessment"
        description="Assess your chances of opening a UAE bank account. Check how your nationality, industry, and documentation affect banking approval odds."
        schema={[serviceSchema({ name: "Bank Account Readiness Tool", description: "Assess UAE banking approval likelihood based on your profile", url: "/tools/bank-readiness" })]}
      />
      <Header />
      <main className="page-offset min-h-screen bg-background">
        <div className="container py-12 max-w-3xl">
          <Link to={lp("/tools")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Bank Account Readiness
          </h1>
          <p className="text-muted-foreground mb-10">
            Find out how your profile affects UAE banking approval — in under 2 minutes.
          </p>

          {!showResult ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i < currentQ ? "bg-accent" : i === currentQ ? "bg-accent/50" : "bg-secondary"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>

              <h2 className="font-display text-xl font-semibold text-foreground">{currentQuestion.question}</h2>

              <RadioGroup
                value={selectedAnswer?.index.toString() || ""}
                onValueChange={(v) => {
                  const idx = Number(v);
                  handleSelect(currentQuestion.options[idx].risk, idx);
                }}
                className="space-y-3"
              >
                  {currentQuestion.options.map((opt, i) => (
                  <Label
                    key={i}
                    htmlFor={`${currentQuestion.id}-${i}`}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAnswer?.index === i
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <RadioGroupItem value={i.toString()} id={`${currentQuestion.id}-${i}`} />
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} disabled={selectedAnswer === undefined} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {currentQ < questions.length - 1 ? "Next" : "See result"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Result */}
              <div className="border border-border rounded-xl p-8 bg-card text-center">
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${result.bg} mb-4`}>
                  <ResultIcon className={`h-8 w-8 ${result.color}`} />
                </div>
                <h2 className={`font-display text-2xl font-bold ${result.color} mb-2`}>{result.level}</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">{result.description}</p>
              </div>

              {/* Risk breakdown */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-secondary/30 border-b border-border">
                  <h3 className="font-display text-sm font-semibold text-foreground">Factor breakdown</h3>
                </div>
                <div className="divide-y divide-border">
                  {questions.map((q) => {
                    const ans = answers[q.id];
                    const r = ans?.risk ?? 0;
                    const selected = q.options[ans?.index ?? 0];
                    return (
                      <div key={q.id} className="flex items-center justify-between px-6 py-3 gap-4">
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-muted-foreground block truncate">{q.question}</span>
                          <span className="text-sm text-foreground">{selected?.label}</span>
                        </div>
                        <span className={`text-xs font-medium shrink-0 ${r === 0 ? "text-green-500" : r <= 1 ? "text-amber-500" : "text-red-400"}`}>
                          {r === 0 ? "Low" : r <= 1 ? "Moderate" : "High"} risk
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {result.tips.map((tip) => (
                    <div key={tip} className="flex items-start gap-2 text-sm text-muted-foreground border border-border rounded-lg p-4 bg-card">
                      <Shield className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-xl p-6">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Disclaimer:</strong> This assessment provides general guidance only. Banking decisions are made by individual institutions based on their own risk criteria. Results do not guarantee approval or rejection.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => { setShowResult(false); setCurrentQ(0); setAnswers({}); }}>
                  <ArrowLeft className="h-4 w-4" /> Retake
                </Button>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to={lp("/contact")}>Get banking guidance</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BankReadiness;
