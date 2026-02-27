const footerLinks = {
  "Setup Options": ["Free Zones", "Mainland", "Business Activities", "Compare Options"],
  "Tools": ["Cost Estimator", "Free Zone Picker", "VAT Helper", "Tax Checker"],
  "Relocation": ["UK", "US", "India", "Egypt", "Europe"],
  "Company": ["About", "Methodology", "How We Review", "Privacy Policy"],
};

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 className="font-display text-sm font-semibold mb-4 opacity-70 uppercase tracking-wider">
              {section}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="font-display text-lg font-semibold">
            Incorporate<span className="text-accent">UAE</span>
          </span>
          <p className="text-sm opacity-50 mt-1">
            Structured guidance for UAE business setup.
          </p>
        </div>
        <p className="text-xs opacity-40">
          © {new Date().getFullYear()} IncorporateUAE. This site provides educational content, not legal or tax advice.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
