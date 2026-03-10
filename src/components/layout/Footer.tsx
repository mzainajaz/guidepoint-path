import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/context";

const Footer = () => {
  const { t, lp } = useLocale();

  const footerLinks = {
    [t.footer.setupOptions]: [
      { label: t.nav.freeZones, href: lp("/free-zones") },
      { label: "Mainland", href: lp("/mainland") },
      { label: t.nav.businessActivities, href: lp("/activities") },
      { label: t.nav.compare, href: lp("/compare") },
    ],
    "How-To Library": [
      { label: "All Articles", href: lp("/how-to/uae-business-setup") },
      { label: "Business Structures", href: lp("/how-to/uae-business-setup/02_business_structures") },
      { label: "Free Zones", href: lp("/how-to/uae-business-setup/04_free_zones_comparison") },
      { label: "Visas & Residency", href: lp("/how-to/uae-business-setup/11_investor_golden_visa") },
    ],
    [t.footer.tools]: [
      { label: t.nav.costEstimator, href: lp("/tools/cost-estimator") },
      { label: t.nav.freeZonePicker, href: lp("/tools/zone-picker") },
      { label: t.nav.vatHelper, href: lp("/tools/vat-helper") },
    ],
    [t.footer.relocation]: [
      { label: "UK", href: lp("/relocation/uk") },
      { label: "US", href: lp("/relocation/us") },
      { label: "India", href: lp("/relocation/india") },
      { label: "Egypt", href: lp("/relocation/egypt") },
      { label: "Europe", href: lp("/relocation/europe") },
    ],
    [t.footer.compliance]: [
      { label: t.footer.taxOverview, href: lp("/taxes") },
      { label: t.nav.vatGuide, href: lp("/taxes/vat") },
      { label: t.nav.corporateTax, href: lp("/taxes/corporate-tax") },
    ],
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/[0.06]">
      <div className="container py-16 md:py-20">
        {/* Brand + tagline */}
        <div className="mb-12 pb-10 border-b border-white/[0.06]">
          <Link to={lp("/")} className="inline-block">
            <img
              src="/images/logo-incorpuae.png"
              alt="IncorpUAE"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <p
            className="text-[#909090] text-sm mt-3 max-w-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.footer.tagline}
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-14">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4
                className="text-[10px] font-medium mb-5 text-[#C87941] uppercase tracking-[0.18em]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-[#a0a0a0] hover:text-white transition-colors duration-200"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p
            className="text-[12px] text-white/20"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.footer.copyright(new Date().getFullYear())}
          </p>
          <div className="flex items-center gap-6">
            <span
              className="text-[11px] text-white/15 tracking-[0.1em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              UAE Business Setup Advisory
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
