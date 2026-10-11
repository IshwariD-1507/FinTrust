import { FinfluencerProfile, HistoricalPostRecord } from '../types';

export const SYNTHETIC_PROFILES: FinfluencerProfile[] = [
  {
    id: 'PROF-001',
    name: 'Rajesh Sharma (Demo Fictional)',
    channelName: 'AlphaTraderRaj (Synthetic)',
    primaryPlatform: 'Telegram',
    profileUrl: 'https://telegram.org/demo/alphatrader_synthetic',
    coverageStartDate: '2025-06-01',
    coverageEndDate: '2026-03-15',
    recordCount: 5,
    originBadge: 'synthetic_demo',
    bio: 'Synthetic profile created to simulate high-frequency options call channels with promotional links and aggressive return claims.',
    isDemoRecord: true,
    isIncompleteNotice: 'Notice: This profile contains only a small, illustrative synthetic sample of 5 posts. It does not represent full historical activity or an actual individual.'
  },
  {
    id: 'PROF-002',
    name: 'Priya Verma (Demo Fictional)',
    channelName: 'FinanceWithPriya (Synthetic)',
    primaryPlatform: 'YouTube',
    profileUrl: 'https://youtube.com/demo/financewithpriya_synthetic',
    coverageStartDate: '2025-01-10',
    coverageEndDate: '2026-02-28',
    recordCount: 4,
    originBadge: 'synthetic_demo',
    bio: 'Synthetic profile simulating educational personal finance creators with sponsored brand integrations, affiliate links, and long-term investing discussions.',
    isDemoRecord: true,
    isIncompleteNotice: 'Notice: Contains 4 synthetic sample video scripts. Provided strictly for testing FinTrust disclosure and educational screening rules.'
  },
  {
    id: 'PROF-003',
    name: 'Amit Patel (Demo Fictional)',
    channelName: 'ValueInvestingIndia (Synthetic)',
    primaryPlatform: 'X',
    profileUrl: 'https://x.com/demo/valueinvesting_synthetic',
    coverageStartDate: '2024-11-05',
    coverageEndDate: '2026-01-20',
    recordCount: 4,
    originBadge: 'synthetic_demo',
    bio: 'Synthetic profile representing fundamental equity analysis, balance sheet deep-dives, and occasional specific multi-month price projections.',
    isDemoRecord: true,
    isIncompleteNotice: 'Notice: Illustrative demo profile covering 4 synthetic threads to test prediction tracking against historical financial filings.'
  }
];

