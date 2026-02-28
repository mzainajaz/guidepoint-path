import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  {
    label: "Setup Options",
    children: [
      { label: "Free Zones", href: "/free-zones" },
      { label: "Mainland", href: "/mainland" },
      { label: "Business Activities", href: "/activities" },
    ],
  },
  {
    label: "Compare",
    href: "/compare",
  },
  {
    label: "Tools & Calculators",
    children: [
      { label: "Total Setup Cost Estimator", href: "#cost-estimator" },
      { label: "Free Zone Picker", href: "#fz-picker" },
      { label: "VAT Decision Helper", href: "#vat-helper" },
    ],
  },
  {
    label: "Relocation",
    href: "/relocation",
  },
  {
    label: "Taxes & Compliance",
    children: [
      { label: "Overview", href: "/taxes" },
      { label: "VAT Guide", href: "/taxes/vat" },
      { label: "Corporate Tax Guide", href: "/taxes/corporate-tax" },
    ],
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between lg:h-18">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold text-foreground tracking-tight">
            Incorporate<span className="text-accent">UAE</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <a
                href={item.href || "#"}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </a>
              {item.children && (
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all absolute top-full left-0 pt-2 z-50">
                  <div className="bg-card border border-border rounded-lg shadow-lg p-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm">
            Speak to an Agent
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Setup Snapshot
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href || "#"}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground"
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-muted-foreground"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-4 px-3">
              <Button variant="outline" size="sm" className="w-full">
                Speak to an Agent
              </Button>
              <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Get Setup Snapshot
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
