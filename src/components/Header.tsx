import React, { useState } from 'react';
import { MainNavTab, NotificationItem } from '../types';

interface HeaderProps {
  activeTab: MainNavTab;
  setActiveTab: (tab: MainNavTab) => void;
  onLaunchCampaign: () => void;
  onSaveDraft: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onLaunchCampaign,
  onSaveDraft,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [currentWorkspace, setCurrentWorkspace] = useState('DIG Infotech Solutions');
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [apiConnected, setApiConnected] = useState(true);

  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Google Ads API Synced',
      message: 'Account DIG Infotech (482-910-3301) verified and synced.',
      time: '2m ago',
      type: 'success',
      read: false,
    },
    {
      id: '2',
      title: 'Quality Score Boost',
      message: '3 RSA headlines reached 9.2/10 estimated quality score.',
      time: '15m ago',
      type: 'info',
      read: false,
    },
    {
      id: '3',
      title: 'ROAS Goal Exceeded',
      message: 'Projected ROAS for Q3 is 412% (+32% vs target).',
      time: '1h ago',
      type: 'success',
      read: true,
    },
  ];

  return (
    <header className="w-full h-16 px-3 sm:px-4 flex items-center justify-between overflow-hidden bg-slate-950 border-b border-slate-800 shrink-0 sticky top-0 z-30">
      {/* Left Branding & Hamburger Toggle */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Mobile Hamburger Toggle Button */}
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden flex items-center justify-center p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        )}

        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-bold text-lg shrink-0">
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <div className="leading-tight min-w-0">
            <h1 className="font-bold text-sm sm:text-base bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent truncate flex items-center">
              <span>AdSynthesize</span>
              <span className="text-indigo-400 font-extrabold text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded bg-indigo-950/80 border border-indigo-800/50 ml-1 shrink-0">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono-label tracking-tight hidden sm:block">NEURAL ADS WORKSTATION</p>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-slate-800 hidden md:block shrink-0" />

        {/* Workspace Dropdown */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate text-xs max-w-[100px] sm:max-w-[140px]">{currentWorkspace}</span>
            <span className="material-symbols-outlined text-sm text-slate-400 shrink-0">expand_more</span>
          </button>

          {isWorkspaceOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl p-1.5 z-50">
              <div className="px-2 py-1 text-[10px] font-mono-label text-slate-400 uppercase tracking-wider">
                Switch Workspace
              </div>
              {[
                { name: 'DIG Infotech Solutions', cid: '482-910-3301', active: true },
                { name: 'Apex E-Commerce Global', cid: '882-104-5519', active: false },
                { name: 'SaaS Scale Partner', cid: '119-402-9932', active: false },
              ].map((ws) => (
                <button
                  key={ws.cid}
                  onClick={() => {
                    setCurrentWorkspace(ws.name);
                    setIsWorkspaceOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-md text-xs flex items-center justify-between transition-colors ${
                    ws.name === currentWorkspace
                      ? 'bg-indigo-950/60 text-indigo-200 border border-indigo-800/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-medium text-slate-200">{ws.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono-label">CID: {ws.cid}</div>
                  </div>
                  {ws.name === currentWorkspace && (
                    <span className="material-symbols-outlined text-sm text-indigo-400">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs Center */}
      <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80">
        {[
          { id: 'campaigns', label: 'Campaign Builder', icon: 'campaign' },
          { id: 'reporting', label: 'Performance Analytics', icon: 'analytics' },
          { id: 'assets', label: 'Asset Library', icon: 'perm_media' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as MainNavTab)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white font-semibold border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-normal'
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-2">
        {/* Google Ads API status badge */}
        <button
          onClick={() => setApiConnected(!apiConnected)}
          className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-label border transition-colors ${
            apiConnected
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
              : 'bg-amber-950/40 border-amber-800/60 text-amber-300'
          }`}
          title="Google Ads API Connection Status"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${apiConnected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          <span>{apiConnected ? 'ADS API: LIVE' : 'ADS API: OFFLINE'}</span>
        </button>

        {/* Save Draft */}
        <button
          onClick={onSaveDraft}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">save</span>
          <span>Save Draft</span>
        </button>

        {/* Launch Campaign Button */}
        <button
          onClick={onLaunchCampaign}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/25 transition-all ai-glow-button"
        >
          <span className="material-symbols-outlined text-sm">rocket_launch</span>
          <span className="hidden xs:inline">Launch Campaign</span>
          <span className="xs:hidden">Launch</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-slate-400 hover:text-white rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 relative"
          >
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="text-xs font-semibold text-slate-200">System Notifications</span>
                <span className="text-[10px] text-indigo-400 font-mono-label">3 New</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-200 font-medium mb-0.5">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Alex Rivera"
            className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover"
          />
        </div>
      </div>
    </header>
  );
};
