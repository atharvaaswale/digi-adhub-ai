import React, { useState } from 'react';

export const PMaxAssetGenView: React.FC = () => {
  const [goal, setGoal] = useState<'Sales' | 'Leads' | 'Traffic' | 'App'>('Leads');
  const [aspectRatio, setAspectRatio] = useState<'1.91:1' | '1:1' | '4:5'>('1.91:1');
  const [platformTab, setPlatformTab] = useState<'youtube' | 'search' | 'gmail' | 'display'>('youtube');

  const [headline, setHeadline] = useState('AI Automation for Google Ads');
  const [longHeadline, setLongHeadline] = useState('Scale Performance Max Campaigns with Neural Creative Automation');
  const [description, setDescription] = useState('Reduce CPA by 40% using AI-driven multi-channel asset generation across YouTube, Search, and Gmail.');

  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const sampleImages = [
    {
      ratio: '1.91:1',
      title: 'Landscape Hero Banner',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
    {
      ratio: '1:1',
      title: 'Square Feed Banner',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    },
    {
      ratio: '4:5',
      title: 'Vertical Mobile Story Banner',
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto custom-scrollbar p-4 lg:p-6 gap-6 relative">
      {toastMsg && (
        <div className="fixed bottom-20 right-6 bg-purple-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-purple-400 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Left Input Configuration Panel */}
      <div className="w-full lg:w-[460px] flex flex-col gap-5 shrink-0">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400 text-xl">view_carousel</span>
            <div>
              <h2 className="text-base font-bold text-white">Performance Max Multi-Channel Asset Engine</h2>
              <p className="text-xs text-slate-400">Generate visual & text assets for YouTube, Gmail, Search & Display.</p>
            </div>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Conversion Goal Objective</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Leads', label: 'Lead Generation', icon: 'person_add' },
                { id: 'Sales', label: 'E-Commerce Sales', icon: 'shopping_cart' },
                { id: 'Traffic', label: 'Website Traffic', icon: 'ads_click' },
                { id: 'App', label: 'App Promotion', icon: 'smartphone' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setGoal(item.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                    goal === item.id
                      ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Visual Aspect Ratio</label>
            <div className="flex gap-2">
              {(['1.91:1', '1:1', '4:5'] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-mono-label transition-all ${
                    aspectRatio === ratio
                      ? 'bg-purple-600 border-purple-400 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Text Inputs */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Short Headline (30 Chars)</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Long Headline (90 Chars)</label>
              <textarea
                rows={2}
                value={longHeadline}
                onChange={(e) => setLongHeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Description Copy (90 Chars)</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 resize-none"
              />
            </div>
          </div>

          <button
            onClick={() => showToast('Generated Performance Max Visual & Copy Asset Suite!')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
            <span>Synthesize All PMax Assets</span>
          </button>
        </div>
      </div>

      {/* Right Multi-Platform Preview Workspace */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {/* Platform Selector Tabs */}
        <div className="p-3 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
          <div className="flex gap-2">
            {[
              { id: 'youtube', label: 'YouTube Video Ad', icon: 'smart_display' },
              { id: 'search', label: 'Google Search', icon: 'search' },
              { id: 'gmail', label: 'Gmail Promotions', icon: 'mail' },
              { id: 'display', label: 'Display Banner Gallery', icon: 'grid_view' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPlatformTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  platformTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <span className="text-[10px] font-mono-label text-purple-300 bg-purple-950/80 px-2 py-1 rounded border border-purple-800">
            PMAX COMPLIANT
          </span>
        </div>

        {/* Dynamic Preview Container */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex-1 flex flex-col items-center justify-center min-h-[380px]">
          {platformTab === 'youtube' && (
            <div className="w-full max-w-xl bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative group">
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80"
                  alt="YouTube Ad Preview"
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Play Button Overlay */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-3xl">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                {/* Overlay Ad Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <div className="text-xs font-bold text-white truncate">{headline}</div>
                    <div className="text-[11px] text-slate-300 truncate">{description}</div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-yellow-400 text-slate-950 font-bold text-xs shrink-0 hover:bg-yellow-300 transition-colors">
                    Visit Site
                  </button>
                </div>
              </div>
            </div>
          )}

          {platformTab === 'search' && (
            <div className="w-full max-w-xl bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400 font-mono-label">Sponsored • diginfotechsolutions.com</div>
              <div className="text-indigo-400 font-bold text-base">{headline} | {longHeadline}</div>
              <p className="text-slate-300 text-xs leading-relaxed">{description}</p>
            </div>
          )}

          {platformTab === 'gmail' && (
            <div className="w-full max-w-xl bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-9 h-9 rounded-full bg-purple-900 border border-purple-700 flex items-center justify-center font-bold text-white text-xs">
                  DIG
                </div>
                <div>
                  <div className="text-xs font-bold text-white">DIG Infotech Solutions</div>
                  <div className="text-[11px] text-slate-400">{longHeadline}</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{description}</p>
              <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold">
                Claim Free AI Audit
              </button>
            </div>
          )}

          {platformTab === 'display' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {sampleImages.map((img) => (
                <div key={img.title} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{img.title}</span>
                    <span className="text-[10px] font-mono-label text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded">
                      {img.ratio}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
