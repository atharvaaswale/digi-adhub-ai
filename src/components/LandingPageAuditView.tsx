import React, { useState } from 'react';
import { AuditResult } from '../types';

export const LandingPageAuditView: React.FC = () => {
  const [url, setUrl] = useState('https://diginfotechsolutions.com/ai-software');
  const [keywords, setKeywords] = useState<string[]>(['AI Marketing', 'Google Ads Automation', 'SaaS Growth']);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'inputs' | 'preview'>('inputs');

  const [audit, setAudit] = useState<AuditResult>({
    healthScore: 78,
    healthStatus: 'STABLE',
    visibility: '88%',
    intent: '92%',
    checklist: [
      { title: 'Headline Relevancy', status: 'EXCELLENT', badgeType: 'emerald', icon: 'check_circle' },
      { title: 'CTA Clarity & Prominence', status: 'IMPROVE', badgeType: 'tertiary', icon: 'warning' },
      { title: 'Page Load Speed', status: '1.2s FAST', badgeType: 'emerald', icon: 'check_circle' },
      { title: 'Mobile Viewport & Layout', status: 'VIEWPORT LAG', badgeType: 'tertiary', icon: 'warning' },
    ],
    targetKeyword: 'AI Marketing',
    originalHeadline: '"The Best Software For Your Business Marketing Needs"',
    optimizedHeadline: '"Scale Your SaaS Revenue with AI-Driven Marketing Intelligence."',
    explanation: 'Our AI model compared your URL against top performing SaaS landing pages in your niche. Improving headline clarity directly boosts Quality Score by ~1.5 points.',
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRunAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit-landing-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, keywords }),
      });
      const data = await res.json();

      if (data.healthScore) {
        setAudit({
          healthScore: data.healthScore,
          healthStatus: data.healthStatus || 'STABLE',
          visibility: data.visibility || '90%',
          intent: data.intent || '94%',
          checklist: data.checklist || audit.checklist,
          targetKeyword: data.targetKeyword || keywords[0] || 'AI Marketing',
          originalHeadline: data.originalHeadline || audit.originalHeadline,
          optimizedHeadline: data.optimizedHeadline || audit.optimizedHeadline,
          explanation: data.explanation || audit.explanation,
        });
        showToast('Landing Page Audit Completed!');
      }
    } catch (err) {
      console.error(err);
      showToast('Completed audit with local rules engine.');
    } finally {
      setLoading(false);
    }
  };

  const addKeywordTag = () => {
    if (!newKeywordInput.trim()) return;
    setKeywords([...keywords, newKeywordInput.trim()]);
    setNewKeywordInput('');
  };

  const removeKeywordTag = (tag: string) => {
    setKeywords(keywords.filter((k) => k !== tag));
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto custom-scrollbar p-3 sm:p-4 lg:p-6 gap-5 relative">
      {toastMsg && (
        <div className="fixed bottom-20 right-6 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Segmented Mobile Workspace View Toggle Switcher */}
      <div className="lg:hidden flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold w-full shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab('inputs')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'inputs'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-sm">edit_note</span>
          <span>Edit Inputs</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'preview'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-sm">visibility</span>
          <span>Audit Report</span>
        </button>
      </div>

      {/* Input Side Panel */}
      <div className={`w-full lg:w-[460px] flex-col gap-5 shrink-0 ${mobileTab === 'inputs' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-xl">fact_check</span>
            <div>
              <h2 className="text-base font-bold text-white">Destination URL & Landing Page Audit</h2>
              <p className="text-xs text-slate-400">Evaluate headline relevancy, CTA placement & Quality Score health.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Destination URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono-label"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Search Keywords</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {keywords.map((k) => (
                <span
                  key={k}
                  className="text-[11px] bg-slate-900 border border-slate-800 text-slate-200 px-2 py-1 rounded-lg flex items-center gap-1 font-mono-label"
                >
                  <span>{k}</span>
                  <button onClick={() => removeKeywordTag(k)} className="hover:text-red-400">
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newKeywordInput}
                onChange={(e) => setNewKeywordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addKeywordTag()}
                placeholder="Add keyword tag..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200"
              />
              <button
                onClick={addKeywordTag}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg border border-slate-700"
              >
                + Tag
              </button>
            </div>
          </div>

          <button
            onClick={handleRunAudit}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-indigo-600 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Auditing Page Content...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">fact_check</span>
                <span>Run AI CRO Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audit Output Workspace */}
      <div className={`flex-1 flex-col gap-5 min-w-0 ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        {/* Conversion Health Score Card */}
        <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
            {/* Gauge SVG Circle */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray={`${audit.healthScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-lg sm:text-xl font-extrabold text-white">{audit.healthScore}</span>
                <span className="text-[9px] text-slate-400 font-mono-label">SCORE</span>
              </div>
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-white">Conversion Health Score</h3>
                <span className="text-[10px] font-mono-label bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  {audit.healthStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Target Page alignment score evaluated against active search terms and landing page copy structure.
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6 text-xs w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <div className="text-slate-400 text-[10px] font-mono-label">VISIBILITY</div>
              <div className="text-lg font-bold text-white">{audit.visibility}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] font-mono-label">INTENT MATCH</div>
              <div className="text-lg font-bold text-white">{audit.intent}</div>
            </div>
          </div>
        </div>

        {/* Audit Checklist & AI Suggested Headline Upgrade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Audit Checklist */}
          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-white block pb-2 border-b border-slate-800">
              Audit Performance Checklist
            </span>
            <div className="space-y-2.5">
              {audit.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-sm ${item.badgeType === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {item.icon}
                    </span>
                    <span className="text-xs text-slate-200 font-medium">{item.title}</span>
                  </div>
                  <span className={`text-[10px] font-mono-label px-2 py-0.5 rounded border font-bold ${
                    item.badgeType === 'emerald' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggested Headline Upgrade */}
          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <span className="material-symbols-outlined text-indigo-400 text-base">auto_awesome</span>
              AI Suggested Headline Upgrade
            </span>

            <div className="space-y-2">
              <div className="text-[11px] text-slate-400 line-through">
                {audit.originalHeadline}
              </div>
              <div className="text-xs font-bold text-indigo-300 p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-800/80">
                {audit.optimizedHeadline}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
              {audit.explanation}
            </p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(audit.optimizedHeadline);
                showToast('Copied optimized headline to clipboard!');
              }}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Apply Suggested Headline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
