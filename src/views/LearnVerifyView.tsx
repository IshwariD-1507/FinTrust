import React from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Info,
  Scale,
  FileCheck,
  TrendingDown,
  Clock
} from 'lucide-react';
import { OFFICIAL_SEBI_RESOURCES, REGISTRATION_CATEGORIES_GUIDE } from '../data/sebi_demo_data';

export const LearnVerifyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Title */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Investor Protection & Education Guide
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">
          Learn & Verify
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          A guide for beginner and retail investors in India to navigate social media financial content, spot deceptive claims, understand SEBI regulations, and verify claims independently.
        </p>
      </div>

      {/* Official SEBI Reference Strip */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Official SEBI Investor Education Resources</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              SEBI provides dedicated statutory guides for investor protection. Check official government resources:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {OFFICIAL_SEBI_RESOURCES.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors flex items-center justify-between group text-xs"
            >
              <span className="font-semibold text-teal-300 group-hover:text-teal-200 truncate">
                {item.title}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>

      {/* Section 1: Guaranteed or Unusually High Returns */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-rose-700">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-900">
            1. Guaranteed or Unusually High Returns
          </h2>
        </div>

        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            In regulated capital markets, returns are fundamentally tied to risk. Fixed deposits, government bonds, and treasury bills offer predictable yields precisely because the principal is backed by the state or regulated banking reserves. Equity shares and derivative contracts (options/futures) have <strong>zero guaranteed return</strong>.
          </p>
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-950 font-medium">
            <strong>Key SEBI Rule:</strong> Under SEBI regulations, no registered market intermediary (including brokers, Research Analysts, or Portfolio Managers) is permitted to promise fixed or assured returns on equity investments. Any entity promising "assured 30% monthly" or "risk-free options trading" operates outside regulatory norms.
          </div>
          <p>
            When an influencer uses phrases like <em>"double your capital in 15 days"</em> or <em>"zero risk profit"</em>, treat this as a critical warning sign requiring immediate skepticism.
          </p>
        </div>
      </section>

      {/* Section 2: Pressure and Urgency Tactics (FOMO) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-amber-700">
          <Clock className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-900">
            2. Pressure and Urgency Tactics
          </h2>
        </div>

        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Manipulative marketing frequently relies on manufactured FOMO (Fear Of Missing Out). Influencers use urgency to short-circuit the investor's natural critical faculties:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Artificial Countdowns:</strong> "Buy XYZ before 9:15 AM tomorrow or you'll miss the rally."</li>
            <li><strong>Exclusive Scarcity:</strong> "Only 5 seats left in my VIP Telegram channel."</li>
            <li><strong>Social Proof Escalation:</strong> Showing unverified screenshots of brokerage profits from past trades to induce panic.</li>
          </ul>
          <p>
            Sound investment theses depend on business fundamentals that compound over quarters and years. Genuine opportunities do not expire in 10 minutes.
          </p>
        </div>
      </section>

      {/* Section 3: Sponsorship and Affiliate Disclosures */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-teal-700">
          <FileCheck className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-900">
            3. Commercial Disclosures & Affiliate Links
          </h2>
        </div>

        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Many creators recommend brokerage accounts, trading platforms, algorithmic bots, or courses because they receive a financial commission for each user registration (affiliate marketing) or fixed sponsorship fees.
          </p>
          <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-950 space-y-1.5">
            <div className="font-bold">What disclosures tell you:</div>
            <p className="text-[11px] leading-relaxed">
              A disclosure statement (e.g. <em>"Sponsored by ABC Broker"</em>, <em>"Paid partnership"</em>, or <em>"I earn a commission through this affiliate link"</em>) proves transparency about commercial ties. However, <strong>disclosure is not validation</strong>: it tells you the creator has a financial incentive, not that their recommendation is safe or appropriate for your portfolio.
            </p>
          </div>
          <p>
            Conversely, if a user pastes only a short quote without disclosure text, it does not prove the creator hid the disclosure — the disclaimer may exist in the video description or platform tag.
          </p>
        </div>
      </section>

      {/* Section 4: Education vs Promotion vs Personalised Advice */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-700">
          <Scale className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-900">
            4. Education vs. Promotion vs. Personalised Advice
          </h2>
        </div>

        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Understanding the legal boundary between financial education and financial advice is essential:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">1. Genuine Education</strong>
              <p className="text-[11px] text-slate-500">
                Explaining how price-to-earnings ratios work, how index funds track the Nifty 50, or reading a cash flow statement. Free or paid conceptual teaching does not require SEBI registration.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">2. Research Analyst (RA)</strong>
              <p className="text-[11px] text-slate-500">
                Publishing price targets, valuation models, or buy/sell calls on specific stocks to the public. Governed by SEBI (Research Analysts) Regulations, 2014.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-semibold">3. Investment Adviser (IA)</strong>
              <p className="text-[11px] text-slate-500">
                Giving individualized advice tailored to a specific client's income, risk appetite, and goals. Must be fee-only under SEBI (Investment Advisers) Regulations, 2013.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Independent Verification of Claims */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-900">
            5. Independent Verification Checklist
          </h2>
        </div>

        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            Before taking any financial action based on social media content, complete these four independent steps:
          </p>

          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Check Official Exchange Disclosures:</strong> Search company announcements and quarterly results directly on BSE (<em>bseindia.com</em>) or NSE (<em>nseindia.com</em>).
            </li>
            <li>
              <strong>Inspect Audited Annual Reports:</strong> Look at revenue growth, debt obligations, and auditor notes in the original PDF filings, not influencer summaries.
            </li>
            <li>
              <strong>Cross-check SEBI Registration:</strong> Search the influencer or advisory firm on the official SEBI Intermediaries database.
            </li>
            <li>
              <strong>Avoid Unregistered Telegram / WhatsApp Groups:</strong> Never wire funds to individuals promising to trade on your behalf via private chat groups.
            </li>
          </ol>
        </div>
      </section>

      {/* Section 6: Limitations of Automated Text Screening */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-800">
          <Info className="w-5 h-5 shrink-0" />
          <h2 className="text-lg font-bold text-slate-900">
            6. Limitations of Automated Text Screening
          </h2>
        </div>

        <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
          <p>
            FinTrust is a rule-based educational prototype. Retail investors must recognize what automated screening can and cannot do:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Screening text ≠ Proving truth:</strong> A creator may use completely compliant language while recommending a financially distressed company.</li>
            <li><strong>Keyword limitations:</strong> Subtle sarcasm, indirect metaphors, and spoken audio in regional languages (Hindi, Tamil, Marathi, etc.) might bypass keyword rules.</li>
            <li><strong>Educational disclaimers:</strong> Fraudulent schemes often paste boilerplates like "for educational purposes only" to evade detection. Boilerplates do not legalize illegal stock tips.</li>
          </ul>
        </div>
      </section>

    </div>
  );
};
