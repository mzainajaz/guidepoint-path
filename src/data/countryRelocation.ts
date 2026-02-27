export interface RelocationCountry {
  code: string;
  name: string;
  flag: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    intro: string;
  };
  bestAnswer: {
    title: string;
    content: string;
    audience: string;
    caution: string;
  };
  taxResidency: {
    heading: string;
    intro: string;
    points: string[];
    warning: string;
  };
  setupRoutes: {
    heading: string;
    intro: string;
    routes: { label: string; description: string }[];
  };
  banking: {
    heading: string;
    intro: string;
    realities: string[];
    tip: string;
  };
  commonMistakes: { title: string; content: string }[];
  faqs: { q: string; a: string }[];
}

export const countryRelocationData: Record<string, RelocationCountry> = {
  uk: {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    meta: {
      title: "UK to UAE relocation: tax residency, setup routes, and banking guidance",
      description:
        "Country-specific guide for UK founders relocating to the UAE. Covers HMRC obligations, split-year treatment, banking transitions, and best-fit setup routes.",
    },
    hero: {
      headline: "Relocating from the UK to the UAE",
      intro:
        "A structured guide for UK founders, consultants, and entrepreneurs moving to the UAE. Covers tax residency changes, HMRC notification obligations, banking transitions, and the setup routes most commonly chosen by UK nationals.",
    },
    bestAnswer: {
      title: "What UK founders need to know first",
      content:
        "UK founders relocating to the UAE need to understand the Statutory Residence Test (SRT), HMRC notification obligations, potential split-year treatment, and how capital gains and pension access rules may change. Getting this wrong can result in double taxation or unexpected UK tax bills.",
      audience: "UK-based founders, consultants, and professionals planning a move to the UAE.",
      caution:
        "The UK Statutory Residence Test is complex. Spending too many days in the UK during your transition year can keep you UK tax-resident. Get specialist advice before moving.",
    },
    taxResidency: {
      heading: "UK tax residency and the Statutory Residence Test",
      intro:
        "The UK uses the Statutory Residence Test (SRT) to determine tax residency. Simply leaving the UK does not automatically make you non-resident. You must meet specific criteria around ties, days spent, and work patterns.",
      points: [
        "The SRT has automatic overseas tests and sufficient ties tests — both need careful analysis",
        "Split-year treatment may apply in your departure year, splitting income between UK-resident and non-resident periods",
        "You must notify HMRC of your departure and change of status",
        "UK capital gains tax rules change when you become non-resident, but anti-avoidance rules apply to recent departures",
        "UK pension access rules and tax treatment change with residency status",
        "National Insurance contributions may still apply depending on your situation",
        "The UK-UAE Double Taxation Agreement can help prevent double taxation on certain income",
      ],
      warning:
        "Do not assume leaving the UK makes you automatically non-resident. The SRT counts ties including family, accommodation, work days, and time spent in the UK. Professional tax advice is essential.",
    },
    setupRoutes: {
      heading: "Setup routes popular with UK founders",
      intro:
        "UK founders commonly choose these UAE setup routes based on their business model, visa needs, and operating preferences.",
      routes: [
        {
          label: "IFZA or Meydan Free Zone",
          description:
            "Popular with UK consultants and service businesses. Relatively straightforward setup, founder-friendly packaging, and good perceived value.",
        },
        {
          label: "DMCC",
          description:
            "Chosen by UK founders wanting stronger ecosystem signaling, especially for trading, commodities, or internationally positioned service businesses.",
        },
        {
          label: "Dubai South Business Hub",
          description:
            "Attractive to UK founders who want a Dubai setup with clean packaging and practical entry. Often compared against IFZA and Meydan.",
        },
        {
          label: "ADGM",
          description:
            "Relevant for UK founders setting up investment vehicles, holding structures, or professional services firms where regulatory framework matters.",
        },
        {
          label: "Mainland",
          description:
            "Considered when the business needs broader operational flexibility, local contracting ability, or does not fit neatly into a free zone model.",
        },
      ],
    },
    banking: {
      heading: "Banking realities for UK founders",
      intro:
        "Banking is one of the most underestimated parts of the UK-to-UAE transition. Understanding what to expect helps avoid delays.",
      realities: [
        "UAE corporate bank accounts require detailed KYC — business plan, client contracts, source of funds documentation",
        "Account opening can take 2–6 weeks after licence issuance",
        "Some UK banks may restrict or close accounts for non-UK residents — check before you move",
        "Multi-currency accounts (GBP/AED/USD) are available through several UAE banks and fintechs",
        "SWIFT transfers between UK and UAE accounts are standard but can incur fees and delays",
        "Digital banking options like Wio, Mashreq Neo, and others can supplement traditional accounts",
        "Your UK credit history does not transfer — UAE credit cards require fresh applications",
      ],
      tip: "Start preparing your KYC documents before arriving. Having a clear business plan, proof of existing clients, and source of funds documentation ready can cut weeks off the process.",
    },
    commonMistakes: [
      {
        title: "Not understanding the Statutory Residence Test before leaving",
        content:
          "Many UK founders assume they become non-resident simply by moving abroad. The SRT counts ties including UK accommodation, family, work days, and social connections. Miscounting can leave you UK tax-resident for an extra year.",
      },
      {
        title: "Failing to use split-year treatment properly",
        content:
          "Split-year treatment can save significant tax in your departure year, but it requires meeting specific conditions and proper HMRC notification. Missing this can mean paying UK tax on worldwide income for the full year.",
      },
      {
        title: "Not notifying HMRC of departure",
        content:
          "HMRC should be formally notified when you leave the UK. Failure to do so can result in continued UK tax obligations and penalties.",
      },
      {
        title: "Closing UK bank accounts too early",
        content:
          "Some founders close UK accounts before UAE banking is set up, creating a gap. Keep UK accounts active until UAE banking is fully operational.",
      },
      {
        title: "Ignoring UK pension implications",
        content:
          "Accessing UK pensions from abroad has different tax treatment. QROPS transfers, drawdown rules, and lump sum access all change with residency status.",
      },
      {
        title: "Underestimating UAE banking KYC timelines",
        content:
          "UK founders used to quick fintech onboarding are often surprised by UAE banking timelines. Prepare documents early and expect 2–6 weeks for corporate account activation.",
      },
    ],
    faqs: [
      {
        q: "Do I need to pay UK tax after moving to the UAE?",
        a: "It depends on the Statutory Residence Test. If you meet the conditions for non-residence, you generally stop paying UK income tax on non-UK income. However, UK-source income may still be taxable. Capital gains anti-avoidance rules apply for 5 years after departure.",
      },
      {
        q: "Can I keep my UK bank accounts after moving?",
        a: "Some banks allow it, others restrict services for non-residents. Check with your bank before moving. It's advisable to keep at least one UK account active for ongoing UK obligations.",
      },
      {
        q: "Which free zone do most UK founders choose?",
        a: "IFZA, Meydan, and Dubai South are popular for service businesses. DMCC is common for trading and internationally positioned firms. ADGM is chosen for investment or regulatory-sensitive structures.",
      },
      {
        q: "How long do I need to spend in the UAE to be tax-resident?",
        a: "The UAE issues tax residency certificates typically requiring 183+ days of physical presence per year. However, your UK tax status depends on the SRT, not UAE rules alone.",
      },
      {
        q: "What about my UK Ltd company if I move to the UAE?",
        a: "A UK Ltd can continue operating, but its tax residency may shift if management and control moves to the UAE. This has complex implications. Get specialist advice on corporate residency rules.",
      },
    ],
  },

  us: {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    meta: {
      title: "US to UAE relocation: FATCA, worldwide taxation, and setup guidance",
      description:
        "Guide for US founders and entrepreneurs exploring UAE business setup. Covers FATCA implications, worldwide taxation, LLC comparisons, and banking realities.",
    },
    hero: {
      headline: "Relocating from the US to the UAE",
      intro:
        "A structured guide for American founders, entrepreneurs, and professionals exploring UAE business setup. Covers worldwide US tax obligations, FATCA compliance, entity structure comparisons, and banking considerations unique to US nationals.",
    },
    bestAnswer: {
      title: "What US founders need to know first",
      content:
        "Unlike most countries, the US taxes its citizens on worldwide income regardless of where they live. Moving to the UAE does not eliminate US tax obligations. However, the Foreign Earned Income Exclusion (FEIE) and Foreign Tax Credit (FTC) can reduce your effective tax burden. Understanding these mechanisms before moving is essential.",
      audience: "US citizens and green card holders considering UAE business setup or relocation.",
      caution:
        "US citizens are taxed on worldwide income regardless of residency. The UAE's zero personal income tax does not eliminate your US filing obligations. FATCA reporting requirements also apply.",
    },
    taxResidency: {
      heading: "US worldwide taxation and FATCA",
      intro:
        "The US is one of only two countries that taxes based on citizenship rather than residency. This fundamentally changes the relocation calculus for American founders.",
      points: [
        "US citizens must file annual tax returns regardless of where they live or earn income",
        "The Foreign Earned Income Exclusion (FEIE) can exclude up to ~$120,000 of earned income (2024 figure, adjusted annually)",
        "The Foreign Tax Credit (FTC) can offset US tax on income taxed by another country — but UAE has no personal income tax to credit",
        "FATCA requires reporting of foreign financial accounts exceeding $10,000 (FBAR) and foreign assets (Form 8938)",
        "Owning a foreign corporation (including a UAE free zone company) may trigger CFC rules, GILTI, and Subpart F income reporting",
        "Renouncing US citizenship to avoid tax has its own complex rules including an exit tax",
        "Social Security and Medicare obligations may continue depending on your employment structure",
      ],
      warning:
        "Moving to the UAE does not reduce your US tax filing obligations. The interplay between FEIE, FTC, CFC rules, and GILTI makes specialist US-international tax advice essential — not optional.",
    },
    setupRoutes: {
      heading: "Setup routes for US founders",
      intro:
        "US founders should consider how their UAE entity structure interacts with US tax reporting requirements.",
      routes: [
        {
          label: "IFZA or Meydan Free Zone",
          description:
            "Common for service businesses and consultants. Simpler structure, but must consider CFC and GILTI implications for the US-owned foreign entity.",
        },
        {
          label: "DMCC",
          description:
            "Popular for US founders in trading, professional services, or internationally positioned businesses wanting stronger commercial signaling.",
        },
        {
          label: "ADGM",
          description:
            "Relevant for investment structures, fund management, or professional services where the common-law framework may be more familiar to US founders.",
        },
        {
          label: "Mainland",
          description:
            "Considered when broader operational flexibility is needed. Additional complexity for US tax reporting as a foreign entity owner.",
        },
      ],
    },
    banking: {
      heading: "Banking realities for US nationals",
      intro:
        "US nationals face unique banking challenges globally due to FATCA compliance requirements.",
      realities: [
        "Some UAE banks are hesitant to open accounts for US citizens due to FATCA reporting burden",
        "You will need to disclose your US citizenship during KYC — do not attempt to avoid this",
        "FBAR filing is required if aggregate foreign account balances exceed $10,000 at any point during the year",
        "Form 8938 (FATCA) may require reporting foreign financial assets above threshold amounts",
        "US bank accounts can generally be maintained alongside UAE accounts",
        "Wire transfers between US and UAE accounts are routine but may trigger additional compliance checks",
        "Digital banking options may be more limited for US nationals due to FATCA",
      ],
      tip: "Be upfront about US citizenship during bank account applications. Banks that are FATCA-compliant will work with you. Those that aren't may reject your application later, wasting time.",
    },
    commonMistakes: [
      {
        title: "Assuming UAE zero-tax eliminates US tax obligations",
        content:
          "US citizens owe US tax on worldwide income regardless of where they live. The UAE's zero personal income tax actually creates a gap — you cannot use the Foreign Tax Credit because there is no foreign tax to credit. The FEIE has income limits and does not cover investment or passive income.",
      },
      {
        title: "Not understanding CFC and GILTI rules",
        content:
          "Owning a UAE company as a US citizen can trigger Controlled Foreign Corporation rules. GILTI (Global Intangible Low-Taxed Income) may apply to income earned through your UAE entity, potentially creating US tax liability on UAE business profits.",
      },
      {
        title: "Missing FBAR and FATCA filing deadlines",
        content:
          "Failing to file FBAR (FinCEN 114) or Form 8938 can result in severe penalties — up to $100,000+ per violation for willful non-compliance. These are separate from your tax return.",
      },
      {
        title: "Choosing entity structure without US tax advice",
        content:
          "The type of UAE entity (FZE, FZC, branch) affects US tax treatment. Some structures trigger more reporting and tax than others. Get US-international tax advice before choosing.",
      },
      {
        title: "Hiding US citizenship from UAE banks",
        content:
          "This is illegal under FATCA. Banks will eventually discover your citizenship through information exchange. Being upfront saves time and avoids account closures.",
      },
    ],
    faqs: [
      {
        q: "Do US citizens pay tax in the UAE?",
        a: "There is no personal income tax in the UAE. However, US citizens must still file and potentially pay US federal taxes on worldwide income. The FEIE can exclude some earned income, but passive income, capital gains, and income above the exclusion limit remain taxable.",
      },
      {
        q: "Can US citizens open bank accounts in the UAE?",
        a: "Yes, but some banks are more FATCA-friendly than others. Be transparent about your US citizenship during KYC. Major international banks in the UAE generally handle FATCA compliance well.",
      },
      {
        q: "Is an LLC the same as a UAE free zone company?",
        a: "No. A US LLC and a UAE Free Zone Establishment (FZE) are different legal structures with different tax treatments. How your UAE entity is classified for US tax purposes (corporation vs. disregarded entity) significantly affects your obligations.",
      },
      {
        q: "Should I renounce US citizenship to avoid taxes?",
        a: "This is an extreme step with irreversible consequences, including a potential exit tax on unrealized gains. It does not retroactively eliminate past obligations. This should only be considered with specialist legal and tax counsel.",
      },
    ],
  },

  india: {
    code: "india",
    name: "India",
    flag: "🇮🇳",
    meta: {
      title: "India to UAE relocation: NRI rules, FEMA, and setup guidance for Indian founders",
      description:
        "Guide for Indian entrepreneurs relocating to the UAE. Covers NRI tax residency, FEMA compliance, popular setup routes, and banking realities.",
    },
    hero: {
      headline: "Relocating from India to the UAE",
      intro:
        "A structured guide for Indian entrepreneurs, professionals, and founders moving to the UAE. Covers NRI tax residency rules, FEMA compliance, popular setup routes among Indian nationals, and practical banking and family relocation considerations.",
    },
    bestAnswer: {
      title: "What Indian founders need to know first",
      content:
        "Indian founders relocating to the UAE need to understand NRI tax residency thresholds, FEMA requirements for foreign holdings, and how Indian-origin income is treated after changing residency. The UAE has a large Indian community and well-established setup pathways, but tax and compliance planning should happen before the move.",
      audience: "Indian entrepreneurs, IT professionals, traders, and business owners moving to the UAE.",
      caution:
        "India's tax residency rules have become stricter. The 182-day and deemed residency rules need careful tracking. FEMA compliance for foreign assets is mandatory.",
    },
    taxResidency: {
      heading: "NRI tax residency and Indian compliance",
      intro:
        "India determines tax residency based on physical presence. Recent changes have added complexity for high-income individuals and those with significant Indian-source income.",
      points: [
        "You become an NRI if you spend less than 182 days in India during a financial year",
        "Deemed residency rules may apply if your Indian income exceeds ₹15 lakhs and you are not tax-resident elsewhere",
        "NRIs are taxed only on Indian-source income — foreign income is generally not taxable",
        "FEMA requires reclassifying your accounts and investments when you become an NRI",
        "NRO and NRE account structures replace regular savings accounts",
        "Repatriation of funds from India has specific limits and documentation requirements",
        "Capital gains on Indian investments remain taxable in India even as an NRI",
      ],
      warning:
        "The deemed residency provision can catch founders who earn significant Indian income but do not establish clear tax residency in the UAE. Ensure you can demonstrate UAE tax residency (183+ days) to avoid being deemed Indian-resident.",
    },
    setupRoutes: {
      heading: "Setup routes popular with Indian founders",
      intro:
        "Indian founders are among the largest groups setting up in the UAE. These routes are commonly chosen.",
      routes: [
        {
          label: "IFZA",
          description:
            "Very popular among Indian founders for service, consulting, and trading businesses. Known for accessible pricing and flexible activity licensing.",
        },
        {
          label: "RAKEZ",
          description:
            "Chosen by cost-conscious Indian entrepreneurs. Particularly relevant for trading, light industrial, and SME operations.",
        },
        {
          label: "DMCC",
          description:
            "Popular with Indian traders, commodity businesses, and firms wanting a more established commercial address.",
        },
        {
          label: "Dubai South or Meydan",
          description:
            "Attractive for Indian service businesses and consultants who want clean Dubai positioning without high costs.",
        },
        {
          label: "Mainland",
          description:
            "Common for Indian businesses needing broader local operations, especially retail, trading, and hospitality-linked activities.",
        },
      ],
    },
    banking: {
      heading: "Banking realities for Indian nationals",
      intro:
        "Indian nationals generally have a smooth banking experience in the UAE due to the large Indian banking presence, but some specifics matter.",
      realities: [
        "Several Indian banks operate in the UAE (SBI, Bank of Baroda, etc.) which can simplify KYC",
        "UAE banks are familiar with Indian documentation and income structures",
        "NRO and NRE account conversion is required when you become an NRI",
        "Remittance from UAE to India is straightforward — multiple low-cost channels available",
        "FEMA compliance requires proper documentation for investment repatriation",
        "UAE credit history starts fresh — Indian credit scores do not transfer",
        "Business account opening typically requires trade licence, business plan, and proof of activity",
      ],
      tip: "Convert your Indian accounts to NRO/NRE status promptly after becoming an NRI. Delays can create FEMA compliance issues and complicate tax filing.",
    },
    commonMistakes: [
      {
        title: "Not converting accounts to NRO/NRE promptly",
        content:
          "FEMA requires account reclassification when you become an NRI. Continuing to operate regular savings accounts as an NRI is a compliance violation that can attract penalties.",
      },
      {
        title: "Ignoring deemed residency provisions",
        content:
          "If your Indian income exceeds ₹15 lakhs and you cannot prove tax residency in another country, India may deem you a resident and tax your worldwide income.",
      },
      {
        title: "Not tracking days spent in India carefully",
        content:
          "The 182-day threshold is strict. Business trips, family visits, and holidays in India all count. Founders who travel frequently between UAE and India must track days carefully.",
      },
      {
        title: "Assuming UAE setup eliminates Indian tax on Indian income",
        content:
          "Indian-source income — rent, capital gains, business income from India — remains taxable in India regardless of NRI status.",
      },
      {
        title: "Underestimating family relocation costs",
        content:
          "School fees, housing deposits, health insurance, and initial settlement costs in the UAE can be substantial. Budget realistically before moving the family.",
      },
    ],
    faqs: [
      {
        q: "How many days can I spend in India and still be an NRI?",
        a: "You must spend less than 182 days in India during a financial year (April–March) to qualify as an NRI. For individuals who have Indian income above ₹15 lakhs, additional conditions may apply.",
      },
      {
        q: "Do I pay tax in India after becoming an NRI?",
        a: "Only on Indian-source income. This includes rental income, capital gains on Indian investments, and business income earned in India. Foreign income is generally not taxable.",
      },
      {
        q: "Which free zone is most popular with Indian founders?",
        a: "IFZA and RAKEZ are very popular due to accessible pricing. DMCC is common for traders. Dubai South and Meydan appeal to service businesses wanting Dubai positioning.",
      },
      {
        q: "Can I send money from UAE to India easily?",
        a: "Yes. Multiple channels exist including bank transfers, exchange houses, and digital remittance services. Rates are competitive due to the large India-UAE remittance corridor.",
      },
    ],
  },

  egypt: {
    code: "egypt",
    name: "Egypt",
    flag: "🇪🇬",
    meta: {
      title: "Egypt to UAE relocation: visa pathways, banking, and setup guidance for Egyptian founders",
      description:
        "Guide for Egyptian entrepreneurs relocating to the UAE. Covers visa pathways, banking onboarding, cost-effective setup routes, and community resources.",
    },
    hero: {
      headline: "Relocating from Egypt to the UAE",
      intro:
        "A practical guide for Egyptian entrepreneurs and professionals moving to the UAE. Covers visa pathways, banking onboarding realities, cost-effective setup routes, and the considerations most relevant to Egyptian nationals.",
    },
    bestAnswer: {
      title: "What Egyptian founders need to know first",
      content:
        "Egyptian founders relocating to the UAE benefit from geographic proximity, cultural familiarity, and a large existing Egyptian community. The main considerations are visa pathways, banking KYC requirements, choosing a cost-effective setup route, and understanding how Egyptian tax obligations interact with UAE residency.",
      audience: "Egyptian entrepreneurs, freelancers, and professionals planning UAE business setup.",
      caution:
        "Banking KYC for Egyptian nationals may require additional documentation. Start preparing source of funds and business documentation early.",
    },
    taxResidency: {
      heading: "Egyptian tax considerations when relocating",
      intro:
        "Egypt taxes based on residency, with some obligations continuing for Egyptian-source income after relocation.",
      points: [
        "Egypt taxes residents on worldwide income — non-residents only on Egyptian-source income",
        "Residency is generally determined by having a permanent home or spending 183+ days in Egypt",
        "Egyptian-source income (rent, business income, investments) remains taxable after relocation",
        "No exit tax currently applies when leaving Egypt",
        "The Egypt-UAE tax treaty can help prevent double taxation",
        "Egyptian social insurance obligations may change upon relocation",
      ],
      warning:
        "Ensure you formally establish non-residency in Egypt and understand continuing obligations for any Egyptian-source income. Consult a local tax advisor.",
    },
    setupRoutes: {
      heading: "Setup routes popular with Egyptian founders",
      intro:
        "Egyptian founders often prioritize cost-effectiveness and practical accessibility when choosing a UAE setup route.",
      routes: [
        {
          label: "IFZA",
          description:
            "Popular for its accessible pricing and flexible activity licensing. Common choice for Egyptian service businesses and consultants.",
        },
        {
          label: "RAKEZ",
          description:
            "Attractive for cost-conscious Egyptian founders, especially for trading, services, and light operational businesses.",
        },
        {
          label: "SHAMS",
          description:
            "Commonly explored by Egyptian creatives, media professionals, and digital businesses looking for accessible entry.",
        },
        {
          label: "Dubai South",
          description:
            "Chosen by Egyptian founders who want Dubai positioning with practical packaging and approachable costs.",
        },
        {
          label: "Mainland",
          description:
            "Relevant for Egyptian businesses with broader operational needs, retail, or trading activities that benefit from onshore presence.",
        },
      ],
    },
    banking: {
      heading: "Banking realities for Egyptian nationals",
      intro:
        "Banking setup in the UAE is achievable for Egyptian nationals but may require extra preparation.",
      realities: [
        "KYC requirements may include additional documentation around source of funds and business background",
        "Having an existing business track record or client contracts strengthens your application",
        "Some UAE banks have Arabic-speaking staff, which can simplify the process",
        "Exchange house and remittance services for Egypt-UAE transfers are widely available",
        "Corporate account opening follows standard timelines (2–6 weeks) but prepare thoroughly",
        "Digital banking alternatives can supplement traditional accounts during the waiting period",
      ],
      tip: "Prepare comprehensive source of funds documentation before applying. Bank statements, client contracts, and a clear business plan significantly improve approval chances and speed.",
    },
    commonMistakes: [
      {
        title: "Not preparing banking documentation thoroughly",
        content:
          "Egyptian nationals sometimes face additional KYC scrutiny. Having complete source of funds documentation, business plans, and client contracts ready from day one avoids delays.",
      },
      {
        title: "Choosing the cheapest route without checking activity fit",
        content:
          "Low-cost packages are appealing but the activity must match the business model. Mismatched activities can cause problems with banking, visas, and renewals.",
      },
      {
        title: "Underestimating UAE living costs",
        content:
          "While the UAE has no income tax, housing, schooling, health insurance, and daily costs can be significant. Budget realistically before relocating.",
      },
      {
        title: "Not planning for family visa requirements",
        content:
          "Sponsoring family members requires meeting salary thresholds and having approved accommodation. Plan these requirements alongside business setup.",
      },
    ],
    faqs: [
      {
        q: "Do I need a visa sponsor to set up a company in the UAE?",
        a: "No. As a free zone or mainland company owner, you sponsor yourself and can sponsor employees and family members. The company trade licence enables visa sponsorship.",
      },
      {
        q: "Is Arabic useful for UAE business setup?",
        a: "Arabic is helpful for government interactions and some mainland processes. Free zone setup is primarily conducted in English. Having Arabic language skills is an advantage but not a requirement.",
      },
      {
        q: "Can I transfer money easily between Egypt and the UAE?",
        a: "Yes. Multiple exchange houses and bank transfer options exist for the Egypt-UAE corridor. Be aware of Egyptian Central Bank regulations on foreign currency transfers.",
      },
    ],
  },

  europe: {
    code: "europe",
    name: "Europe",
    flag: "🇪🇺",
    meta: {
      title: "Europe to UAE relocation: tax treaties, social security, and setup guidance",
      description:
        "Guide for European founders relocating to the UAE. Covers EU exit considerations, tax treaty implications, healthcare transitions, and setup route recommendations.",
    },
    hero: {
      headline: "Relocating from Europe to the UAE",
      intro:
        "A structured guide for European founders, professionals, and entrepreneurs exploring UAE relocation. Covers EU tax treaty implications, social security transitions, healthcare considerations, and the setup routes most commonly chosen by European nationals.",
    },
    bestAnswer: {
      title: "What European founders need to know first",
      content:
        "European founders face varied tax rules depending on their home country. France, Germany, Netherlands, Spain, and Nordic countries each have different exit tax provisions, treaty arrangements, and social security implications. The common thread is that tax residency changes require careful country-specific planning.",
      audience: "EU and EEA nationals — founders, consultants, and professionals considering UAE relocation.",
      caution:
        "Exit taxes exist in several European countries (France, Germany, Netherlands, Norway, etc.). These can trigger tax on unrealized capital gains when you leave. Plan ahead.",
    },
    taxResidency: {
      heading: "European tax residency considerations",
      intro:
        "Each European country has its own residency rules, but common themes apply across the region.",
      points: [
        "Most European countries use a 183-day physical presence test, but some add additional criteria (center of vital interests, habitual abode)",
        "Several countries have exit taxes on unrealized gains (France, Germany, Netherlands, Norway, Denmark, Spain)",
        "Double taxation treaties between most EU countries and the UAE can help, but treaty shopping is scrutinized",
        "Social security coordination within the EU/EEA does not extend to the UAE — contributions may need to be settled",
        "Pension rights and access rules vary significantly by country",
        "Some countries (e.g., France, Spain) have look-back provisions that can extend tax obligations",
        "EU citizens generally have smooth UAE visa processing with minimal restrictions",
      ],
      warning:
        "Exit tax rules vary dramatically by country. French founders face a look-back provision, German founders may owe on unrealized gains, and Nordic countries have their own specific rules. Always get country-specific advice.",
    },
    setupRoutes: {
      heading: "Setup routes popular with European founders",
      intro:
        "European founders generally have excellent banking and visa experiences in the UAE and tend to choose routes based on business model rather than nationality constraints.",
      routes: [
        {
          label: "Meydan or IFZA",
          description:
            "Popular with European consultants, service businesses, and digital entrepreneurs. Valued for clean setup process and practical positioning.",
        },
        {
          label: "DMCC",
          description:
            "Chosen by European founders in trading, commodities, or businesses wanting a stronger commercial ecosystem signal.",
        },
        {
          label: "ADGM",
          description:
            "Attractive to European founders from financial services, investment, or regulated industries who value a common-law framework.",
        },
        {
          label: "Dubai South",
          description:
            "Practical choice for European founders wanting clean Dubai positioning without premium pricing.",
        },
        {
          label: "Mainland",
          description:
            "Considered by European businesses planning broader UAE operations, retail, or activities requiring onshore presence.",
        },
      ],
    },
    banking: {
      heading: "Banking realities for European nationals",
      intro:
        "European nationals generally have a positive banking experience in the UAE, but some transition considerations apply.",
      realities: [
        "EU nationals typically face smoother KYC processes due to strong passport recognition",
        "Most European bank accounts can be maintained alongside UAE accounts, but check your bank's non-resident policy",
        "SEPA transfers do not work with UAE accounts — international wire transfers apply",
        "Multi-currency accounts (EUR/AED/USD) are available through several UAE banks",
        "European credit history does not transfer to the UAE",
        "Some European banks (especially Dutch, French) may restrict services for non-EU residents",
        "Digital banking from European fintechs (Revolut, Wise, N26) can bridge transition gaps",
      ],
      tip: "Check your European bank's non-resident policy before moving. Some banks, particularly in the Netherlands, France, and Germany, may restrict accounts or require you to switch to a non-resident product.",
    },
    commonMistakes: [
      {
        title: "Not checking for exit taxes before leaving",
        content:
          "Several European countries tax unrealized capital gains when you leave. If you hold significant equity, investments, or business interests, exit tax planning should happen months before your move.",
      },
      {
        title: "Assuming all European tax rules are similar",
        content:
          "A Swedish founder and a Portuguese founder face very different tax implications. Country-specific advice is essential — generic 'European' tax guidance is insufficient.",
      },
      {
        title: "Forgetting about social security implications",
        content:
          "EU social security coordination does not extend to the UAE. You may need to settle outstanding contributions, understand future pension access, and plan for healthcare gaps.",
      },
      {
        title: "Not maintaining proper documentation of departure",
        content:
          "European tax authorities may challenge your departure. Maintain clear evidence of UAE residency, deregistration from your European address, and limited return visits.",
      },
    ],
    faqs: [
      {
        q: "Do European founders pay tax in the UAE?",
        a: "There is no personal income tax in the UAE. Corporate tax (9%) applies to business profits above AED 375,000. Your European tax obligations depend on your home country's residency rules and whether exit taxes apply.",
      },
      {
        q: "Can I keep my European health insurance?",
        a: "Generally no. EU health insurance (EHIC) does not cover the UAE. You will need UAE health insurance, which is mandatory for all residents. Some international policies can bridge the gap during transition.",
      },
      {
        q: "Is my European driving licence valid in the UAE?",
        a: "Many European driving licences can be converted to UAE licences without a test, depending on your nationality. Check the UAE's approved country list for your specific passport.",
      },
      {
        q: "Which European countries have exit taxes?",
        a: "France, Germany, Netherlands, Norway, Denmark, Spain, and several others have some form of exit tax on unrealized gains. The specifics vary significantly. Get country-specific advice.",
      },
    ],
  },
};
