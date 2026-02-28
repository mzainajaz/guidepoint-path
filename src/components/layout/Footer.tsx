import { Link } from "react-router-dom";

const footerLinks = {
  "Setup Options": [
    { label: "Free Zones", href: "/free-zones" },
    { label: "Mainland", href: "/mainland" },
    { label: "Activities", href: "/activities" },
    { label: "Compare", href: "/compare" },
  ],
  Tools: [
    { label: "Cost Estimator", href: "/tools/cost-estimator" },
    { label: "Zone Picker", href: "/tools/zone-picker" },
    { label: "VAT Helper", href: "/tools/vat-helper" },
  ],
  Relocation: [
    { label: "UK", href: "/relocation/uk" },
    { label: "US", href: "/relocation/us" },
    { label: "India", href: "/relocation/india" },
    { label: "Egypt", href: "/relocation/egypt" },
    { label: "Europe", href: "/relocation/europe" },
  ],
  Compliance: [
    { label: "Tax Overview", href: "/taxes" },
    { label: "VAT Guide", href: "/taxes/vat" },
    { label: "Corporate Tax", href: "/taxes/corporate-tax" },
  ],
};

const Footer = () => (
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
          <Link to="/" className="font-display text-xl font-bold">
            Incorporate<span className="gradient-text">UAE</span>
          </Link>
          <p className="text-sm opacity-40 mt-1.5">
            Structured guidance for UAE business setup.
          </p>
        </div>
        <p className="text-xs opacity-30">
          © {new Date().getFullYear()} IncorporateUAE. Educational content, not legal or tax advice.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;