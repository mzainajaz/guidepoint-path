import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Globe, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/i18n/context";
import { locales, localeConfig } from "@/i18n/translations/index";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lp, switchLocale, locale } = useLocale();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/en/" || location.pathname === "/ar/";

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
    { label: "Blog", href: lp("/blog") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const solidBg = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solidBg
            ? "bg-[#0a0a0a]/96 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

          {/* Left nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.slice(0, 2).map((item) => (
              <div key={item.label} className="relative group">
                {item.href && !item.children ? (
                  <Link
                    to={item.href}
                    className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 text-[11px] font-medium tracking-[0.14em] uppercase text-white/50 hover:text-white transition-colors duration-200">
                    {item.label}
                    {item.children && <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />}
                  </button>
                )}
                {item.children && (
                  <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 pt-3 z-50">
                    <div className="bg-[#111111] border border-white/[0.08] rounded-sm shadow-2xl p-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2.5 text-[12px] text-[#c0c0c0] hover:text-white hover:bg-white/[0.04] transition-colors"
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

          {/* Center: Logo */}
          <Link
            to={lp("/")}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <img
              src="/images/logo-incorpuae.png"
              alt="IncorpUAE"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Right nav + CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.slice(2).map((item) => (
              <div key={item.label} className="relative group">
                {item.href && !item.children ? (
                  <Link
                    to={item.href}
                    className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 text-[11px] font-medium tracking-[0.14em] uppercase text-white/50 hover:text-white transition-colors duration-200">
                    {item.label}
                    {item.children && <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />}
                  </button>
                )}
                {item.children && (
                  <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full right-0 pt-3 z-50">
                    <div className="bg-[#111111] border border-white/[0.08] rounded-sm shadow-2xl p-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2.5 text-[12px] text-[#c0c0c0] hover:text-white hover:bg-white/[0.04] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Language switcher */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.1em] uppercase text-white/50 hover:text-white transition-colors">
                <Globe className="h-3.5 w-3.5" />
                {localeConfig[locale].flag}
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full right-0 pt-3 z-50">
                <div className="bg-[#111111] border border-white/[0.08] rounded-sm shadow-2xl p-2 min-w-[150px]">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-[12px] transition-colors ${
                        loc === locale
                          ? "text-[#C87941]"
                          : "text-[#c0c0c0] hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{localeConfig[loc].flag}</span>
                      <span>{localeConfig[loc].name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to={lp("/tools/cost-estimator")}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-[11px] font-medium tracking-[0.1em] uppercase hover:bg-white/88 transition-all duration-200"
            >
              {t.common.getStarted}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden ml-auto text-white/70 hover:text-white transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col pt-[72px] overflow-y-auto"
          >
            <div className="flex flex-col px-8 py-8 gap-0">
              {navItems.map((item, i) => (
                <div key={item.label}>
                  {item.href && !item.children ? (
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 border-b border-white/[0.06] font-display text-2xl font-light text-white/70 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="py-4 border-b border-white/[0.06]">
                      <span className="font-display text-2xl font-light text-white/70">{item.label}</span>
                      {item.children && (
                        <div className="mt-3 pl-4 flex flex-col gap-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-sm text-white/40 hover:text-white/70 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  to={lp("/tools/cost-estimator")}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-[11px] font-medium tracking-[0.1em] uppercase"
                >
                  {t.common.getStarted} <ArrowRight size={14} />
                </Link>
                <button
                  onClick={() => { switchLocale(locale === "en" ? "ar" : "en"); setMobileOpen(false); }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/60 text-[11px] font-medium tracking-[0.1em] uppercase"
                >
                  <Globe size={14} /> {t.nav.switchLangLabel}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
