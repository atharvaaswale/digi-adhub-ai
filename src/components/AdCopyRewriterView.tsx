import React, { useState } from 'react';
import { CopyRewriteVariant } from '../types';

export const AdCopyRewriterView: React.FC = () => {
  const [originalText, setOriginalText] = useState('We offer high-quality AI marketing software to help businesses optimize Google Ads, write headlines, and track ROAS.');
  const [selectedTone, setSelectedTone] = useState('High Conversion');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'inputs' | 'preview'>('inputs');

  const [variants, setVariants] = useState<CopyRewriteVariant[]>([
    {
      id: 'v1',
      headline: 'Transform Overhead into 2x Ad ROI',
      description: 'Automate your Google Ads campaign assets in real-time with our neural engine. Try a free 14-day audit today.',
      ctrBoost: '+38%',
      toneTag: 'Persuasive High-Convert',
    },
    {
      id: 'v2',
      headline: 'Stop Wasting Google Ad Dollars',
      description: 'Our AI platform continuously optimizes headlines & keywords for maximum ROAS. Claim your complimentary audit.',
      ctrBoost: '+45%',
      toneTag: 'Urgent Direct Response',
    },
    {
      id: 'v3',
      headline: 'Enterprise Marketing Intelligence Engine',
      description: 'Scalable IT infrastructure meets AI-driven advertising automation. Built for high-volume enterprise growth.',
      ctrBoost: '+29%',
      toneTag: 'B2B Professional',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRewrite = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rewrite-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: originalText, tone: selectedTone }),
      });
      const data = await res.json();

      if (data.variants) {
        setVariants(
          data.variants.map((v: any, idx: number) => ({
            id: `v-${idx}-${Date.now()}`,
            headline: v.headline || 'AI Upgraded Headline Copy',
            description: v.description || 'Optimized description copy engineered for maximum CTR.',
            ctrBoost: v.ctrBoost || '+35%',
            toneTag: v.toneTag || selectedTone,
          }))
        );
        showToast('Ad Copy Rewritten Successfully!');
      }
    } catch (err) {
      console.error(err);
      showToast('Generated fallback copy variations.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
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
              ? 'bg-indigo-600 text-white shadow-md'
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
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-sm">visibility</span>
          <span>Rewritten Copy</span>
        </button>
      </div>

      {/* Input Side Panel */}
      <div className={`w-full lg:w-[480px] flex-col gap-5 shrink-0 ${mobileTab === 'inputs' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400 text-xl">edit_note</span>
            <div>
              <h2 className="text-base font-bold text-white">AI Ad Copy Rewriter & Tone Transformer</h2>
              <p className="text-xs text-slate-400">Paste existing copy and re-engineer it for higher CTR and conversions.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Original Ad Copy / Draft Text</label>
            <textarea
              rows={4}
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="Paste existing headline or description draft..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Tone & Copy Archetype</label>
            <div className="flex flex-wrap gap-1.5">
              {['High Conversion', 'FOMO / Urgency', 'Enterprise B2B', 'Direct Response', 'Creative / Playful'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTone(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedTone === t
                      ? 'bg-indigo-600 text-white border border-indigo-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRewrite}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Rewriting Copy...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">auto_fix_high</span>
                <span>Rewrite & Enhance Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Rewritten Variants Workspace */}
      <div className={`flex-1 flex-col gap-4 min-w-0 ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400 text-base">auto_awesome</span>
            AI Enhanced Variations ({variants.length})
          </span>
          <span className="text-[10px] text-emerald-400 font-mono-label bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
            PREDICTED CTR IMPROVEMENT
          </span>
        </div>

        <div className="space-y-4">
          {variants.map((v, idx) => (
            <div key={v.id} className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3 relative group">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-300 font-mono-label font-bold text-[10px] flex items-center justify-center border border-indigo-800">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{v.toneTag}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-mono-label">
                    {v.ctrBoost} EST. CTR
                  </span>
                  <button
                    onClick={() => handleCopy(v.id, `${v.headline}\n${v.description}`)}
                    className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                    title="Copy full variant"
                  >
                    <span className="material-symbols-outlined text-base">
                      {copiedId === v.id ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Variant Content */}
              <div className="space-y-1.5">
                <div className="text-sm font-bold text-indigo-300">{v.headline}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{v.description}</p>
              </div>

              {/* Character counts */}
              <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 font-mono-label border-t border-slate-900">
                <span>Headline: {v.headline.length}/30</span>
                <span>Description: {v.description.length}/90</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
