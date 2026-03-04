export interface GuideChapter {
  id: string;
  partId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  summary: string;
  icon: string; // lucide icon name
  sections: GuideSection[];
}

export interface GuideSection {
  heading: string;
  content: string;
  table?: { headers: string[]; rows: string[][] };
  bullets?: string[];
}

export interface GuidePart {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const guideParts: GuidePart[] = [
  {
    id: "setup-architecture",
    number: "I",
    title: "UAE Setup Architecture",
    description: "Understand the three formation tracks — mainland, free zone, and offshore — and how to choose between them.",
    icon: "Building2",
  },
  {
    id: "immigration-residency",
    number: "II",
    title: "Immigration, Family & Banking",
    description: "Visas, family sponsorship, medical fitness, Emirates ID, and corporate bank account readiness.",
    icon: "Plane",
  },
  {
    id: "tax-compliance",
    number: "III",
    title: "Tax, E-Invoicing & Compliance",
    description: "VAT registration, Corporate Tax, QFZP logic, e-invoicing timelines, UBO, and AML readiness.",
    icon: "Receipt",
  },
  {
    id: "zone-profiles",
    number: "IV",
    title: "Free Zone & Emirate Profiles",
    description: "Detailed profiles for every major UAE free zone — best fit, pricing, visa logic, strengths, and watch-outs.",
    icon: "MapPin",
  },
  {
    id: "startup-leverage",
    number: "V",
    title: "Startup Leverage & Frameworks",
    description: "Decision frameworks, ecosystem strategies, and the annual operating model after incorporation.",
    icon: "Rocket",
  },
  {
    id: "structuring-depth",
    number: "VI",
    title: "Structuring & Operating Depth",
    description: "Holding companies, branches, SPVs, foundations, family offices, payroll, accounting, and renewals.",
    icon: "Layers",
  },
  {
    id: "mainland-dossiers",
    number: "VII",
    title: "Mainland Dossiers by Emirate",
    description: "Emirate-by-emirate mainland profiles — when mainland beats free zone and how to evaluate it.",
    icon: "Landmark",
  },
];

export const guideChapters: GuideChapter[] = [
  // ── Part I ──
  {
    id: "uae-setup-system",
    partId: "setup-architecture",
    chapterNumber: 1,
    title: "The UAE Business Setup System in One View",
    slug: "uae-setup-system",
    summary: "The three primary formation tracks — mainland, free zone, and offshore — and the five things your setup must match simultaneously.",
    icon: "Globe",
    sections: [
      {
        heading: "Three Formation Tracks",
        content: "The UAE business setup market sits on three primary formation tracks: mainland, free zone, and offshore. Mainland companies are licenced by the relevant economic department and are the cleanest route for broad UAE onshore trade. Free-zone companies sit under a separate registrar and are usually chosen for foreign ownership, specialist ecosystems, export-focused operations, or faster digital setup. Offshore structures are used mainly for holding, asset ownership, and cross-border structuring.",
      },
      {
        heading: "The Five-Match Rule",
        content: "The most common mistake founders make is choosing the cheapest package first and only later discovering that the chosen activity, market-access model, or banking profile is a poor fit. In practice, the right setup must match five things at the same time: activity approval, target market access, visa need, facility need, and tax/banking posture.",
      },
      {
        heading: "Track Comparison",
        content: "",
        table: {
          headers: ["Track", "Best for", "Market Access", "Visa Logic", "Caution"],
          rows: [
            ["Mainland", "Onshore UAE trading, retail, local service delivery", "Can operate inside and outside the UAE", "Owner / employee visas available", "May require extra approvals or ownership restrictions"],
            ["Free Zone", "Export, consulting, e-commerce, specialist clusters", "Excellent for cross-border and B2B", "Ranges from 0-visa to multi-visa bundles", "Packages are not apples-to-apples across zones"],
            ["Offshore", "Holdcos, IP ownership, family wealth", "Usually not designed for local operating trade", "Commonly not a visa-first structure", "Not a substitute for a true operating company"],
          ],
        },
      },
    ],
  },
  {
    id: "mainland-vs-freezone-vs-offshore",
    partId: "setup-architecture",
    chapterNumber: 2,
    title: "Mainland vs Free Zone vs Offshore — How to Choose",
    slug: "mainland-vs-freezone-vs-offshore",
    summary: "Decision logic for choosing between mainland, free zone, and offshore based on your business model, not price.",
    icon: "GitBranch",
    sections: [
      {
        heading: "When to Choose Mainland",
        content: "Choose mainland when the business model depends on direct onshore UAE trade, local tenders, retail presence, or straightforward contracting inside the domestic market.",
      },
      {
        heading: "When to Choose Free Zone",
        content: "Choose free zone when the business is export-led, digital-first, founder-led, regional, or ecosystem-driven. Free zones also work well for consulting, holding, many service businesses, and early-stage businesses that want a registered UAE company without a full operating footprint on day one.",
      },
      {
        heading: "When to Choose Offshore",
        content: "Choose offshore when you need a non-operating structure, typically for ring-fencing ownership, holding shares, estate and succession planning, or certain international transactions.",
      },
      {
        heading: "Decision Principles",
        content: "",
        bullets: [
          "Do not start with price. Start with business model and activity.",
          "If you need one legal entity to invoice UAE clients, hire staff, rent facilities, and sponsor families — test those needs first.",
          "If banking credibility matters more than upfront setup cost, choose a structure with stronger substance.",
          "If the real objective is a holding company, family office, or SPV, do not overpay for a trading-style zone package.",
          "If the business may become regulated later, choose a jurisdiction that can support the next licence class.",
        ],
      },
    ],
  },
  {
    id: "legal-forms-uae",
    partId: "setup-architecture",
    chapterNumber: 3,
    title: "Legal Forms Commonly Seen in the UAE",
    slug: "legal-forms-uae",
    summary: "From sole establishments to FZCOs, branches, SPVs, and foundations — how legal form affects ownership, governance, and banking.",
    icon: "FileText",
    sections: [
      {
        heading: "Why Legal Form Matters",
        content: "The legal form is not just a filing choice. It affects ownership, governance, bank onboarding, audit obligations, and what the entity can grow into later.",
      },
      {
        heading: "Common Legal Forms",
        content: "",
        bullets: [
          "Sole establishment / sole proprietorship — common for very small mainland activities.",
          "Limited Liability Company (LLC) — the default operating form for many mainland companies.",
          "FZE / FZ-LLC / FZCO — common free-zone structures, single or multi-shareholder.",
          "Branch — used by existing UAE or foreign companies that want a branch rather than a subsidiary.",
          "Holding company — useful where the operating business should sit below a parent entity.",
          "SPV — a special-purpose vehicle for ring-fenced transactions or holdings.",
          "Foundation / family office structure — relevant to wealth and succession planning.",
          "Offshore company — a specialised cross-border vehicle in selected jurisdictions.",
        ],
      },
    ],
  },
  {
    id: "business-activities-codes",
    partId: "setup-architecture",
    chapterNumber: 4,
    title: "Business Activities, Codes & External Approvals",
    slug: "business-activities-codes",
    summary: "Activity selection is the core operating constraint. How zone activity lists work, regulated activities, and external approvals.",
    icon: "ClipboardList",
    sections: [
      {
        heading: "Why Activities Matter",
        content: "A trade licence is only as useful as the activities listed on it. Some zones let founders combine multiple activities under one licence; some force activities into narrow categories. Regulated or restricted activities may require external approvals from ministries or sector regulators.",
      },
      {
        heading: "Activity Infrastructure by Zone",
        content: "",
        table: {
          headers: ["Zone", "Public Activity Source", "Count", "Note"],
          rows: [
            ["Meydan", "Official activity list / calculator", "2,500+", "Publicly markets grouping flexibility"],
            ["IFZA", "Dedicated activities portal", "Searchable", "Amber activities require external approvals"],
            ["RAKEZ", "Official activity list", "3,000+", "Wide spread across 50+ industries"],
            ["Ajman FZ", "Official activity list", "3,500+", "Useful for broad comparison"],
            ["SPC FZ", "Official activity pages", "2,000+", "Good for multi-activity startup mapping"],
            ["JAFZA", "Dubai DED business activity list", "Inherited", "Not a standalone activity universe"],
          ],
        },
      },
    ],
  },
  {
    id: "real-cost-of-setup",
    partId: "setup-architecture",
    chapterNumber: 5,
    title: "The Real Cost of Setup",
    slug: "real-cost-of-setup",
    summary: "A UAE company is never just a licence fee. Understand the full cost stack from formation to renewal.",
    icon: "Calculator",
    sections: [
      {
        heading: "The Full Cost Stack",
        content: "The real cost includes formation fees, licence fees, trade-name reservation, establishment card costs, visa allocation, medical fitness, Emirates ID, facility or flexi-desk, bank account readiness, bookkeeping, tax registration, renewal costs, insurance, and potentially external-approval costs.",
      },
      {
        heading: "Public Package Comparison",
        content: "",
        table: {
          headers: ["Package", "Public Price", "Interpretation"],
          rows: [
            ["Ajman Media City Business Club", "AED 4,999", "Low-cost zero-visa founder entry"],
            ["UAQ LYTE", "AED 5,500", "Remote or no-visa orientation"],
            ["Shams Media Package", "From AED 5,750", "Starter price; visa-enabled versions separate"],
            ["SRTIP zero-visa", "AED 5,500", "Founder / digital-first positioning"],
            ["RAKEZ Biz Starter", "~AED 6,000", "Promotional entry pricing"],
            ["Meydan / DMCC / ADGM / DIFC", "Varies", "Ecosystem-led rather than lowest-cost"],
          ],
        },
      },
      {
        heading: "Price Classification",
        content: "The book classifies every price line with one of four labels: official fixed price, official starting-from price, official promotional price, or custom quotation required. This makes comparisons far more credible than most business-setup comparison sites.",
      },
    ],
  },

  // ── Part II ──
  {
    id: "owner-employee-visas",
    partId: "immigration-residency",
    chapterNumber: 6,
    title: "Owner Visas, Employee Visas & Residency Flow",
    slug: "owner-employee-visas",
    summary: "The multi-layered residency path: company setup, visa quota, medical fitness, Emirates ID, and the full immigration cost stack.",
    icon: "IdCard",
    sections: [
      {
        heading: "Beyond the Package Marketing",
        content: "Most founder-facing free-zone conversations oversimplify visas. The residency path has multiple layers: the company must exist and have the right immigration setup, the visa quota must exist, the applicant must satisfy document requirements, undergo medical fitness, and the residence permit is linked to Emirates ID.",
      },
      {
        heading: "Key Principles",
        content: "",
        bullets: [
          "Map owner visa, employee visa, and dependent sponsorship separately — they are related but different workflows.",
          "Always check whether the package includes only visa eligibility or the full immigration cost stack.",
          "Do not assume visa count is unlimited — quota is often tied to facility type or package tier.",
          "Medical, Emirates ID, and insurance can materially affect total cost even when the licence itself looks cheap.",
        ],
      },
    ],
  },
  {
    id: "family-sponsorship",
    partId: "immigration-residency",
    chapterNumber: 7,
    title: "Family Sponsorship, Dependents & Health Insurance",
    slug: "family-sponsorship",
    summary: "Salary thresholds, dependent visas, health insurance requirements from Jan 2025, and MOHRE work permits for family-sponsored dependents.",
    icon: "Users",
    sections: [
      {
        heading: "Family Sponsorship Basics",
        content: "A resident may sponsor family members if the sponsor meets the salary threshold — generally AED 4,000 or AED 3,000 plus accommodation. This is the federal baseline.",
      },
      {
        heading: "Health Insurance Requirement",
        content: "From 1 January 2025, employers are required to purchase health insurance as a prerequisite for applying for the issuance or renewal of work residence permits. Residency planning should now treat insurance as part of the visa budget, not an afterthought.",
      },
      {
        heading: "Dependency Layers",
        content: "",
        table: {
          headers: ["Layer", "Why It Matters", "What to Capture"],
          rows: [
            ["Spouse / child sponsorship", "Relocation and family stability", "Eligibility, cost, document stack, timing"],
            ["Dependent work permit", "Flexibility for spouses / adult dependents", "MOHRE process, fees, employer readiness"],
            ["Health insurance", "Residency issuance / renewal dependency", "Employer-provided, package-provided, or separate"],
            ["Schooling / housing proofs", "Often relevant in relocation reality", "Practical checklist"],
          ],
        },
      },
    ],
  },
  {
    id: "medical-fitness-emirates-id",
    partId: "immigration-residency",
    chapterNumber: 8,
    title: "Medical Fitness & Emirates ID",
    slug: "medical-fitness-emirates-id",
    summary: "The linked residence bundle — visa file, medical fitness, biometrics, and final residence permit.",
    icon: "HeartPulse",
    sections: [
      {
        heading: "The Linked Bundle",
        content: "The residence process should be viewed as a linked bundle: visa file, medical fitness, biometrics/ID, and final residence permit. Foreign nationals seeking work or residence permits must be free of communicable diseases and adults 18+ must undergo a medical test.",
      },
      {
        heading: "Practical Implications",
        content: "The residence permit issuance service is linked to the Emirates ID application. This has practical implications for travel planning, urgent onboarding, payroll activation, telecom setup, and banking onboarding. For package comparisons, always separate 'visa included' from 'medical and Emirates ID included.'",
      },
    ],
  },
  {
    id: "corporate-bank-accounts",
    partId: "immigration-residency",
    chapterNumber: 9,
    title: "Corporate Bank Accounts — Assistance vs Approval",
    slug: "corporate-bank-accounts",
    summary: "Banking is a separate project. Bank readiness, KYC requirements, and why a low-cost licence isn't necessarily a high-bankability licence.",
    icon: "Building",
    sections: [
      {
        heading: "Bank Readiness, Not Bank Guarantees",
        content: "A company may be incorporated successfully and still face onboarding friction if the structure, ownership chain, country profile, or document package is weak. Free zones often market bank-account assistance, but bank approval remains a bank decision subject to KYC, risk appetite, and profile fit.",
      },
      {
        heading: "Key Principles",
        content: "",
        bullets: [
          "Treat 'bank assistance' as support, not approval.",
          "Build a banking folder before incorporation if the shareholders or activities are complex.",
          "Simple founders with clear local substance usually bank more smoothly than layered international holding structures.",
          "A low-cost licence is not necessarily a high-bankability licence.",
        ],
      },
    ],
  },

  // ── Part III ──
  {
    id: "vat-registration-filing",
    partId: "tax-compliance",
    chapterNumber: 10,
    title: "VAT — Registration, Filing & Operating Logic",
    slug: "vat-registration-filing",
    summary: "Mandatory at AED 375,000, voluntary at AED 187,500. Filing within 28 days. VAT as an operating system, not just a threshold.",
    icon: "Percent",
    sections: [
      {
        heading: "Registration Thresholds",
        content: "",
        table: {
          headers: ["Question", "Answer"],
          rows: [
            ["When is VAT registration mandatory?", "When taxable supplies and imports exceed AED 375,000, or expected to exceed in 30 days"],
            ["When is voluntary registration possible?", "At or above AED 187,500"],
            ["When do returns/payments fall due?", "Within 28 days from end of tax period"],
            ["What should founders track early?", "Revenue trend, taxable vs exempt supplies, imports, invoicing method, input VAT recovery"],
          ],
        },
      },
    ],
  },
  {
    id: "corporate-tax-scope",
    partId: "tax-compliance",
    chapterNumber: 11,
    title: "Corporate Tax — Scope, Rates, QFZP & Filing",
    slug: "corporate-tax-scope",
    summary: "0% up to AED 375,000, 9% above. QFZP is not automatic. Free zone ≠ no Corporate Tax registration.",
    icon: "Landmark",
    sections: [
      {
        heading: "Key Facts",
        content: "Corporate Tax applies nationally. Free-zone companies are also within scope and must comply with the law. The idea that 'free zone means no Corporate Tax registration' is wrong. 0% on taxable income up to AED 375,000, 9% above that. A Qualifying Free Zone Person (QFZP) may benefit from 0% on Qualifying Income if statutory conditions are met.",
      },
      {
        heading: "Critical Principles",
        content: "",
        bullets: [
          "Free-zone incorporation does not remove the need to register for Corporate Tax.",
          "QFZP status should be analysed, not assumed.",
          "Holding structures, family foundations, and SPVs need separate tax analysis.",
          "Startups should set chart of accounts and bookkeeping discipline early enough to support the first tax period cleanly.",
        ],
      },
    ],
  },
  {
    id: "ct-penalties-deadlines",
    partId: "tax-compliance",
    chapterNumber: 12,
    title: "Corporate Tax Penalties & Deadline Discipline",
    slug: "ct-penalties-deadlines",
    summary: "AED 500/month penalty for late filing (rising to AED 1,000 after 12 months). Waiver pathways and how to stay compliant.",
    icon: "AlertTriangle",
    sections: [
      {
        heading: "Penalty Structure",
        content: "Late submission of a Corporate Tax return results in AED 500 per month during the first twelve months, rising to AED 1,000 per month thereafter. For late registration, a waiver pathway exists if the first tax return is submitted within seven months from the end of the first tax period.",
      },
      {
        heading: "Why This Matters",
        content: "Many founders still think incorporation is the finish line. In reality, incorporation is the start of a recurring compliance calendar. The cost of late compliance can quickly exceed the cost of doing it properly.",
      },
    ],
  },
  {
    id: "e-invoicing",
    partId: "tax-compliance",
    chapterNumber: 13,
    title: "E-Invoicing — What Is Coming & Why It Matters",
    slug: "e-invoicing",
    summary: "Pilot programme from July 2026. Businesses with AED 50M+ revenue must implement by Jan 2027. What founders should do now.",
    icon: "FileDigit",
    sections: [
      {
        heading: "Timeline",
        content: "The pilot programme commences 1 July 2026 with a selected taxpayer group. Businesses with annual revenue of AED 50 million or more must appoint an accredited service provider by 31 July 2026 and implement the system from 1 January 2027.",
      },
      {
        heading: "What Founders Should Do Now",
        content: "The immediate action is not to panic. Choose invoicing and accounting systems that can mature into structured e-invoicing later. Treat e-invoicing as a system-design decision.",
      },
    ],
  },
  {
    id: "ubo-aml-substance",
    partId: "tax-compliance",
    chapterNumber: 14,
    title: "UBO, AML Readiness & Economic Substance",
    slug: "ubo-aml-substance",
    summary: "Ultimate beneficial ownership rules, AML readiness for banking, and the current status of Economic Substance Regulations.",
    icon: "Shield",
    sections: [
      {
        heading: "UBO Requirements",
        content: "The real beneficial owner is the natural person who ultimately owns or controls the legal person and holds 25% or more of shares or voting rights. This is a core company-maintenance and KYC issue.",
      },
      {
        heading: "Economic Substance Regulations",
        content: "ESR reporting requirements were cancelled for financial years ending after 31 December 2022. The book explains ESR because many older advisers and documents still reference it, but the reporting requirement has been amended.",
      },
    ],
  },

  // ── Part IV: Zone Profiles ──
  {
    id: "adgm-profile",
    partId: "zone-profiles",
    chapterNumber: 16,
    title: "ADGM",
    slug: "adgm-profile",
    summary: "Regulated finance, fintech, funds, family offices, private wealth, and sophisticated governance in Abu Dhabi.",
    icon: "Building2",
    sections: [
      { heading: "Best Fit", content: "Regulated finance, fintech, funds, family offices, private wealth, holding structures, sophisticated governance." },
      { heading: "Strengths", content: "Strong legal credibility, English common law environment, family-office and SPV options, strong fintech positioning." },
      { heading: "Watch-outs", content: "Not the right answer for cost-first founders or for businesses that only need a basic trade licence. Premium and specialist rather than cheapest-entry." },
    ],
  },
  {
    id: "masdar-profile",
    partId: "zone-profiles",
    chapterNumber: 17,
    title: "Masdar City Free Zone",
    slug: "masdar-profile",
    summary: "Sustainability, climate, clean tech, AI, life sciences, and innovation brands in Abu Dhabi.",
    icon: "Leaf",
    sections: [
      { heading: "Best Fit", content: "Sustainability, climate, clean tech, AI, life sciences, mobility, and founder-friendly innovation brands." },
      { heading: "Strengths", content: "Strong thematic alignment for sustainability-linked ventures and good brand signalling for deep-tech positioning." },
      { heading: "Watch-outs", content: "Do not choose it solely because it is in Abu Dhabi; choose it because the thematic ecosystem supports the business." },
    ],
  },
  {
    id: "kezad-profile",
    partId: "zone-profiles",
    chapterNumber: 18,
    title: "KEZAD",
    slug: "kezad-profile",
    summary: "Manufacturing, industrial land, logistics, warehousing, supply chain, and heavy operations.",
    icon: "Factory",
    sections: [
      { heading: "Best Fit", content: "Manufacturing, industrial land, logistics, warehousing, supply chain, food processing, heavy operations." },
      { heading: "Strengths", content: "Excellent for industrial substance, port linkage, and larger operating footprints." },
      { heading: "Watch-outs", content: "Overkill for a pure consultant or remote founder. Pricing is heavily facility-driven and often quote-led." },
    ],
  },
  {
    id: "difc-profile",
    partId: "zone-profiles",
    chapterNumber: 19,
    title: "DIFC & Innovation Hub",
    slug: "difc-profile",
    summary: "Financial services, fintech, venture studios, and innovation-led startups in a premium Dubai ecosystem.",
    icon: "TrendingUp",
    sections: [
      { heading: "Best Fit", content: "Financial services, fintech, venture studios, innovation-led startups that benefit from a premium Dubai ecosystem." },
      { heading: "Strengths", content: "Exceptional signalling value, strong investor ecosystem, strong programmes for fintech and technology founders." },
      { heading: "Watch-outs", content: "Not a low-friction substitute for a standard free-zone trading licence if cost is the only driver." },
    ],
  },
  {
    id: "dmcc-profile",
    partId: "zone-profiles",
    chapterNumber: 20,
    title: "DMCC",
    slug: "dmcc-profile",
    summary: "Trading, commodities, international SME hubs, premium Dubai presence, and consulting structures.",
    icon: "Gem",
    sections: [
      { heading: "Best Fit", content: "Trading, commodities, international SME hubs, premium Dubai operating presence, consulting and holding structures." },
      { heading: "Strengths", content: "Powerful ecosystem, strong global brand, broad trading relevance, strong JLT business community." },
      { heading: "Watch-outs", content: "Not ideal for founders whose only objective is the absolute lowest upfront fee. More transparent and premium in perception." },
    ],
  },
  {
    id: "meydan-profile",
    partId: "zone-profiles",
    chapterNumber: 21,
    title: "Meydan Free Zone",
    slug: "meydan-profile",
    summary: "Fast digital setup in Dubai, multi-activity founder businesses, consulting, e-commerce, and startup teams.",
    icon: "Zap",
    sections: [
      { heading: "Best Fit", content: "Fast digital setup in Dubai, multi-activity founder businesses, consulting, e-commerce, light trading, startup teams." },
      { heading: "Strengths", content: "Very strong digital UX, broad activity range (2,500+), strong founder marketing, bank-assistance and compliance-support ecosystem." },
      { heading: "Watch-outs", content: "Do not treat all Meydan package claims as universally permanent; verify current calculator outputs and included services." },
    ],
  },
  {
    id: "dubai-south-profile",
    partId: "zone-profiles",
    chapterNumber: 22,
    title: "Dubai South",
    slug: "dubai-south-profile",
    summary: "Startups, SMEs, aviation-adjacent businesses, and logistics-linked growth.",
    icon: "PlaneTakeoff",
    sections: [
      { heading: "Best Fit", content: "Startups, SMEs, aviation-adjacent businesses, logistics-linked growth, broader ecosystem-led setup in Dubai." },
      { heading: "Strengths", content: "Good long-term growth positioning if ecosystem fit matters." },
      { heading: "Watch-outs", content: "Compare carefully against Meydan, IFZA, and DMCC based on brand, speed, and cost stack." },
    ],
  },
  {
    id: "jafza-profile",
    partId: "zone-profiles",
    chapterNumber: 24,
    title: "JAFZA & JAFZA Offshore",
    slug: "jafza-profile",
    summary: "Large-scale trade, re-export, manufacturing, warehousing, port linkage, and selected offshore structures.",
    icon: "Ship",
    sections: [
      { heading: "Best Fit", content: "Large-scale trade, re-export, manufacturing, warehousing, port linkage, foreign branches, selected offshore structures." },
      { heading: "Strengths", content: "Best-in-class logistics and trade relevance; offshore capability adds structuring flexibility." },
      { heading: "Watch-outs", content: "Not a desk-only founder zone. Model the real operating footprint before choosing it." },
    ],
  },
  {
    id: "ifza-profile",
    partId: "zone-profiles",
    chapterNumber: 25,
    title: "IFZA",
    slug: "ifza-profile",
    summary: "SMEs, consultants, holding structures, and flexible partner-driven company formation in Dubai.",
    icon: "Briefcase",
    sections: [
      { heading: "Best Fit", content: "SMEs, consultants, holding structures, flexible partner-driven company formation in Dubai." },
      { heading: "Strengths", content: "Popular SME choice; good activity breadth and digital application flow." },
      { heading: "Watch-outs", content: "Because partner channels are influential, validate that quoted prices match official current offer logic." },
    ],
  },
  {
    id: "spc-profile",
    partId: "zone-profiles",
    chapterNumber: 26,
    title: "SPC Free Zone",
    slug: "spc-profile",
    summary: "Low-cost startup entry in Sharjah — publishing, consulting, e-commerce, and founder packages.",
    icon: "BookOpen",
    sections: [
      { heading: "Best Fit", content: "Low-cost startup entry, publishing, consulting, e-commerce, light trading, founder packages in Sharjah." },
      { heading: "Strengths", content: "Great for price-sensitive founders who still want a real operating company rather than a paper shell." },
      { heading: "Watch-outs", content: "Compare total recurring cost and banking outcomes, not only entry price." },
    ],
  },
  {
    id: "shams-profile",
    partId: "zone-profiles",
    chapterNumber: 27,
    title: "Shams",
    slug: "shams-profile",
    summary: "Media, content, freelancer, consulting, SME and startup formations in Sharjah from AED 5,750.",
    icon: "Sun",
    sections: [
      { heading: "Best Fit", content: "Media, content, freelancer, consulting, SME and startup formations in Sharjah." },
      { heading: "Pricing", content: "Official pricing from AED 5,750 for entry tiers, with visa-enabled routes above that." },
      { heading: "Watch-outs", content: "Check the exact package page — public marketing and calculator pages may express the same offer differently." },
    ],
  },
  {
    id: "srtip-profile",
    partId: "zone-profiles",
    chapterNumber: 28,
    title: "SRTIP",
    slug: "srtip-profile",
    summary: "Innovation, research-linked businesses, and cost-efficient startup entry in Sharjah.",
    icon: "Lightbulb",
    sections: [
      { heading: "Best Fit", content: "Innovation, research-linked businesses, digital-first founders, and cost-efficient startup entry in Sharjah." },
      { heading: "Pricing", content: "Public pages show zero-visa setup around AED 5,500 and various visa-enabled routes." },
      { heading: "Watch-outs", content: "Compare directly with SPC, Shams, and Masdar depending on whether brand positioning or entry price matters more." },
    ],
  },
  {
    id: "rakez-profile",
    partId: "zone-profiles",
    chapterNumber: 33,
    title: "RAKEZ",
    slug: "rakez-profile",
    summary: "One of the strongest all-round value propositions: e-commerce, education, consultancy, media, manufacturing.",
    icon: "Mountain",
    sections: [
      { heading: "Best Fit", content: "Broad-spectrum SME and industrial setup: e-commerce, education, consultancy, media, manufacturing, and warehouses." },
      { heading: "Pricing", content: "Public offers show starter setups around AED 6,000 and all-inclusive tiers around AED 14,000." },
      { heading: "Strengths", content: "One of the strongest all-round value propositions spanning cheap starter entry and real operational growth options." },
      { heading: "Watch-outs", content: "As with all promotional offers, verify exact inclusions and renewal economics." },
    ],
  },
  {
    id: "ajman-media-city-profile",
    partId: "zone-profiles",
    chapterNumber: 32,
    title: "Ajman Media City",
    slug: "ajman-media-city-profile",
    summary: "Media, creative, freelancer, IT, and low-cost founder setups with transparent public pricing from AED 4,999.",
    icon: "Video",
    sections: [
      { heading: "Best Fit", content: "Media, creative, freelancer, IT, low-cost founder setups, multi-activity solo or small-team companies." },
      { heading: "Pricing", content: "Public packages include AED 4,999 zero-visa entry and higher one-visa / multi-visa tiers." },
      { heading: "Strengths", content: "Very transparent for a low-cost zone, flexible for creators and digital businesses, strong affordability signal." },
    ],
  },
  {
    id: "uaq-ftz-profile",
    partId: "zone-profiles",
    chapterNumber: 35,
    title: "UAQ Free Trade Zone",
    slug: "uaq-ftz-profile",
    summary: "Lean founder entry, simple service businesses, e-commerce, and remote-friendly packages.",
    icon: "Package",
    sections: [
      { heading: "Best Fit", content: "Lean founder entry, simple service businesses, e-commerce, light trade, and remote-friendly packages." },
      { heading: "Pricing", content: "Official pages market AED 5,500 and AED 12,500 package tiers." },
      { heading: "Watch-outs", content: "Evaluate annual operating cost, bankability, and actual activity fit before selecting it." },
    ],
  },

  // ── Part V ──
  {
    id: "startup-leverage-uae",
    partId: "startup-leverage",
    chapterNumber: 37,
    title: "How Startups Can Leverage the UAE Properly",
    slug: "startup-leverage-uae",
    summary: "Hub71, DIFC Innovation Hub, ADGM fintech, Green Visa — combining the right structure with the right ecosystem.",
    icon: "Rocket",
    sections: [
      {
        heading: "Beyond Company Formation",
        content: "The real startup advantage in the UAE comes from combining the right structure with the right ecosystem. Hub71 offers access to market, talent, and capital. DIFC Innovation Hub offers programmes and workspace. ADGM highlights its fintech support network.",
      },
      {
        heading: "Startup Principles",
        content: "",
        bullets: [
          "Use a 0-visa or low-burn structure only when the startup genuinely does not need immediate relocation.",
          "Build clean bookkeeping and tax discipline from day one — investors increasingly diligence this.",
          "Choose a zone with public activity clarity if you will pivot or add revenue lines quickly.",
          "Where fintech or regulated products are involved, choose the jurisdiction for licensing path, not package cost.",
          "Plan family sponsorship and founder relocation early if the business depends on founders living in the UAE.",
        ],
      },
    ],
  },
  {
    id: "decision-framework",
    partId: "startup-leverage",
    chapterNumber: 38,
    title: "Decision Framework — Which Setup for Which Objective?",
    slug: "decision-framework",
    summary: "A structured shortlist matrix: cheapest entry, fastest digital setup, premium ecosystem, industrial, fintech, media, and innovation.",
    icon: "Target",
    sections: [
      {
        heading: "Objective-Based Shortlist",
        content: "",
        table: {
          headers: ["Objective", "First Shortlist", "Why"],
          rows: [
            ["Cheapest no-visa founder entry", "Ajman Media City, UAQ FTZ, Shams, SRTIP, RAKEZ", "Strong public starter-price visibility"],
            ["Fastest digital Dubai setup", "Meydan, IFZA", "Digital onboarding and broad activity support"],
            ["Premium Dubai ecosystem", "DMCC, DIFC, Meydan", "Brand, network, and investor perception"],
            ["Industrial / logistics", "KEZAD, JAFZA, SAIF, Hamriyah, RAKEZ", "Facility-led substance and trade infrastructure"],
            ["Fintech / family office / wealth", "ADGM, DIFC, RAK ICC", "Stronger legal, regulatory, or structuring fit"],
            ["Media / creator / freelancer", "Ajman Media City, Shams, Creative City, Meydan", "Affordable and activity-flexible"],
            ["Innovation / R&D / climate / AI", "Masdar, SRTIP, Hub71, DIFC Innovation Hub", "Ecosystem and thematic support"],
          ],
        },
      },
    ],
  },
  {
    id: "annual-operating-model",
    partId: "startup-leverage",
    chapterNumber: 39,
    title: "The Annual Operating Model After Incorporation",
    slug: "annual-operating-model",
    summary: "Your compliance calendar: licence renewal, tax filings, insurance, bank KYC refresh, UBO updates, and more.",
    icon: "CalendarDays",
    sections: [
      {
        heading: "Post-Incorporation Compliance Calendar",
        content: "",
        table: {
          headers: ["Cadence", "Actions"],
          rows: [
            ["At incorporation", "Licence issue, company documents, immigration file, bank-readiness pack, bookkeeping setup"],
            ["First 30–90 days", "Visa execution, Emirates ID, insurance, first invoices, accounting system, tax registration"],
            ["Monthly / quarterly", "Bookkeeping close, VAT checks, payroll and expense support, banking updates"],
            ["Annual", "Licence renewal, facility renewal, insurance, audit/bookkeeping finalisation, Corporate Tax return"],
            ["Event-driven", "UBO updates, shareholder changes, activity additions, amendments, cancellations"],
          ],
        },
      },
    ],
  },

  // ── Part VI ──
  {
    id: "holding-companies",
    partId: "structuring-depth",
    chapterNumber: 47,
    title: "Holding Companies — When a HoldCo Beats a Trading Licence",
    slug: "holding-companies",
    summary: "When to use a holding company vs an operating company. Ring-fencing risk, managing exits, and family wealth.",
    icon: "Network",
    sections: [
      {
        heading: "When to Consider a HoldCo",
        content: "A holding company should be considered when the founder's real objective is to own shares, intellectual property, subsidiaries, or investment positions rather than run a broad commercial activity.",
      },
      {
        heading: "Principles",
        content: "",
        bullets: [
          "Use an operating company when the entity itself will sell, invoice, hire, and contract.",
          "Use a holdco when the entity will primarily own, govern, or control assets or subsidiaries.",
          "Do not assume every free-zone holdco has the same bankability or tax outcome.",
        ],
      },
    ],
  },
  {
    id: "spvs-foundations",
    partId: "structuring-depth",
    chapterNumber: 49,
    title: "SPVs, Foundations & Succession Planning",
    slug: "spvs-foundations",
    summary: "Ring-fenced transactions, family governance, ADGM structures, and RAK ICC foundations.",
    icon: "Shield",
    sections: [
      {
        heading: "When to Use These Structures",
        content: "SPVs and foundations are structuring tools, not everyday trading tools. They become valuable for holding assets, isolating risk, preparing for investment, or creating succession planning beyond standard shareholding.",
      },
      {
        heading: "Principles",
        content: "",
        bullets: [
          "Use an SPV for ring-fenced transactions, shareholding, or discrete asset ownership.",
          "Use a foundation where governance, succession, or family-control objectives matter.",
          "Keep trading risk and wealth/succession structures separate whenever possible.",
        ],
      },
    ],
  },
  {
    id: "accounting-audit",
    partId: "structuring-depth",
    chapterNumber: 53,
    title: "Accounting, Audit & Finance Stack",
    slug: "accounting-audit",
    summary: "Setting up bookkeeping from day one, audit readiness, and choosing software for VAT, Corporate Tax, and e-invoicing.",
    icon: "BookOpen",
    sections: [
      {
        heading: "Day-One Finance Discipline",
        content: "The fastest way to make a UAE company expensive is to treat finance operations as an afterthought. From day one, establish invoice format, document naming, banking folder, shareholder records, and chart of accounts.",
      },
      {
        heading: "Principles",
        content: "",
        bullets: [
          "Choose software that can later support VAT, Corporate Tax, and e-invoicing migration.",
          "Keep related-party and shareholder transactions documented, especially in family and holding structures.",
          "Treat audit readiness as a spectrum — even when statutory audit is not mandatory, external stakeholders may expect clean accounts.",
        ],
      },
    ],
  },

  // ── Part IV: Remaining Zone Profiles ──
  {
    id: "saif-zone-profile",
    partId: "zone-profiles",
    chapterNumber: 29,
    title: "SAIF Zone",
    slug: "saif-zone-profile",
    summary: "Trading, warehousing, logistics, aviation-linked commerce, and straightforward Sharjah operational setups.",
    icon: "Warehouse",
    sections: [
      { heading: "Best Fit", content: "Trading, warehousing, logistics, aviation-linked commerce, and straightforward Sharjah operational setups." },
      { heading: "Strengths", content: "Strong practical choice for trading/logistics businesses. Public marketing focuses on speed and infrastructure." },
      { heading: "Watch-outs", content: "Less suitable than Shams/SPC for content creators or purely remote consultants. Activity and facility model are more operational than purely founder-package driven." },
    ],
  },
  {
    id: "hamriyah-profile",
    partId: "zone-profiles",
    chapterNumber: 30,
    title: "Hamriyah Free Zone",
    slug: "hamriyah-profile",
    summary: "Industrial, manufacturing, maritime, storage, and larger operational footprints in Sharjah.",
    icon: "Anchor",
    sections: [
      { heading: "Best Fit", content: "Industrial, manufacturing, maritime, storage, and larger operational footprints in Sharjah." },
      { heading: "Strengths", content: "Very strong for serious operating businesses that need land, sheds, or industrial support." },
      { heading: "Pricing", content: "Pricing is more infrastructure-led than startup-bundle led. Expect quote-based costing in many real cases." },
      { heading: "Watch-outs", content: "Not ideal for the founder whose needs are consultancy, remote invoicing, and one visa only." },
    ],
  },
  {
    id: "ajman-freezone-profile",
    partId: "zone-profiles",
    chapterNumber: 31,
    title: "Ajman Free Zone",
    slug: "ajman-freezone-profile",
    summary: "Broad low-to-mid-cost SME setups, trade, services, selected industrial activity, and general flexibility in Ajman.",
    icon: "Store",
    sections: [
      { heading: "Best Fit", content: "Broad low-to-mid-cost SME setups, trade, services, selected industrial activity, and general flexibility in Ajman." },
      { heading: "Strengths", content: "Good breadth and useful activity infrastructure. Official activity list is broad and useful for large-scale research work." },
      { heading: "Watch-outs", content: "Needs careful comparison against Ajman Media City, UAQ FTZ, and RAKEZ for total-value logic." },
    ],
  },
  {
    id: "rak-icc-profile",
    partId: "zone-profiles",
    chapterNumber: 34,
    title: "RAK ICC",
    slug: "rak-icc-profile",
    summary: "International holding, offshore company work, foundations, succession planning, and premium structuring.",
    icon: "Shield",
    sections: [
      { heading: "Best Fit", content: "International holding, offshore company work, foundations, succession planning, and selected premium structuring use cases." },
      { heading: "Strengths", content: "Strong for foundations, offshore holdings, redomiciliation, and family-wealth structuring." },
      { heading: "Watch-outs", content: "Not a substitute for an operating mainland or free-zone company. Pricing is specialist and agent-driven rather than mass-founder public-card pricing." },
    ],
  },
  {
    id: "dafz-commercity-profile",
    partId: "zone-profiles",
    chapterNumber: 23,
    title: "DAFZ & Dubai CommerCity",
    slug: "dafz-commercity-profile",
    summary: "Airport-linked trade, logistics, e-commerce fulfilment, premium infrastructure, and international operator profiles.",
    icon: "PlaneTakeoff",
    sections: [
      { heading: "Best Fit", content: "Airport-linked trade, logistics, e-commerce fulfilment, premium infrastructure, international operator profiles." },
      { heading: "Strengths", content: "Premium infrastructure and strong logistics position. Dubai CommerCity adds e-commerce ecosystem relevance." },
      { heading: "Watch-outs", content: "May be too infrastructure-heavy or premium for a simple solo service setup. Expect tailored pricing rather than purely public fixed packages." },
    ],
  },
  {
    id: "fujairah-creative-city-profile",
    partId: "zone-profiles",
    chapterNumber: 36,
    title: "Fujairah Free Zone & Creative City",
    slug: "fujairah-creative-city-profile",
    summary: "Trade/logistics in Fujairah and low-cost creative/media/freelancer setups — two distinct models.",
    icon: "Palette",
    sections: [
      { heading: "Best Fit", content: "Trade/logistics in Fujairah on one side, and low-cost creative/media/freelancer setups on the other." },
      { heading: "Two Distinct Models", content: "Creative City is usually the more founder-facing and publicly marketed of the two; Fujairah Free Zone is more operational and trade-oriented. Cost structure depends on which system is chosen." },
      { heading: "Watch-outs", content: "Should not be treated as interchangeable. They solve different problems. Visa logic also differs substantially between the two." },
    ],
  },
  {
    id: "national-freezone-map",
    partId: "zone-profiles",
    chapterNumber: 15,
    title: "National Free Zone Map by Emirate",
    slug: "national-freezone-map",
    summary: "The Ministry of Economy and Tourism's official registry of free-zone registrars across all seven emirates.",
    icon: "Map",
    sections: [
      {
        heading: "Free Zones by Emirate",
        content: "",
        table: {
          headers: ["Emirate", "Free Zones / Registrars"],
          rows: [
            ["Abu Dhabi", "Masdar, twofour54, Abu Dhabi Airports FZ, KIZAD/KEZAD, ADGM"],
            ["Dubai", "DDA clusters, DIFC, DSO, Dubai Maritime City, Trakhees, DHCC, DMCC, Meydan, IHC, Dubai South, DWTC, DAFZA/CommerCity, JAFZA"],
            ["Sharjah", "SAIF Zone, Hamriyah, Publishing City, SRTIP, Shams"],
            ["Ajman", "Ajman Media City, Ajman Free Zone"],
            ["Ras Al Khaimah", "RAKEZ, RAK Maritime"],
            ["Umm Al Quwain", "UAQ Free Trade Zone"],
            ["Fujairah", "Fujairah Free Zone, Creative City Fujairah"],
          ],
        },
      },
    ],
  },

  // ── Part VI: Additional structuring chapters ──
  {
    id: "branches-foreign-companies",
    partId: "structuring-depth",
    chapterNumber: 48,
    title: "Branches of Foreign Companies",
    slug: "branches-foreign-companies",
    summary: "When a branch beats a subsidiary — parent continuity, liability, banking, and customer perception.",
    icon: "GitBranch",
    sections: [
      {
        heading: "When to Use a Branch",
        content: "A branch can be the right answer where an existing foreign company wants a UAE presence without creating a wholly separate owned subsidiary. The branch route must still be tested against liability, banking, customer perception, tax registration, and practical onboarding needs.",
      },
      {
        heading: "Principles",
        content: "",
        bullets: [
          "Use a branch when parent continuity matters more than ring-fenced subsidiary logic.",
          "Use a subsidiary when liability separation, cap-table flexibility, or bank onboarding clarity matters more.",
          "Check whether the target jurisdiction supports the specific branch format you need.",
        ],
      },
    ],
  },
  {
    id: "family-offices-wealth",
    partId: "structuring-depth",
    chapterNumber: 50,
    title: "Family Offices & Private Wealth Structures",
    slug: "family-offices-wealth",
    summary: "ADGM vs DIFC, governance design, active investment management, and cross-border asset administration.",
    icon: "Crown",
    sections: [
      {
        heading: "Not a Single Licence Product",
        content: "Family-office design in the UAE sits across governance, ownership, tax, banking, residency, and operating-substance decisions. ADGM and DIFC are the most obvious premium starting points where the family office needs institutional-grade governance or private-wealth credibility.",
      },
      {
        heading: "Watch-outs",
        content: "Wealth structures often fail in practice not because of the legal entity, but because the documentation and operating logic were not designed well enough for bank and tax scrutiny.",
      },
    ],
  },
  {
    id: "offshore-structures",
    partId: "structuring-depth",
    chapterNumber: 51,
    title: "Offshore Structures — What They Are and What They Are Not",
    slug: "offshore-structures",
    summary: "JAFZA Offshore and RAK ICC — when offshore is right and when it's the wrong framing entirely.",
    icon: "Globe",
    sections: [
      {
        heading: "Purpose-Driven Selection",
        content: "Offshore does not mean a cheaper substitute for a real UAE operating company. Offshore vehicles are used for holding, governance, asset ownership, and certain cross-border structuring needs. The most commonly referenced routes are JAFZA Offshore and RAK ICC structures.",
      },
      {
        heading: "Principles",
        content: "",
        bullets: [
          "Do not buy offshore for visa purposes — that is usually the wrong framing.",
          "Do not buy offshore as a shortcut around normal operating compliance.",
          "Use offshore where governance and ownership, not daily operations, are the centre of gravity.",
        ],
      },
    ],
  },
  {
    id: "labour-payroll-wps",
    partId: "structuring-depth",
    chapterNumber: 52,
    title: "Labour, Payroll, WPS & Employer Operations",
    slug: "labour-payroll-wps",
    summary: "Moving beyond founder-only setup — labour files, work permits, payroll discipline, and insurance.",
    icon: "Users",
    sections: [
      {
        heading: "Beyond a One-Visa Package",
        content: "Once the company moves beyond a founder-only setup, employer operations become its own workstream. Visa issuance is only one layer — the company also has to think about labour files, offer letters, work permits, payroll discipline, health insurance, and wage-protection expectations.",
      },
      {
        heading: "Principles",
        content: "",
        bullets: [
          "Map founder-only stage separately from first-hire stage.",
          "Budget for insurance and employer admin separately from licence marketing packages.",
          "If dependents will work under family sponsorship, plan the MOHRE work-permit layer from the start.",
        ],
      },
    ],
  },
  {
    id: "renewals-amendments",
    partId: "structuring-depth",
    chapterNumber: 54,
    title: "Renewals, Amendments, Share Transfers & Liquidation",
    slug: "renewals-amendments",
    summary: "Model over three moments: incorporation, first renewal, and material change. Where real complexity accumulates.",
    icon: "RefreshCw",
    sections: [
      {
        heading: "The Three Operating Moments",
        content: "The UAE setup decision should always be modelled over at least three operating moments: incorporation, first renewal, and material change. Adding an activity, changing a manager, transferring shares, upgrading visa quota, or liquidating can involve separate fees, NOCs, and bank coordination.",
      },
      {
        heading: "Principles",
        content: "",
        bullets: [
          "Before incorporating, ask what renewal usually looks like in year two.",
          "If the cap table may change, test how simple share transfer and beneficial-owner updates are.",
          "Liquidation should be understood before incorporation, especially for project-based or short-cycle structures.",
        ],
      },
    ],
  },

  // ── Part VII: Mainland Dossiers ──
  {
    id: "dubai-mainland",
    partId: "mainland-dossiers",
    chapterNumber: 40,
    title: "Dubai Mainland",
    slug: "dubai-mainland",
    summary: "The benchmark operating structure for direct onshore UAE trade — retail, services, tenders, and contracting.",
    icon: "Building",
    sections: [
      {
        heading: "Best Fit",
        content: "Direct onshore UAE trade, local service delivery, tenders, retail, food and beverage, contracting, and activities where onshore invoices and local market presence are central.",
      },
      {
        heading: "Key Strengths",
        content: "Clean local-market access, broad activity availability, easier alignment with retail, local services, government-facing work, and domestic contracting.",
      },
      {
        heading: "Decision Logic",
        content: "",
        bullets: [
          "Choose mainland first when the business needs unrestricted UAE domestic trade.",
          "Use free zone first when the business is export-led, digital-first, or only lightly staffed in year one.",
          "Treat each regulated activity separately — mainland simplicity disappears quickly when healthcare, education, finance, food, or engineering approvals enter the stack.",
        ],
      },
    ],
  },
  {
    id: "abu-dhabi-mainland",
    partId: "mainland-dossiers",
    chapterNumber: 41,
    title: "Abu Dhabi Mainland",
    slug: "abu-dhabi-mainland",
    summary: "Abu Dhabi domestic trade, government-linked work, and when mainland beats ADGM, KEZAD, or Masdar.",
    icon: "Building",
    sections: [
      {
        heading: "Best Fit",
        content: "Abu Dhabi domestic trade, government-linked work, local services, contracting, and businesses that want Abu Dhabi substance outside a specialist free zone.",
      },
      {
        heading: "Decision Logic",
        content: "",
        bullets: [
          "Use mainland when the business model is intrinsically local and onshore.",
          "Use Masdar or ADGM where the ecosystem or legal architecture is part of the value proposition.",
          "Use KEZAD or ADAFZ where industrial or logistics infrastructure drives the decision.",
        ],
      },
    ],
  },
  {
    id: "sharjah-mainland",
    partId: "mainland-dossiers",
    chapterNumber: 42,
    title: "Sharjah Mainland",
    slug: "sharjah-mainland",
    summary: "Cost-competitive onshore operations — local services, retail, contracting, and industrial spillover.",
    icon: "Building",
    sections: [
      {
        heading: "Best Fit",
        content: "Local Sharjah services, retail, contracting, industrial spillover from free-zone ecosystems, and cost-aware onshore operations.",
      },
      {
        heading: "Decision Logic",
        content: "The main comparison is usually not versus Dubai mainland, but versus SAIF, Hamriyah, SPC, Shams, or SRTIP. Mainland only wins when onshore access is actually needed.",
      },
    ],
  },
  {
    id: "ajman-mainland",
    partId: "mainland-dossiers",
    chapterNumber: 43,
    title: "Ajman Mainland",
    slug: "ajman-mainland",
    summary: "Lean SMEs that need real domestic access without premium-city cost.",
    icon: "Building",
    sections: [
      {
        heading: "Best Fit",
        content: "Smaller local trading and service businesses that need onshore market access at lower operating cost. A commercial choice, not a prestige choice.",
      },
      {
        heading: "Watch-outs",
        content: "Lower-cost free zones remain simpler where onshore access is not essential.",
      },
    ],
  },
  {
    id: "rak-mainland",
    partId: "mainland-dossiers",
    chapterNumber: 44,
    title: "Ras Al Khaimah Mainland",
    slug: "rak-mainland",
    summary: "Onshore RAK operations — when mainland pairs better than RAKEZ for industrial and logistics work.",
    icon: "Building",
    sections: [
      {
        heading: "Best Fit",
        content: "Onshore operations in RAK, local trading, and businesses that want to combine RAK operating economics with mainland capability.",
      },
      {
        heading: "Decision Logic",
        content: "RAK mainland is usually evaluated alongside RAKEZ. The correct question is whether the business needs onshore access immediately or whether a RAKEZ operating company with later expansion delivers better year-one economics.",
      },
    ],
  },
  {
    id: "uaq-mainland",
    partId: "mainland-dossiers",
    chapterNumber: 45,
    title: "Umm Al Quwain Mainland",
    slug: "uaq-mainland",
    summary: "Niche onshore choice for local UAQ trading and services.",
    icon: "Building",
    sections: [
      {
        heading: "Best Fit",
        content: "Local UAQ trading and services where a true mainland entity is required. A niche choice that can be commercially valid where the business needs local market access in UAQ.",
      },
      {
        heading: "Watch-outs",
        content: "UAQ FTZ is usually the better route for founder-led export, consulting, or e-commerce models.",
      },
    ],
  },
  {
    id: "fujairah-mainland",
    partId: "mainland-dossiers",
    chapterNumber: 46,
    title: "Fujairah Mainland",
    slug: "fujairah-mainland",
    summary: "Domestic Fujairah operations, port-adjacent service businesses, and East Coast economy structures.",
    icon: "Building",
    sections: [
      {
        heading: "Best Fit",
        content: "Domestic Fujairah operations, port-adjacent service businesses, and onshore structures linked to the East Coast economy.",
      },
      {
        heading: "Watch-outs",
        content: "Fujairah Free Zone or Creative City are often easier for export-led or founder-only structures. Mainland is most relevant when the operating footprint is genuinely local to Fujairah.",
      },
    ],
  },
];
