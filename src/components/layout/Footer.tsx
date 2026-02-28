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
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-14">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold mb-5 opacity-40 uppercase tracking-[0.15em]">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/8 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link to={lp("/")} className="font-display text-xl font-bold">
              Incorporate<span className="gradient-text">UAE</span>
            </Link>
            <p className="text-sm opacity-40 mt-1.5">{t.footer.tagline}</p>
          </div>
          <p className="text-xs opacity-30">{t.footer.copyright(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
