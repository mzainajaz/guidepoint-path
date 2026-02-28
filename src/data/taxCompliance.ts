export interface TaxGuide {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  meta: { title: string; description: string };
  bestAnswer: string;
  overview: string;
  audience: string;
  keyThresholds: { label: string; value: string; note: string }[];
  sections: { id: string; title: string; content: string; bullets?: string[] }[];
  commonMistakes: { title: string; content: string }[];
  faqs: { q: string; a: string }[];
  sourceUrls: { label: string; url: string; ref: string }[];
  lastChecked: string;
  relatedGuides: string[];
}

export const getTaxGuideById = (id: string): TaxGuide | undefined =>
  taxGuides.find((g) => g.id === id);

export const taxGuides: TaxGuide[] = [
  {
    id: "vat",
    slug: "vat",
    name: "UAE VAT: What Founders Need to Know",
    shortName: "VAT",
    icon: "Receipt",
    meta: {
      title: "UAE VAT for business founders: registration threshold, filing, and common mistakes",
      description: "Practical guide to UAE VAT for founders. Covers the AED 375,000 mandatory threshold, voluntary registration, filing obligations, and what free zone businesses should verify.",
    },
    bestAnswer:
      "UAE VAT is charged at 5% on most goods and services. Registration is mandatory once your taxable supplies exceed AED 375,000 in the previous 12 months (or are expected to in the next 30 days). Voluntary registration is available from AED 187,500. Free zone businesses may qualify for a 0% rate on certain supplies, but only if they meet specific 'Designated Zone' conditions — this is not automatic and must be verified. [R1][R2]",
    overview:
      "Value Added Tax (VAT) was introduced in the UAE on 1 January 2018 at a standard rate of 5%. It applies to most goods and services, with specific exemptions and zero-rated categories. For founders setting up in the UAE, understanding VAT obligations is essential — from when you must register, to how it affects your pricing, invoicing, and cash flow. Free zone businesses face particular nuances around Designated Zone treatment. [R1]",
    audience: "Founders setting up or operating a business in the UAE who need to understand their VAT obligations.",
    keyThresholds: [
      { label: "Standard rate", value: "5%", note: "Applied to most goods and services in the UAE [R1]" },
      { label: "Mandatory registration", value: "AED 375,000", note: "Taxable supplies in the previous 12 months or expected in the next 30 days [R1][R2]" },
      { label: "Voluntary registration", value: "AED 187,500", note: "Available if taxable supplies or expenses exceed this amount [R2]" },
      { label: "Filing frequency", value: "Quarterly", note: "Most businesses file quarterly; some monthly based on turnover [R3]" },
      { label: "Late filing penalty", value: "AED 1,000", note: "First offence; AED 2,000 for repeat within 24 months [R4]" },
      { label: "Late payment penalty", value: "2–4%", note: "Progressive penalties applied on unpaid tax amounts [R4]" },
    ],
    sections: [
      {
        id: "who-must-register",
        title: "Who must register for VAT?",
        content:
          "VAT registration is mandatory for any taxable person whose taxable supplies and imports exceed AED 375,000 in the previous 12-month period, or who expects them to exceed AED 375,000 in the next 30 days. This includes businesses in free zones — free zone status does not exempt you from VAT registration requirements. [R1][R2]",
        bullets: [
          "Mandatory threshold: AED 375,000 in taxable supplies (trailing 12 months or forward 30 days)",
          "Voluntary threshold: AED 187,500 — recommended if you want to reclaim input VAT",
          "Free zone businesses must still register if they exceed thresholds",
          "Non-resident businesses making taxable supplies in the UAE must register regardless of threshold",
          "Tax Groups: related businesses can register as a group to simplify compliance",
        ],
      },
      {
        id: "free-zone-treatment",
        title: "VAT in free zones: Designated Zone rules",
        content:
          "Free zones are not automatically exempt from VAT. Certain free zones are classified as 'Designated Zones' for VAT purposes, which means goods transferred between Designated Zones or imported into them may be treated as outside the UAE's VAT scope (0% or out-of-scope). However, this treatment only applies to goods — services supplied from free zones are generally subject to standard 5% VAT. The conditions are strict and must be verified with the FTA. [R1][R5]",
        bullets: [
          "Designated Zone status applies to goods only, not services",
          "Goods must remain in the Designated Zone or move to another Designated Zone",
          "If goods move from a Designated Zone to mainland UAE, VAT applies",
          "Services supplied from any free zone are generally standard-rated at 5%",
          "Not all free zones are Designated Zones — verify your specific zone's status with the FTA",
          "Businesses in Designated Zones must still maintain full VAT records",
        ],
      },
      {
        id: "zero-rated-exempt",
        title: "Zero-rated and exempt supplies",
        content:
          "Certain supplies are zero-rated (0% VAT but still in the VAT system, allowing input tax recovery) or exempt (no VAT, but no input tax recovery). Understanding the difference matters for your cash flow and reporting. [R1]",
        bullets: [
          "Zero-rated: exports of goods and services outside the GCC, international transportation, first supply of residential property (within 3 years), certain education and healthcare services",
          "Exempt: supply of certain financial services, residential property (lease/sale after first supply), bare land, local passenger transport",
          "Zero-rated is generally better for businesses because you can reclaim input VAT",
          "Exempt means you cannot reclaim VAT on related purchases",
        ],
      },
      {
        id: "filing-compliance",
        title: "Filing and compliance obligations",
        content:
          "Once registered, businesses must file VAT returns (typically quarterly), maintain detailed records, issue tax invoices meeting FTA requirements, and pay any VAT due by the filing deadline. The FTA has progressively tightened compliance enforcement, with automated penalty systems. [R3][R4]",
        bullets: [
          "File VAT returns through the FTA portal (EmaraTax) by the 28th of the month following the tax period",
          "Maintain records for 5 years (7 years for real estate)",
          "Issue compliant tax invoices for all taxable supplies over AED 10,000",
          "Simplified tax invoices are allowed for supplies under AED 10,000",
          "Credit notes must reference the original invoice",
          "E-invoicing requirements may be introduced — monitor FTA guidance",
        ],
      },
      {
        id: "input-tax-recovery",
        title: "Input tax recovery",
        content:
          "Registered businesses can recover VAT paid on business purchases (input tax) by offsetting it against VAT collected on sales (output tax). If input tax exceeds output tax, you can claim a refund from the FTA. However, input tax recovery is blocked for certain categories, including entertainment expenses (unless necessary for the business), motor vehicles (unless used solely for business), and purchases related to exempt supplies. [R1]",
        bullets: [
          "Input tax recovery requires valid tax invoices from suppliers",
          "Blocked input tax: entertainment, personal motor vehicles, employee personal expenses",
          "Apportionment required if you make both taxable and exempt supplies",
          "Refund claims are processed by the FTA — allow time for review",
        ],
      },
    ],
    commonMistakes: [
      { title: "Assuming free zone means no VAT", content: "Free zone businesses are subject to VAT. Even in Designated Zones, services are standard-rated. Goods treatment depends on strict conditions. Always verify your specific obligations with the FTA. [R1][R5]" },
      { title: "Missing the mandatory registration deadline", content: "You must register within 30 days of exceeding the AED 375,000 threshold. Late registration attracts a penalty of AED 10,000. Monitor your rolling 12-month turnover proactively. [R2][R4]" },
      { title: "Not issuing compliant tax invoices", content: "Tax invoices must include specific information (TRN, date, description, VAT amount). Non-compliant invoices can result in penalties and blocked input tax recovery for your customers. [R3]" },
      { title: "Confusing zero-rated with exempt", content: "Zero-rated supplies (0% VAT) allow input tax recovery. Exempt supplies do not. Misclassifying supplies affects your VAT return and cash flow. [R1]" },
      { title: "Not budgeting for VAT cash flow impact", content: "VAT is collected on behalf of the government. You must set aside VAT received and pay it to the FTA by the deadline. Poor cash flow management around VAT is a common founder mistake." },
      { title: "Ignoring reverse charge obligations on imports", content: "If you import services from outside the UAE, you may need to account for VAT under the reverse charge mechanism. This is frequently overlooked by founders. [R1]" },
    ],
    faqs: [
      { q: "Do I need to register for VAT if I'm in a free zone?", a: "Yes, if your taxable supplies exceed AED 375,000. Free zone status does not exempt you from VAT registration. Even in Designated Zones, you must register and comply. [R1][R2]" },
      { q: "What is the VAT rate in the UAE?", a: "The standard rate is 5%. Some supplies are zero-rated (0%) and some are exempt. There is no reduced rate between 0% and 5%. [R1]" },
      { q: "How often do I file VAT returns?", a: "Most businesses file quarterly. High-turnover businesses may be required to file monthly. The FTA assigns your filing period when you register. [R3]" },
      { q: "Can I reclaim VAT on my setup costs?", a: "If you're VAT-registered (or apply for voluntary registration), you can generally reclaim VAT on business setup costs, subject to the standard input tax recovery rules and blocked categories. [R1]" },
      { q: "What happens if I don't register for VAT?", a: "If you exceed the mandatory threshold and don't register within 30 days, you face a penalty of AED 10,000. You'll also be liable for VAT on supplies made after you should have registered. [R2][R4]" },
      { q: "Is VAT applied on consulting services from a free zone?", a: "Yes. Services are standard-rated at 5% regardless of whether you're in a free zone, Designated Zone, or mainland. The Designated Zone 0% treatment only applies to goods. [R1][R5]" },
    ],
    sourceUrls: [
      { label: "FTA — VAT Overview", url: "https://tax.gov.ae/en/taxes/vat.aspx", ref: "R1" },
      { label: "FTA — VAT Registration Guide", url: "https://tax.gov.ae/en/taxes/vat/vat-registration.aspx", ref: "R2" },
      { label: "FTA — VAT Returns", url: "https://tax.gov.ae/en/taxes/vat/vat-returns.aspx", ref: "R3" },
      { label: "FTA — Administrative Penalties", url: "https://tax.gov.ae/en/taxes/administrative-penalties.aspx", ref: "R4" },
      { label: "FTA — Designated Zones", url: "https://tax.gov.ae/en/taxes/vat/designated-zones.aspx", ref: "R5" },
    ],
    lastChecked: "February 2026",
    relatedGuides: ["corporate-tax"],
  },
  {
    id: "corporate-tax",
    slug: "corporate-tax",
    name: "UAE Corporate Tax: What Founders Need to Know",
    shortName: "Corporate Tax",
    icon: "Building2",
    meta: {
      title: "UAE Corporate Tax for founders: 9% rate, free zone benefits, and what to verify",
      description: "Practical guide to UAE Corporate Tax. Covers the 9% rate above AED 375,000, free zone qualifying income, substance requirements, and what founders should plan for.",
    },
    bestAnswer:
      "UAE Corporate Tax (CT) applies at 9% on taxable income exceeding AED 375,000. Free zone entities can qualify for a 0% rate on 'Qualifying Income' — but only if they meet substance requirements, maintain adequate records, and their income qualifies under the rules. This is not automatic and requires careful structuring. The first tax period for most businesses started on or after 1 June 2023. [R1][R2]",
    overview:
      "The UAE introduced federal Corporate Tax effective for financial years starting on or after 1 June 2023. The standard rate is 9% on taxable income above AED 375,000 (0% on the first AED 375,000). This was a significant shift for the UAE's business environment. For founders, understanding how CT interacts with free zone benefits, what constitutes qualifying income, and what substance requirements apply is essential for structuring your business correctly from the start. [R1]",
    audience: "Founders setting up or operating a business in the UAE who need to understand Corporate Tax obligations and free zone qualifying income rules.",
    keyThresholds: [
      { label: "Standard rate", value: "9%", note: "On taxable income exceeding AED 375,000 [R1]" },
      { label: "Small business relief", value: "AED 375,000", note: "0% on the first AED 375,000 of taxable income [R1][R2]" },
      { label: "Qualifying Free Zone rate", value: "0%", note: "On Qualifying Income for Qualifying Free Zone Persons (QFZP) [R3]" },
      { label: "Registration", value: "Mandatory", note: "All taxable persons must register with the FTA — even if no tax is due [R4]" },
      { label: "Filing deadline", value: "9 months", note: "After the end of the relevant tax period [R4]" },
      { label: "Transfer pricing", value: "Arm's length", note: "Related party transactions must be at market value [R5]" },
    ],
    sections: [
      {
        id: "who-it-applies-to",
        title: "Who does Corporate Tax apply to?",
        content:
          "Corporate Tax applies to all UAE businesses and commercial activities, including free zone businesses. Natural persons (individuals) are subject to CT only if their business turnover exceeds AED 1 million. Government entities, qualifying public benefit entities, and certain other categories are exempt. [R1][R2]",
        bullets: [
          "UAE-incorporated companies (including free zone entities)",
          "Foreign entities with a Permanent Establishment in the UAE",
          "Natural persons conducting business with turnover above AED 1 million",
          "Exempt: government entities, qualifying public benefit entities, sovereign wealth funds, pension funds",
          "Partnership structures are transparent for CT purposes (partners taxed, not the partnership)",
        ],
      },
      {
        id: "free-zone-qualifying",
        title: "Free zone qualifying income: the 0% rate",
        content:
          "Free zone entities can qualify for a 0% Corporate Tax rate on 'Qualifying Income' if they meet specific conditions. This is one of the most significant planning opportunities — and one of the most commonly misunderstood areas. The 0% rate is not automatic. You must be a Qualifying Free Zone Person (QFZP) and your income must qualify. [R3]",
        bullets: [
          "Maintain adequate substance in the free zone (employees, expenditure, assets)",
          "Derive Qualifying Income (income from transactions with other free zone entities, or income from qualifying activities)",
          "Keep audited financial statements",
          "Comply with transfer pricing rules for related party transactions",
          "Do not elect to be subject to CT at the standard rate",
          "Non-qualifying income (e.g., income from mainland UAE clients for most activities) is taxed at 9%",
          "If non-qualifying income exceeds de minimis thresholds, QFZP status may be lost entirely",
        ],
      },
      {
        id: "substance-requirements",
        title: "Substance requirements",
        content:
          "Both the Corporate Tax law and the broader Economic Substance Regulations (ESR) require businesses to demonstrate genuine economic activity in the UAE. For free zone businesses seeking the 0% rate, substance is particularly important. A licence without real operations will not qualify. [R3][R6]",
        bullets: [
          "Adequate number of qualified employees in the UAE",
          "Adequate operating expenditure incurred in the UAE",
          "Core Income-Generating Activities (CIGA) directed and managed in the UAE",
          "Physical office or premises (not just a virtual address)",
          "Board decisions made in the UAE",
          "Substance requirements are assessed relative to the scale and nature of the business",
        ],
      },
      {
        id: "registration-filing",
        title: "Registration and filing",
        content:
          "All taxable persons must register for Corporate Tax with the FTA through the EmaraTax portal, even if no tax is due (e.g., because income is below AED 375,000 or qualifies for the 0% free zone rate). Tax returns must be filed within 9 months of the end of the relevant tax period. [R4]",
        bullets: [
          "Register through EmaraTax — the FTA's online portal",
          "Obtain a Tax Registration Number (TRN) for Corporate Tax",
          "File a CT return within 9 months after the end of your financial year",
          "Pay any tax due by the same deadline",
          "Maintain records for 7 years",
          "Free zone entities must file even if claiming the 0% qualifying income rate",
        ],
      },
      {
        id: "transfer-pricing",
        title: "Transfer pricing and related parties",
        content:
          "The UAE CT law includes transfer pricing provisions aligned with OECD guidelines. Transactions between related parties and connected persons must be conducted at arm's length (market value). This is particularly relevant for multi-entity structures, holding companies, and businesses with cross-border related party transactions. [R5]",
        bullets: [
          "Related party transactions must be at arm's length prices",
          "Maintain transfer pricing documentation (Master File and Local File may be required)",
          "Disclosure of related party transactions in the CT return",
          "Free zone entities dealing with mainland related parties must demonstrate arm's length pricing",
          "Penalties for non-compliance with transfer pricing rules",
        ],
      },
      {
        id: "planning-considerations",
        title: "Planning considerations for founders",
        content:
          "Corporate Tax planning should start before you set up your UAE business, not after. The structure you choose — free zone vs. mainland, single entity vs. multi-entity, where your IP sits, how related party transactions flow — all affect your CT position. Getting specialist advice early is significantly cheaper than restructuring later. [R1]",
        bullets: [
          "Choose your structure with CT in mind (free zone QFZP benefits vs. mainland flexibility)",
          "Plan IP ownership and licensing arrangements carefully",
          "Document substance from day one — don't try to retrofit it later",
          "Budget for compliance costs (accounting, audit, filing)",
          "Monitor the de minimis thresholds for non-qualifying income if you're a QFZP",
          "Consider the interaction between CT and VAT obligations",
          "Get specialist tax advice before finalising your structure",
        ],
      },
    ],
    commonMistakes: [
      { title: "Assuming the free zone 0% rate is automatic", content: "The 0% rate requires active qualification — substance, qualifying income, audited financials, and ongoing compliance. It is not simply granted because you have a free zone licence. [R3]" },
      { title: "Not registering for Corporate Tax", content: "Registration is mandatory for all taxable persons, even if no tax is due. Failure to register attracts penalties. Register proactively through EmaraTax. [R4]" },
      { title: "Ignoring substance requirements", content: "A free zone licence without genuine operations, employees, and decision-making in the UAE will not qualify for the 0% rate. Substance is assessed on an ongoing basis. [R3][R6]" },
      { title: "Not planning transfer pricing from the start", content: "Related party transactions must be at arm's length. If you have a multi-entity structure, document your transfer pricing methodology from the beginning. Retrospective documentation is harder and less credible. [R5]" },
      { title: "Confusing revenue with taxable income", content: "Corporate Tax applies to taxable income (revenue minus deductible expenses), not revenue. Understanding what expenses are deductible — and what isn't — matters for your tax position. [R1]" },
      { title: "Not budgeting for compliance costs", content: "CT compliance requires accounting, potentially audit, filing, and ongoing monitoring. Budget for these costs as part of your operating expenses from day one." },
    ],
    faqs: [
      { q: "What is the UAE Corporate Tax rate?", a: "9% on taxable income above AED 375,000. The first AED 375,000 is taxed at 0%. Free zone entities may qualify for 0% on qualifying income. [R1][R2]" },
      { q: "Do free zone businesses pay Corporate Tax?", a: "Free zone businesses are subject to CT but may qualify for a 0% rate on qualifying income if they meet specific conditions (QFZP status). Non-qualifying income is taxed at 9%. [R3]" },
      { q: "When do I need to file my Corporate Tax return?", a: "Within 9 months of the end of your financial year (tax period). Registration must be done proactively through EmaraTax. [R4]" },
      { q: "Do I need an audit for Corporate Tax?", a: "Free zone entities seeking the 0% qualifying income rate must maintain audited financial statements. Other businesses may not be required to audit, but good accounting practices are essential for compliance. [R3]" },
      { q: "How does Corporate Tax interact with VAT?", a: "CT and VAT are separate taxes. You may be subject to both. VAT is a transaction-level tax (5% on supplies). CT is an annual tax on profits (9% above AED 375,000). They have separate registration, filing, and compliance requirements." },
      { q: "Can I offset losses against future profits?", a: "Yes. Tax losses can be carried forward to offset against future taxable income, subject to conditions (75% limitation and same ownership requirements). Losses cannot be carried back. [R1]" },
    ],
    sourceUrls: [
      { label: "MoF — Corporate Tax Overview", url: "https://mof.gov.ae/corporate-tax/", ref: "R1" },
      { label: "FTA — Corporate Tax Registration", url: "https://tax.gov.ae/en/taxes/corporate-tax.aspx", ref: "R2" },
      { label: "MoF — Free Zone Qualifying Income", url: "https://mof.gov.ae/corporate-tax-free-zone/", ref: "R3" },
      { label: "FTA — CT Filing and Deadlines", url: "https://tax.gov.ae/en/taxes/corporate-tax/ct-returns.aspx", ref: "R4" },
      { label: "MoF — Transfer Pricing", url: "https://mof.gov.ae/corporate-tax-transfer-pricing/", ref: "R5" },
      { label: "MoF — Economic Substance Regulations", url: "https://mof.gov.ae/economic-substance-regulations/", ref: "R6" },
    ],
    lastChecked: "February 2026",
    relatedGuides: ["vat"],
  },
];

