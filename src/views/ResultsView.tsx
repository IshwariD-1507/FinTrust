import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  MessageSquare, 
  ExternalLink, 
  ArrowLeft, 
  Building2, 
  Info,
  Check,
  Share2,
  FileText
} from 'lucide-react';
import { AnalysisResult, MatchedPhrase, User } from '../types';
import { PostHighlightText } from '../components/PostHighlightText';
import { FeedbackModal } from '../components/FeedbackModal';
import { OFFICIAL_SEBI_RESOURCES } from '../data/sebi_demo_data';

interface ResultsViewProps {
  analysis: AnalysisResult;
  currentUser: User | null;
  onSaveReport: (analysis: AnalysisResult) => void;
  isSaved?: boolean;
  onBackToAnalyse: () => void;
  onVerifyRegistration: (influencerName?: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  analysis,
  currentUser,
  onSaveReport,
  isSaved = false,
  onBackToAnalyse,
  onVerifyRegistration
}) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Collect all match positions for highlight component
  const allMatchPositions: MatchedPhrase[] = [];
  analysis.triggeredRules.forEach(tr => {
    allMatchPositions.push(...tr.matchPositions);
  });

  const getOutcomeStyles = (outcome: string) => {
    switch (outcome) {
      case 'RED':
        return {
          bannerBg: 'bg-rose-50 border-rose-200',
          textColor: 'text-rose-950',
          badgeBg: 'bg-rose-600 text-white',
          icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
        };
      case 'AMBER':
        return {
          bannerBg: 'bg-amber-50 border-amber-200',
          textColor: 'text-amber-950',
          badgeBg: 'bg-amber-600 text-white',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        };
      default:
        return {
          bannerBg: 'bg-emerald-50 border-emerald-200',
          textColor: 'text-emerald-950',
          badgeBg: 'bg-emerald-700 text-white',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
        };
    }
  };

  const outcomeStyle = getOutcomeStyles(analysis.outcome);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBackToAnalyse}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyse Another Post</span>
        </button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {currentUser && (
            <button
              onClick={() => onSaveReport(analysis)}
              disabled={isSaved}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-default'
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-teal-600' : ''}`} />
              <span>{isSaved ? 'Saved to Profile' : 'Save Report'}</span>
            </button>
          )}

          <button
            onClick={() => setFeedbackOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>Submit Feedback</span>
          </button>
        </div>
      </div>

      {/* Primary Screening Outcome Banner */}
      <div className={`p-6 rounded-xl border ${outcomeStyle.bannerBg} space-y-3`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {outcomeStyle.icon}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${outcomeStyle.badgeBg}`}>
                  {analysis.outcome}
                </span>
                <h1 className={`text-lg sm:text-xl font-bold ${outcomeStyle.textColor}`}>
                  {analysis.outcomeLabel}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
                {analysis.outcomeDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Post Metadata row (Zero-pill discipline: unboxed text with separators) */}
        <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-900">
            {analysis.influencerName || 'Channel not specified'}
          </span>
          <span aria-hidden="true">·</span>
          <span>Platform: {analysis.platform}</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{analysis.contentType}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">
            {new Date(analysis.analyzedAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Captured Post Text with Interactive In-Text Highlights */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Supplied Post Content & Matched Phrases
          </h2>
          <span className="text-[11px] text-slate-400">
            Hover or inspect highlighted markers for rule IDs
          </span>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 font-sans leading-relaxed">
          <PostHighlightText text={analysis.postText} matches={allMatchPositions} />
        </div>

        {allMatchPositions.length === 0 && (
          <p className="text-xs text-emerald-800 bg-emerald-50/60 border border-emerald-100 p-3 rounded-lg">
            No predefined warning keywords or urgency patterns were detected in the supplied text.
          </p>
        )}
      </div>

      {/* Triggered Rules Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Rule-by-Rule Screening Findings ({analysis.triggeredRules.length} Activated)
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Engine: {analysis.engineVersion}
          </span>
        </div>

        {analysis.triggeredRules.length === 0 ? (
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center">
            No predefined warning patterns detected.
          </div>
        ) : (
          <div className="space-y-3">
            {analysis.triggeredRules.map(tr => {
              const rule = tr.rule;
              let severityBadge = 'text-slate-700 bg-slate-100 border-slate-200';
              if (rule.severity === 'high') severityBadge = 'text-rose-700 bg-rose-50 border-rose-200 font-bold';
              else if (rule.severity === 'medium') severityBadge = 'text-amber-800 bg-amber-50 border-amber-200 font-semibold';
              else if (rule.severity === 'info') severityBadge = 'text-teal-800 bg-teal-50 border-teal-200';

              return (
                <div 
                  key={rule.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {rule.code}
                      </span>
                      <span className="font-semibold text-xs text-slate-900">
                        {rule.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">{rule.category}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${severityBadge}`}>
                        {rule.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Matched phrases tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-500 text-[11px]">Matched phrase(s):</span>
                    {tr.matchedPhrases.map((phrase, pIdx) => (
                      <span 
                        key={pIdx} 
                        className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-800"
                      >
                        "{phrase}"
                      </span>
                    ))}
                  </div>

                  {/* Explanation */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rule.explanation}
                  </p>

                  {/* Suggested Verification Action */}
                  <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-teal-900 bg-teal-50/50 p-2.5 rounded-md">
                    <Info className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Recommended Verification: </strong>
                      <span>{rule.verificationAction}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Disclosures & Evidence Panels (2-column grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Disclosure Language Findings */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Sponsorship & Disclosure Language
          </h3>
          
          {analysis.disclosureStatus === 'detected' ? (
            <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                <span>Disclosure language detected</span>
              </div>
              <p className="text-[11px] text-teal-800">
                Matched: {analysis.detectedDisclosurePhrases.map(p => `"${p}"`).join(', ')}
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-800">
                Disclosure not detected in the supplied text.
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Note: Sponsoring disclosures might exist elsewhere (such as the pinned comment, video overlay, or platform tag). Absence in pasted text does not prove concealment.
              </p>
            </div>
          )}

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Reminder: A disclosure reveals commercial relationships, but it does not validate that the underlying financial product or strategy is suitable.
          </p>
        </div>

        {/* Supporting Evidence Observation */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Supporting Evidence Observation
          </h3>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <p className="leading-relaxed">
              {analysis.evidenceObservation.statement}
            </p>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            FinTrust does not independently inspect external documents cited in text. Investors must verify company balance sheets directly on exchange portals.
          </p>
        </div>

      </div>

      {/* Recommended Next Steps & Guided Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900">
          Recommended Next Steps for Retail Investors
        </h3>

        <ul className="space-y-2.5 text-xs text-slate-700">
          {analysis.recommendedNextSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-bold text-teal-700 shrink-0 font-mono">
                {idx + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onVerifyRegistration(analysis.influencerName)}
            className="px-4 py-2 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-teal-700" />
            <span>Check Registration on SEBI Portal</span>
          </button>
        </div>
      </div>

      {/* Prominent Mandatory Academic & Legal Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1.5">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-slate-500" />
          <span>Screening Disclaimer</span>
        </div>
        <p className="leading-relaxed text-[11px]">
          “FinTrust performs preliminary, rule-based screening of the text provided by the user. Results are not proof of credibility, misconduct, or fraud. False positives and false negatives are possible. Independently verify claims, disclosures, and registration details using official sources.”
        </p>
      </div>

      {/* Feedback Modal trigger */}
      {feedbackOpen && (
        <FeedbackModal
          isOpen={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          userId={currentUser?.id || 'guest_user'}
          reportId={analysis.id}
          postSnippet={analysis.postText}
        />
      )}

    </div>
  );
};
