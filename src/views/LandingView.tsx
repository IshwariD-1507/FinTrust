import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  History, 
  BookOpen, 
  TestTube, 
  Building2, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../components/Navbar';

interface LandingViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onTryDemo: () => void;
  onStartAnalysis: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  onTryDemo,
  onStartAnalysis
}) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            <span>College Design Thinking Project · Prototype v1.2</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            Think critically. <br />
            <span className="text-teal-700">Verify independently.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A transparent, rule-based screening tool helping retail investors assess financial influencer content, identify warning patterns, check disclosures, and cross-reference official SEBI registration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onTryDemo}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Try Demo (Explore Sample Posts)</span>
            </button>
          </div>

          <div className="pt-4 text-xs text-slate-500 flex items-center justify-center gap-4">
            <span>✓ No account required for demo</span>
            <span>·</span>
            <span>✓ 100% deterministic rule engine</span>
            <span>·</span>
            <span>✓ Official SEBI reference links</span>
          </div>

        </div>
      </section>

      {/* Problem & Solution Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-xs">
          
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
              The Design Thinking Problem Statement
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              How might we help retail investors distinguish objective advice from promotional bias?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every day, millions of retail investors in India turn to YouTube, Instagram, and Telegram for stock ideas. They frequently encounter sensational promises of “guaranteed returns,” artificial FOMO urgency, and concealed affiliate promotions without knowing how to verify credentials.
            </p>
          </div>

          <div className="space-y-4 md:border-l md:border-slate-100 md:pl-8">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
              The FinTrust Solution
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              A transparent, rule-based screening engine with guided verification.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              FinTrust does not assign black-box scores or make accusations. Instead, it inspects text for specific, documented patterns (R1–R7), highlights triggering phrases, reports disclosure status, and guides the investor to official SEBI registers and exchange filings.
            </p>
          </div>

        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Key Screening Capabilities
          </h2>
          <p className="text-sm text-slate-600">
            Built strictly on deterministic rules, ethical guidelines, and transparent user feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Post Screening Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Analyses post excerpts against 7 deterministic rules (R1–R7) detecting guaranteed returns, extreme claims, urgency, and promotional links.
            </p>
            <button
              onClick={() => onNavigate('analyse')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Screen a post</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">SEBI Registration Lookup</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explains SEBI regulatory categories (Research Analyst, Investment Adviser) and connects users directly to official SEBI intermediary portals.
            </p>
            <button
              onClick={() => onNavigate('sebi_verify')}
              className="text-xs font-semibold text-slate-800 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Check registration</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
              <History className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Finfluencer History</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore documented historical post archives, disclosure consistency, and assessable prediction outcomes with transparent correction logs.
            </p>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View historical records</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
              <TestTube className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Rule Testing & Evaluation Suite</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Run automated verification against 12 benchmark synthetic sample posts (DEMO01–DEMO12). Compare expected vs. actual rule activations and inspect live pass rates.
            </p>
            <button
              onClick={() => onNavigate('rule_testing')}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Run test suite</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Learn & Verify Guide</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Educational modules covering guaranteed return scams, urgency manipulation, commercial disclaimers, and steps to read BSE/NSE corporate filings.
            </p>
            <button
              onClick={() => onNavigate('learn')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Read educational guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Classroom Demonstration Walkthrough Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                College Project Presentation
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">
                Suggested Demonstration Sequence for Evaluators
              </h2>
            </div>
            <button
              onClick={onTryDemo}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Start Demonstration Flow
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/50 space-y-2">
              <span className="font-mono text-teal-300 font-bold">Step 1 — Problem Brief</span>
              <p className="text-slate-300">
                Explain retail investor vulnerability to unregistered Telegram tips and exaggerated YouTube returns in India.
              </p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/50 space-y-2">
              <span className="font-mono text-teal-300 font-bold">Step 2 — Analyse DEMO01 & DEMO02</span>
              <p className="text-slate-300">
                Demonstrate RED outcome for guaranteed returns and GREEN outcome for disclosed educational content.
              </p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/50 space-y-2">
              <span className="font-mono text-teal-300 font-bold">Step 3 — SEBI & Rule Evaluation</span>
              <p className="text-slate-300">
                Show synthetic SEBI records with real official links, run the 12-case test suite, and present limitations.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
