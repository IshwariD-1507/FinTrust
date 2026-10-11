import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { submitUserFeedback } from '../services/storage';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  reportId?: string;
  postSnippet: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  userId,
  reportId,
  postSnippet
}) => {
  const [wasHelpful, setWasHelpful] = useState<'yes' | 'somewhat' | 'no'>('yes');
  const [accuracyAssessment, setAccuracyAssessment] = useState<'accurate' | 'false_positive' | 'false_negative' | 'unsure'>('accurate');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitUserFeedback(
      userId,
      wasHelpful,
      accuracyAssessment,
      comments,
      postSnippet,
      reportId
    );
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">Analysis Feedback</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-900">Thank you for your feedback!</h3>
            <p className="text-xs text-slate-500">
              Your notes will be reviewed to refine rule patterns in future prototype iterations.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Post Text Excerpt
              </label>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 italic line-clamp-2">
                "{postSnippet}"
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Was this screening helpful?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['yes', 'somewhat', 'no'] as const).map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setWasHelpful(option)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors capitalize ${
                      wasHelpful === option
                        ? 'bg-teal-50 border-teal-600 text-teal-800 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {option === 'yes' ? 'Yes, very' : option === 'somewhat' ? 'Somewhat' : 'Not helpful'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Did the screening result seem correct?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'accurate', label: 'Accurate findings' },
                  { id: 'false_positive', label: 'False positive (flagged safe text)' },
                  { id: 'false_negative', label: 'False negative (missed risky claim)' },
                  { id: 'unsure', label: 'Unsure / Inconclusive' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAccuracyAssessment(item.id as any)}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      accuracyAssessment === item.id
                        ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional observations or notes (optional)
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={e => setComments(e.target.value)}
                placeholder="Mention specific words, missing context, or suggestions..."
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              Note: Feedback is used strictly for academic prototype rule calibration. It does not alter SEBI registration records or public influencer status.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
