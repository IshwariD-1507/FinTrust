import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { 
  OFFICIAL_SEBI_RESOURCES, 
  REGISTRATION_CATEGORIES_GUIDE, 
  SYNTHETIC_REGISTRATION_RECORDS 
} from '../data/sebi_demo_data';
import { SyntheticRegistrationRecord } from '../types';

interface SebiVerifyViewProps {
  initialSearchQuery?: string;
}

export const SebiVerifyView: React.FC<SebiVerifyViewProps> = ({ initialSearchQuery }) => {
  const [entityName, setEntityName] = useState(initialSearchQuery || '');
  const [regNumber, setRegNumber] = useState('');
  const [category, setCategory] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchedRecord, setMatchedRecord] = useState<SyntheticRegistrationRecord | null>(null);
  const [outcomeType, setOutcomeType] = useState<'demo_match' | 'no_demo_match' | 'unable_to_verify'>('no_demo_match');

  useEffect(() => {
    if (initialSearchQuery) {
      handleSearch(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const handleSearch = (nameToSearch?: string) => {
    const query = (nameToSearch !== undefined ? nameToSearch : entityName).trim().toLowerCase();
    const cleanReg = regNumber.trim().toLowerCase();

    if (!query && !cleanReg) {
      setOutcomeType('unable_to_verify');
      setMatchedRecord(null);
      setSearched(true);
      return;
    }

    setSearched(true);

    // Exact or carefully normalized matching against synthetic demo records
    const found = SYNTHETIC_REGISTRATION_RECORDS.find(rec => {
      const matchName = rec.exampleEntityName.toLowerCase() === query ||
        rec.exampleEntityName.toLowerCase().includes(query) && query.length >= 7;
      const matchId = cleanReg && (rec.demoId.toLowerCase() === cleanReg);
      return matchName || matchId;
    });

    if (found) {
      setMatchedRecord(found);
      setOutcomeType('demo_match');
    } else {
      setMatchedRecord(null);
      setOutcomeType('no_demo_match');
    }
  };

  const handleClear = () => {
    setEntityName('');
    setRegNumber('');
    setCategory('');
    setSearched(false);
    setMatchedRecord(null);
  };

  const handleTestDemoSample = (record: SyntheticRegistrationRecord) => {
    setEntityName(record.exampleEntityName);
    setRegNumber(record.demoId);
    setCategory(record.category);
    setMatchedRecord(record);
    setOutcomeType('demo_match');
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Scope explanation */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Regulatory Verification Reference
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">
          SEBI Registration Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          SEBI registration status depends on the specific regulated activity and entity category. Not every financial educator or market commentator falls into the same registration category. Genuine stock tips and individualized advice require explicit SEBI licensing.
        </p>
      </div>

      {/* Official SEBI Direct Links Card */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Official SEBI Databases (Primary Manual Verification Route)</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              FinTrust does not possess a live private API connection to SEBI servers. To authoritatively verify whether an individual or firm is currently licensed, inspect the official government registries below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {OFFICIAL_SEBI_RESOURCES.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-teal-300 group-hover:text-teal-200">
                  {res.title}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                {res.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Search Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Prototype Verification Query
            </h2>
            <p className="text-xs text-slate-500">
              Test entity lookups against the local synthetic demonstration dataset.
            </p>
          </div>

          {/* Quick Demo Pre-fills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium">Try synthetic demo:</span>
            {SYNTHETIC_REGISTRATION_RECORDS.map(rec => (
              <button
                key={rec.demoId}
                onClick={() => handleTestDemoSample(rec)}
                className="px-2 py-1 text-[11px] font-mono text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition-colors cursor-pointer"
              >
                {rec.demoId}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={e => { e.preventDefault(); handleSearch(); }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Name of Person or Entity <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={entityName}
                onChange={e => setEntityName(e.target.value)}
                placeholder="e.g. Example Research Entity"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registration Number <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={regNumber}
                onChange={e => setRegNumber(e.target.value)}
                placeholder="e.g. DEMO-REG-002 or INH..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category <span className="text-slate-400 font-normal">(if known)</span>
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors bg-white cursor-pointer"
              >
                <option value="">Any Category</option>
                <option value="Research Analyst">Research Analyst (RA)</option>
                <option value="Investment Adviser">Investment Adviser (IA)</option>
                <option value="Mutual Fund Distributor">Mutual Fund Distributor (MFD)</option>
                <option value="Content Creator">Educational Content Creator</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Records</span>
            </button>
          </div>
        </form>

        {/* Results Panel */}
        {searched && (
          <div className="pt-6 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Query Result
            </h3>

            {/* Outcome 1: Demo match found */}
            {outcomeType === 'demo_match' && matchedRecord && (
              <div className="p-5 rounded-xl border border-teal-200 bg-teal-50/50 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Demo Match Found in Prototype Dataset
                      </h4>
                      <span className="text-[11px] font-mono font-semibold text-teal-800">
                        Record ID: {matchedRecord.demoId} · {matchedRecord.datasetLabel}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded">
                    Synthetic Record
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-teal-100 text-xs space-y-1.5 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Entity Name:</span>
                    <strong className="text-slate-900">{matchedRecord.exampleEntityName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Demo Category:</span>
                    <span className="font-medium text-slate-900">{matchedRecord.category}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-500 italic border-t border-slate-100">
                    "{matchedRecord.fictionalNote}"
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-[11px]">
                    <strong>Important Demonstration Notice:</strong> This match is from FinTrust's synthetic prototype dataset. It is <em>not</em> a genuine SEBI verification. Always search the official SEBI directory to verify real individuals.
                  </p>
                </div>
              </div>
            )}

            {/* Outcome 2: No match in demo dataset */}
            {outcomeType === 'no_demo_match' && (
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      No Match Found in Local Prototype Dataset
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      No entry matching "{entityName || regNumber}" exists in the local synthetic demo records.
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed pt-1">
                      <strong>Note:</strong> A lack of match in this prototype dataset says nothing about the entity's actual regulatory status in India. Please check official government records below.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.sebi.gov.in/department/market-intermediaries-regulation-and-supervision-department-14/search-intm.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Search Official SEBI Intermediaries Database</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Outcome 3: Unable to verify */}
            {outcomeType === 'unable_to_verify' && (
              <div className="p-5 rounded-xl border border-amber-200 bg-amber-50 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-amber-950">
                      Unable to Verify (Missing Information)
                    </h4>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      Please enter a person/entity name or registration number to execute a search. Ambiguous or blank inputs cannot be checked.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Educational Guide: SEBI Regulatory Categories */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900">
          Understanding SEBI Intermediary Categories
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          In India, the Securities and Exchange Board of India enforces specific rules depending on what a creator does:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {REGISTRATION_CATEGORIES_GUIDE.map((cat, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 text-sm">{cat.name}</div>
              <div className="text-[11px] font-mono text-teal-800">{cat.regulations}</div>
              <p className="text-slate-600 leading-relaxed">{cat.scope}</p>
              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-700 font-semibold">
                Key Rule: {cat.keyRule}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
