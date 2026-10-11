import { RuleDefinition } from '../types';

export const SCREENING_RULES: RuleDefinition[] = [
  {
    id: 'R1',
    code: 'R1',
    name: 'Guaranteed Returns or No-Risk Claims',
    category: 'Return & Risk Claims',
    severity: 'high',
    explanation: 'Promises of guaranteed investment profits or claims that an investment has no risk are important warning signs that require independent verification.',
    verificationAction: 'In regulated Indian capital markets, all equity and market-linked instruments carry market risk. Verify whether the advisor is SEBI-registered and avoid offers promising assured returns.',
    keywords: [
      'guaranteed returns',
      'guaranteed return',
      'assured returns',
      'assured return',
      'risk-free profits',
      'risk free profits',
      'risk-free profit',
      'risk free profit',
      'zero risk',
      'guaranteed profit',
      'guaranteed profits',
      'certain profits',
      'certain profit',
      'cannot lose money',
      'guaranteed to rise',
      'guaranteed 30% returns'
    ]
  },
  {
    id: 'R2',
    code: 'R2',
    name: 'Unusually High or Short-Term Return Claims',
    category: 'Return & Risk Claims',
    severity: 'medium',
    explanation: 'Extraordinary or unusually specific return claims should be checked against reliable evidence and the risks involved.',
    verificationAction: 'Compare claimed percentages against long-term market benchmarks (e.g. Nifty 50 compound growth ~12-14% p.a.). Unusually high short-term targets typically suggest excessive leverage or speculation.',
    keywords: [
      'double your money in 15 days',
      'double your money',
      '30% returns in one month',
      '30% returns',
      'earn 5% every week',
      '5% every week',
      'quick daily profits',
      'make huge profits overnight',
      'huge profits overnight'
    ],
    regexPatterns: [
      '\\b(?:double|triple)\\s+your\\s+money\\b',
      '\\b\\d+%(?:\\s+returns)?\\s+in\\s+\\d+\\s+(?:days?|weeks?|months?)\\b',
      '\\bearn\\s+\\d+%\\s+every\\s+(?:day|week|month)\\b'
    ]
  },
  {
    id: 'R3',
    code: 'R3',
    name: 'Urgency and Pressure Tactics',
    category: 'Urgency & Psychological Pressure',
    severity: 'medium',
    explanation: 'Pressure to act quickly can discourage careful research and independent verification.',
    verificationAction: 'Legitimate wealth generation takes time and discipline. Step back, conduct independent research, and resist artificially created urgency.',
    keywords: [
      'buy now',
      'act immediately',
      'last chance',
      'before it is too late',
      'before it\'s too late',
      'limited time only',
      'don\'t miss this opportunity',
      'dont miss this opportunity',
      'act before everyone else',
      'join now',
      'today!'
    ],
    regexPatterns: [
      '\\bbuy\\s+[a-zA-Z0-9_-]+\\s+today\\b',
      '\\blast\\s+chance\\s+to\\s+profit\\b'
    ]
  },
  {
    id: 'R4',
    code: 'R4',
    name: 'Promotional and Commercial Language',
    category: 'Commercial & Monetisation',
    severity: 'medium',
    explanation: 'Commercial relationships and incentives can affect how financial content is presented. Their presence alone does not prove misconduct.',
    verificationAction: 'Assess whether the creator is financially incentivised via broker commissions, course sales, or paid channels. Verify if recommendations are impartial.',
    keywords: [
      'join my premium trading group',
      'premium trading group',
      'subscribe to my paid tips',
      'paid tips',
      'use my affiliate link',
      'buy my financial course',
      'purchase the financial course',
      'financial course',
      'exclusive stock tips',
      'paid stock recommendations',
      'paid stock recommendation',
      'affiliate link',
      'secret trading strategy'
    ]
  },
  {
    id: 'R5',
    code: 'R5',
    name: 'Sponsorship and Disclosure Language',
    category: 'Disclosure & Compliance',
    severity: 'info',
    isDisclosureRule: true,
    explanation: 'Detects transparency indicators like paid partnership or sponsorship. Disclosures clarify business relationships but do not validate the underlying advice.',
    verificationAction: 'Note detected disclosure markers. Remember: a disclosed partnership means the content is commercial, not that the stock pick is safe.',
    keywords: [
      'sponsored by',
      'paid partnership',
      'advertisement',
      'affiliate link',
      'i may earn a commission',
      'earn a commission',
      'i receive compensation for this promotion',
      'receive compensation',
      'sponsored market newsletter'
    ]
  },
  {
    id: 'R6',
    code: 'R6',
    name: 'Supporting Evidence Presence',
    category: 'Evidence & Substantiation',
    severity: 'info',
    isEvidenceRule: true,
    explanation: 'Looks for references to official filings, research reports, or public data. When absent, retail investors must independently verify factual claims.',
    verificationAction: 'Check original audited financial statements on NSE, BSE, or company investor relations websites before making decisions.',
    keywords: [
      'official company filings',
      'original company filings',
      'company filings',
      'annual reports',
      'annual report',
      'financial statements',
      'financial statement',
      'research reports',
      'research report',
      'official source links',
      'revenue growth, debt, and market risks',
      'company balance sheet'
    ]
  },
  {
    id: 'R7',
    code: 'R7',
    name: 'Educational and Risk-Awareness Language',
    category: 'Educational Context',
    severity: 'info',
    isEducationalRule: true,
    explanation: 'Identifies contextual educational disclaimers. Educational language indicates risk awareness but does not neutralize other high-risk claims.',
    verificationAction: 'Acknowledge responsible educational phrasing while still conducting personal due diligence on specific stocks or assets discussed.',
    keywords: [
      'investing involves risk',
      'all investments involve risk',
      'returns are not guaranteed',
      'diversification',
      'long-term investing',
      'conduct your own research',
      'conduct their own research',
      'understand the risks',
      'general information, not personalised investment advice',
      'not personalised investment advice',
      'not personalized investment advice',
      'stock markets can rise or fall',
      'research a company\'s fundamentals',
      'before making a decision'
    ]
  }
];
