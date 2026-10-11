import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Building2, 
  History, 
  BookOpen, 
  TestTube, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { AnalysisResult, SavedReport, User } from '../types';
import { ActiveTab } from '../components/Navbar';
import { OFFICIAL_SEBI_RESOURCES } from '../data/sebi_demo_data';
import { SCREENING_RULES } from '../data/rules';

interface DashboardViewProps {
  currentUser: User;
  savedReports: SavedReport[];
  analysisCount: number;
  onNavigate: (tab: ActiveTab) => void;
  onSelectReport: (report: SavedReport) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  savedReports,
  analysisCount,
  onNavigate,
  onSelectReport
}) => {
  const recentReports = savedReports.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Retail Investor Screening Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">
            Welcome, {currentUser.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {currentUser.isDemoUser 
              ? 'Logged in with Demo Student profile. Analyse posts, review sample cases, and cross-reference official registers.'
              : 'Screen financial influencer claims, inspect required disclosures, and review SEBI registration records.'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('analyse')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Analyse a New Post</span>
          </button>
          <button
            onClick={() => onNavigate('sebi_verify')}
            className="px-4 py-2.5 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Verify Registration</span>
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <History className="w-3.5 h-3.5" />
            <span>Finfluencer History</span>
          </button>
        </div>
      </div>

      {/* Real Statistics for this User (No fabricated metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1">
          <div className="text-xs font-medium text-slate-500">Posts Analysed by You</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {analysisCount}
          </div>
          <div className="text-[11px] text-slate-400">
            Computed from this account's active screenings
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1">
          <div className="text-xs font-medium text-slate-500">Saved Reports in Account</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {savedReports.length}
          </div>
          <div className="text-[11px] text-slate-400">
            Isolated to your user ID ({currentUser.email})
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1">
          <div className="text-xs font-medium text-slate-500">Configured Rule Categories</div>
          <div className="text-2xl font-bold text-teal-700 font-mono tabular-nums">
            {SCREENING_RULES.length} Rules (R1–R7)
          </div>
          <div className="text-[11px] text-slate-400">
            100% transparent deterministic rule definitions
          </div>
        </div>

      </div>

      {/* Main 2-column Grid: Recent Reports & Warning Categories Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Recent Reports */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-teal-700" />
              <span>Your Recent Analysis Reports</span>
            </h2>
            {savedReports.length > 0 && (
              <button
                onClick={() => onNavigate('saved_reports')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
              >
                View all ({savedReports.length})
              </button>
            )}
          </div>

          {recentReports.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">No saved reports yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Analyse any financial post text or try synthetic sample posts to generate and save detailed screening reports.
              </p>
              <button
                onClick={() => onNavigate('analyse')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <span>Analyse Your First Post</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentReports.map(report => {
                const outcome = report.analysis.outcome;
                const badgeColor = 
                  outcome === 'RED' ? 'text-rose-700 bg-rose-50 border-rose-200' :
                  outcome === 'AMBER' ? 'text-amber-800 bg-amber-50 border-amber-200' :
                  'text-emerald-800 bg-emerald-50 border-emerald-200';

                return (
                  <div
                    key={report.id}
                    onClick={() => onSelectReport(report)}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-start justify-between gap-4 cursor-pointer group"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">
                          {report.analysis.influencerName || 'Unnamed Influencer'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{report.analysis.platform}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {new Date(report.savedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-xs text-slate-800 line-clamp-2">
                        {report.analysis.postText}
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${badgeColor}`}>
                          {outcome === 'RED' ? 'High-Priority Review' : outcome === 'AMBER' ? 'Review Recommended' : 'No Predefined Warnings'}
                        </span>
                        <span>·</span>
                        <span>
                          {report.analysis.triggeredRules.length} rules matched
                        </span>
                        {report.analysis.disclosureStatus === 'detected' && (
                          <>
                            <span>·</span>
                            <span className="text-teal-700 font-medium">Disclosure detected</span>
                          </>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0 mt-2 transition-colors" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Col: Overview of Warning Categories */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Warning Categories Overview
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 text-xs">
            
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">R1 — Guaranteed / No Risk</span>
                <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">High Severity</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Flags promises of assured profit or claims that capital cannot be lost. Always verify with official SEBI advisory rules.
              </p>
            </div>

            <div className="space-y-1 border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">R2 — Unusually High Returns</span>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">Medium Severity</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Flags extraordinary short-term promises (e.g. 30% monthly, double in 15 days). Check against Nifty compound averages.
              </p>
            </div>

            <div className="space-y-1 border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">R3 — Pressure & Urgency</span>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">Medium Severity</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Identifies psychological manipulation tactics such as “act immediately”, “last chance”, or artificial countdowns.
              </p>
            </div>

            <div className="space-y-1 border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">R4 & R5 — Commercial & Disclosure</span>
                <span className="text-[10px] font-mono font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded">Transparency</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Distinguishes course promotions and affiliate commissions from genuine educational content and detects sponsorships.
              </p>
            </div>

            <div className="pt-1">
              <button
                onClick={() => onNavigate('learn')}
                className="w-full py-2 text-center text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
              >
                Read Full Investor Education Guide →
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Official SEBI Reference Strip */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Official SEBI Independent Verification Routes</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Always confirm whether a creator is a registered Research Analyst (RA) or Investment Adviser (IA).
            </p>
          </div>
          <button
            onClick={() => onNavigate('sebi_verify')}
            className="text-xs font-semibold text-teal-300 hover:text-teal-200 cursor-pointer self-start sm:self-auto"
          >
            Open Verification Portal →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {OFFICIAL_SEBI_RESOURCES.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 transition-colors flex items-center justify-between group"
            >
              <span className="font-medium text-slate-300 group-hover:text-white truncate">
                {item.title}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-400 shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};
