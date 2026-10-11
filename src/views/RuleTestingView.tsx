import React, { useState } from 'react';
import { 
  TestTube, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Play, 
  RotateCcw, 
  Filter, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import samplePostsData from '../data/sample_posts.json';
import { analyzePostText } from '../services/ruleEngine';
import { AnalysisResult, SyntheticSamplePost } from '../types';

const SAMPLE_POSTS: SyntheticSamplePost[] = samplePostsData as SyntheticSamplePost[];

interface TestResultItem {
  sample: SyntheticSamplePost;
  actualAnalysis: AnalysisResult;
  actualRuleIds: string[];
  missingRules: string[];
  unexpectedRules: string[];
  rulesMatch: boolean;
  outcomeMatch: boolean;
  testPassed: boolean;
}

interface RuleTestingViewProps {
  onInspectResult: (analysis: AnalysisResult) => void;
}

export const RuleTestingView: React.FC<RuleTestingViewProps> = ({ onInspectResult }) => {
  const [filterState, setFilterState] = useState<'all' | 'passed' | 'failed'>('all');

  // Dynamically execute the live rule engine on all 12 benchmark sample posts
  const evaluateSuite = (): TestResultItem[] => {
    return SAMPLE_POSTS.map(sample => {
      const actualAnalysis = analyzePostText(sample.content, sample.platform);
      const actualRuleIds = actualAnalysis.triggeredRules.map(tr => tr.rule.code);

      const missingRules = sample.expected_rule_ids.filter(id => !actualRuleIds.includes(id));
      const unexpectedRules = actualRuleIds.filter(id => !sample.expected_rule_ids.includes(id));

      const rulesMatch = missingRules.length === 0 && unexpectedRules.length === 0;
      const outcomeMatch = actualAnalysis.outcome === sample.expected_result;
      const testPassed = rulesMatch && outcomeMatch;

      return {
        sample,
        actualAnalysis,
        actualRuleIds,
        missingRules,
        unexpectedRules,
        rulesMatch,
        outcomeMatch,
        testPassed
      };
    });
  };

  const testResults = evaluateSuite();

  // Aggregate Metrics (Dynamically calculated, never hardcoded)
  const totalTests = testResults.length;
  const passingTests = testResults.filter(t => t.testPassed).length;
  const failingTests = testResults.filter(t => !t.testPassed).length;
  const passRate = totalTests > 0 ? ((passingTests / totalTests) * 100).toFixed(1) : '0';

  const filteredItems = testResults.filter(item => {
    if (filterState === 'passed') return item.testPassed;
    if (filterState === 'failed') return !item.testPassed;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Header */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Automated Verification & Benchmark Suite
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">
          Rule Testing and Dataset Evaluation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
          Executes the deterministic rule engine against 12 benchmark synthetic test cases (DEMO01–DEMO12). Compares expected vs. actual rule activations, flags discrepancies, and reports live pass rates.
        </p>
      </div>

      {/* Aggregate Test Summary Strip (Tabular metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Total Benchmark Tests</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {totalTests}
          </div>
          <div className="text-[11px] text-slate-400">
            DEMO01 through DEMO12
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Passing Test Cases</div>
          <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums">
            {passingTests}
          </div>
          <div className="text-[11px] text-emerald-600">
            Exact rule & outcome matches
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Failing Test Cases</div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${failingTests > 0 ? 'text-rose-700' : 'text-slate-400'}`}>
            {failingTests}
          </div>
          <div className="text-[11px] text-slate-400">
            Discrepancies flagged for tuning
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-1 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Overall Suite Pass Rate</div>
          <div className="text-2xl font-bold text-teal-700 font-mono tabular-nums">
            {passRate}%
          </div>
          <div className="text-[11px] text-slate-400">
            Dynamically evaluated
          </div>
        </div>

      </div>

      {/* Evaluation Academic Notice */}
      <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
          <Info className="w-4 h-4 shrink-0" />
          <span>Evaluation Methodology Notice</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          High test performance on this synthetic dataset demonstrates that the deterministic keyword and regular expression matchers operate consistently with their specifications. It <strong>does not</strong> establish real-world accuracy on nuanced, disguised, or unstandardized social media posts, nor does it constitute validated fraud detection.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Filter Results:</span>
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => setFilterState('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterState === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalTests})
            </button>
            <button
              onClick={() => setFilterState('passed')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterState === 'passed' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Passed ({passingTests})
            </button>
            <button
              onClick={() => setFilterState('failed')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterState === 'failed' ? 'bg-white text-rose-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Failed ({failingTests})
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing {filteredItems.length} of {totalTests} test cases
        </div>
      </div>

      {/* Test Cases List */}
      <div className="space-y-3">
        {filteredItems.map(item => {
          const pass = item.testPassed;
          const sample = item.sample;

          return (
            <div
              key={sample.post_id}
              className={`bg-white p-5 rounded-xl border transition-all space-y-3 shadow-xs ${
                pass ? 'border-slate-200 hover:border-slate-300' : 'border-rose-300 bg-rose-50/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {pass ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-900">
                        {sample.post_id}
                      </span>
                      <span aria-hidden="true" className="text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{sample.platform}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                    pass ? 'text-emerald-800 bg-emerald-50 border-emerald-200' : 'text-rose-800 bg-rose-50 border-rose-200'
                  }`}>
                    {pass ? 'TEST PASSED' : 'TEST FAILED'}
                  </span>
                  <button
                    onClick={() => onInspectResult(item.actualAnalysis)}
                    className="px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                  >
                    View in Results →
                  </button>
                </div>
              </div>

              {/* Sample Content */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
                "{sample.content}"
              </div>

              {/* Expected vs Actual Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Expected Specification
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700">Outcome:</span>
                    <strong className="text-slate-900 font-mono">{sample.expected_result}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700">Expected Rules:</span>
                    <span className="font-mono text-slate-900 font-bold">
                      {sample.expected_rule_ids.join(', ')}
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border space-y-1 ${
                  pass ? 'border-slate-200 bg-white' : 'border-rose-200 bg-rose-50/40'
                }`}>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Actual Engine Execution
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700">Outcome:</span>
                    <strong className={`font-mono ${item.outcomeMatch ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {item.actualAnalysis.outcome}
                    </strong>
                    {item.outcomeMatch && <span className="text-emerald-600 text-[10px]">✓ match</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700">Triggered Rules:</span>
                    <span className={`font-mono font-bold ${item.rulesMatch ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {item.actualRuleIds.join(', ') || 'None'}
                    </span>
                    {item.rulesMatch && <span className="text-emerald-600 text-[10px]">✓ match</span>}
                  </div>
                </div>

              </div>

              {/* Failure Diagnostics if test failed */}
              {!pass && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                  {item.missingRules.length > 0 && (
                    <div>
                      <strong>Missing Rules:</strong> {item.missingRules.join(', ')} were expected but not triggered.
                    </div>
                  )}
                  {item.unexpectedRules.length > 0 && (
                    <div>
                      <strong>Unexpected Rules:</strong> {item.unexpectedRules.join(', ')} were triggered unexpectedly.
                    </div>
                  )}
                  {!item.outcomeMatch && (
                    <div>
                      <strong>Outcome Mismatch:</strong> Expected {sample.expected_result} but got {item.actualAnalysis.outcome}.
                    </div>
                  )}
                </div>
              )}

              {/* Rationale description */}
              <div className="text-[11px] text-slate-500 pt-1">
                <strong className="text-slate-600">Test Rationale:</strong> {sample.explanation}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
