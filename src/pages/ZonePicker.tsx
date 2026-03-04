import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, MapPin, Star, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { freeZones } from "@/data/freeZones";
import SEOHead, { serviceSchema } from "@/components/SEOHead";

const questions = [
  {
    id: "activity",
    question: "What's your primary business activity?",
    options: [
      { value: "services", label: "Consulting / Professional Services" },
      { value: "tech", label: "IT / Software / SaaS" },
      { value: "trading", label: "Trading / Import-Export" },
      { value: "media", label: "Media / Marketing / Content" },
      { value: "ecommerce", label: "E-commerce" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "budget",
    question: "What's your approximate annual budget for licensing?",
    options: [
      { value: "low", label: "Under AED 15,000" },
      { value: "mid", label: "AED 15,000 – 30,000" },
      { value: "high", label: "Above AED 30,000" },
    ],
  },
  {
    id: "visas",
    question: "How many visas will you need?",
    options: [
      { value: "0", label: "None right now" },
      { value: "1-2", label: "1–2 visas" },
      { value: "3-6", label: "3–6 visas" },
      { value: "6+", label: "More than 6" },
    ],
  },
];

const priorities = [
  { id: "cost", label: "Lowest possible cost" },
  { id: "banking", label: "Smooth banking onboarding" },
  { id: "remote", label: "Remote-first / no physical office" },
  { id: "prestige", label: "Premium brand / address" },
  { id: "speed", label: "Fastest setup timeline" },
];

const ZonePicker = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const totalSteps = questions.length + 1; // +1 for priorities
  const showResults = step >= totalSteps;

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const results = useMemo(() => {
    return freeZones
      .map((zone) => {
        let score = 0;
        const activityMap: Record<string, string[]> = {
          services: ["services"],
          tech: ["services", "tech"],
          trading: ["trading"],
          media: ["services", "media"],
          ecommerce: ["services", "ecommerce"],
          other: ["services", "multi"],
        };
        const actIndustries = activityMap[answers.activity || "services"] || ["services"];
        if (actIndustries.includes(zone.industry) || zone.industry === "multi") score += 3;

        const budgetMap: Record<string, string[]> = { low: ["low"], mid: ["low", "mid"], high: ["low", "mid", "high"] };
        if ((budgetMap[answers.budget || "mid"] || []).includes(zone.costTier)) score += 2;

        if (answers.visas === "6+" && !zone.visaFriendly) score -= 1;
        if (answers.visas === "0") score += zone.remoteFirst ? 1 : 0;

        if (selectedPriorities.includes("cost") && zone.costTier === "low") score += 2;
        if (selectedPriorities.includes("banking") && zone.bankingFriendly) score += 2;
        if (selectedPriorities.includes("remote") && zone.remoteFirst) score += 2;
        if (selectedPriorities.includes("prestige") && zone.costTier === "high") score += 2;
        if (selectedPriorities.includes("speed")) score += 1;

        return { zone, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [answers, selectedPriorities]);

  return (
    <>
      <SEOHead
        title="UAE Free Zone Picker — Find Your Best Match"
        description="Answer a few questions and get matched with the UAE free zones most likely to suit your business activity, budget, and visa needs."
        schema={[serviceSchema({ name: "Free Zone Picker", description: "Interactive zone matching tool for UAE business setup", url: "/tools/zone-picker" })]}
      />
      <Header />
      <main className="page-offset min-h-screen bg-background">
        <div className="container py-12 max-w-3xl">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Free Zone Picker
          </h1>
          <p className="text-muted-foreground mb-10">
            Answer a few questions and get matched with zones that fit your profile.
          </p>

          {/* Progress bar */}
          
          {!showResults && (
            <div className="flex gap-1 mb-10">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Question steps */}
          {step < questions.length && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {questions[step].question}
              </h2>
              <RadioGroup
                value={answers[questions[step].id] || ""}
                onValueChange={(v) => setAnswers({ ...answers, [questions[step].id]: v })}
                className="space-y-3"
              >
                {questions[step].options.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`q-${opt.value}`}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                      answers[questions[step].id] === opt.value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} id={`q-${opt.value}`} />
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
                  disabled={!answers[questions[step].id]}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Priorities step */}
          {step === questions.length && !showResults && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                What matters most to you? (pick up to 3)
              </h2>
              <div className="space-y-3">
                {priorities.map((p) => (
                  <Label
                    key={p.id}
                    htmlFor={`p-${p.id}`}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPriorities.includes(p.id) ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"
                    }`}
                    onClick={(e) => { e.preventDefault(); togglePriority(p.id); }}
                  >
                    <Checkbox
                      id={`p-${p.id}`}
                      checked={selectedPriorities.includes(p.id)}
                      onCheckedChange={() => togglePriority(p.id)}
                    />
                    <span className="text-sm font-medium text-foreground">{p.label}</span>
                  </Label>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={() => setStep(totalSteps)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  See matches <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="space-y-8">
              <h2 className="font-display text-xl font-semibold text-foreground">Your top zone matches</h2>

              <div className="space-y-4">
                {results.map(({ zone, score }, i) => (
                  <Link
                    key={zone.id}
                    to={`/free-zones/${zone.id}`}
                    className="group flex items-center gap-4 border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-md transition-all"
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm ${
                      i === 0 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      #{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-display text-base font-semibold text-foreground block">{zone.name}</span>
                      <span className="text-sm text-muted-foreground line-clamp-1">{zone.idealFor}</span>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                          From {zone.startingCost}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                          {zone.timeline}
                        </span>
                        {zone.remoteFirst && (
                          <span className="text-xs px-2 py-0.5 bg-accent/10 rounded-full text-accent">
                            Remote-friendly
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                  </Link>
                ))}
              </div>

              <div className="bg-secondary/50 border border-border rounded-xl p-6">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Note:</strong> This matching is directional only. 
                  Your actual best fit depends on activity approvals, documentation, and specific authority requirements. 
                  Always validate with official sources before committing.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => { setStep(0); setAnswers({}); setSelectedPriorities([]); }}>
                  <ArrowLeft className="h-4 w-4" /> Start over
                </Button>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/compare">Compare Zones</Link>
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

export default ZonePicker;
