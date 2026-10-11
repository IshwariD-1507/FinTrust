import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  ChevronRight, 
  ExternalLink, 
  Search, 
  AlertCircle,
  FileText,
  Calendar
} from 'lucide-react';
import { SavedReport, User } from '../types';

interface SavedReportsViewProps {
  currentUser: User;
  savedReports: SavedReport[];
  onOpenReport: (report: SavedReport) => void;
  onDeleteReport: (reportId: string) => void;
  onNavigateToAnalyse: () => void;
}

export const SavedReportsView: React.FC<SavedReportsViewProps> = ({
  currentUser,
  savedReports,
  onOpenReport,
  onDeleteReport,
  onNavigateToAnalyse
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredReports = savedReports.filter(r => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (r.analysis.influencerName && r.analysis.influencerName.toLowerCase().includes(term)) ||
      r.analysis.postText.toLowerCase().includes(term) ||
      r.analysis.platform.toLowerCase().includes(term) ||
      r.analysis.outcome.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Account Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">
            Saved Analysis Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Reports saved to user ID: <span className="font-mono text-slate-800">{currentUser.email}</span>
          </p>
        </div>

        <button
          onClick={onNavigateToAnalyse}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          + Analyse New Post
        </button>
      </div>

      {/* Storage disclosure badge */}
      <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <span>
          Storage Mode: <strong>Isolated Client Prototype Storage</strong> (Stored in authenticated browser profile)
        </span>
        <span className="font-mono tabular-nums text-slate-500 font-semibold">
          {savedReports.length} Total Reports
        </span>
      </div>

      {/* Search within reports */}
      {savedReports.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search saved reports by influencer name, text excerpt, or platform..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors bg-white"
          />
        </div>
      )}

      {/* Reports List */}
      {savedReports.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">No saved reports yet</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When you analyse a post, click the "Save Report" action on the results page to archive findings here.
          </p>
          <button
            onClick={onNavigateToAnalyse}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Analyse a Post Now
          </button>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
          No saved reports match your search query "{searchTerm}".
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map(report => {
            const outcome = report.analysis.outcome;
            const outcomeColor = 
              outcome === 'RED' ? 'text-rose-700 bg-rose-50 border-rose-200' :
              outcome === 'AMBER' ? 'text-amber-800 bg-amber-50 border-amber-200' :
              'text-emerald-800 bg-emerald-50 border-emerald-200';

            return (
              <div
                key={report.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs group"
              >
                <div 
                  onClick={() => onOpenReport(report)}
                  className="space-y-1.5 flex-1 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-900">
                      {report.analysis.influencerName || 'Unnamed Influencer'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{report.analysis.platform}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{report.analysis.contentType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      Saved: {new Date(report.savedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 line-clamp-2 leading-relaxed">
                    "{report.analysis.postText}"
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${outcomeColor}`}>
                      {outcome}
                    </span>
                    <span>·</span>
                    <span>{report.analysis.triggeredRules.length} rule(s) triggered</span>
                    {report.analysis.disclosureStatus === 'detected' && (
                      <>
                        <span>·</span>
                        <span className="text-teal-700 font-semibold">Disclosure detected</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => onOpenReport(report)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                  >
                    Reopen Report
                  </button>

                  {confirmDeleteId === report.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onDeleteReport(report.id);
                          setConfirmDeleteId(null);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(report.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                      title="Delete saved report"
                      aria-label="Delete saved report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
