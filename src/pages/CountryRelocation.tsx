import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Shield,
  Landmark,
  MapPin,
  Scale,
  Send,
} from "lucide-react";
import { countryRelocationData } from "@/data/countryRelocation";
import SEOHead, { breadcrumbSchema, articleSchema } from "@/components/SEOHead";
import { useT } from "@/i18n/context";

const qualificationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  businessType: z.string().min(1, "Please select a business type"),
  timeline: z.string().min(1, "Please select a timeline"),
  familySize: z.string().min(1, "Please select"),
  priorities: z.string().trim().max(500).optional(),
});

type QualificationForm = z.infer<typeof qualificationSchema>;

const CountryRelocation = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const country = countryCode ? countryRelocationData[countryCode] : undefined;
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QualificationForm>({
    resolver: zodResolver(qualificationSchema),
  });

  if (!country) return <Navigate to="/relocation" replace />;

  const onSubmit = (_data: QualificationForm) => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={country.meta.title}
        description={country.meta.description}
        type="article"
        schema={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Relocation", url: "/relocation" },
            { name: country.name, url: `/relocation/${countryCode}` },
          ]),
          articleSchema({
            title: country.meta.title,
            description: country.meta.description,
            url: `/relocation/${countryCode}`,
            dateModified: "2026-02-01",
          }),
        ]}
      />
      <Header />
      <main className="page-offset">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/relocation" className="hover:text-foreground transition-colors">Relocation</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{country.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{country.flag}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
              {country.hero.headline}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            {country.hero.intro}
          </p>
          <BestAnswerBlock
            title={country.bestAnswer.title}
            content={country.bestAnswer.content}
            audience={country.bestAnswer.audience}
            caution={country.bestAnswer.caution}
          />
        </section>

        {/* Tax Residency */}
        <section className="bg-secondary py-16">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                <Scale className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                {country.taxResidency.heading}
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {country.taxResidency.intro}
            </p>
            <ul className="space-y-3 mb-6">
              {country.taxResidency.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="border border-destructive/20 bg-destructive/5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Important: </span>
                  {country.taxResidency.warning}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Routes */}
        <section className="container py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                {country.setupRoutes.heading}
              </h2>
            </div>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {country.setupRoutes.intro}
            </p>
            <div className="space-y-4">
              {country.setupRoutes.routes.map((route, i) => (
                <div key={i} className="border border-border rounded-lg bg-card p-5">
                  <h3 className="font-display text-base font-semibold text-foreground mb-1.5">
                    {route.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {route.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banking Realities */}
        <section className="bg-secondary py-16">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                <Landmark className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                {country.banking.heading}
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {country.banking.intro}
            </p>
            <ul className="space-y-3 mb-6">
              {country.banking.realities.map((reality, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{reality}</span>
                </li>
              ))}
            </ul>
            <div className="border border-accent/20 bg-accent/5 rounded-lg p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Tip: </span>
                {country.banking.tip}
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="container py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3 text-center">
              Common mistakes for {country.name} founders
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">
              Avoid the pitfalls that commonly affect founders relocating from {country.name}.
            </p>
            <Accordion type="single" collapsible className="space-y-2">
              {country.commonMistakes.map((mistake, i) => (
                <AccordionItem key={i} value={`mistake-${i}`} className="border border-border rounded-lg px-4 bg-card">
                  <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-caution shrink-0" />
                      {mistake.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-3">
                    {mistake.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Qualification Form */}
        <section className="bg-secondary py-16">
          <div className="container max-w-2xl">
            <div className="border border-border rounded-lg bg-card p-6 md:p-10">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-accent" />
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Get a personalised relocation plan
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Tell us about your situation and we'll create a tailored setup and relocation plan for your move from {country.name} to the UAE.
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Request received
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We'll review your details and send a personalised relocation snapshot within 1–2 business days. Priority handling for qualified requests.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" placeholder="Your name" {...register("name")} />
                      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Business type</Label>
                    <Select onValueChange={(v) => setValue("businessType", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulting">Consulting / Advisory</SelectItem>
                        <SelectItem value="services">Service Business / Agency</SelectItem>
                        <SelectItem value="ecommerce">E-commerce / Online Retail</SelectItem>
                        <SelectItem value="tech">Technology / SaaS</SelectItem>
                        <SelectItem value="trading">Trading / Import-Export</SelectItem>
                        <SelectItem value="investment">Investment / Holding</SelectItem>
                        <SelectItem value="creative">Creative / Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessType && <p className="text-xs text-destructive">{errors.businessType.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label>When are you planning to move?</Label>
                    <RadioGroup onValueChange={(v) => setValue("timeline", v)} className="flex flex-wrap gap-3">
                      {[
                        { value: "1-3", label: "1–3 months" },
                        { value: "3-6", label: "3–6 months" },
                        { value: "6-12", label: "6–12 months" },
                        { value: "exploring", label: "Just exploring" },
                      ].map((opt) => (
                        <div key={opt.value} className="flex items-center gap-2">
                          <RadioGroupItem value={opt.value} id={`timeline-${opt.value}`} />
                          <Label htmlFor={`timeline-${opt.value}`} className="font-normal cursor-pointer">
                            {opt.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.timeline && <p className="text-xs text-destructive">{errors.timeline.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label>Moving solo or with family?</Label>
                    <RadioGroup onValueChange={(v) => setValue("familySize", v)} className="flex flex-wrap gap-3">
                      {[
                        { value: "solo", label: "Solo" },
                        { value: "partner", label: "With partner" },
                        { value: "family", label: "With family" },
                      ].map((opt) => (
                        <div key={opt.value} className="flex items-center gap-2">
                          <RadioGroupItem value={opt.value} id={`family-${opt.value}`} />
                          <Label htmlFor={`family-${opt.value}`} className="font-normal cursor-pointer">
                            {opt.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.familySize && <p className="text-xs text-destructive">{errors.familySize.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="priorities">Key priorities or questions (optional)</Label>
                    <Textarea
                      id="priorities"
                      placeholder="e.g., banking timeline, school options, tax residency concerns..."
                      rows={3}
                      {...register("priorities")}
                    />
                    {errors.priorities && <p className="text-xs text-destructive">{errors.priorities.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button type="submit" disabled={isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Send className="mr-2 h-4 w-4" />
                      Get Relocation Plan
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link to="/relocation">
                        Speak to an Agent
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Priority handling for qualified requests. Your data is used only to prepare your plan.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container py-16 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {country.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm text-left font-medium text-foreground py-3">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Source footer */}
        <section className="container pb-16">
          <div className="border-t border-border pt-8 max-w-2xl">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">About this guide</p>
              <p>
                This {country.name}-specific relocation guide is compiled from official sources, tax treaty documentation, community feedback, and editorial research. Individual circumstances vary — always verify specifics with qualified advisors.
              </p>
              <p className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                <strong>Last updated:</strong> February 2026
              </p>
              <p className="text-xs">
                This page is educational and does not replace legal, tax, or immigration advice.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CountryRelocation;
