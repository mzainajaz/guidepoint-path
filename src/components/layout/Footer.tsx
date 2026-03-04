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
    <footer className="bg-[#080F1E] text-white">
      <div className="container py-16 md:py-20">
        {/* Brand + tagline at top */}
        <div className="mb-12 pb-10 border-b border-white/8">
          <Link to={lp("/")} className="font-display text-2xl font-bold text-white">
            Incorporate
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">UAE</span>
          </Link>
          <p className="text-white/40 text-sm mt-2 max-w-xs">{t.footer.tagline}</p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-14">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold mb-5 text-amber-400/80 uppercase tracking-[0.15em]">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
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
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-white/30">{t.footer.copyright(new Date().getFullYear())}</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/20">UAE Business Setup Advisory</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
