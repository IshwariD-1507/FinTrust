import React from 'react';
import { ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';
import { OFFICIAL_SEBI_RESOURCES } from '../data/sebi_demo_data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">FinTrust</span>
            </div>
            <p className="text-sm text-teal-400 font-medium">
              “Think critically. Verify independently.”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A transparent, rule-based screening prototype built for retail investors in India to evaluate financial influencer content, identify warning patterns, inspect disclosures, and cross-reference official SEBI records.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              <span>College Design Thinking Academic Project Prototype</span>
            </div>
          </div>

          {/* Col 2: Official SEBI Portals */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Official SEBI Resources
            </h3>
            <ul className="space-y-2 text-xs">
              {OFFICIAL_SEBI_RESOURCES.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    <span className="truncate max-w-[200px]">{item.title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Regulatory Scope & Ethics */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Ethical Standards
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated text rules cannot replace regulatory filings, financial due diligence, or SEBI inspections. Always inspect full prospectus documents on BSE and NSE before committing capital.
            </p>
            <div className="text-[11px] text-slate-500">
              Rule engine: v1.2.0 (Deterministic)
            </div>
          </div>

        </div>

        {/* Prominent Mandatory Academic & Legal Disclaimer */}
        <div className="pt-8 border-t border-slate-800">
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-amber-200">
                  Prototype Disclaimer & Educational Notice
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  FinTrust is an educational screening prototype developed for a college Design Thinking project. It is <strong>not</strong> officially affiliated with, endorsed by, or integrated into the Securities and Exchange Board of India (SEBI). It does not provide personalised investment advice, portfolio management, or a definitive determination of fraud or credibility. All sample influencers and demo registration records are synthetic placeholders.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              © 2026 FinTrust Project · College Design Thinking Initiative
            </div>
            <div className="flex items-center gap-3">
              <span>National Stock Exchange (NSE) & Bombay Stock Exchange (BSE) Data Reference</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
