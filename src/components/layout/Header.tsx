import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/context";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lp, switchLocale, locale } = useLocale();

  const navItems = [
    {
      label: t.nav.setupOptions,
      children: [
        { label: t.nav.freeZones, href: lp("/free-zones") },
        { label: t.nav.mainlandOverview, href: lp("/mainland") },
        { label: t.nav.licensingBasics, href: lp("/mainland/licensing") },
        { label: t.nav.officeEjari, href: lp("/mainland/office-ejari") },
        { label: t.nav.complianceBasics, href: lp("/mainland/compliance") },
        { label: t.nav.businessActivities, href: lp("/activities") },
      ],
    },
    { label: t.nav.compare, href: lp("/compare") },
    {
      label: t.nav.tools,
      href: lp("/tools"),
      children: [
        { label: t.nav.costEstimator, href: lp("/tools/cost-estimator") },
        { label: t.nav.freeZonePicker, href: lp("/tools/zone-picker") },
        { label: t.nav.vatHelper, href: lp("/tools/vat-helper") },
      ],
    },
    { label: t.nav.relocation, href: lp("/relocation") },
    {
      label: t.nav.taxes,
      children: [
        { label: t.nav.overview, href: lp("/taxes") },
        { label: t.nav.vatGuide, href: lp("/taxes/vat") },
        { label: t.nav.corporateTax, href: lp("/taxes/corporate-tax") },
      ],
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between lg:h-[72px]">
        <Link to={lp("/")} className="flex items-center gap-2 group">
          <span className="font-display text-xl font-bold text-foreground tracking-tight">
            Incorporate<span className="gradient-text">UAE</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.href && !item.children ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
                </button>
              )}
              {item.children && (
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 pt-2 z-50">
                  <div className="glass-card rounded-xl shadow-xl p-2 min-w-[240px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-3.5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            aria-label={t.nav.switchLangLabel}
          >
            <Globe className="h-3.5 w-3.5" />
            {t.nav.switchLang}
          </button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link to={lp("/compare")}>{t.common.compareOptions}</Link>
          </Button>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-5 font-semibold shadow-lg shadow-accent/20">
            <Link to={lp("/tools/cost-estimator")}>{t.common.getStarted}</Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground rounded-lg hover:bg-secondary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container py-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href && !item.children ? (
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-foreground rounded-lg hover:bg-secondary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="block px-4 py-3 text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                  )}
                  {item.children && (
                    <div className="pl-4 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2.5 text-sm text-muted-foreground rounded-lg hover:bg-secondary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 pt-4 px-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full"
                  onClick={() => { switchLocale(); setMobileOpen(false); }}
                >
                  <Globe className="h-3.5 w-3.5 mr-1.5" />
                  {t.nav.switchLangLabel}
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                  <Link to={lp("/compare")} onClick={() => setMobileOpen(false)}>{t.common.compareOptions}</Link>
                </Button>
                <Button asChild size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold">
                  <Link to={lp("/tools/cost-estimator")} onClick={() => setMobileOpen(false)}>{t.common.getStarted}</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
