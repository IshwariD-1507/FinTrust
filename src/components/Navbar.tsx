import React, { useState } from 'react';
import { ShieldCheck, User as UserIcon, LogOut, Bookmark, Menu, X, ExternalLink } from 'lucide-react';
import { User } from '../types';

export type ActiveTab = 
  | 'landing' 
  | 'dashboard' 
  | 'analyse' 
  | 'results' 
  | 'sebi_verify' 
  | 'history' 
  | 'rule_testing' 
  | 'learn' 
  | 'saved_reports';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onDemoLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
  onDemoLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analyse', label: 'Analyse Post' },
    { id: 'sebi_verify', label: 'SEBI Verification' },
    { id: 'history', label: 'Finfluencer History' },
    { id: 'rule_testing', label: 'Rule Testing' },
    { id: 'learn', label: 'Learn & Verify' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate(currentUser ? 'dashboard' : 'landing')}
              className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-teal-400 group-hover:bg-slate-800 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                  FinTrust
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-normal mt-0.5">
                  Credibility Checker
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single-line, clean typography) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 font-semibold border-b-2 border-teal-600 -mb-0.5'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: User State & Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('saved_reports')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    activeTab === 'saved_reports'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title="View your saved analysis reports"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">Saved Reports</span>
                </button>

                <div className="h-4 w-px bg-slate-200" />

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-semibold">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 max-w-[120px] truncate leading-tight">
                      {currentUser.fullName}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight">
                      {currentUser.isDemoUser ? 'Demo Account' : 'Verified Student'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onDemoLogin}
                  className="px-3 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  Try Demo
                </button>
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {!currentUser && (
              <button
                onClick={onDemoLogin}
                className="px-2.5 py-1 text-xs font-medium text-teal-800 bg-teal-50 border border-teal-200 rounded-md whitespace-nowrap"
              >
                Demo
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === link.id
                  ? 'bg-slate-100 text-slate-950 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          {currentUser ? (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  onNavigate('saved_reports');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md"
              >
                <Bookmark className="w-4 h-4" />
                Saved Reports
              </button>
              <div className="px-3 py-2 flex items-center justify-between text-xs text-slate-500">
                <span>Signed in as {currentUser.fullName}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-600 font-medium hover:underline"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-semibold text-white bg-slate-900 rounded-md"
              >
                Sign In / Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
