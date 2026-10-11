export type ScreeningOutcome = 'RED' | 'AMBER' | 'GREEN';

export type Platform = 'YouTube' | 'Instagram' | 'Telegram' | 'X' | 'Other';

export type ContentType = 
  | 'educational content' 
  | 'stock recommendation' 
  | 'trading advice' 
  | 'sponsored content' 
  | 'course promotion' 
  | 'other';

export interface MatchedPhrase {
  phrase: string;
  startIndex: number;
  endIndex: number;
  ruleId: string;
}

export interface RuleDefinition {
  id: string;
  code: string; // e.g. R1, R2
  name: string;
  category: string;
  severity: 'high' | 'medium' | 'info';
  explanation: string;
  verificationAction: string;
  keywords: string[];
  regexPatterns?: string[];
  isDisclosureRule?: boolean;
  isEducationalRule?: boolean;
  isEvidenceRule?: boolean;
}

export interface RuleMatchResult {
  rule: RuleDefinition;
  matchedPhrases: string[];
  matchPositions: MatchedPhrase[];
}

export interface AnalysisResult {
  id: string;
  influencerName?: string;
  platform: Platform;
  postUrl?: string;
  postText: string;
  contentType: ContentType;
  analyzedAt: string;
  outcome: ScreeningOutcome;
  outcomeLabel: string;
  outcomeDescription: string;
  triggeredRules: RuleMatchResult[];
  disclosureStatus: 'detected' | 'not_detected_in_text';
  detectedDisclosurePhrases: string[];
  evidenceObservation: {
    hasEvidenceReferences: boolean;
    evidencePhrases: string[];
    statement: string;
  };
  educationalPhrases: string[];
  recommendedNextSteps: string[];
  engineVersion: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string; // SHA-256 salt+hash
  createdAt: string;
  isDemoUser?: boolean;
}

export interface SavedReport {
  id: string;
  userId: string;
  analysis: AnalysisResult;
  savedAt: string;
  notes?: string;
}

export interface FeedbackSubmission {
  id: string;
  userId: string;
  reportId?: string;
  postSnippet: string;
  wasHelpful: 'yes' | 'somewhat' | 'no';
  accuracyAssessment: 'accurate' | 'false_positive' | 'false_negative' | 'unsure';
  comments: string;
  submittedAt: string;
}

export interface SyntheticSamplePost {
  post_id: string;
  content: string;
  platform: Platform;
  synthetic_demo: boolean;
  expected_rule_ids: string[];
  expected_result: ScreeningOutcome;
  explanation: string;
}

export interface SyntheticRegistrationRecord {
  demoId: string;
  exampleEntityName: string;
  datasetLabel: string;
  category: string;
  fictionalNote: string;
}

export interface PredictionRecord {
  id: string;
  claim: string;
  asset: string;
  predictionDate: string;
  directionOrTarget: string;
  statedTimeHorizon: string;
  originalSource: string;
  outcomeAssessmentDate: string;
  evidenceUsed: string;
  status: 'outcome_verified' | 'contradicted' | 'pending' | 'inconclusive';
  statusExplanation: string;
}

export interface HistoricalPostRecord {
  id: string;
  influencerId: string;
  postUrl: string;
  platform: Platform;
  publicationDate: string;
  capturedText: string;
  sourceEvidence: string;
  recordOrigin: 'synthetic_demo' | 'user_submitted' | 'public_post';
  analysisDate: string;
  engineVersion: string;
  outcome: ScreeningOutcome;
  matchedRuleIds: string[];
  disclosureStatus: 'detected' | 'not_detected_in_text' | 'not_assessed';
  predictions?: PredictionRecord[];
  correctionHistory?: {
    date: string;
    note: string;
    submittedBy: string;
  }[];
}

export interface FinfluencerProfile {
  id: string;
  name: string;
  channelName: string;
  primaryPlatform: Platform;
  profileUrl: string;
  coverageStartDate: string;
  coverageEndDate: string;
  recordCount: number;
  originBadge: 'synthetic_demo' | 'user_submitted' | 'verified_source';
  bio: string;
  isDemoRecord: boolean;
  isIncompleteNotice: string;
}
