import React from 'react';
import { MainNavTab, ToolView } from '../types';

interface SidebarProps {
  currentView: ToolView;
  onSelectView: (view: ToolView) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  activeTab?: MainNavTab;
  setActiveTab?: (tab: MainNavTab) => void;
}

interface NavGroup {
  category: string;
  items: {
    id: ToolView;
    label: string;
    icon: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isMobileOpen = false,
  onCloseMobile,
  activeTab,
  setActiveTab,
}) => {
  const groups: NavGroup[] = [
    {
      category: 'AI GENERATION',
      items: [
        { id: 'ai_builder', label: 'AI Campaign Builder', icon: 'auto_awesome' },
        { id: 'rsa_gen', label: 'RSA Generator', icon: 'ads_click' },
        { id: 'pmax_gen', label: 'PMax Asset Gen', icon: 'view_carousel' },
        { id: 'ad_rewriter', label: 'Ad Copy Rewriter', icon: 'edit_note' },
      ],
    },
    {
      category: 'KEYWORD INTEL',
      items: [
        { id: 'keyword_intel', label: 'Keyword Research', icon: 'travel_explore' },
        { id: 'negative_kw', label: 'Negative Keyword Gen', icon: 'block' },
        { id: 'competitor_analysis', label: 'Competitor Analysis', icon: 'travel_explore' },
      ],
    },
    {
      category: 'OPTIMIZATION',
      items: [
        { id: 'landing_audit', label: 'Landing Page Audit', icon: 'fact_check' },
        { id: 'quality_score', label: 'Quality Score Optimiser', icon: 'speed' },
        { id: 'conversion_checker', label: 'Conversion Tracking', icon: 'checklist' },
      ],
    },
    {
      category: 'STRATEGY & FINANCIALS',
      items: [
        { id: 'roas_calc', label: 'ROAS Calculator', icon: 'calculate' },
        { id: 'budget_planner', label: 'Budget Planner', icon: 'payments' },
      ],
    },
  ];

  const handleToolSelect = (id: ToolView) => {
    onSelectView(id);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="p-4 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
      {/* Mobile Top Workspace Selector Tabs */}
      {setActiveTab && activeTab && (
        <div className="lg:hidden space-y-2 pb-3 border-b border-slate-800">
          <div className="text-[10px] font-mono-label uppercase font-bold tracking-wider text-slate-400">
            WORKSTATION VIEWS
          </div>
          <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'campaigns', label: 'Campaigns', icon: 'campaign' },
              { id: 'reporting', label: 'Analytics', icon: 'analytics' },
              { id: 'assets', label: 'Assets', icon: 'perm_media' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as MainNavTab);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                <span className="text-[10px]">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Version Badge Header */}
      <div className="px-3 py-2 rounded-lg bg-indigo-950/40 border border-indigo-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono-label font-semibold text-indigo-200">WORKSTATION V3.4</span>
        </div>
        <span className="text-[10px] bg-indigo-900/60 text-indigo-300 px-1.5 py-0.5 rounded font-mono-label">ACTIVE</span>
      </div>

      {/* Navigation Groups */}
      {groups.map((group) => (
        <div key={group.category} className="space-y-1">
          <div className="px-3 text-[10px] font-mono-label uppercase font-bold tracking-wider text-slate-400 mb-1">
            {group.category}
          </div>

          <div className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleToolSelect(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all group flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-600/15 text-white font-semibold border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 font-normal'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`material-symbols-outlined text-lg transition-colors ${
                        isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300 opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-950/60 backdrop-blur-md hidden lg:flex flex-col justify-between shrink-0 select-none overflow-y-auto custom-scrollbar h-[calc(100vh-4rem)]">
        {navContent}

        {/* Footer Account Card */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-indigo-900/80 border border-indigo-700/50 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
                DIG
              </div>
              <div className="truncate">
                <div className="text-xs font-medium text-slate-200 truncate">DIG Infotech Solutions</div>
                <div className="text-[10px] text-emerald-400 font-mono-label flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Google Ads API Linked
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col lg:hidden animate-fadeIn">
          {/* Mobile Drawer Header */}
          <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
              </div>
              <span className="font-bold text-sm text-white">AdSynthesize AI Menu</span>
            </div>

            <button
              onClick={onCloseMobile}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {navContent}
        </div>
      )}
    </>
  );
};