export interface ComplianceChecklist {
  id: string;
  title: string;
  items: { label: string; when: string; penalty?: string }[];
}

export const complianceChecklists: ComplianceChecklist[] = [
  {
    id: "annual",
    title: "Annual compliance essentials",
    items: [
      { label: "Renew your trade licence before expiry", when: "Before licence expiry date", penalty: "Late fees + potential licence suspension" },
      { label: "Renew employee visas and Emirates IDs", when: "Before expiry date", penalty: "Fines per day for overstay" },
      { label: "File Corporate Tax return", when: "Within 9 months of financial year end", penalty: "AED 500/month late filing" },
      { label: "File VAT returns (if registered)", when: "By 28th of month following tax period", penalty: "AED 1,000 first offence; AED 2,000 repeat" },
      { label: "Submit UBO declaration (if applicable)", when: "Annually or upon change", penalty: "Varies by authority" },
      { label: "Maintain Economic Substance reporting (if applicable)", when: "Within 12 months of financial year end", penalty: "AED 20,000 first offence" },
      { label: "Prepare and file audited financials (if QFZP)", when: "As part of CT filing", penalty: "Loss of QFZP status" },
      { label: "Maintain AML/CFT compliance records", when: "Ongoing", penalty: "Significant fines and potential licence revocation" },
    ],
  },
  {
    id: "setup",
    title: "Post-setup compliance (first 90 days)",
    items: [
      { label: "Register for Corporate Tax on EmaraTax", when: "Within 3 months of incorporation" },
      { label: "Register for VAT (if threshold met or voluntary)", when: "Within 30 days of exceeding threshold", penalty: "AED 10,000 late registration" },
      { label: "Open corporate bank account", when: "As soon as licence is issued" },
      { label: "Set up accounting system and chart of accounts", when: "Immediately after setup" },
      { label: "Appoint a compliance officer or advisor", when: "Within first month" },
      { label: "Register for AML/CFT compliance (if DNFBP)", when: "Upon licence issuance" },
      { label: "Submit initial UBO declaration", when: "Upon incorporation" },
    ],
  },
];
