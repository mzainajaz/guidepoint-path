import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Users, Home, GraduationCap, Calculator } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import SEOHead, { serviceSchema } from "@/components/SEOHead";
import { useLocalePath } from "@/i18n/context";

const housingOptions = [
  { value: "studio", label: "Studio / 1BR apartment", monthly: 4500 },
  { value: "2br", label: "2BR apartment", monthly: 7500 },
  { value: "3br", label: "3BR apartment", monthly: 12000 },
  { value: "villa", label: "Villa / townhouse", monthly: 18000 },
];

const schoolOptions = [
  { value: "none", label: "No schooling needed", annual: 0 },
  { value: "budget", label: "Budget curriculum (Indian/Filipino)", annual: 15000 },
  { value: "mid", label: "Mid-range (British/American)", annual: 45000 },
  { value: "premium", label: "Premium international", annual: 80000 },
];

const lifestyleOptions = [
  { value: "modest", label: "Modest — cook at home, public transport", monthly: 3000 },
  { value: "moderate", label: "Moderate — mix of eating out, some taxis", monthly: 6000 },
  { value: "comfortable", label: "Comfortable — regular dining, own car", monthly: 10000 },
  { value: "premium", label: "Premium — fine dining, luxury lifestyle", monthly: 18000 },
];

const RelocationCalculator = () => {
  const lp = useLocalePath();
  const [step, setStep] = useState(0);
  const [familySize, setFamilySize] = useState([2]);
  const [housing, setHousing] = useState("2br");
  const [schoolKids, setSchoolKids] = useState([0]);
  const [schoolTier, setSchoolTier] = useState("mid");
  const [lifestyle, setLifestyle] = useState("moderate");
  const [hasCar, setHasCar] = useState(false);

  const breakdown = useMemo(() => {
    const rent = housingOptions.find((h) => h.value === housing)?.monthly || 7500;
    const school = schoolOptions.find((s) => s.value === schoolTier)?.annual || 0;
    const schoolMonthly = (school * schoolKids[0]) / 12;
    const life = lifestyleOptions.find((l) => l.value === lifestyle)?.monthly || 6000;
    const carCost = hasCar ? 2500 : 0; // loan + insurance + fuel
    const visaCost = familySize[0] * 4500;
    const flightsCost = familySize[0] * 2500;
    const depositCost = rent * 4; // security deposit + agent fee
    const monthlyTotal = rent + schoolMonthly + life + carCost;
    const firstYear = monthlyTotal * 12 + visaCost + flightsCost + depositCost;

    return { rent, schoolMonthly, life, carCost, monthlyTotal, firstYear, visaCost, flightsCost, depositCost };
  }, [housing, schoolKids, schoolTier, lifestyle, hasCar, familySize]);

  const steps = [
    { label: "Family", icon: Users },
    { label: "Housing", icon: Home },
    { label: "School", icon: GraduationCap },
    { label: "Result", icon: Calculator },
  ];

  return (
    <>
      <SEOHead
        title="UAE Relocation Cost Calculator"
        description="Estimate your monthly and first-year relocation costs for moving to the UAE — housing, schooling, lifestyle, and visa fees included."
        schema={[serviceSchema({ name: "UAE Relocation Cost Calculator", description: "Estimate monthly and first-year relocation costs to the UAE", url: "/tools/relocation-calculator" })]}
      />
      <Header />
      <main className="page-offset min-h-screen bg-background">
        <div className="container py-12 max-w-3xl">
          <Link to={lp("/tools")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Relocation Cost Calculator
          </h1>
          <p className="text-muted-foreground mb-10">
            Estimate your monthly living costs and first-year relocation budget for the UAE.
          </p>

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

          {/* Step 0: Family */}
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">How many people are relocating?</h2>
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="text-center mb-6">
                  <span className="font-display text-5xl font-bold text-accent">{familySize[0]}</span>
                  <span className="text-muted-foreground ml-2">{familySize[0] === 1 ? "person" : "people"}</span>
                </div>
                <Slider value={familySize} onValueChange={setFamilySize} min={1} max={8} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Just me</span><span>8</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(1)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 1: Housing + Lifestyle + Car */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">Housing & lifestyle</h2>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Housing type</h3>
                <RadioGroup value={housing} onValueChange={setHousing} className="space-y-3">
                  {housingOptions.map((o) => (
                    <Label key={o.value} htmlFor={`h-${o.value}`} className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all ${housing === o.value ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={o.value} id={`h-${o.value}`} />
                        <span className="text-sm font-medium text-foreground">{o.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">~AED {o.monthly.toLocaleString()}/mo</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Lifestyle level</h3>
                <RadioGroup value={lifestyle} onValueChange={setLifestyle} className="space-y-3">
                  {lifestyleOptions.map((o) => (
                    <Label key={o.value} htmlFor={`l-${o.value}`} className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all ${lifestyle === o.value ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={o.value} id={`l-${o.value}`} />
                        <span className="text-sm font-medium text-foreground">{o.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">~AED {o.monthly.toLocaleString()}/mo</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <Label
                htmlFor="car"
                className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all ${hasCar ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"}`}
                onClick={() => setHasCar(!hasCar)}
              >
                <span className="text-sm font-medium text-foreground">Own/lease a car</span>
                <span className="text-sm text-muted-foreground">{hasCar ? "~AED 2,500/mo" : "Not included"}</span>
              </Label>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button onClick={() => setStep(2)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Schooling */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-foreground">Schooling</h2>
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="text-center mb-6">
                  <span className="font-display text-5xl font-bold text-accent">{schoolKids[0]}</span>
                  <span className="text-muted-foreground ml-2">{schoolKids[0] === 1 ? "child" : "children"} in school</span>
                </div>
                <Slider value={schoolKids} onValueChange={setSchoolKids} min={0} max={5} step={1} />
              </div>

              {schoolKids[0] > 0 && (
                <RadioGroup value={schoolTier} onValueChange={setSchoolTier} className="space-y-3">
                  {schoolOptions.filter((o) => o.value !== "none").map((o) => (
                    <Label key={o.value} htmlFor={`s-${o.value}`} className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-all ${schoolTier === o.value ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={o.value} id={`s-${o.value}`} />
                        <span className="text-sm font-medium text-foreground">{o.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">~AED {o.annual.toLocaleString()}/yr per child</span>
                    </Label>
                  ))}
                </RadioGroup>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button onClick={() => setStep(3)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  See estimate <Calculator className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="font-display text-xl font-semibold text-foreground">Your relocation estimate</h2>

              {/* Monthly */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-accent/5 p-6 border-b border-border">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Estimated monthly cost</span>
                    <span className="font-display text-4xl font-bold text-foreground">
                      AED {breakdown.monthlyTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { label: "Housing", value: breakdown.rent },
                    { label: "Schooling", value: Math.round(breakdown.schoolMonthly) },
                    { label: "Lifestyle & groceries", value: breakdown.life },
                    ...(breakdown.carCost > 0 ? [{ label: "Car (loan + insurance + fuel)", value: breakdown.carCost }] : []),
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between px-6 py-3">
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-sm font-medium text-foreground">
                        {row.value === 0 ? "—" : `AED ${row.value.toLocaleString()}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* First year */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-secondary/50 p-6 border-b border-border">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Estimated first-year total</span>
                    <span className="font-display text-3xl font-bold text-foreground">
                      AED {breakdown.firstYear.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Includes one-time costs: deposit, flights, visa processing</p>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { label: "12 months living costs", value: breakdown.monthlyTotal * 12 },
                    { label: `Visa processing (${familySize[0]} people)`, value: breakdown.visaCost },
                    { label: "Flights", value: breakdown.flightsCost },
                    { label: "Housing deposit + agent fee", value: breakdown.depositCost },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between px-6 py-3">
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-sm font-medium text-foreground">AED {row.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-xl p-6">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Disclaimer:</strong> These are indicative estimates based on median market rates in Dubai as of early 2026. Actual costs vary significantly by location, building, and personal preferences. This is not financial advice.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}>
                  <ArrowLeft className="h-4 w-4" /> Start over
                </Button>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to={lp("/contact")}>Get personalised guidance</Link>
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

export default RelocationCalculator;
