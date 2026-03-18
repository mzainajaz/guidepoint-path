import { useState, useMemo } from "react";
import { useT } from "@/i18n/context";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BestAnswerBlock from "@/components/BestAnswerBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  LayoutGrid,
  List,
  ArrowRight,
  Building2,
  Users,
  Clock,
  CreditCard,
  Landmark,
  ChevronRight,
} from "lucide-react";
import { freeZones } from "@/data/freeZones";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";

const industryOptions = [
  { value: "all", label: "All industries" },
  { value: "services", label: "Services & Consulting" },
  { value: "trading", label: "Trading & Logistics" },
  { value: "finance", label: "Finance & Fintech" },
  { value: "media", label: "Media & Creative" },
  { value: "general", label: "General / Multi-activity" },
];

const costOptions = [
  { value: "all", label: "Any budget" },
  { value: "low", label: "Under AED 15,000" },
  { value: "mid", label: "AED 15,000–30,000" },
  { value: "high", label: "AED 30,000+" },
];

const sortOptions = [
  { value: "recommended", label: "Most suitable" },
  { value: "cost-asc", label: "Lowest starting cost" },
  { value: "cost-desc", label: "Highest starting cost" },
  { value: "speed", label: "Fastest setup" },
];

const FreeZones = () => {
  const t = useT();
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [cost, setCost] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [view, setView] = useState<"card" | "table">("card");

  const filtered = useMemo(() => {
    let result = freeZones.filter((fz) => {
      if (search && !fz.name.toLowerCase().includes(search.toLowerCase()) && !fz.idealFor.toLowerCase().includes(search.toLowerCase())) return false;
      if (industry !== "all" && fz.industry !== industry) return false;
      if (cost !== "all" && fz.costTier !== cost) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === "cost-asc") return a.costNum - b.costNum;
      if (sortBy === "cost-desc") return b.costNum - a.costNum;
      if (sortBy === "speed") return a.timeline.localeCompare(b.timeline);
      return 0; // recommended = default order
    });

    return result;
  }, [search, industry, cost, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="UAE Free Zones — Compare by Cost, Activity & Visas"
        description="Compare 30+ UAE free zones by cost, business activity, visa options, and office requirements. Transparent data with verified pricing and honest assessments."
        schema={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Free Zones", url: "/free-zones" }])]}
      />
      <Header />
      <main className="page-offset">
        {/* Hero Image */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img src="/images/section-freezone.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          <div className="relative container h-full flex items-end pb-6">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">Free Zones</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="container py-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
            UAE Free Zones: compare options by cost, activity, visas, office needs, and business fit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            The UAE has many free zones, but they are not interchangeable. The right choice depends on what you do, how you plan to operate, and what you need your setup to support over the next 12 to 36 months.
          </p>

          <BestAnswerBlock
            title="Best answer"
            content="The best free zone for your business is not the one with the lowest advertised package. It is the one that balances activity fit, setup cost, visa needs, renewal logic, operational flexibility, and banking practicality for your specific situation."
            audience="First-time founders, e-commerce sellers, consultants, remote-first operators."
            caution="Always verify current pricing directly with the authority. Packages and inclusions change frequently."
          />
        </section>

        {/* Filter toolbar */}
        <section className="container pb-6">
          <div className="border border-border rounded-lg bg-card p-4 md:p-5">
            <div className="flex flex-col md:flex-row gap-3 md:items-end">
              {/* Search */}
              <div className="flex-1 min-w-0">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search free zones…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Industry */}
              <div className="w-full md:w-48">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Industry</label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cost */}
              <div className="w-full md:w-48">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Budget</label>
                <Select value={cost} onValueChange={setCost}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {costOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="w-full md:w-48">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View toggle */}
              <div className="flex gap-1 border border-border rounded-md p-0.5">
                <button
                  onClick={() => setView("card")}
                  className={`p-2 rounded-sm transition-colors ${view === "card" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Card view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("table")}
                  className={`p-2 rounded-sm transition-colors ${view === "table" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Table view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Showing {filtered.length} of {freeZones.length} free zones
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="container pb-20">
          {view === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((fz) => (
                <article
                  key={fz.id}
                  className="border border-border rounded-lg bg-card hover:border-accent/40 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="p-6 flex-1 space-y-4">
                    <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                      {fz.name}
                    </h3>
                    <p className="text-sm text-accent font-medium">{fz.idealFor}</p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground block">Starting from</span>
                          <span className="font-medium text-foreground">{fz.startingCost}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground block">Visas</span>
                          <span className="font-medium text-foreground">{fz.visaSummary}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground block">Office</span>
                          <span className="font-medium text-foreground">{fz.officeSummary}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground block">Timeline</span>
                          <span className="font-medium text-foreground">{fz.timeline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      <Landmark className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs text-muted-foreground block">Banking/KYC</span>
                        <span className="text-foreground">{fz.bankingNote}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border p-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      Compare
                    </Button>
                    <Button size="sm" className="flex-1 text-xs bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                      <Link to={`/free-zones/${fz.id}`}>
                        View Details
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Table view */
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Free Zone</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Ideal For</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Starting Cost</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Visas</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Office</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Timeline</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Banking</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((fz, i) => (
                      <tr
                        key={fz.id}
                        className={`border-t border-border hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{fz.name.split("—")[0].trim()}</td>
                        <td className="px-4 py-3 text-muted-foreground max-w-[200px]">{fz.idealFor}</td>
                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{fz.startingCost}</td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{fz.visaSummary}</td>
                        <td className="px-4 py-3 text-muted-foreground max-w-[180px]">{fz.officeSummary}</td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{fz.timeline}</td>
                        <td className="px-4 py-3 text-muted-foreground max-w-[180px]">{fz.bankingNote}</td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="ghost" className="text-accent hover:text-accent text-xs whitespace-nowrap" asChild>
                            <Link to={`/free-zones/${fz.id}`}>
                              Details <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No free zones match your filters.</p>
              <Button variant="link" onClick={() => { setSearch(""); setIndustry("all"); setCost("all"); }}>
                Clear all filters
              </Button>
            </div>
          )}
        </section>

        {/* Methodology / disclaimer */}
        <section className="container pb-16">
          <div className="border-t border-border pt-8">
            <div className="max-w-2xl space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How this directory works</p>
              <p>
                Free zone data is compiled from official authority sources and verified periodically. Pricing shown is indicative starting points — actual costs depend on your activity, visa needs, and package selection.
              </p>
              <p>
                <strong>Last updated:</strong> February 2026 · <a href="#methodology" className="text-accent hover:underline">Methodology</a> · <a href="#sources" className="text-accent hover:underline">Sources</a>
              </p>
              <p className="text-xs">
                Pricing can change. Always confirm current fees, package inclusions, and authority requirements before proceeding.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FreeZones;
