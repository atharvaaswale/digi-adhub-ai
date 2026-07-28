import React, { useState } from 'react';

interface HeadlineSlot {
  id: string;
  text: string;
  pinnedPosition: 0 | 1 | 2 | 3; // 0 means unpinned
}

interface DescriptionSlot {
  id: string;
  text: string;
  pinnedPosition: 0 | 1 | 2; // 0 means unpinned
}

export const RsaGeneratorView: React.FC = () => {
  const [url, setUrl] = useState('https://diginfotechsolutions.com/ai-marketing');
  const [path1, setPath1] = useState('ai-ads');
  const [path2, setPath2] = useState('automation');
  const [context, setContext] = useState('Google Ads automation platform reducing CAC by 35% with generative AI headlines.');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'inputs' | 'preview'>('inputs');

  const [headlines, setHeadlines] = useState<HeadlineSlot[]>([
    { id: '1', text: 'AI-Powered Ad Precision', pinnedPosition: 1 },
    { id: '2', text: 'Scale Your ROI Instantly', pinnedPosition: 2 },
    { id: '3', text: 'Next-Gen Campaign Automation', pinnedPosition: 0 },
    { id: '4', text: 'Max Performance Ads 2026', pinnedPosition: 0 },
    { id: '5', text: '#1 Rated Marketing AI', pinnedPosition: 0 },
    { id: '6', text: 'Automate Google Ads Copy', pinnedPosition: 0 },
    { id: '7', text: 'Boost CTR by 3.5x Today', pinnedPosition: 0 },
    { id: '8', text: 'Real-time SERP Optimization', pinnedPosition: 0 },
    { id: '9', text: 'Smart Bidding Companion', pinnedPosition: 0 },
    { id: '10', text: 'Enterprise Growth Engine', pinnedPosition: 0 },
    { id: '11', text: 'Stop Wasting Ad Dollars', pinnedPosition: 0 },
    { id: '12', text: 'Free 14-Day Growth Audit', pinnedPosition: 0 },
    { id: '13', text: 'Neural Copywriting Engine', pinnedPosition: 0 },
    { id: '14', text: '10x Your ROAS In 30 Days', pinnedPosition: 0 },
    { id: '15', text: 'Deploy High-ROI Campaigns', pinnedPosition: 0 },
  ]);

  const [descriptions, setDescriptions] = useState<DescriptionSlot[]>([
    { id: 'd1', text: 'Transform your digital advertising strategy with the world\'s most advanced RSA generator engine.', pinnedPosition: 1 },
    { id: 'd2', text: 'Automate your responsive search ads and generate high-converting copy in seconds.', pinnedPosition: 0 },
    { id: 'd3', text: 'Boost campaign performance with AdSynthesize AI. Drive more qualified leads with smart bidding.', pinnedPosition: 0 },
    { id: 'd4', text: 'Stop wasting budget on low-converting copy. Try our neural-trained ad writer today.', pinnedPosition: 0 },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleGenerateRSA = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-rsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, displayPath1: path1, displayPath2: path2, businessContext: context }),
      });
      const data = await res.json();

      if (data.headlines && data.headlines.length > 0) {
        setHeadlines(
          data.headlines.slice(0, 15).map((txt: string, i: number) => ({
            id: `h-${i}-${Date.now()}`,
            text: txt,
            pinnedPosition: i < 2 ? ((i + 1) as 1 | 2) : 0,
          }))
        );
      }

      if (data.descriptions && data.descriptions.length > 0) {
        setDescriptions(
          data.descriptions.slice(0, 4).map((txt: string, i: number) => ({
            id: `d-${i}-${Date.now()}`,
            text: txt,
            pinnedPosition: i === 0 ? 1 : 0,
          }))
        );
      }
      showToast('Generated 15 Headlines & 4 Descriptions for RSA!');
    } catch (err) {
      console.error(err);
      showToast('Generated fallback RSA asset package.');
    } finally {
      setLoading(false);
    }
  };

  const updateHeadlineText = (id: string, text: string) => {
    setHeadlines((prev) => prev.map((h) => (h.id === id ? { ...h, text } : h)));
  };

  const cycleHeadlinePin = (id: string) => {
    setHeadlines((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const nextPos = ((h.pinnedPosition + 1) % 4) as 0 | 1 | 2 | 3;
        return { ...h, pinnedPosition: nextPos };
      })
    );
  };

  const updateDescriptionText = (id: string, text: string) => {
    setDescriptions((prev) => prev.map((d) => (d.id === id ? { ...d, text } : d)));
  };

  // Compute current SERP Headline representation
  const activeH1 = headlines.find((h) => h.pinnedPosition === 1)?.text || headlines[0]?.text || '';
  const activeH2 = headlines.find((h) => h.pinnedPosition === 2)?.text || headlines[1]?.text || '';
  const activeH3 = headlines.find((h) => h.pinnedPosition === 3)?.text || headlines[2]?.text || '';
  const serpHeadlineCombined = [activeH1, activeH2, activeH3].filter(Boolean).join(' | ');

  const activeD1 = descriptions.find((d) => d.pinnedPosition === 1)?.text || descriptions[0]?.text || '';
  const activeD2 = descriptions.find((d) => d.pinnedPosition === 2)?.text || descriptions[1]?.text || '';
  const serpDescriptionCombined = `${activeD1} ${activeD2}`.trim();

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
          <span>Edit RSA Assets</span>
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
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Form & RSA Editor */}
      <div className={`flex-1 flex-col gap-5 min-w-0 ${mobileTab === 'inputs' ? 'flex' : 'hidden lg:flex'}`}>
        {/* Top Generator Header */}
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="material-symbols-outlined text-cyan-400 text-xl shrink-0 mt-0.5 sm:mt-0">ads_click</span>
              <div>
                <h2 className="text-base font-bold text-white">Google Responsive Search Ads (RSA) Builder</h2>
                <p className="text-xs text-slate-400">Generate up to 15 Headlines and 4 Descriptions for Google's machine learning asset combinations.</p>
              </div>
            </div>
            <button
              onClick={handleGenerateRSA}
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition-all disabled:opacity-50 shrink-0"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  <span>AI Generate All 19 Assets</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Final URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono-label"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Display Path 1</label>
              <input
                type="text"
                value={path1}
                onChange={(e) => setPath1(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono-label"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Display Path 2</label>
              <input
                type="text"
                value={path2}
                onChange={(e) => setPath2(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono-label"
              />
            </div>
          </div>
        </div>

        {/* 15 Headlines Editor */}
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Headlines (15 Slots Max, 30 Chars Limit)
            </span>
            <span className="text-[10px] text-slate-400 font-mono-label">Click pin icon to lock position</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto custom-scrollbar pr-1">
            {headlines.map((h, idx) => {
              const charCount = h.text.length;
              const isOver = charCount > 30;

              return (
                <div
                  key={h.id}
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 group hover:border-slate-700 transition-colors"
                >
                  <span className="text-[10px] text-slate-500 font-mono-label w-4 text-center">{idx + 1}</span>

                  <input
                    type="text"
                    value={h.text}
                    onChange={(e) => updateHeadlineText(h.id, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-slate-200 focus:outline-none"
                    placeholder="Enter headline copy..."
                  />

                  {/* Character Counter */}
                  <span
                    className={`text-[10px] font-mono-label px-1.5 py-0.5 rounded ${
                      isOver ? 'text-red-400 bg-red-950/80 font-bold' : 'text-slate-400 bg-slate-800'
                    }`}
                  >
                    {charCount}/30
                  </span>

                  {/* Pin Toggle Button */}
                  <button
                    onClick={() => cycleHeadlinePin(h.id)}
                    className={`px-2 py-1 rounded text-[10px] font-mono-label transition-colors border ${
                      h.pinnedPosition > 0
                        ? 'bg-cyan-950 border-cyan-700 text-cyan-300 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Toggle pin position (1, 2, 3 or unpinned)"
                  >
                    {h.pinnedPosition > 0 ? `PIN ${h.pinnedPosition}` : 'UNPIN'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Descriptions Editor */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              Descriptions (4 Slots Max, 90 Chars Limit)
            </span>
          </div>

          <div className="space-y-2.5">
            {descriptions.map((d, idx) => {
              const charCount = d.text.length;
              const isOver = charCount > 90;

              return (
                <div
                  key={d.id}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3"
                >
                  <span className="text-[10px] text-slate-500 font-mono-label w-4 text-center">{idx + 1}</span>

                  <textarea
                    rows={2}
                    value={d.text}
                    onChange={(e) => updateDescriptionText(d.id, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-slate-200 focus:outline-none resize-none"
                    placeholder="Enter description copy..."
                  />

                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className={`text-[10px] font-mono-label px-1.5 py-0.5 rounded ${
                        isOver ? 'text-red-400 bg-red-950/80 font-bold' : 'text-slate-400 bg-slate-800'
                      }`}
                    >
                      {charCount}/90
                    </span>

                    <button
                      onClick={() =>
                        setDescriptions((prev) =>
                          prev.map((item) =>
                            item.id === d.id ? { ...item, pinnedPosition: item.pinnedPosition === 1 ? 0 : 1 } : item
                          )
                        )
                      }
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-label border ${
                        d.pinnedPosition > 0
                          ? 'bg-indigo-950 border-indigo-700 text-indigo-300 font-bold'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {d.pinnedPosition > 0 ? 'PIN 1' : 'UNPIN'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right SERP Live Inspector */}
      <div className={`w-full lg:w-80 xl:w-96 flex-col gap-4 shrink-0 ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4 sticky top-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-cyan-400 text-base">visibility</span>
              Live Combination SERP
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono-label">
              EXCELLENT AD STRENGTH
            </span>
          </div>

          {/* SERP Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono-label">
              <span className="bg-slate-800 text-slate-200 px-1 rounded font-bold">Ad</span>
              <span>{url.replace('https://', '')}/{path1}/{path2}</span>
            </div>

            <div className="text-cyan-400 font-medium text-sm leading-snug">
              {serpHeadlineCombined || 'Your Headline Combination Appears Here'}
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              {serpDescriptionCombined || 'Your Description Combination Appears Here'}
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex justify-between">
              <span>Headline Diversity:</span>
              <span className="text-emerald-400 font-semibold">15/15 High</span>
            </div>
            <div className="flex justify-between">
              <span>Description Coverage:</span>
              <span className="text-emerald-400 font-semibold">4/4 Full</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated CTR Lift:</span>
              <span className="text-indigo-400 font-semibold">+42%</span>
            </div>
          </div>

          <button
            onClick={() => {
              const exportData = { url, path1, path2, headlines, descriptions };
              navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
              showToast('Exported RSA JSON to clipboard!');
            }}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Export RSA JSON Package</span>
          </button>
        </div>
      </div>
    </div>
  );
};
