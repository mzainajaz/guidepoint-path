import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Users, Building2, CreditCard, Calculator } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadGate from "@/components/LeadGate";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { freeZones } from "@/data/freeZones";
import { useT, useLocalePath } from "@/i18n/context";

const officeDefaults = [
  { value: "flexi", cost: 0 },
  { value: "shared", cost: 8000 },
  { value: "private", cost: 25000 },
];

const VISA_COST_PER_PERSON = 4000;
const BANKING_SETUP = 1500;
const PRO_SERVICES = 3000;

const CostEstimator = () => {
  const t = useT();
  const lp = useLocalePath();
  const [step, setStep] = useState(0);
  const [activity, setActivity] = useState("consulting");
  const [visas, setVisas] = useState([2]);
  const [office, setOffice] = useState("flexi");
  const [priorityBanking, setPriorityBanking] = useState(false);

  const ce = t.costEstimator;

  const officeOptions = useMemo(() => [
    { value: "flexi", label: ce.flexiDesk, cost: 0 },
    { value: "shared", label: ce.sharedOffice, cost: 8000 },
    { value: "private", label: ce.privateOffice, cost: 25000 },
  ], [ce]);

  const matchedZones = useMemo(() => {
    const activityMap: Record<string, string[]> = {
      consulting: ["services"],
      ecommerce: ["services", "ecommerce"],
      it: ["services", "tech"],
      marketing: ["services", "media"],
      trading: ["trading"],
      freelance: ["services"],
      holding: ["holding", "services"],
      other: ["services"],
    };
    const industries = activityMap[activity] || ["services"];
    return freeZones
      .filter((z) => industries.includes(z.industry) || z.industry === "multi")
      .sort((a, b) => a.costNum - b.costNum)
      .slice(0, 4);
  }, [activity]);

  const breakdown = useMemo(() => {
    const cheapest = matchedZones[0];
    const licenceFee = cheapest?.costNum || 15000;
    const officeCost = officeDefaults.find((o) => o.value === office)?.cost || 0;
    const visaCost = visas[0] * VISA_COST_PER_PERSON;
    const banking = priorityBanking ? BANKING_SETUP : 0;
    const total = licenceFee + officeCost + visaCost + banking + PRO_SERVICES;
    return { licenceFee, officeCost, visaCost, banking, proServices: PRO_SERVICES, total, zoneName: cheapest?.shortName || "Selected Zone" };
  }, [matchedZones, office, visas, priorityBanking]);

  const steps = [
    { label: ce.stepLabels[0], icon: Building2 },
    { label: ce.stepLabels[1], icon: Users },
    { label: ce.stepLabels[2], icon: Building2 },
    { label: ce.stepLabels[3], icon: Calculator },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container py-12 max-w-3xl">
          <Link to={lp("/tools")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> {t.common.backToTools}
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {ce.title}
          </h1>
          <p className="text-muted-foreground mb-10">
            {ce.subtitle}
          </p>

          <LeadGate>

          {/* Progress */}
          <div className="flex items-center gap-1 mb-10">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-1 flex-1">
                <button
                  onClick={() => i <= step ? setStep(i) : null}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
                    i === step ? "bg-accent text-accent-foreground" : i < step ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />}
              </div>
            ))}
          </div>

          {/* Step 0: Activity */}
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">{ce.whatWillYourBusinessDo}</h2>
              <RadioGroup value={activity} onValueChange={setActivity} className="grid grid-cols-2 gap-3">
                {ce.activities.map((a) => (
                  <Label
                    key={a.value}
                    htmlFor={a.value}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${
                      activity === a.value ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"
                    }`}
                  >
                    <RadioGroupItem value={a.value} id={a.value} />
                    <span className="text-sm font-medium text-foreground">{a.label}</span>
                  </Label>
                ))}
              </RadioGroup>
              <div className="flex justify-end">
                <Button onClick={() => setStep(1)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {t.common.next} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 1: Visas */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">{ce.howManyVisas}</h2>
              <p className="text-sm text-muted-foreground">{ce.visaNote(VISA_COST_PER_PERSON)}</p>
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="text-center mb-6">
                  <span className="font-display text-5xl font-bold text-accent">{visas[0]}</span>
                  <span className="text-muted-foreground ml-2">{ce.visaUnit(visas[0])}</span>
                </div>
                <Slider value={visas} onValueChange={setVisas} min={0} max={10} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{ce.noVisa}</span><span>10</span>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}><ArrowLeft className="h-4 w-4" /> {t.common.back}</Button>
                <Button onClick={() => setStep(2)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {t.common.next} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Office */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">{ce.officeType}</h2>
              <RadioGroup value={office} onValueChange={setOffice} className="space-y-3">
                {officeOptions.map((o) => (
                  <Label
                    key={o.value}
                    htmlFor={`office-${o.value}`}
                    className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all ${
                      office === o.value ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={o.value} id={`office-${o.value}`} />
                      <span className="text-sm font-medium text-foreground">{o.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {o.cost === 0 ? ce.included : `+AED ${o.cost.toLocaleString()}/yr`}
                    </span>
                  </Label>
                ))}
              </RadioGroup>

              <Label
                htmlFor="banking"
                className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all ${
                  priorityBanking ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"
                }`}
                onClick={() => setPriorityBanking(!priorityBanking)}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-accent" />
                  <div>
                    <span className="text-sm font-medium text-foreground block">{ce.priorityBanking}</span>
                    <span className="text-xs text-muted-foreground">{ce.priorityBankingDesc}</span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">+AED {BANKING_SETUP.toLocaleString()}</span>
              </Label>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /> {t.common.back}</Button>
                <Button onClick={() => setStep(3)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {ce.seeEstimate} <Calculator className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="font-display text-xl font-semibold text-foreground">{ce.yourEstimate}</h2>

              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-accent/5 p-6 border-b border-border">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">{ce.estimatedTotal}</span>
                    <span className="font-display text-4xl font-bold text-foreground">
                      AED {breakdown.total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{ce.basedOn(breakdown.zoneName)}</p>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { label: ce.licenceFee, value: breakdown.licenceFee },
                    { label: ce.visaProcessing(visas[0]), value: breakdown.visaCost },
                    { label: ce.officeFacility, value: breakdown.officeCost },
                    { label: ce.proServices, value: breakdown.proServices },
                    ...(breakdown.banking > 0 ? [{ label: ce.priorityBankingLabel, value: breakdown.banking }] : []),
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between px-6 py-3">
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-sm font-medium text-foreground">
                        {row.value === 0 ? ce.included : `AED ${row.value.toLocaleString()}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched zones */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">{ce.bestFitZones}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {matchedZones.map((z) => (
                    <Link
                      key={z.id}
                      to={lp(`/free-zones/${z.id}`)}
                      className="border border-border rounded-lg p-4 hover:border-accent/40 transition-all"
                    >
                      <span className="font-display text-sm font-semibold text-foreground block">{z.shortName}</span>
                      <span className="text-xs text-muted-foreground">{ce.fromPerYear(z.startingCost)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-xl p-6">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{ce.disclaimerTitle}</strong> {ce.disclaimerText}
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}>
                  <ArrowLeft className="h-4 w-4" /> {t.common.startOver}
                </Button>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to={lp("/free-zones")}>{ce.exploreFreeZones}</Link>
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

export default CostEstimator;
