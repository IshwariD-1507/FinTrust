import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  ChevronDown, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ContentType, Platform, SyntheticSamplePost } from '../types';
import samplePostsData from '../data/sample_posts.json';

const SAMPLE_POSTS: SyntheticSamplePost[] = samplePostsData as SyntheticSamplePost[];

interface AnalyseViewProps {
  onAnalyze: (
    postText: string,
    platform: Platform,
    contentType: ContentType,
    influencerName?: string,
    postUrl?: string
  ) => void;
}

export const AnalyseView: React.FC<AnalyseViewProps> = ({ onAnalyze }) => {
  const [influencerName, setInfluencerName] = useState('');
  const [platform, setPlatform] = useState<Platform>('YouTube');
  const [postUrl, setPostUrl] = useState('');
  const [contentType, setContentType] = useState<ContentType>('stock recommendation');
  const [postText, setPostText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [exampleModalOpen, setExampleModalOpen] = useState(false);
  const [selectedExampleId, setSelectedExampleId] = useState<string | null>(null);

  const handleClear = () => {
    setInfluencerName('');
    setPlatform('YouTube');
    setPostUrl('');
    setContentType('educational content');
    setPostText('');
    setError(null);
    setSelectedExampleId(null);
  };

  const handleSelectExample = (sample: SyntheticSamplePost) => {
    setPostText(sample.content);
    setPlatform(sample.platform);
    setSelectedExampleId(sample.post_id);
    
    // contextual mapping
    if (sample.post_id === 'DEMO01' || sample.post_id === 'DEMO06' || sample.post_id === 'DEMO11') {
      setContentType('stock recommendation');
      setInfluencerName('Simulated Stock Channel (Demo)');
    } else if (sample.post_id === 'DEMO03' || sample.post_id === 'DEMO08') {
      setContentType('trading advice');
      setInfluencerName('Simulated Telegram Guru (Demo)');
    } else if (sample.post_id === 'DEMO02' || sample.post_id === 'DEMO07' || sample.post_id === 'DEMO10' || sample.post_id === 'DEMO12') {
      setContentType('educational content');
      setInfluencerName('Simulated Finance Educator (Demo)');
    } else {
      setContentType('course promotion');
      setInfluencerName('Simulated Affiliate Creator (Demo)');
    }

    setExampleModalOpen(false);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) {
      setError('Please provide the financial post text to analyse.');
      return;
    }
    setError(null);
    onAnalyze(postText, platform, contentType, influencerName, postUrl);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Rule-Based Text Screening Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">
          Analyse a Financial Post
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Paste text from YouTube video descriptions, Instagram reels, Telegram messages, or X threads. The engine tests against rules R1 through R7 deterministically.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        {/* Preset Selector Banner */}
        <div className="mb-6 p-4 rounded-lg bg-teal-50/60 border border-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Looking for quick test cases?</span>
            </div>
            <p className="text-[11px] text-teal-800">
              Load one of 12 benchmark synthetic sample posts (guaranteed returns, disclosures, educational, urgency).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExampleModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-teal-900 bg-white hover:bg-teal-100/50 border border-teal-200 rounded-md transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            Load Example Post ({SAMPLE_POSTS.length} available)
          </button>
        </div>

        {selectedExampleId && (
          <div className="mb-4 px-3 py-1.5 rounded-md bg-slate-100 text-xs text-slate-700 flex items-center justify-between">
            <span>
              Loaded Benchmark Case: <strong className="font-mono">{selectedExampleId}</strong> (Synthetic demo post)
            </span>
            <button
              onClick={() => setSelectedExampleId(null)}
              className="text-slate-400 hover:text-slate-700 text-[11px]"
            >
              Clear selection
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Grid of secondary inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Influencer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Influencer or Channel Name <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={influencerName}
                onChange={e => setInfluencerName(e.target.value)}
                placeholder="e.g. TradeMaster Hindi, StockTips24"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Social Media Platform <span className="text-rose-500">*</span>
              </label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value as Platform)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors bg-white cursor-pointer"
              >
                <option value="YouTube">YouTube</option>
                <option value="Instagram">Instagram</option>
                <option value="Telegram">Telegram</option>
                <option value="X">X (Twitter)</option>
                <option value="Other">Other Platform</option>
              </select>
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Content Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={contentType}
                onChange={e => setContentType(e.target.value as ContentType)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors bg-white cursor-pointer"
              >
                <option value="educational content">Educational Content</option>
                <option value="stock recommendation">Stock Recommendation</option>
                <option value="trading advice">Trading / Options Advice</option>
                <option value="sponsored content">Sponsored Brand Promotion</option>
                <option value="course promotion">Course / Masterclass Promotion</option>
                <option value="other">Other Content Type</option>
              </select>
            </div>

            {/* Post URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Post URL <span className="text-slate-400 font-normal">(optional metadata)</span>
              </label>
              <input
                type="text"
                value={postUrl}
                onChange={e => setPostUrl(e.target.value)}
                placeholder="https://t.me/... or https://youtube.com/watch?v=..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors"
              />
            </div>

          </div>

          {/* Post Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Post Text Content <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                {postText.length} characters
              </span>
            </div>
            <textarea
              required
              rows={6}
              value={postText}
              onChange={e => setPostText(e.target.value)}
              placeholder="Paste the caption, video transcript, tweet text, or Telegram broadcast message here for screening..."
              className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-colors font-sans leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              FinTrust does not scrape external social URLs. Text is screened directly through deterministic rule logic.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClear}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Form</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Analyse Post</span>
            </button>
          </div>

        </form>

      </div>

      {/* Example Post Selection Modal */}
      {exampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Synthetic Benchmark Cases (DEMO01 – DEMO12)</h3>
                <p className="text-[11px] text-slate-500">
                  Select a synthetic test post to inspect actual rule triggers and explanations.
                </p>
              </div>
              <button
                onClick={() => setExampleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-2.5 divide-y divide-slate-100">
              {SAMPLE_POSTS.map(sample => {
                const expectedColor = 
                  sample.expected_result === 'RED' ? 'text-rose-700 bg-rose-50 border-rose-200' :
                  sample.expected_result === 'AMBER' ? 'text-amber-800 bg-amber-50 border-amber-200' :
                  'text-emerald-800 bg-emerald-50 border-emerald-200';

                return (
                  <div
                    key={sample.post_id}
                    onClick={() => handleSelectExample(sample)}
                    className="pt-2.5 first:pt-0 pb-1 hover:bg-slate-50 p-2.5 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">
                          {sample.post_id}
                        </span>
                        <span className="text-[10px] text-slate-400">·</span>
                        <span className="text-[11px] text-slate-500 font-medium">{sample.platform}</span>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${expectedColor}`}>
                        Expected {sample.expected_result}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 italic line-clamp-2 mb-1">
                      "{sample.content}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Expected rules: {sample.expected_rule_ids.join(', ')}</span>
                      <span className="text-teal-700 font-semibold group-hover:underline">Load this case →</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 text-right">
              <button
                onClick={() => setExampleModalOpen(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
