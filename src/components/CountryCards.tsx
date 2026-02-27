const countries = [
  { name: "United Kingdom", code: "UK", flag: "🇬🇧" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Egypt", code: "EG", flag: "🇪🇬" },
  { name: "Europe", code: "EU", flag: "🇪🇺" },
];

const CountryCards = () => (
  <section className="bg-secondary py-20">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Moving to the UAE from…
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Country-specific guides covering setup routes, banking realities, relocation planning, and common pitfalls.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {countries.map((country) => (
          <a
            key={country.code}
            href={`#relocation-${country.code.toLowerCase()}`}
            className="flex items-center gap-3 bg-card border border-border rounded-lg px-6 py-4 hover:border-accent/40 hover:shadow-md transition-all min-w-[180px]"
          >
            <span className="text-2xl">{country.flag}</span>
            <span className="font-medium text-foreground">{country.name}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CountryCards;
