export interface VisaGuide {
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  subtitle: string;
  icon: string;
  whoIsFor: string[];
  requirements: string[];
  typicalCost: string;
  processingTime: string;
  validity: string;
  overview: string;
  steps: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  cautions: string[];
  relatedLinks: { label: string; href: string }[];
}

export const visaGuides: VisaGuide[] = [
  {
    id: "investor-visa",
    title: "Investor Visa UAE",
    metaTitle: "Investor Visa UAE — Requirements, Cost & Process (2026)",
    metaDescription:
      "Complete guide to the UAE investor visa. Eligibility, cost breakdown, processing steps, and how to apply through free zones or mainland.",
    subtitle: "The visa tied to company ownership — most common for founders",
    icon: "briefcase",
    whoIsFor: [
      "Founders setting up their own company",
      "Shareholders with 51%+ ownership (mainland) or any share (free zone)",
      "Entrepreneurs seeking long-term UAE residency",
    ],
    requirements: [
      "Valid trade licence (free zone or mainland)",
      "Share certificate showing ownership",
      "Passport with 6+ months validity",
      "Passport-sized photographs",
      "Medical fitness test (in UAE)",
      "Emirates ID biometrics",
      "Proof of accommodation (Ejari or tenancy contract)",
    ],
    typicalCost: "AED 3,500–7,000",
    processingTime: "7–15 business days",
    validity: "2–3 years (renewable)",
    overview:
      "The investor visa is issued to company owners and shareholders. It's the most common visa type for founders entering the UAE. It grants full residency rights and the ability to sponsor family members. Free zone investor visas are typically faster and simpler; mainland investor visas may require additional approvals depending on the activity.",
    steps: [
      { title: "Obtain your trade licence", description: "Your company must be fully registered with a valid trade licence before visa processing begins." },
      { title: "Apply for entry permit", description: "Submit entry permit application through the relevant authority (free zone or DED). If you're outside the UAE, this allows legal entry for processing." },
      { title: "Enter the UAE", description: "Travel to the UAE on your entry permit (if applying from abroad) or change status if already in-country on a visit visa." },
      { title: "Medical fitness test", description: "Complete a medical examination at an approved health centre. Results typically take 2–3 business days." },
      { title: "Emirates ID biometrics", description: "Visit an ICP centre to register biometrics for your Emirates ID card." },
      { title: "Visa stamping", description: "Your residence visa is stamped in your passport. You're now a UAE resident." },
    ],
    faqs: [
      { q: "Can I get an investor visa without living in the UAE?", a: "You need to visit for medical testing and Emirates ID biometrics, but you don't need to live in the UAE full-time. You must enter at least once every 180 days to keep the visa active." },
      { q: "What's the difference between an investor visa and a Golden Visa?", a: "An investor visa is standard (2–3 years, tied to your company). A Golden Visa is a 10-year residency for qualifying investors, entrepreneurs, or specialised talent — with no sponsor requirement." },
      { q: "Can I sponsor my family on an investor visa?", a: "Yes. Once your investor visa is stamped, you can sponsor your spouse, children, and in some cases parents." },
    ],
    cautions: [
      "If your company licence is cancelled, your investor visa is also cancelled",
      "You must renew your visa before expiry — overstaying incurs daily fines",
      "Some free zones require a minimum visa package purchase with the licence",
    ],
    relatedLinks: [
      { label: "Family visa sponsorship", href: "/visas/family-visa" },
      { label: "Estimate setup costs", href: "/tools/cost-estimator" },
      { label: "Find the right free zone", href: "/tools/zone-picker" },
    ],
  },
  {
    id: "employee-visa",
    title: "Employee Visa UAE",
    metaTitle: "Employee Visa UAE — Sponsor Staff in Free Zone & Mainland (2026)",
    metaDescription:
      "How to sponsor employee visas in the UAE. Process, costs, quota rules, and compliance requirements for free zone and mainland companies.",
    subtitle: "Sponsor staff to work under your company in the UAE",
    icon: "users",
    whoIsFor: [
      "Companies hiring staff in the UAE",
      "Founders who need team members on-ground",
      "Businesses expanding their UAE operations",
    ],
    requirements: [
      "Valid trade licence with sufficient visa quota",
      "Signed employment contract",
      "Employee's passport with 6+ months validity",
      "Passport-sized photographs",
      "Educational certificates (attested, for certain roles)",
      "Medical fitness test",
      "Emirates ID biometrics",
    ],
    typicalCost: "AED 3,000–5,500 per employee",
    processingTime: "10–20 business days",
    validity: "2–3 years (renewable)",
    overview:
      "Employee visas allow your company to sponsor staff to live and work in the UAE. Your visa quota — the number of employees you can sponsor — depends on your office space size and licence type. Free zones typically allocate a fixed quota per package; mainland quota depends on your office Ejari and activity type.",
    steps: [
      { title: "Ensure visa quota availability", description: "Check your licence allows additional visas. Free zones have fixed quotas; mainland quota ties to office space size." },
      { title: "Obtain labour approval", description: "Apply for a work permit through MOHRE (mainland) or the relevant free zone authority." },
      { title: "Apply for entry permit", description: "Once labour approval is granted, apply for the employee's entry permit to enter the UAE." },
      { title: "Medical fitness test", description: "The employee completes a medical examination upon arrival at an approved centre." },
      { title: "Emirates ID registration", description: "Register biometrics at an ICP-authorised typing centre." },
      { title: "Visa stamping & labour card", description: "Residence visa is stamped and labour card is issued. The employee is now legally employed." },
    ],
    faqs: [
      { q: "How many employees can I sponsor?", a: "Free zones: typically 1–6 visas per flexi-desk/office package (varies by zone). Mainland: roughly 1 visa per 9 sqm of Ejari-registered office space." },
      { q: "Can I hire employees without a physical office?", a: "In most free zones, a flexi-desk package includes 1–3 visa allocations. On mainland, you need a registered office (Ejari) to get visa quota." },
      { q: "What happens if an employee resigns?", a: "You must cancel their visa within 30 days. Failure to do so may result in fines. End-of-service benefits (gratuity) apply after 1+ year of service." },
    ],
    cautions: [
      "Mainland requires WPS (Wage Protection System) compliance — salaries must be paid through approved channels",
      "Hiring certain nationalities may require additional MOHRE approvals",
      "You are liable for employees' visa status — if they overstay, you may face fines",
    ],
    relatedLinks: [
      { label: "Investor visa guide", href: "/visas/investor-visa" },
      { label: "Mainland licensing", href: "/mainland/licensing" },
      { label: "Office & Ejari requirements", href: "/mainland/office-ejari" },
    ],
  },
  {
    id: "partner-visa",
    title: "Partner Visa UAE",
    metaTitle: "Partner Visa UAE — Add Co-Founders & Shareholders (2026)",
    metaDescription:
      "How to issue partner visas in the UAE. Requirements for co-founders, minority shareholders, and business partners in free zones and mainland.",
    subtitle: "Residency for co-founders and business partners",
    icon: "handshake",
    whoIsFor: [
      "Co-founders joining an existing UAE company",
      "Business partners with shareholding",
      "Minority shareholders who need UAE residency",
    ],
    requirements: [
      "Valid trade licence with partner listed as shareholder",
      "Updated share certificate or MOA",
      "Partner's passport with 6+ months validity",
      "Passport-sized photographs",
      "Medical fitness test",
      "Emirates ID biometrics",
      "NOC from existing sponsor (if changing visa status in-country)",
    ],
    typicalCost: "AED 3,500–7,000",
    processingTime: "7–15 business days",
    validity: "2–3 years (renewable)",
    overview:
      "A partner visa is essentially an investor visa issued to a co-founder or shareholder who isn't the primary owner. The process is identical — the key difference is that the partner must be formally added to the trade licence and share structure before visa processing can begin. In free zones, adding a partner may require amending the licence; on mainland, it requires updating the MOA with the DED.",
    steps: [
      { title: "Add partner to trade licence", description: "Amend your licence to include the new shareholder. This requires board resolution and updated share documents." },
      { title: "Apply for entry permit", description: "Submit entry permit application for the new partner through your free zone or DED." },
      { title: "Enter UAE & medical test", description: "Partner enters UAE and completes medical fitness examination." },
      { title: "Emirates ID & visa stamping", description: "Register biometrics and stamp residence visa in passport." },
    ],
    faqs: [
      { q: "Does my partner need minimum shareholding?", a: "In free zones: any share percentage qualifies. On mainland: typically 1%+ shareholding, though requirements vary by activity." },
      { q: "Can a partner get a Golden Visa?", a: "Yes, if the company meets minimum capital or revenue thresholds. Partners qualify under the same investor Golden Visa criteria." },
      { q: "What if my partner is already in the UAE on another visa?", a: "They'll need to cancel their existing visa first (or obtain a status change), then process the new partner/investor visa under your company." },
    ],
    cautions: [
      "Adding partners may change your visa quota allocation — check with your free zone",
      "Partner removal requires formal licence amendment and may trigger visa cancellation",
      "Some zones charge amendment fees of AED 1,000–3,000 to add shareholders",
    ],
    relatedLinks: [
      { label: "Investor visa guide", href: "/visas/investor-visa" },
      { label: "Free zone comparison", href: "/free-zones" },
      { label: "Talk to an advisor", href: "/contact" },
    ],
  },
  {
    id: "family-visa",
    title: "Family Visa Sponsorship UAE",
    metaTitle: "Family Visa UAE — Sponsor Spouse, Children & Parents (2026)",
    metaDescription:
      "How to sponsor family members for UAE residency. Requirements, costs, and process for spouse, children, and parent visas.",
    subtitle: "Sponsor your spouse, children, and parents for UAE residency",
    icon: "heart",
    whoIsFor: [
      "UAE residents wanting to bring family",
      "Founders relocating with spouse and children",
      "Parents seeking to sponsor elderly dependents",
    ],
    requirements: [
      "Valid UAE residence visa (investor or employee)",
      "Minimum salary of AED 4,000/month (or AED 3,000 + accommodation)",
      "Attested marriage certificate (for spouse)",
      "Children's birth certificates (attested)",
      "Tenancy contract (Ejari) proving adequate accommodation",
      "Passport copies of all family members",
      "Medical fitness test for each family member (12+ years)",
    ],
    typicalCost: "AED 3,000–5,000 per family member",
    processingTime: "10–20 business days per person",
    validity: "Tied to sponsor's visa validity",
    overview:
      "Once you hold a valid UAE residence visa, you can sponsor immediate family members — spouse, children under 18 (or up to 25 if studying), and in some cases parents. The sponsor must meet minimum income requirements and provide proof of accommodation. Family visa holders can live in the UAE but cannot work without their own employment visa or work permit.",
    steps: [
      { title: "Confirm eligibility", description: "Ensure you meet the minimum salary threshold and have valid accommodation (Ejari-registered tenancy contract)." },
      { title: "Gather & attest documents", description: "Marriage certificates and birth certificates must be attested by the UAE embassy in the issuing country, then by MOFA in the UAE." },
      { title: "Apply for entry permit", description: "Submit family visa application through GDRFA (or your free zone, if applicable)." },
      { title: "Family members enter UAE", description: "Family members travel to the UAE on the entry permit within 60 days of issuance." },
      { title: "Medical & Emirates ID", description: "Each family member (12+) completes medical test and Emirates ID biometrics." },
      { title: "Visa stamping", description: "Residence visas are stamped in passports. Family members are now UAE residents." },
    ],
    faqs: [
      { q: "Can my spouse work in the UAE on a family visa?", a: "Not directly. They need a separate work permit from an employer, but they don't need to cancel the family visa — they can hold both." },
      { q: "What age limit applies for sponsoring children?", a: "Sons can be sponsored until age 18 (or 21 if studying). Daughters can be sponsored until marriage. Golden Visa holders can sponsor children regardless of age." },
      { q: "Can I sponsor my parents?", a: "Yes, if you earn AED 20,000+/month or have accommodation worth AED 1M+. Parent visas are typically 1-year renewable." },
    ],
    cautions: [
      "If your own visa is cancelled, all dependent visas are automatically cancelled too",
      "Document attestation can take 2–4 weeks — plan ahead",
      "Health insurance is mandatory for all family members in Abu Dhabi and Dubai",
    ],
    relatedLinks: [
      { label: "Investor visa guide", href: "/visas/investor-visa" },
      { label: "Relocation planning", href: "/relocation" },
      { label: "Estimate relocation costs", href: "/tools/relocation-calculator" },
    ],
  },
];
