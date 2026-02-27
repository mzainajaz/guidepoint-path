export interface FreeZoneData {
  id: string;
  name: string;
  shortName: string;
  idealFor: string;
  startingCost: string;
  costNum: number;
  visaSummary: string;
  officeSummary: string;
  bankingNote: string;
  timeline: string;
  industry: string;
  costTier: "low" | "mid" | "high";
  visaFriendly: boolean;
  bankingFriendly: boolean;
  remoteFirst: boolean;
  // Detail page fields
  overview: string;
  whoItSuits: string[];
  whenItMayNotFit: string[];
  activities: string[];
  packages: {
    name: string;
    price: string;
    includes: string[];
    excludes: string[];
  }[];
  visaDetails: string;
  officeDetails: string;
  bankingDetails: string;
  processSteps: string[];
  commonRequirements: string[];
  commonMistakes: string[];
  compareWith: string[]; // ids of comparable free zones
  lastChecked: string;
  sources: string[];
}

export const freeZones: FreeZoneData[] = [
  {
    id: "ifza",
    name: "IFZA — International Free Zone Authority",
    shortName: "IFZA",
    idealFor: "Consultants, service businesses, solopreneurs",
    startingCost: "AED 11,900",
    costNum: 11900,
    visaSummary: "Up to 6 visas per licence",
    officeSummary: "Flexi-desk included in most packages",
    bankingNote: "Generally smoother KYC process",
    timeline: "3–5 business days",
    industry: "services",
    costTier: "low",
    visaFriendly: true,
    bankingFriendly: true,
    remoteFirst: true,
    overview:
      "IFZA is one of the most popular free zones for service-based businesses and solopreneurs looking for a cost-effective UAE setup. Located in Dubai (Fujairah authority), it offers flexible packages with no physical office requirement, quick processing times, and a relatively straightforward banking path.",
    whoItSuits: [
      "Solo consultants and freelancers wanting a corporate structure",
      "Service-based businesses (marketing, IT, management consulting)",
      "Remote-first founders who don't need a physical office",
      "Budget-conscious startups testing the UAE market",
      "E-commerce operators needing a UAE entity for payment processing",
    ],
    whenItMayNotFit: [
      "Businesses needing to trade directly with UAE mainland clients (VAT invoicing complexities)",
      "Companies requiring large visa quotas (>6 staff)",
      "Highly regulated activities (finance, insurance, food)",
      "Businesses needing a prestigious Dubai address for client meetings",
    ],
    activities: [
      "Management Consulting",
      "IT Consultancy",
      "Marketing Services",
      "E-commerce",
      "General Trading (limited)",
      "Media & Advertising",
      "Education & Training",
      "Design Services",
    ],
    packages: [
      {
        name: "Starter",
        price: "AED 11,900 /yr",
        includes: [
          "1 visa allocation",
          "Flexi-desk",
          "Trade licence",
          "Establishment card",
          "Immigration card",
        ],
        excludes: [
          "Visa processing fees",
          "Emirates ID",
          "Medical fitness test",
          "Additional visa allocations",
        ],
      },
      {
        name: "Business",
        price: "AED 16,500 /yr",
        includes: [
          "3 visa allocations",
          "Flexi-desk",
          "Trade licence",
          "Establishment card",
          "Immigration card",
          "1 activity included",
        ],
        excludes: [
          "Visa processing fees",
          "Emirates ID",
          "Medical fitness test",
        ],
      },
      {
        name: "Business Plus",
        price: "AED 22,000 /yr",
        includes: [
          "6 visa allocations",
          "Flexi-desk",
          "Trade licence",
          "Establishment card",
          "Immigration card",
          "Up to 3 activities",
        ],
        excludes: [
          "Visa processing fees",
          "Emirates ID",
          "Medical fitness test",
        ],
      },
    ],
    visaDetails:
      "IFZA offers up to 6 visa allocations per licence depending on your package. Visa processing typically takes 5–10 additional business days after licence issuance. Each visa requires a medical fitness test and Emirates ID processing, which are separate costs (approx. AED 3,500–4,500 per visa all-in).",
    officeDetails:
      "Most IFZA packages include a flexi-desk, which is sufficient for visa processing and correspondence. No physical office is required for most service activities. If you need a physical workspace, co-working and dedicated offices are available through IFZA's partners at additional cost.",
    bankingDetails:
      "IFZA licence holders generally experience a smoother banking journey compared to some other free zones. Banks like Mashreq, RAKBANK, and Wio have established onboarding flows for IFZA companies. Expect the process to take 2–4 weeks. Digital banks (Wio, Mashreq Neo) can be faster. Always prepare a clear business plan, proof of source of funds, and client contracts.",
    processSteps: [
      "Choose your business activity and package",
      "Submit application with passport copies and business plan",
      "Receive initial approval (1–2 days)",
      "Pay licence fees",
      "Receive trade licence and establishment card",
      "Apply for visa (if needed)",
      "Complete medical and Emirates ID",
      "Open corporate bank account",
    ],
    commonRequirements: [
      "Passport copy (valid for 6+ months)",
      "Passport-sized photographs",
      "Business plan or activity description",
      "Proof of residential address (utility bill or bank statement)",
      "No Objection Certificate (if on an existing UAE visa)",
    ],
    commonMistakes: [
      "Choosing the cheapest package without checking activity coverage — some activities need add-ons.",
      "Underestimating total cost — licence fee is just the start; add visa, EID, medical, and banking setup fees.",
      "Not checking renewal costs before signing — renewal fees can differ significantly from first-year promotions.",
      "Assuming the flexi-desk is a physical workspace — it's a virtual address for correspondence only.",
      "Delaying bank account opening — start the process immediately after licence issuance.",
    ],
    compareWith: ["shams", "rakez", "dmcc"],
    lastChecked: "February 2026",
    sources: [
      "IFZA official website",
      "IFZA published fee schedule 2025–2026",
      "Banking partner onboarding guides",
    ],
  },
  {
    id: "dmcc",
    name: "DMCC — Dubai Multi Commodities Centre",
    shortName: "DMCC",
    idealFor: "Trading, commodities, crypto, larger operations",
    startingCost: "AED 25,000",
    costNum: 25000,
    visaSummary: "Up to 25+ visas depending on office",
    officeSummary: "Physical office required (Flexi-desk available for 1 visa)",
    bankingNote: "Strong banking relationships; KYC thorough",
    timeline: "5–10 business days",
    industry: "trading",
    costTier: "mid",
    visaFriendly: true,
    bankingFriendly: true,
    remoteFirst: false,
    overview:
      "DMCC is the UAE's flagship free zone for trading and commodities, located in JLT, Dubai. It consistently ranks among the world's top free zones and offers a prestigious address, strong banking relationships, and support for a wide range of activities including crypto and blockchain. It requires a physical office for most visa allocations.",
    whoItSuits: [
      "Trading companies (commodities, general goods, electronics)",
      "Crypto and blockchain businesses",
      "Companies needing strong banking relationships",
      "Businesses planning to scale with multiple staff",
      "Companies wanting a prestigious JLT address",
    ],
    whenItMayNotFit: [
      "Solo founders on a tight budget",
      "Businesses that want to avoid mandatory office costs",
      "Freelancers or single-person consultancies",
      "Businesses needing mainland trading access",
    ],
    activities: [
      "General Trading",
      "Commodities Trading",
      "Crypto & Blockchain",
      "Consultancy",
      "Technology",
      "Food & Beverage Trading",
      "Gold & Precious Metals",
      "Diamonds",
    ],
    packages: [
      {
        name: "Flexi-desk",
        price: "AED 25,000 /yr",
        includes: ["1 visa allocation", "Flexi-desk", "Trade licence", "DMCC member benefits"],
        excludes: ["Physical office", "Additional visas", "Visa processing fees"],
      },
      {
        name: "Serviced Office",
        price: "AED 50,000+ /yr",
        includes: ["Up to 6 visas", "Furnished office", "Trade licence", "DMCC member benefits"],
        excludes: ["Visa processing fees", "Additional visa allocations"],
      },
    ],
    visaDetails:
      "DMCC offers generous visa quotas depending on office size. Flexi-desk allows 1 visa, while physical offices can support 6–25+ visas. Visa processing typically takes 7–14 days.",
    officeDetails:
      "DMCC requires at least a flexi-desk for licencing. Physical offices are available in JLT with various sizes. The JLT location offers excellent transport links and a vibrant business community.",
    bankingDetails:
      "DMCC companies benefit from strong banking relationships. Most major UAE banks have established DMCC onboarding flows. KYC is thorough but well-structured. Expect 3–6 weeks for account opening.",
    processSteps: [
      "Choose activity and office type",
      "Submit application online via DMCC portal",
      "Receive initial approval",
      "Sign lease agreement for office",
      "Pay licence and registration fees",
      "Collect trade licence",
      "Apply for visas",
      "Open bank account",
    ],
    commonRequirements: [
      "Passport copy (valid for 6+ months)",
      "Business plan",
      "Proof of address",
      "Office lease agreement",
      "NOC (if currently on UAE visa)",
    ],
    commonMistakes: [
      "Not budgeting for mandatory office costs on top of licence fees.",
      "Choosing DMCC for a solo consultancy when cheaper options exist.",
      "Underestimating the time for KYC and banking — plan for 4–6 weeks.",
      "Not checking if your trading activity requires special approvals.",
    ],
    compareWith: ["ifza", "dafza", "jafza"],
    lastChecked: "February 2026",
    sources: ["DMCC official website", "DMCC published fee schedule 2025–2026"],
  },
  {
    id: "rakez",
    name: "RAKEZ — Ras Al Khaimah Economic Zone",
    shortName: "RAKEZ",
    idealFor: "Cost-conscious founders, manufacturing, freelancers",
    startingCost: "AED 7,500",
    costNum: 7500,
    visaSummary: "Up to 6 visas per licence",
    officeSummary: "No physical office required for most packages",
    bankingNote: "Some banks may require additional documentation",
    timeline: "3–7 business days",
    industry: "general",
    costTier: "low",
    visaFriendly: true,
    bankingFriendly: false,
    remoteFirst: true,
    overview:
      "RAKEZ is one of the most affordable free zones in the UAE, based in Ras Al Khaimah. It supports a wide range of activities from freelancing to manufacturing. While it offers excellent value, banking onboarding can sometimes be more challenging compared to Dubai-based zones.",
    whoItSuits: [
      "Freelancers and solo operators",
      "Cost-conscious startups",
      "Manufacturing and industrial businesses",
      "Businesses not requiring a Dubai address",
    ],
    whenItMayNotFit: [
      "Companies needing premium Dubai banking relationships",
      "Businesses requiring a prestigious address",
      "Companies with complex financial service activities",
    ],
    activities: ["Consultancy", "General Trading", "Manufacturing", "Freelance Permit", "E-commerce", "Education"],
    packages: [
      {
        name: "Freelance",
        price: "AED 7,500 /yr",
        includes: ["1 visa allocation", "Flexi-desk", "Freelance permit"],
        excludes: ["Visa processing fees", "Emirates ID"],
      },
      {
        name: "Business",
        price: "AED 12,000 /yr",
        includes: ["3 visa allocations", "Flexi-desk", "Trade licence"],
        excludes: ["Visa processing fees", "Emirates ID"],
      },
    ],
    visaDetails: "Up to 6 visas per licence. Processing takes 5–10 business days. Medical and EID are additional.",
    officeDetails: "No physical office required for most activities. Warehouses and industrial space available for manufacturing.",
    bankingDetails: "Banking can be more challenging. Some banks prefer Dubai-based free zone licences. Digital banks like Wio can be a good alternative.",
    processSteps: [
      "Select activity and package",
      "Submit documents online",
      "Receive approval (2–3 days)",
      "Pay fees",
      "Collect licence",
      "Apply for visas",
      "Open bank account",
    ],
    commonRequirements: ["Passport copy", "Business plan", "Proof of address", "Photographs"],
    commonMistakes: [
      "Choosing RAKEZ purely for cost without considering banking difficulties.",
      "Not planning for the Ras Al Khaimah location — some services require Dubai visits.",
      "Underestimating renewal costs vs. promotional first-year pricing.",
    ],
    compareWith: ["ifza", "shams"],
    lastChecked: "February 2026",
    sources: ["RAKEZ official website", "RAKEZ published fee schedule 2025–2026"],
  },
  {
    id: "difc",
    name: "DIFC — Dubai International Financial Centre",
    shortName: "DIFC",
    idealFor: "Fintech, financial services, funds, wealth management",
    startingCost: "AED 50,000",
    costNum: 50000,
    visaSummary: "Visas available; quota depends on office tier",
    officeSummary: "Premium office space in DIFC Gate district",
    bankingNote: "Premium banking relationships available",
    timeline: "7–14 business days",
    industry: "finance",
    costTier: "high",
    visaFriendly: true,
    bankingFriendly: true,
    remoteFirst: false,
    overview:
      "DIFC is the Middle East's leading financial centre, operating under its own common-law jurisdiction. It's the premier choice for financial services, fintech, and professional services firms seeking the highest level of regulatory credibility and banking access.",
    whoItSuits: [
      "Regulated financial services firms",
      "Fintech companies",
      "Wealth management and advisory firms",
      "Legal and professional services",
      "Holding company structures",
    ],
    whenItMayNotFit: [
      "Non-financial businesses — cost is high without the regulatory benefit",
      "Early-stage startups on a tight budget",
      "Trading companies (DMCC or JAFZA may be better suited)",
    ],
    activities: ["Financial Services", "Fintech", "Legal Services", "Consulting", "Wealth Management", "Insurance"],
    packages: [
      {
        name: "Innovation Licence",
        price: "AED 15,000 /yr",
        includes: ["1 visa", "Co-working space access", "DIFC Innovation Hub membership"],
        excludes: ["Dedicated office", "Regulatory licence"],
      },
      {
        name: "Professional Licence",
        price: "AED 50,000+ /yr",
        includes: ["Office allocation", "Multiple visas", "DIFC address"],
        excludes: ["Regulatory licence fees (if applicable)", "Office lease"],
      },
    ],
    visaDetails: "Visa quotas depend on office size and licence type. Innovation licences include 1 visa.",
    officeDetails: "DIFC offers premium office space in the iconic Gate district and surrounding buildings. Co-working options available through Innovation Hub.",
    bankingDetails: "DIFC companies have access to premium banking relationships with major international and regional banks operating within the centre.",
    processSteps: [
      "Determine licence type (innovation, professional, or regulated)",
      "Submit application to DIFC Authority",
      "Receive conditional approval",
      "Secure office space",
      "Pay registration and licence fees",
      "Complete registration",
      "Apply for visas",
      "Open bank account",
    ],
    commonRequirements: ["Passport copy", "Detailed business plan", "CV of key personnel", "Proof of funds", "Regulatory compliance documents (if applicable)"],
    commonMistakes: [
      "Applying for a DIFC licence for non-financial activities — you're paying premium prices without the regulatory benefit.",
      "Not understanding the difference between DIFC's common-law jurisdiction and UAE mainland law.",
      "Underestimating total setup costs including office lease and regulatory fees.",
    ],
    compareWith: ["adgm", "dmcc"],
    lastChecked: "February 2026",
    sources: ["DIFC official website", "DIFC Authority published guidelines"],
  },
  {
    id: "shams",
    name: "Sharjah Media City (Shams)",
    shortName: "Shams",
    idealFor: "Freelancers, content creators, digital agencies",
    startingCost: "AED 5,750",
    costNum: 5750,
    visaSummary: "Up to 6 visas per licence",
    officeSummary: "No physical office required",
    bankingNote: "Banking can be slower; plan for additional KYC steps",
    timeline: "2–5 business days",
    industry: "media",
    costTier: "low",
    visaFriendly: true,
    bankingFriendly: false,
    remoteFirst: true,
    overview:
      "Shams is one of the most affordable free zones in the UAE, popular with freelancers, content creators, and small digital agencies. Based in Sharjah, it offers fast setup times and no physical office requirement.",
    whoItSuits: [
      "Freelancers and independent professionals",
      "Content creators and influencers",
      "Small digital agencies",
      "Budget-conscious founders",
    ],
    whenItMayNotFit: [
      "Businesses needing strong banking relationships — some banks are cautious with Sharjah licences",
      "Companies needing a Dubai address",
      "Larger operations needing multiple visas quickly",
    ],
    activities: ["Media", "Publishing", "Design", "Marketing", "IT", "E-commerce", "Consultancy"],
    packages: [
      {
        name: "Freelancer",
        price: "AED 5,750 /yr",
        includes: ["1 visa allocation", "Freelance permit", "Digital registration"],
        excludes: ["Visa fees", "EID", "Medical"],
      },
      {
        name: "Company",
        price: "AED 12,000 /yr",
        includes: ["3 visa allocations", "Trade licence", "Establishment card"],
        excludes: ["Visa fees", "EID", "Medical"],
      },
    ],
    visaDetails: "Up to 6 visas per licence. Freelancer packages include 1 visa allocation.",
    officeDetails: "No physical office required. Virtual office included with all packages.",
    bankingDetails: "Banking can be more challenging with a Shams licence. Consider digital banks or neobanks as alternatives.",
    processSteps: ["Choose package", "Submit documents online", "Receive approval (1–2 days)", "Pay fees", "Collect licence", "Apply for visa"],
    commonRequirements: ["Passport copy", "Photographs", "Brief activity description"],
    commonMistakes: [
      "Not checking banking realities before committing — some banks decline Sharjah-based free zone applications.",
      "Expecting a Dubai address — Shams is Sharjah-based.",
    ],
    compareWith: ["ifza", "rakez"],
    lastChecked: "February 2026",
    sources: ["Shams official website"],
  },
  {
    id: "adgm",
    name: "ADGM — Abu Dhabi Global Market",
    shortName: "ADGM",
    idealFor: "Fintech, legal, professional services, holding structures",
    startingCost: "AED 35,000",
    costNum: 35000,
    visaSummary: "Visas available through partner arrangements",
    officeSummary: "Office required; co-working available",
    bankingNote: "Strong regulatory reputation aids banking",
    timeline: "7–14 business days",
    industry: "finance",
    costTier: "high",
    visaFriendly: true,
    bankingFriendly: true,
    remoteFirst: false,
    overview:
      "ADGM is Abu Dhabi's international financial centre, operating under English common law. It's a strong alternative to DIFC for fintech, professional services, and holding structures, often at a lower cost point.",
    whoItSuits: [
      "Fintech companies",
      "Professional services firms",
      "Holding companies and SPVs",
      "Businesses wanting Abu Dhabi-based operations",
    ],
    whenItMayNotFit: [
      "Companies needing to be in Dubai specifically",
      "Non-financial businesses on a budget",
      "Businesses requiring large warehouse or manufacturing facilities",
    ],
    activities: ["Financial Services", "Fintech", "Professional Services", "Holding Company", "Technology"],
    packages: [
      {
        name: "Tech Startup Licence",
        price: "AED 10,000 /yr",
        includes: ["2 visa allocations", "Co-working access", "Startup support programme"],
        excludes: ["Dedicated office", "Additional visas"],
      },
      {
        name: "Commercial Licence",
        price: "AED 35,000+ /yr",
        includes: ["Office allocation", "Multiple visas", "ADGM address"],
        excludes: ["Regulatory fees", "Office lease"],
      },
    ],
    visaDetails: "Visas are processed through a partnership arrangement with Abu Dhabi authorities. Quotas depend on office size.",
    officeDetails: "Located on Al Maryah Island, Abu Dhabi. Co-working and serviced offices available.",
    bankingDetails: "ADGM's strong regulatory reputation facilitates smoother banking relationships with major banks.",
    processSteps: ["Select licence type", "Submit application", "Receive approval", "Secure office", "Pay fees", "Register", "Apply for visas"],
    commonRequirements: ["Passport copy", "Business plan", "CV of directors", "Proof of address"],
    commonMistakes: [
      "Confusing ADGM with mainland Abu Dhabi licencing.",
      "Not considering the Abu Dhabi location for Dubai-focused client work.",
    ],
    compareWith: ["difc"],
    lastChecked: "February 2026",
    sources: ["ADGM official website", "ADGM Registration Authority guidelines"],
  },
  {
    id: "dafza",
    name: "DAFZA — Dubai Airport Free Zone",
    shortName: "DAFZA",
    idealFor: "Aviation, logistics, import/export, pharma",
    startingCost: "AED 18,000",
    costNum: 18000,
    visaSummary: "Generous visa allocations",
    officeSummary: "Office or warehouse space available",
    bankingNote: "Well-established; smoother onboarding",
    timeline: "5–10 business days",
    industry: "trading",
    costTier: "mid",
    visaFriendly: true,
    bankingFriendly: true,
    remoteFirst: false,
    overview:
      "DAFZA is strategically located adjacent to Dubai International Airport, making it ideal for logistics, aviation, and import/export businesses. It's well-established and offers good banking relationships.",
    whoItSuits: [
      "Import/export businesses",
      "Logistics and freight companies",
      "Aviation-related businesses",
      "Pharmaceutical distributors",
    ],
    whenItMayNotFit: [
      "Service-only businesses (IFZA may be cheaper)",
      "Solo freelancers",
      "Businesses not requiring proximity to the airport",
    ],
    activities: ["General Trading", "Logistics", "Aviation Services", "Pharmaceuticals", "IT", "Consulting"],
    packages: [
      {
        name: "Standard",
        price: "AED 18,000 /yr",
        includes: ["2 visa allocations", "Smart desk", "Trade licence"],
        excludes: ["Visa fees", "Physical office"],
      },
    ],
    visaDetails: "Generous visa allocations depending on office size. Smart desk packages allow 2 visas.",
    officeDetails: "Office and warehouse space available adjacent to Dubai International Airport.",
    bankingDetails: "DAFZA's long track record and Dubai location facilitate smoother banking onboarding.",
    processSteps: ["Choose activity", "Submit application", "Receive approval", "Pay fees", "Collect licence", "Apply for visas"],
    commonRequirements: ["Passport copy", "Business plan", "Proof of address"],
    commonMistakes: [
      "Not comparing DAFZA with DMCC or JAFZA for trading activities — each has different strengths.",
    ],
    compareWith: ["dmcc", "jafza"],
    lastChecked: "February 2026",
    sources: ["DAFZA official website"],
  },
  {
    id: "jafza",
    name: "JAFZA — Jebel Ali Free Zone",
    shortName: "JAFZA",
    idealFor: "Manufacturing, logistics, large-scale trading",
    startingCost: "AED 25,000",
    costNum: 25000,
    visaSummary: "High visa quotas with warehouse/office",
    officeSummary: "Office or warehouse required",
    bankingNote: "Established zone; good banking track record",
    timeline: "7–14 business days",
    industry: "trading",
    costTier: "mid",
    visaFriendly: true,
    bankingFriendly: true,
    remoteFirst: false,
    overview:
      "JAFZA is one of the oldest and largest free zones in the world, connected to Jebel Ali Port — the largest port in the Middle East. It's the go-to zone for manufacturing, logistics, and large-scale trading operations.",
    whoItSuits: [
      "Manufacturing companies",
      "Large-scale trading operations",
      "Logistics and supply chain businesses",
      "Companies needing port access",
    ],
    whenItMayNotFit: [
      "Small service businesses (cost is too high)",
      "Solo founders and freelancers",
      "Companies not needing physical warehousing or port access",
    ],
    activities: ["Manufacturing", "General Trading", "Logistics", "Warehousing", "Distribution"],
    packages: [
      {
        name: "Office",
        price: "AED 25,000+ /yr",
        includes: ["6+ visa allocations", "Office space", "Trade licence"],
        excludes: ["Visa fees", "Warehouse lease"],
      },
    ],
    visaDetails: "High visa quotas available with office or warehouse leases. Can accommodate large teams.",
    officeDetails: "Offices and warehouses of various sizes available in the Jebel Ali area, with direct port access.",
    bankingDetails: "JAFZA's reputation and long track record make banking onboarding generally straightforward.",
    processSteps: ["Choose activity and facility type", "Submit application", "Sign lease", "Pay fees", "Collect licence", "Apply for visas"],
    commonRequirements: ["Passport copy", "Business plan", "Proof of funds", "Lease agreement"],
    commonMistakes: [
      "Choosing JAFZA for a small service business — the costs and requirements are designed for larger operations.",
      "Not factoring in warehouse lease costs when budgeting.",
    ],
    compareWith: ["dmcc", "dafza"],
    lastChecked: "February 2026",
    sources: ["JAFZA official website", "DP World JAFZA guidelines"],
  },
];

export function getFreeZoneById(id: string): FreeZoneData | undefined {
  return freeZones.find((fz) => fz.id === id);
}
