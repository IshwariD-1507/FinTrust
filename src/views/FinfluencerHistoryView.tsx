import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  Building2,
  Calendar,
  X,
  MessageSquare,
  TrendingUp,
  Tag
} from 'lucide-react';
import { 
  SYNTHETIC_HISTORICAL_POSTS, 
  SYNTHETIC_PROFILES 
} from '../data/finfluencer_history_data';
import { 
  FinfluencerProfile, 
  HistoricalPostRecord, 
  Platform, 
  PredictionRecord, 
  ScreeningOutcome 
} from '../types';

export const FinfluencerHistoryView: React.FC = () => {
  const [profiles, setProfiles] = useState<FinfluencerProfile[]>(SYNTHETIC_PROFILES);
  const [posts, setPosts] = useState<HistoricalPostRecord[]>(SYNTHETIC_HISTORICAL_POSTS);

  const [selectedProfileId, setSelectedProfileId] = useState<string>(SYNTHETIC_PROFILES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Filters
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [warningFilter, setWarningFilter] = useState<string>('all');
  const [disclosureFilter, setDisclosureFilter] = useState<string>('all');
  const [predictionFilter, setPredictionFilter] = useState<string>('all');

  // Detail Modal
  const [selectedPost, setSelectedPost] = useState<HistoricalPostRecord | null>(null);

  // Correction Form Modal State
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionNote, setCorrectionNote] = useState('');
  const [correctionAuthor, setCorrectionAuthor] = useState('');
  const [correctionSaved, setCorrectionSaved] = useState(false);

  // Selected profile
  const activeProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];

  // Filter posts for active profile
  const profilePosts = posts.filter(p => p.influencerId === activeProfile.id);

  // Apply filters
  const filteredPosts = profilePosts.filter(p => {
    if (searchQuery.trim() && !p.capturedText.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (platformFilter !== 'all' && p.platform !== platformFilter) {
      return false;
    }
    if (warningFilter === 'warning' && p.outcome === 'GREEN') {
      return false;
    }
    if (warningFilter === 'high' && p.outcome !== 'RED') {
      return false;
    }
    if (warningFilter === 'none' && p.outcome !== 'GREEN') {
      return false;
    }
    if (disclosureFilter === 'detected' && p.disclosureStatus !== 'detected') {
      return false;
    }
    if (disclosureFilter === 'not_detected' && p.disclosureStatus !== 'not_detected_in_text') {
      return false;
    }
    if (predictionFilter !== 'all') {
      const hasPred = p.predictions && p.predictions.some(pr => pr.status === predictionFilter);
      if (!hasPred) return false;
    }
    return true;
  });

  // Calculate actual profile summary figures directly from stored records
  const totalPostsReviewed = profilePosts.length;
  const postsWithWarnings = profilePosts.filter(p => p.outcome === 'RED' || p.outcome === 'AMBER').length;
  const postsWithDisclosures = profilePosts.filter(p => p.disclosureStatus === 'detected').length;

  // Flatten predictions for this profile
  const allPredictions: { post: HistoricalPostRecord; pred: PredictionRecord }[] = [];
  profilePosts.forEach(post => {
    if (post.predictions) {
      post.predictions.forEach(pred => {
        allPredictions.push({ post, pred });
      });
    }
  });

  const verifiedClaims = allPredictions.filter(item => item.pred.status === 'outcome_verified').length;
  const contradictedClaims = allPredictions.filter(item => item.pred.status === 'contradicted').length;
  const pendingClaims = allPredictions.filter(item => item.pred.status === 'pending').length;
  const inconclusiveClaims = allPredictions.filter(item => item.pred.status === 'inconclusive').length;

  const handleAddCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !correctionNote.trim()) return;

    const newCorrection = {
      date: new Date().toISOString().split('T')[0],
      note: correctionNote.trim(),
      submittedBy: correctionAuthor.trim() || 'Auditor_User'
    };

    const updatedPosts = posts.map(item => {
      if (item.id === selectedPost.id) {
        const history = item.correctionHistory ? [...item.correctionHistory] : [];
        history.unshift(newCorrection);
        return { ...item, correctionHistory: history };
      }
      return item;
    });

    setPosts(updatedPosts);
    setSelectedPost(prev => prev ? {
      ...prev,
      correctionHistory: [newCorrection, ...(prev.correctionHistory || [])]
    } : null);

    setCorrectionSaved(true);
    setTimeout(() => {
      setCorrectionSaved(false);
      setCorrectionModalOpen(false);
      setCorrectionNote('');
      setCorrectionAuthor('');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Concept Overview */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Historical Auditing & Transparency
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">
          Finfluencer History & Track Record
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
          Tracks documented historical financial posts, disclosure frequency, and past prediction outcomes over time. FinTrust does not generate speculative trust ratings; instead, it provides auditable evidence records with transparent correction logs.
        </p>
      </div>

      {/* Mandatory Demo Dataset Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Fictional Demonstration Profiles (Synthetic Records)</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The profiles and posts below are synthetic demo records created for college Design Thinking evaluation. No real Indian financial creators or living individuals are portrayed. All posts were screened through FinTrust's deterministic rule engine.
        </p>
      </div>

      {/* Profile Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profiles.map(profile => {
          const isSelected = profile.id === activeProfile.id;
          return (
            <div
              key={profile.id}
              onClick={() => setSelectedProfileId(profile.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer text-left space-y-2.5 ${
                isSelected
                  ? 'bg-white border-teal-600 shadow-sm ring-1 ring-teal-600'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 uppercase">
                  {profile.originBadge.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {profile.primaryPlatform}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">{profile.name}</h2>
                <div className="text-xs text-teal-700 font-medium">{profile.channelName}</div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {profile.bio}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono tabular-nums">
                <span>{profile.recordCount} sample posts</span>
                <span>{profile.coverageStartDate.substring(0, 7)} ~ {profile.coverageEndDate.substring(0, 7)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Profile Summary Metrics Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{activeProfile.name}</h2>
              <span className="text-xs font-mono text-slate-500">({activeProfile.channelName})</span>
            </div>
            <p className="text-xs text-slate-600 max-w-2xl">
              {activeProfile.bio}
            </p>
            <div className="pt-1 text-[11px] text-amber-800 font-medium">
              {activeProfile.isIncompleteNotice}
            </div>
          </div>

          <a
            href={activeProfile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors self-start shrink-0"
          >
            <span>Simulated Channel Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Section D: Profile Summary Metrics (Calculated from actual stored records) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] text-slate-500 font-medium">Historical Posts Reviewed</div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {totalPostsReviewed}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Sample size in database
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] text-slate-500 font-medium">Posts With Warning Patterns</div>
            <div className="text-2xl font-bold text-rose-700 font-mono tabular-nums">
              {postsWithWarnings}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Triggered R1, R2, R3, or R4
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] text-slate-500 font-medium">Disclosure Language Detected</div>
            <div className="text-2xl font-bold text-teal-700 font-mono tabular-nums">
              {postsWithDisclosures}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Disclosed sponsorship / affiliate
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] text-slate-500 font-medium">Coverage Time Period</div>
            <div className="text-sm font-bold text-slate-900 font-mono pt-1">
              {activeProfile.coverageStartDate} to {activeProfile.coverageEndDate}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Discrete archive period
            </div>
          </div>

        </div>

        {/* Prediction Outcomes Mini-Breakdown */}
        {allPredictions.length > 0 && (
          <div className="p-4 rounded-lg bg-slate-100/70 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-teal-700" />
                <span>Identified Financial Predictions Track Record ({allPredictions.length} Assessed)</span>
              </span>
              <span className="text-[11px] text-slate-500">Evaluated against documented timeline</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
              <span className="text-emerald-700 font-bold">
                ✓ Verified: {verifiedClaims}
              </span>
              <span>·</span>
              <span className="text-rose-700 font-bold">
                ✕ Contradicted: {contradictedClaims}
              </span>
              <span>·</span>
              <span className="text-amber-700 font-medium">
                ⏳ Ongoing/Pending: {pendingClaims}
              </span>
              <span>·</span>
              <span className="text-slate-500">
                ? Inconclusive: {inconclusiveClaims}
              </span>
            </div>
          </div>
        )}

        <div className="text-[11px] text-slate-400 italic">
          Transparency Standard: FinTrust does not calculate an arbitrary numerical credibility score. Always examine original public filings and registration records.
        </div>

      </div>

      {/* Filter Toolbar for Historical Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search within posts */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search historical post keywords..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
            />
          </div>

          {/* Filters dropdowns */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            
            {/* Warning filter */}
            <select
              value={warningFilter}
              onChange={e => setWarningFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Screening Outcomes</option>
              <option value="warning">Has Warning (RED or AMBER)</option>
              <option value="high">High-Priority Only (RED)</option>
              <option value="none">No Warning (GREEN)</option>
            </select>

            {/* Disclosure filter */}
            <select
              value={disclosureFilter}
              onChange={e => setDisclosureFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Disclosure States</option>
              <option value="detected">Disclosure Detected</option>
              <option value="not_detected">Not Detected in Text</option>
            </select>

            {/* Platform filter */}
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Platforms</option>
              <option value="YouTube">YouTube</option>
              <option value="Instagram">Instagram</option>
              <option value="Telegram">Telegram</option>
              <option value="X">X (Twitter)</option>
            </select>

            {/* Prediction status filter */}
            <select
              value={predictionFilter}
              onChange={e => setPredictionFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Prediction States</option>
              <option value="outcome_verified">Verified Outcome</option>
              <option value="contradicted">Contradicted</option>
              <option value="pending">Pending</option>
            </select>

          </div>

        </div>
      </div>

      {/* Historical Chronological Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-teal-700" />
            <span>Documented Historical Posts Timeline ({filteredPosts.length} Records)</span>
          </h2>
          <span className="text-xs text-slate-500">
            Click any entry to inspect evidence & correction history
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
            No historical records match the active filter criteria.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map(post => {
              const outcomeBadge = 
                post.outcome === 'RED' ? 'text-rose-700 bg-rose-50 border-rose-200' :
                post.outcome === 'AMBER' ? 'text-amber-800 bg-amber-50 border-amber-200' :
                'text-emerald-800 bg-emerald-50 border-emerald-200';

              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer space-y-3 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{post.id}</span>
                      <span aria-hidden="true" className="text-slate-400">·</span>
                      <span className="text-slate-600">{post.platform}</span>
                      <span aria-hidden="true" className="text-slate-400">·</span>
                      <span className="font-mono tabular-nums text-slate-500">
                        Published: {post.publicationDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${outcomeBadge}`}>
                        {post.outcome}
                      </span>
                      {post.disclosureStatus === 'detected' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200">
                          Disclosed
                        </span>
                      )}
                      {post.predictions && post.predictions.length > 0 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-indigo-800 bg-indigo-50 border border-indigo-200">
                          Prediction Logged
                        </span>
                      )}
                      {post.correctionHistory && post.correctionHistory.length > 0 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200">
                          {post.correctionHistory.length} Correction(s)
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-sans">
                    "{post.capturedText}"
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <span>Source: {post.sourceEvidence}</span>
                      <span>·</span>
                      <span>Rules: {post.matchedRuleIds.join(', ') || 'None'}</span>
                    </div>
                    <span className="text-teal-700 font-semibold group-hover:underline flex items-center gap-1 self-end sm:self-auto">
                      <span>Inspect Record</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Record Inspector Drawer / Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Historical Post Record</h3>
                  <span className="font-mono text-xs text-slate-500">{selectedPost.id}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Published on {selectedPost.publicationDate} · Platform: {selectedPost.platform}
                </p>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-5">
              
              {/* Captured Excerpt */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-700">Original Captured Text:</span>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
                  "{selectedPost.capturedText}"
                </div>
              </div>

              {/* Matched Rules and Analysis State */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                  <span className="text-slate-500 text-[11px]">Screening Outcome:</span>
                  <div className="font-bold text-slate-900">{selectedPost.outcome}</div>
                  <div className="text-[11px] text-slate-500">
                    Rule IDs: {selectedPost.matchedRuleIds.join(', ') || 'No warning patterns'}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                  <span className="text-slate-500 text-[11px]">Disclosure Status:</span>
                  <div className="font-bold text-slate-900 capitalize">
                    {selectedPost.disclosureStatus.replace(/_/g, ' ')}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Engine: {selectedPost.engineVersion}
                  </div>
                </div>
              </div>

              {/* Source Evidence */}
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-slate-700">Archived Source Evidence:</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px]">
                  {selectedPost.sourceEvidence} (Original URL: {selectedPost.postUrl})
                </p>
              </div>

              {/* Associated Prediction Tracker Details if present */}
              {selectedPost.predictions && selectedPost.predictions.length > 0 && (
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
                    <span>Identifiable Market Prediction Tracker</span>
                  </span>

                  {selectedPost.predictions.map(pred => (
                    <div key={pred.id} className="p-3 rounded-lg border border-indigo-100 bg-indigo-50/40 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-indigo-950 font-semibold">{pred.claim}</strong>
                        <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-900">
                          {pred.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 space-y-1">
                        <div><strong>Asset:</strong> {pred.asset} · <strong>Target:</strong> {pred.directionOrTarget}</div>
                        <div><strong>Stated Horizon:</strong> {pred.statedTimeHorizon} (Logged on {pred.predictionDate})</div>
                        <div className="pt-1 border-t border-indigo-100/80 text-indigo-900">
                          <strong>Outcome Assessment:</strong> {pred.evidenceUsed}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Transparent Correction History */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Transparent Correction History
                  </span>
                  <button
                    onClick={() => setCorrectionModalOpen(true)}
                    className="text-xs text-teal-700 font-semibold hover:underline"
                  >
                    + Submit a Correction Note
                  </button>
                </div>

                {(!selectedPost.correctionHistory || selectedPost.correctionHistory.length === 0) ? (
                  <p className="text-[11px] text-slate-400 italic">
                    No corrections have been submitted for this record.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedPost.correctionHistory.map((corr, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span>{corr.date}</span>
                          <span>Submitted by: {corr.submittedBy}</span>
                        </div>
                        <p className="text-slate-700">{corr.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Ethical Policy: Old analyses are preserved rather than silently overwritten.
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Submit Correction Form Modal */}
      {correctionModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900">Submit a Correction Note</h4>
              <button onClick={() => setCorrectionModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            {correctionSaved ? (
              <div className="p-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs text-slate-800 font-semibold">Correction appended to record audit trail.</p>
              </div>
            ) : (
              <form onSubmit={handleAddCorrection} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={correctionAuthor}
                    onChange={e => setCorrectionAuthor(e.target.value)}
                    placeholder="e.g. Student Auditor / Fact Checker"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correction Explanation & Context
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={correctionNote}
                    onChange={e => setCorrectionNote(e.target.value)}
                    placeholder="State what needs adjustment (e.g., disclosure was present in video description at 0:15)..."
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCorrectionModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                  >
                    Append Correction
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
