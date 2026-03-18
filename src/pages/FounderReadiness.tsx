import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Target, Calculator } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SEOHead, { serviceSchema } from "@/components/SEOHead";
import { useLocalePath, useT } from "@/i18n/context";

interface Question {
  id: string;
  question: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: "model",
    question: "How clear is your business model?",
    options: [
      { label: "I have a general idea but no specifics yet", score: 10 },
      { label: "I know my activity and target market", score: 40 },
      { label: "I have a defined model, pricing, and initial clients", score: 70 },
      { label: "I'm already generating revenue and need to formalise", score: 100 },
    ],
  },
  {
    id: "capital",
    question: "What capital do you have available for setup?",
    options: [
      { label: "Less than AED 10,000", score: 10 },
      { label: "AED 10,000–25,000", score: 40 },
      { label: "AED 25,000–50,000", score: 70 },
      { label: "AED 50,000+", score: 100 },
    ],
  },
  {
    id: "market",
    question: "Do you have a plan for finding clients?",
    options: [
      { label: "Not yet — I'll figure it out after setup", score: 10 },
      { label: "I have some leads or a network to tap into", score: 40 },
      { label: "I have a marketing plan and pipeline strategy", score: 70 },
      { label: "I already have paying clients or signed contracts", score: 100 },
    ],
  },
  {
    id: "compliance",
    question: "How familiar are you with UAE compliance requirements?",
    options: [
      { label: "I don't know what's required yet", score: 10 },
      { label: "I know about VAT and corporate tax basics", score: 40 },
      { label: "I understand VAT, CT, ESR, and UBO requirements", score: 70 },
      { label: "I have an accountant or advisor already lined up", score: 100 },
    ],
  },
  {
    id: "banking",
    question: "Have you prepared for banking?",
    options: [
      { label: "I haven't thought about it", score: 10 },
      { label: "I know it can be difficult but haven't prepared", score: 30 },
      { label: "I have my documents and source-of-funds ready", score: 70 },
      { label: "I've already researched banks and pre-qualified", score: 100 },
    ],
  },
];

const getCategory = (score: number) => {
  if (score >= 70) return { label: "Launch ready", color: "text-green-500", bg: "bg-green-500/10", description: "You have strong foundations across business clarity, capital, and compliance. You're ready to move forward with setup." };
  if (score >= 40) return { label: "Moderate readiness", color: "text-amber-500", bg: "bg-amber-500/10", description: "You're on the right track but some areas need attention before committing. Focus on the gaps identified below." };
  return { label: "Early stage", color: "text-red-400", bg: "bg-red-400/10", description: "You're still in the research phase. That's fine — use our guides and tools to build clarity before committing to a setup." };
};

const FounderReadiness = () => {
  const lp = useLocalePath();
  const t = useT();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQ];
  const selectedScore = answers[currentQuestion?.id];

  const totalScore = useMemo(() => {
    const scores = Object.values(answers);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / questions.length);
  }, [answers]);

  const category = getCategory(totalScore);

  const handleSelect = (score: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: score });
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
        title="Founder Readiness Score — Are You Ready to Set Up in UAE?"
        description="Take a 2-minute assessment to gauge your readiness for UAE company formation. Get a personalised score across business model, capital, compliance, and banking."
        schema={[serviceSchema({ name: "Founder Readiness Score", description: "Assessment tool for UAE business setup readiness", url: "/tools/founder-readiness" })]}
      />
      <Header />
      <main className="page-offset min-h-screen bg-background">
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img src="/images/section-founder.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        </div>

        <div className="container py-8 max-w-3xl -mt-16 relative z-10">
          <Link to={lp("/tools")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Founder Readiness Score
          </h1>
          <p className="text-muted-foreground mb-10">
            Answer 5 questions to see how prepared you are to set up a company in the UAE.
          </p>

          {!showResult ? (
            <div className="space-y-6">
              {/* Progress */}
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
                value={selectedScore?.toString() || ""}
                onValueChange={(v) => handleSelect(Number(v))}
                className="space-y-3"
              >
                {currentQuestion.options.map((opt) => (
                  <Label
                    key={opt.score}
                    htmlFor={`${currentQuestion.id}-${opt.score}`}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedScore === opt.score ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"
                    }`}
                  >
                    <RadioGroupItem value={opt.score.toString()} id={`${currentQuestion.id}-${opt.score}`} />
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                  disabled={currentQ === 0}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedScore === undefined}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {currentQ < questions.length - 1 ? "Next" : "See my score"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Score display */}
              <div className="border border-border rounded-xl p-8 bg-card text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg className="h-32 w-32" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="8"
                      strokeDasharray={`${totalScore * 3.14} 314`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <span className="absolute font-display text-3xl font-bold text-foreground">{totalScore}</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${category.color} ${category.bg}`}>
                  <Target className="h-4 w-4" />
                  {category.label}
                </div>
                <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">{category.description}</p>
              </div>

              {/* Per-dimension breakdown */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-secondary/30 border-b border-border">
                  <h3 className="font-display text-sm font-semibold text-foreground">Score breakdown</h3>
                </div>
                <div className="divide-y divide-border">
                  {questions.map((q) => {
                    const s = answers[q.id] || 0;
                    return (
                      <div key={q.id} className="flex items-center justify-between px-6 py-3">
                        <span className="text-sm text-muted-foreground">{q.question}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full" style={{ width: `${s}%` }} />
                          </div>
                          <span className="text-xs font-medium text-foreground w-6 text-right">{s}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Estimate setup costs", href: "/tools/cost-estimator", icon: Calculator },
                  { label: "Find the right free zone", href: "/tools/zone-picker", icon: Target },
                ].map((link) => (
                  <Link
                    key={link.href}
                    to={lp(link.href)}
                    className="flex items-center gap-3 border border-border rounded-lg p-4 bg-card hover:border-accent/40 transition-all"
                  >
                    <link.icon className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium text-foreground flex-1">{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => { setShowResult(false); setCurrentQ(0); setAnswers({}); }}>
                  <ArrowLeft className="h-4 w-4" /> Retake
                </Button>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to={lp("/contact")}>Talk to an advisor</Link>
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

export default FounderReadiness;
