import { SCREENING_RULES } from '../data/rules';
import { 
  AnalysisResult, 
  ContentType, 
  MatchedPhrase, 
  Platform, 
  RuleMatchResult, 
  ScreeningOutcome 
} from '../types';

export const RULE_ENGINE_VERSION = 'v1.2.0-deterministic';

/**
 * Escapes regex special characters in a string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Finds all matches of a keyword or phrase in the text (case-insensitive)
 * and returns the exact start and end offsets in the original text.
 */
function findPhraseOffsets(text: string, phrase: string, ruleId: string): MatchedPhrase[] {
  const matches: MatchedPhrase[] = [];
  const escaped = escapeRegExp(phrase).replace(/\\ /g, '\\s+');
  const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
  
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    matches.push({
      phrase: match[0],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      ruleId
    });
  }

  // Fallback for phrases that might have punctuation right after (e.g. "today!")
  if (matches.length === 0) {
    const rawIndex = text.toLowerCase().indexOf(phrase.toLowerCase());
    if (rawIndex !== -1) {
      matches.push({
        phrase: text.substring(rawIndex, rawIndex + phrase.length),
        startIndex: rawIndex,
        endIndex: rawIndex + phrase.length,
        ruleId
      });
    }
  }

  return matches;
}

/**
 * Executes the transparent, deterministic rule-based screening engine on input text.
 */
export function analyzePostText(
  postText: string,
  platform: Platform = 'YouTube',
  contentType: ContentType = 'educational content',
  influencerName?: string,
  postUrl?: string
): AnalysisResult {
  const trimmedText = postText.trim();
  const triggeredRules: RuleMatchResult[] = [];
  const detectedDisclosures: string[] = [];
  const detectedEvidence: string[] = [];
  const detectedEducational: string[] = [];

  for (const rule of SCREENING_RULES) {
    const matchedPhrasesSet = new Set<string>();
    const matchPositions: MatchedPhrase[] = [];

    // 1. Check direct keywords
    for (const keyword of rule.keywords) {
      const offsets = findPhraseOffsets(trimmedText, keyword, rule.id);
      if (offsets.length > 0) {
        matchedPhrasesSet.add(keyword);
        matchPositions.push(...offsets);
      }
    }

    // 2. Check regex patterns if specified
    if (rule.regexPatterns) {
      for (const pattern of rule.regexPatterns) {
        try {
          const reg = new RegExp(pattern, 'gi');
          let m: RegExpExecArray | null;
          while ((m = reg.exec(trimmedText)) !== null) {
            matchedPhrasesSet.add(m[0].trim());
            matchPositions.push({
              phrase: m[0],
              startIndex: m.index,
              endIndex: m.index + m[0].length,
              ruleId: rule.id
            });
          }
        } catch {
          // ignore pattern syntax error
        }
      }
    }

    if (matchedPhrasesSet.size > 0) {
      const matchedPhrases = Array.from(matchedPhrasesSet);
      triggeredRules.push({
        rule,
        matchedPhrases,
        matchPositions
      });

      if (rule.isDisclosureRule) {
        detectedDisclosures.push(...matchedPhrases);
      }
      if (rule.isEvidenceRule) {
        detectedEvidence.push(...matchedPhrases);
      }
      if (rule.isEducationalRule) {
        detectedEducational.push(...matchedPhrases);
      }
    }
  }

  // Determine overall outcome:
  // High severity rules: R1
  // Medium severity rules: R2, R3, R4
  // Info rules: R5, R6, R7 (do not escalate outcome to RED or AMBER)
  const hasHighSeverity = triggeredRules.some(r => r.rule.severity === 'high');
  const hasMediumSeverity = triggeredRules.some(r => r.rule.severity === 'medium');

  let outcome: ScreeningOutcome = 'GREEN';
  let outcomeLabel = 'GREEN — No predefined warning patterns detected';
  let outcomeDescription = 'No configured warning patterns were found in the supplied text.';

  if (hasHighSeverity) {
    outcome = 'RED';
    outcomeLabel = 'RED — High-priority review';
    outcomeDescription = 'One or more high-priority warning patterns were detected in the supplied text.';
  } else if (hasMediumSeverity) {
    outcome = 'AMBER';
    outcomeLabel = 'AMBER — Review recommended';
    outcomeDescription = 'One or more patterns require additional checking.';
  }

  // Evidence availability observation
  const hasEvidence = detectedEvidence.length > 0;
  let evidenceStatement = '';
  if (hasEvidence) {
    evidenceStatement = `The supplied text contains references to evidence terms (${detectedEvidence.join(', ')}). FinTrust does not verify external documents; verify these filings directly on official stock exchange portals.`;
  } else {
    evidenceStatement = 'No supporting evidence was identified in the supplied text. Verify the claim independently.';
  }

  // Recommended next steps
  const recommendedNextSteps: string[] = [
    'Verify SEBI Registration: Check if the creator holds valid Research Analyst (RA) or Investment Adviser (IA) registration on official SEBI records.',
    'Examine Official Exchange Filings: Independently inspect company reports on BSE (bseindia.com) or NSE (nseindia.com).',
    'Beware of Assured Returns: Indian securities regulations prohibit registered intermediaries from promising guaranteed returns on equities or derivatives.'
  ];

  if (outcome === 'RED') {
    recommendedNextSteps.unshift('Exercise Caution: Guaranteed profits or zero-risk claims strongly warrant thorough independent verification before taking any action.');
  } else if (outcome === 'AMBER') {
    recommendedNextSteps.unshift('Check Motivations: Evaluate whether urgency or promotional links create incentives misaligned with objective advice.');
  }

  return {
    id: 'REP-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    influencerName: influencerName?.trim() || undefined,
    platform,
    postUrl: postUrl?.trim() || undefined,
    postText: trimmedText,
    contentType,
    analyzedAt: new Date().toISOString(),
    outcome,
    outcomeLabel,
    outcomeDescription,
    triggeredRules,
    disclosureStatus: detectedDisclosures.length > 0 ? 'detected' : 'not_detected_in_text',
    detectedDisclosurePhrases: detectedDisclosures,
    evidenceObservation: {
      hasEvidenceReferences: hasEvidence,
      evidencePhrases: detectedEvidence,
      statement: evidenceStatement
    },
    educationalPhrases: detectedEducational,
    recommendedNextSteps,
    engineVersion: RULE_ENGINE_VERSION
  };
}