export const SYNTHETIC_HISTORICAL_POSTS: HistoricalPostRecord[] = [
  // Rajesh Sharma (PROF-001) Posts
  {
    id: 'HIST-POST-101',
    influencerId: 'PROF-001',
    postUrl: 'https://telegram.org/demo/alphatrader_synthetic/101',
    platform: 'Telegram',
    publicationDate: '2025-06-15',
    capturedText: 'Mega Jackpot Call! Buy XYZ today! Guaranteed 30% returns in one month with zero risk. Don\'t miss this opportunity.',
    sourceEvidence: 'Public Telegram channel screenshot archive (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-06-15',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'RED',
    matchedRuleIds: ['R1', 'R2', 'R3'],
    disclosureStatus: 'not_detected_in_text',
    predictions: [
      {
        id: 'PRED-101',
        claim: 'Guaranteed 30% returns in one month on XYZ stock',
        asset: 'XYZ Industries (Fictional)',
        predictionDate: '2025-06-15',
        directionOrTarget: '+30% price appreciation',
        statedTimeHorizon: '1 month (by 2025-07-15)',
        originalSource: 'Telegram Broadcast Message #101',
        outcomeAssessmentDate: '2025-07-16',
        evidenceUsed: 'Simulated NSE equity closing benchmark: XYZ fell -4.2% over stated 30-day window.',
        status: 'contradicted',
        statusExplanation: 'The target of +30% was not achieved; stock dropped 4.2% in the specified period.'
      }
    ],
    correctionHistory: []
  },
  {
    id: 'HIST-POST-102',
    influencerId: 'PROF-001',
    postUrl: 'https://telegram.org/demo/alphatrader_synthetic/102',
    platform: 'Telegram',
    publicationDate: '2025-08-01',
    capturedText: 'Join my premium trading group and use my affiliate link to access exclusive stock tips before the market opens tomorrow.',
    sourceEvidence: 'Public Telegram forward (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-08-01',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'AMBER',
    matchedRuleIds: ['R4', 'R5'],
    disclosureStatus: 'detected',
    correctionHistory: [
      {
        date: '2025-08-05',
        note: 'Clarified that affiliate link disclosure was present in channel description.',
        submittedBy: 'Auditor_Demo'
      }
    ]
  },
  {
    id: 'HIST-POST-103',
    influencerId: 'PROF-001',
    postUrl: 'https://telegram.org/demo/alphatrader_synthetic/103',
    platform: 'Telegram',
    publicationDate: '2025-10-10',
    capturedText: 'Double your money in 15 days. Guaranteed profits for every investor who enters our Nifty Bank expiry strategy today.',
    sourceEvidence: 'Telegram announcement post (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-10-10',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'RED',
    matchedRuleIds: ['R1', 'R2'],
    disclosureStatus: 'not_detected_in_text',
    predictions: [
      {
        id: 'PRED-102',
        claim: 'Double your capital in 15 days via weekly options strategy',
        asset: 'Bank Nifty Options (Simulated)',
        predictionDate: '2025-10-10',
        directionOrTarget: '+100% gain (2x)',
        statedTimeHorizon: '15 days (by 2025-10-25)',
        originalSource: 'Telegram Broadcast Message #103',
        outcomeAssessmentDate: '2025-10-26',
        evidenceUsed: 'Strategy implied 100% loss during sudden index gap down on 2025-10-18.',
        status: 'contradicted',
        statusExplanation: 'Extreme leverage led to total capital drawdown, directly contradicting the guaranteed profit claim.'
      }
    ]
  },
  {
    id: 'HIST-POST-104',
    influencerId: 'PROF-001',
    postUrl: 'https://telegram.org/demo/alphatrader_synthetic/104',
    platform: 'Telegram',
    publicationDate: '2025-12-05',
    capturedText: 'Earn 5% every week through my secret trading strategy. Join now! Limited seats available.',
    sourceEvidence: 'Telegram Channel Broadcast (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-12-05',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'AMBER',
    matchedRuleIds: ['R2', 'R3', 'R4'],
    disclosureStatus: 'not_detected_in_text'
  },
  {
    id: 'HIST-POST-105',
    influencerId: 'PROF-001',
    postUrl: 'https://telegram.org/demo/alphatrader_synthetic/105',
    platform: 'Telegram',
    publicationDate: '2026-03-12',
    capturedText: 'Weekly review: Stock markets can rise or fall. Understand the risks and conduct your own research before entering derivative contracts.',
    sourceEvidence: 'Telegram Channel Message #105 (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2026-03-12',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'GREEN',
    matchedRuleIds: ['R7'],
    disclosureStatus: 'not_detected_in_text'
  },

  // Priya Verma (PROF-002) Posts
  {
    id: 'HIST-POST-201',
    influencerId: 'PROF-002',
    postUrl: 'https://youtube.com/demo/financewithpriya_synthetic/v1',
    platform: 'YouTube',
    publicationDate: '2025-01-20',
    capturedText: 'This video is sponsored by ABC Financial Education. Investing involves risk, and returns are not guaranteed. We discuss index funds.',
    sourceEvidence: 'YouTube Video Description & On-screen Banner (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-01-20',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'GREEN',
    matchedRuleIds: ['R5', 'R7'],
    disclosureStatus: 'detected'
  },
  {
    id: 'HIST-POST-202',
    influencerId: 'PROF-002',
    postUrl: 'https://youtube.com/demo/financewithpriya_synthetic/v2',
    platform: 'YouTube',
    publicationDate: '2025-04-18',
    capturedText: 'I may earn a commission if you purchase the financial course through my affiliate link in the description.',
    sourceEvidence: 'YouTube Community Post & Pinned Comment (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-04-18',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'AMBER',
    matchedRuleIds: ['R4', 'R5'],
    disclosureStatus: 'detected'
  },
  {
    id: 'HIST-POST-203',
    influencerId: 'PROF-002',
    postUrl: 'https://youtube.com/demo/financewithpriya_synthetic/v3',
    platform: 'YouTube',
    publicationDate: '2025-09-10',
    capturedText: 'This educational video explains diversification and long-term investing. This is general information, not personalised investment advice.',
    sourceEvidence: 'YouTube Video Introduction (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-09-10',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'GREEN',
    matchedRuleIds: ['R7'],
    disclosureStatus: 'not_detected_in_text'
  },
  {
    id: 'HIST-POST-204',
    influencerId: 'PROF-002',
    postUrl: 'https://youtube.com/demo/financewithpriya_synthetic/v4',
    platform: 'YouTube',
    publicationDate: '2026-02-14',
    capturedText: 'Our sponsored market newsletter discusses several companies. All investments involve risk, and readers should conduct their own research.',
    sourceEvidence: 'YouTube Community Tab & Newsletter Header (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2026-02-14',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'GREEN',
    matchedRuleIds: ['R5', 'R7'],
    disclosureStatus: 'detected'
  },

  // Amit Patel (PROF-003) Posts
  {
    id: 'HIST-POST-301',
    influencerId: 'PROF-003',
    postUrl: 'https://x.com/demo/valueinvesting_synthetic/status/301',
    platform: 'X',
    publicationDate: '2024-11-20',
    capturedText: 'Our analysis considers revenue growth, debt, and market risks. Please review the original company filings before making a decision.',
    sourceEvidence: 'Public X thread analyzing manufacturing sector (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2024-11-20',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'GREEN',
    matchedRuleIds: ['R6', 'R7'],
    disclosureStatus: 'not_detected_in_text'
  },
  {
    id: 'HIST-POST-302',
    influencerId: 'PROF-003',
    postUrl: 'https://x.com/demo/valueinvesting_synthetic/status/302',
    platform: 'X',
    publicationDate: '2025-02-10',
    capturedText: 'Detailed 10-part thread on ABC Manufacturing. Given current CAPEX and orders, company should reach 250 INR per share within 12 months.',
    sourceEvidence: 'X Thread #2 (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-02-10',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'GREEN',
    matchedRuleIds: [],
    disclosureStatus: 'not_detected_in_text',
    predictions: [
      {
        id: 'PRED-301',
        claim: 'ABC Manufacturing to achieve 250 INR target per share',
        asset: 'ABC Manufacturing (Fictional)',
        predictionDate: '2025-02-10',
        directionOrTarget: '250 INR per share (from 180 INR base)',
        statedTimeHorizon: '12 months (by 2026-02-10)',
        originalSource: 'X Thread Post #302',
        outcomeAssessmentDate: '2026-02-15',
        evidenceUsed: 'Simulated NSE Annual High: Stock reached 264 INR in December 2025, meeting criteria.',
        status: 'outcome_verified',
        statusExplanation: 'The target of 250 INR was achieved in Month 10 of the stated 12-month window.'
      }
    ]
  },
  {
    id: 'HIST-POST-303',
    influencerId: 'PROF-003',
    postUrl: 'https://x.com/demo/valueinvesting_synthetic/status/303',
    platform: 'X',
    publicationDate: '2025-07-05',
    capturedText: 'This stock is guaranteed to rise. Buy now and act before everyone else as institutional flows enter.',
    sourceEvidence: 'X Post #303 (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2025-07-05',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'RED',
    matchedRuleIds: ['R1', 'R3'],
    disclosureStatus: 'not_detected_in_text'
  },
  {
    id: 'HIST-POST-304',
    influencerId: 'PROF-003',
    postUrl: 'https://x.com/demo/valueinvesting_synthetic/status/304',
    platform: 'X',
    publicationDate: '2026-01-15',
    capturedText: 'XYZ Tech expected to increase operating margins significantly over next 3 fiscal years. Annual reports show strong recurring subscription revenue.',
    sourceEvidence: 'X Thread #4 (Simulated)',
    recordOrigin: 'synthetic_demo',
    analysisDate: '2026-01-15',
    engineVersion: 'v1.0-rule-engine',
    outcome: 'GREEN',
    matchedRuleIds: ['R6'],
    disclosureStatus: 'not_detected_in_text',
    predictions: [
      {
        id: 'PRED-302',
        claim: 'XYZ Tech operating margin expansion over 3 fiscal years',
        asset: 'XYZ Tech Ltd (Fictional)',
        predictionDate: '2026-01-15',
        directionOrTarget: 'Margin expansion',
        statedTimeHorizon: '3 fiscal years (Ending FY2028-2029)',
        originalSource: 'X Thread Post #304',
        outcomeAssessmentDate: '2026-01-15',
        evidenceUsed: 'FY2027 and FY2028 audited filings pending future release.',
        status: 'pending',
        statusExplanation: 'Evaluation timeframe is ongoing until FY2029.'
      }
    ]
  }
];
