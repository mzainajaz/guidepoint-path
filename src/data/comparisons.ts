export interface ComparisonCriteria {
  label: string;
  optionA: string;
  optionB: string;
}

export interface ComparisonData {
  id: string;
  type: "free-zone-vs-free-zone" | "mainland-vs-free-zone" | "entity" | "market";
  title: string;
  subtitle: string;
  optionAName: string;
  optionBName: string;
  summaryVerdict: string;
  suitableWhen: string[];
  lessSuitableWhen: string[];
  criteria: ComparisonCriteria[];
  prosA: string[];
  consA: string[];
  prosB: string[];
  consB: string[];
  costDrivers: string;
  bankingRealities: string;
  commonMistakes: string[];
  faqs: { q: string; a: string }[];
  methodology: string;
  lastUpdated: string;
  sources: string[];
}

export const comparisons: ComparisonData[] = [
  {
    id: "ifza-vs-dmcc",
    type: "free-zone-vs-free-zone",
    title: "IFZA vs DMCC",
    subtitle: "Comparing two of Dubai's most popular free zones for different founder profiles",
    optionAName: "IFZA",
    optionBName: "DMCC",
    summaryVerdict:
      "IFZA suits budget-conscious service businesses and solopreneurs who don't need a physical office. DMCC is better for trading companies, larger operations, and founders who need strong banking relationships and a prestigious JLT address.",
    suitableWhen: [
      "You're a consultant or service provider → IFZA is likely the better fit",
      "You're trading commodities or physical goods → DMCC is typically stronger",
      "You need 6+ visas → DMCC with a physical office supports larger teams",
      "Budget is tight and you're remote-first → IFZA offers lower starting costs",
    ],
    lessSuitableWhen: [
      "You choose IFZA purely on price without checking activity coverage",
      "You choose DMCC for a solo consultancy when you don't need the premium",
      "You assume banking is identical — DMCC typically has stronger banking relationships",
    ],
    criteria: [
      { label: "Starting cost", optionA: "AED 11,900", optionB: "AED 25,000" },
      { label: "Ideal for", optionA: "Consultants, solopreneurs, service businesses", optionB: "Trading, commodities, crypto, larger operations" },
      { label: "Visa quota", optionA: "Up to 6 per licence", optionB: "Up to 25+ depending on office" },
      { label: "Office requirement", optionA: "Flexi-desk included (no physical office needed)", optionB: "Physical office required for most visa allocations" },
      { label: "Timeline", optionA: "3–5 business days", optionB: "5–10 business days" },
      { label: "Banking friendliness", optionA: "Generally smoother KYC", optionB: "Strong banking relationships; KYC thorough" },
      { label: "Remote-first", optionA: "Yes", optionB: "No (office required)" },
      { label: "Prestige / address", optionA: "Fujairah-authority (Dubai presence)", optionB: "JLT, Dubai — prestigious address" },
      { label: "Renewal cost", optionA: "Generally lower", optionB: "Higher due to office lease" },
      { label: "Activity range", optionA: "Service-focused, limited trading", optionB: "Broad — trading, commodities, crypto, services" },
    ],
    prosA: [
      "Lower starting cost",
      "No physical office required",
      "Faster setup (3–5 days)",
      "Good for remote-first businesses",
      "Smoother banking onboarding",
    ],
    consA: [
      "Limited trading activity support",
      "Fujairah authority — not a Dubai free zone technically",
      "Maximum 6 visas per licence",
      "Less prestigious address",
    ],
    prosB: [
      "World-renowned free zone",
      "Strong banking relationships",
      "Broad activity coverage including crypto",
      "High visa quotas with office",
      "Prestigious JLT address",
    ],
    consB: [
      "Higher starting cost",
      "Physical office required",
      "Slower setup process",
      "Higher renewal costs",
      "More complex for solo operators",
    ],
    costDrivers:
      "IFZA's total first-year cost for a solopreneur (licence + 1 visa + EID + medical) is typically AED 16,000–20,000. DMCC's equivalent with a flexi-desk is AED 30,000–35,000, and with a physical office AED 55,000–75,000+. Renewal costs follow a similar pattern.",
    bankingRealities:
      "Both zones support corporate banking, but DMCC companies generally have an easier time with major banks due to DMCC's global reputation. IFZA companies may find digital banks (Wio, Mashreq Neo) faster. For both, prepare a business plan, source of funds documentation, and client contracts.",
    commonMistakes: [
      "Choosing IFZA for trading activities that require DMCC's broader coverage",
      "Choosing DMCC for a solo consultancy when IFZA would cost half as much",
      "Not factoring in office lease costs when comparing DMCC pricing",
      "Assuming banking will be identical — DMCC has a meaningful advantage",
      "Ignoring renewal costs — DMCC renewals include office lease",
    ],
    faqs: [
      {
        q: "Can I switch from IFZA to DMCC later?",
        a: "Yes, but it requires setting up a new licence in DMCC and closing or maintaining your IFZA licence. It's not a simple transfer — you'll need new visa processing and a new bank account.",
      },
      {
        q: "Which is better for e-commerce?",
        a: "Both support e-commerce activities. IFZA is typically more cost-effective for online-only businesses. DMCC may be better if you're also doing physical goods trading or need warehouse access.",
      },
      {
        q: "Can I have employees in both zones?",
        a: "Each employee needs a visa under one specific licence. You can't split employees across two licences unless you have two separate companies.",
      },
    ],
    methodology:
      "This comparison is based on published fee schedules, official authority guidelines, and editorial assessment of banking and operational realities. Criteria are evaluated on a like-for-like basis where possible. Suitability depends on your specific activity, residency context, banking needs, and timing.",
    lastUpdated: "February 2026",
    sources: [
      "IFZA official fee schedule 2025–2026",
      "DMCC official fee schedule 2025–2026",
      "Banking partner onboarding data",
      "Editorial research and founder feedback",
    ],
  },
  {
    id: "mainland-vs-free-zone",
    type: "mainland-vs-free-zone",
    title: "UAE Mainland vs Free Zone",
    subtitle: "Understanding the fundamental choice every UAE founder faces",
    optionAName: "Free Zone",
    optionBName: "Mainland",
    summaryVerdict:
      "Free zones offer simpler setup, 100% foreign ownership, and lower costs for most service and trading businesses. Mainland is necessary when you need to trade directly with UAE consumers, operate in certain regulated sectors, or need flexibility to work anywhere in the UAE.",
    suitableWhen: [
      "You only trade internationally or within free zones → Free zone is usually simpler",
      "You need to invoice UAE mainland clients directly → Mainland is typically required",
      "You're in a regulated activity (food, healthcare, education) → Mainland may be necessary",
      "You want the simplest, lowest-cost setup → Free zone usually wins",
    ],
    lessSuitableWhen: [
      "You assume free zones can't trade with mainland — they can, but with limitations",
      "You choose mainland purely because someone told you it's 'better'",
      "You don't check whether your activity requires specific mainland approvals",
    ],
    criteria: [
      { label: "Foreign ownership", optionA: "100% in all free zones", optionB: "100% for most activities (since 2021 reform)" },
      { label: "Starting cost", optionA: "AED 5,750–50,000+ depending on zone", optionB: "AED 15,000–30,000+ depending on activity" },
      { label: "Office requirement", optionA: "Flexi-desk often sufficient", optionB: "Physical office (Ejari) required" },
      { label: "Trading scope", optionA: "Within free zone + international", optionB: "Anywhere in UAE + international" },
      { label: "Visa process", optionA: "Through free zone authority", optionB: "Through DED + immigration" },
      { label: "VAT implications", optionA: "Standard VAT rules apply", optionB: "Standard VAT rules apply" },
      { label: "Corporate tax", optionA: "9% above AED 375,000 (some exemptions)", optionB: "9% above AED 375,000" },
      { label: "Setup complexity", optionA: "Generally simpler", optionB: "More steps, more approvals" },
      { label: "Banking", optionA: "Varies by zone", optionB: "Generally straightforward" },
    ],
    prosA: [
      "Simpler and faster setup",
      "100% foreign ownership guaranteed",
      "Often no physical office needed",
      "Many zones offer competitive packages",
      "Good for international-facing businesses",
    ],
    consA: [
      "Limited ability to trade with mainland directly",
      "May need a mainland distributor for UAE retail",
      "Banking can vary by zone reputation",
      "Some zones have limited activity lists",
    ],
    prosB: [
      "Trade anywhere in the UAE",
      "Broader activity coverage",
      "Generally easier banking",
      "Required for some regulated activities",
      "No geographic trading restrictions",
    ],
    consB: [
      "Physical office (Ejari) required — higher cost",
      "More complex setup process",
      "May need local service agent for some activities",
      "More compliance and approval steps",
    ],
    costDrivers:
      "Free zone total first-year costs range from AED 10,000 (budget zones like Shams) to AED 75,000+ (premium zones like DIFC). Mainland setup typically costs AED 20,000–40,000 including DED licence, Ejari, and visa, but office rent is an ongoing commitment.",
    bankingRealities:
      "Mainland companies generally have an easier banking journey because banks view them as having broader commercial scope. Free zone companies' banking experience varies significantly by zone — DMCC and DIFC have strong banking, while some smaller zones face more friction.",
    commonMistakes: [
      "Choosing a free zone without checking if your clients are mainland-based",
      "Choosing mainland without checking if a free zone covers your activity at lower cost",
      "Not understanding the Ejari requirement and its ongoing cost implications",
      "Assuming 'mainland is always better' — it depends entirely on your use case",
    ],
    faqs: [
      {
        q: "Can a free zone company sell to UAE mainland customers?",
        a: "Yes, but with limitations. Free zone companies can invoice mainland clients, but the clients may prefer working with mainland-registered suppliers. For retail and consumer-facing businesses, mainland is usually necessary.",
      },
      {
        q: "Is corporate tax the same for both?",
        a: "Yes, the 9% corporate tax applies to both. However, some qualifying free zone companies may benefit from a 0% rate on qualifying income if they meet specific conditions.",
      },
    ],
    methodology:
      "This comparison is based on DED and free zone authority guidelines, published fee schedules, and editorial assessment. The mainland landscape changed significantly with the 2021 Commercial Companies Law reform allowing 100% foreign ownership for most activities.",
    lastUpdated: "February 2026",
    sources: [
      "Dubai DED official guidelines",
      "UAE Commercial Companies Law 2021",
      "Multiple free zone fee schedules",
      "Editorial research",
    ],
  },
];

export function getComparisonById(id: string): ComparisonData | undefined {
  return comparisons.find((c) => c.id === id);
}
