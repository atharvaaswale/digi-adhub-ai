import React from 'react';
import { ToolView } from '../types';

interface SidebarProps {
  currentView: ToolView;
  onSelectView: (view: ToolView) => void;
}

interface NavGroup {
  category: string;
  items: {
    id: ToolView;
    label: string;
    icon: string;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  const groups: NavGroup[] = [
    {
      category: 'AI GENERATION',
      items: [
        { id: 'ai_builder', label: 'AI Campaign Builder', icon: 'auto_awesome', badge: 'HOT', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
        { id: 'rsa_gen', label: 'RSA Generator', icon: 'ads_click', badge: '15 Headlines', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
        { id: 'pmax_gen', label: 'PMax Asset Gen', icon: 'view_carousel', badge: 'Multi', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
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
        { id: 'landing_audit', label: 'Landing Page Audit', icon: 'fact_check', badge: 'CRO', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
        { id: 'quality_score', label: 'Quality Score Optimiser', icon: 'speed' },
        { id: 'conversion_checker', label: 'Conversion Tracking', icon: 'checklist' },
      ],
    },
    {
      category: 'STRATEGY & FINANCIALS',
      items: [
        { id: 'roas_calc', label: 'ROAS Calculator', icon: 'calculate', badge: 'Live', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
        { id: 'budget_planner', label: 'Budget Planner', icon: 'payments' },
      ],
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between shrink-0 select-none overflow-y-auto custom-scrollbar h-[calc(100vh-4rem)]">
      <div className="p-3 space-y-5">
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
                    onClick={() => onSelectView(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-all group ${
                      isActive
                        ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm shadow-indigo-600/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`material-symbols-outlined text-lg transition-colors ${
                          isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded border font-mono-label font-medium shrink-0 ml-1 ${
                          item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

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
  );
};
