import React, { useState } from 'react';

export const AssetLibraryView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'headlines' | 'descriptions' | 'media'>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const assets = [
    { id: '1', type: 'headline', text: 'DIG Infotech: #1 AI Solutions', performance: 'BEST', charCount: 28 },
    { id: '2', type: 'headline', text: 'Scale Fast with AI Automation', performance: 'GOOD', charCount: 29 },
    { id: '3', type: 'description', text: 'Stop wasting ad spend. Our AI-driven infrastructure automates your growth.', performance: 'BEST', charCount: 78 },
    { id: '4', type: 'description', text: 'Cutting-edge AI automation that reduces operational overhead by 40%.', performance: 'GOOD', charCount: 68 },
    { id: '5', type: 'media', title: 'Landscape PMax Hero Banner', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80', performance: 'BEST' },
    { id: '6', type: 'media', title: 'Square Mobile Feed Banner', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80', performance: 'GOOD' },
  ];

  const filteredAssets = assets.filter((a) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'headlines') return a.type === 'headline';
    if (activeFilter === 'descriptions') return a.type === 'description';
    if (activeFilter === 'media') return a.type === 'media';
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-6 space-y-6 relative">
      {toastMsg && (
        <div className="fixed bottom-20 right-6 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400 text-xl">perm_media</span>
            Google Ads Creative Asset Manager & Library
          </h2>
          <p className="text-xs text-slate-400">Manage saved headlines, descriptions, logos, and PMax media banners.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Assets' },
            { id: 'headlines', label: 'Headlines' },
            { id: 'descriptions', label: 'Descriptions' },
            { id: 'media', label: 'Media Banners' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeFilter === tab.id ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="p-4 rounded-2xl glass-card border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-[10px] font-mono-label uppercase text-slate-400 font-semibold">
                {asset.type}
              </span>
              <span className={`text-[10px] font-mono-label font-bold px-2 py-0.5 rounded border ${
                asset.performance === 'BEST' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-cyan-950 text-cyan-300 border-cyan-800'
              }`}>
                {asset.performance} PERFORMANCE
              </span>
            </div>

            {asset.type === 'media' ? (
              <div className="space-y-2">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs font-bold text-white">{asset.title}</div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-200">{asset.text}</div>
                <div className="text-[10px] font-mono-label text-slate-500">Char count: {asset.charCount}</div>
              </div>
            )}

            <button
              onClick={() => {
                navigator.clipboard.writeText(asset.text || asset.url || '');
                showToast('Asset copied to clipboard!');
              }}
              className="w-full py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">content_copy</span>
              <span>Copy Asset</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
