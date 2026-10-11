import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { AnalyseView } from './views/AnalyseView';
import { ResultsView } from './views/ResultsView';
import { SebiVerifyView } from './views/SebiVerifyView';
import { FinfluencerHistoryView } from './views/FinfluencerHistoryView';
import { RuleTestingView } from './views/RuleTestingView';
import { LearnVerifyView } from './views/LearnVerifyView';
import { SavedReportsView } from './views/SavedReportsView';
import { getCurrentUser, loginAsDemoGuest, logoutUser } from './services/auth';
import { 
  deleteUserReport, 
  getUserAnalysisCount, 
  getUserSavedReports, 
  incrementUserAnalysisCount, 
  saveUserReport 
} from './services/storage';
import { analyzePostText } from './services/ruleEngine';
import { AnalysisResult, ContentType, Platform, SavedReport, User } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentUser());
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => currentUser ? 'dashboard' : 'landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Analysis State
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [sebiSearchQuery, setSebiSearchQuery] = useState<string>('');

  // User Data State
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [analysisCount, setAnalysisCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync user data on change or login
  useEffect(() => {
    if (currentUser) {
      let reports = getUserSavedReports(currentUser.id);
      let count = getUserAnalysisCount(currentUser.id);

      // Seed initial demo reports if this is the student demo user and storage is empty
      if (currentUser.isDemoUser && reports.length === 0) {
        const demoAnalysis1 = analyzePostText(
          'Buy XYZ today! Guaranteed 30% returns in one month with zero risk.',
          'Telegram',
          'stock recommendation',
          'AlphaTraderRaj (Synthetic Demo)'
        );
        const demoAnalysis2 = analyzePostText(
          'This video is sponsored by ABC Financial Education. Investing involves risk, and returns are not guaranteed.',
          'YouTube',
          'educational content',
          'FinanceWithPriya (Synthetic Demo)'
        );
        const r1 = saveUserReport(currentUser.id, demoAnalysis1, 'Sample guaranteed return test case');
        const r2 = saveUserReport(currentUser.id, demoAnalysis2, 'Sample sponsored education test case');
        reports = [r1, r2];
        count = 2;
        incrementUserAnalysisCount(currentUser.id);
        incrementUserAnalysisCount(currentUser.id);
      }

      setSavedReports(reports);
      setAnalysisCount(count);
    } else {
      setSavedReports([]);
      setAnalysisCount(0);
    }
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = () => {
    handleNavigate('analyse');
  };

  const handleTryDemo = () => {
    const demoUser = loginAsDemoGuest();
    setCurrentUser(demoUser);
    handleNavigate('dashboard');
    showToast('Logged in as Demo Student. Sample records loaded.');
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    handleNavigate('dashboard');
    showToast(`Welcome, ${user.fullName}`);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setCurrentAnalysis(null);
    handleNavigate('landing');
    showToast('Signed out successfully.');
  };

  const handleAnalyze = (
    postText: string,
    platform: Platform,
    contentType: ContentType,
    influencerName?: string,
    postUrl?: string
  ) => {
    const result = analyzePostText(postText, platform, contentType, influencerName, postUrl);
    setCurrentAnalysis(result);

    if (currentUser) {
      const updatedCount = incrementUserAnalysisCount(currentUser.id);
      setAnalysisCount(updatedCount);
    }

    handleNavigate('results');
  };

  const handleSaveReport = (analysis: AnalysisResult) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    const saved = saveUserReport(currentUser.id, analysis);
    setSavedReports(prev => [saved, ...prev]);
    showToast('Analysis report saved to your profile.');
  };

  const handleDeleteReport = (reportId: string) => {
    if (!currentUser) return;
    deleteUserReport(currentUser.id, reportId);
    setSavedReports(prev => prev.filter(r => r.id !== reportId));
    showToast('Report deleted.');
  };

  const handleOpenSavedReport = (report: SavedReport) => {
    setCurrentAnalysis(report.analysis);
    handleNavigate('results');
  };

  const handleVerifyCreator = (influencerName?: string) => {
    if (influencerName) {
      setSebiSearchQuery(influencerName);
    }
    handleNavigate('sebi_verify');
  };

  const isCurrentAnalysisSaved = !!(
    currentAnalysis &&
    currentUser &&
    savedReports.some(r => r.analysis.id === currentAnalysis.id || r.analysis.postText === currentAnalysis.postText)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-150">
          {toastMessage}
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onDemoLogin={handleTryDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingView
            onNavigate={handleNavigate}
            onTryDemo={handleTryDemo}
            onStartAnalysis={handleStartAnalysis}
          />
        )}

        {activeTab === 'dashboard' && (
          currentUser ? (
            <DashboardView
              currentUser={currentUser}
              savedReports={savedReports}
              analysisCount={analysisCount}
              onNavigate={handleNavigate}
              onSelectReport={handleOpenSavedReport}
            />
          ) : (
            <LandingView
              onNavigate={handleNavigate}
              onTryDemo={handleTryDemo}
              onStartAnalysis={handleStartAnalysis}
            />
          )
        )}

        {activeTab === 'analyse' && (
          <AnalyseView onAnalyze={handleAnalyze} />
        )}

        {activeTab === 'results' && currentAnalysis && (
          <ResultsView
            analysis={currentAnalysis}
            currentUser={currentUser}
            onSaveReport={handleSaveReport}
            isSaved={isCurrentAnalysisSaved}
            onBackToAnalyse={() => handleNavigate('analyse')}
            onVerifyRegistration={handleVerifyCreator}
          />
        )}

        {activeTab === 'results' && !currentAnalysis && (
          <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
            <h2 className="text-lg font-bold text-slate-800">No post currently analysed</h2>
            <p className="text-xs text-slate-500">
              Submit a post or choose a synthetic benchmark to see screening results.
            </p>
            <button
              onClick={() => handleNavigate('analyse')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg"
            >
              Go to Analyse Post
            </button>
          </div>
        )}

        {activeTab === 'sebi_verify' && (
          <SebiVerifyView initialSearchQuery={sebiSearchQuery} />
        )}

        {activeTab === 'history' && (
          <FinfluencerHistoryView />
        )}

        {activeTab === 'rule_testing' && (
          <RuleTestingView
            onInspectResult={(analysis) => {
              setCurrentAnalysis(analysis);
              handleNavigate('results');
            }}
          />
        )}

        {activeTab === 'learn' && (
          <LearnVerifyView />
        )}

        {activeTab === 'saved_reports' && (
          currentUser ? (
            <SavedReportsView
              currentUser={currentUser}
              savedReports={savedReports}
              onOpenReport={handleOpenSavedReport}
              onDeleteReport={handleDeleteReport}
              onNavigateToAnalyse={() => handleNavigate('analyse')}
            />
          ) : (
            <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
              <h2 className="text-lg font-bold text-slate-800">Sign in to view saved reports</h2>
              <p className="text-xs text-slate-500">
                Create an account or use Demo Student mode to save and review screening reports.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleTryDemo}
                  className="px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg"
                >
                  Try Demo
                </button>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg"
                >
                  Sign In
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Authentication Modal */}
      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

    </div>
  );
}
