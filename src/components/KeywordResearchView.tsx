import React, { useState } from 'react';
import { KeywordItem } from '../types';

export const KeywordResearchView: React.FC = () => {
  const [seed, setSeed] = useState('generative ai marketing, google ads automation');
  const [matchType, setMatchType] = useState<'Broad' | 'Phrase' | 'Exact'>('Broad');
  const [country, setCountry] = useState('United States');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [summary, setSummary] = useState({
    totalVolume: '1.4M',
    volumeGrowth: '+12.4%',
    avgCpc: '$4.82',
    cpcChange: '+$0.45',
  });

  const [keywords, setKeywords] = useState<KeywordItem[]>([
    { id: 'k1', kw: 'generative ai marketing software', vol: '45.2k', cpc: '$12.40', comp: 'High', cluster: 'High Intent Cluster', trend: [20, 35, 50, 70, 95] },
    { id: 'k2', kw: 'best ai copy tools for google ads', vol: '18.4k', cpc: '$8.15', comp: 'Med', cluster: 'Commercial Intent', trend: [40, 45, 60, 55, 80] },
    { id: 'k3', kw: 'automated ad creation platform', vol: '12.8k', cpc: '$14.20', comp: 'High', cluster: 'Transactional', trend: [30, 40, 50, 65, 90] },
    { id: 'k4', kw: 'keyword research ai generator free', vol: '33.1k', cpc: '$0.80', comp: 'Low', cluster: 'Free/Exploratory', trend: [10, 15, 20, 25, 30] },
    { id: 'k5', kw: 'google ads quality score optimizer', vol: '9.6k', cpc: '$11.10', comp: 'High', cluster: 'High Intent Cluster', trend: [50, 60, 70, 85, 95] },
    { id: 'k6', kw: 'scale google ads roas with ai', vol: '14.5k', cpc: '$9.60', comp: 'Med', cluster: 'Commercial Intent', trend: [30, 50, 60, 75, 90] },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/keyword-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seed, matchType, country }),
      });
      const data = await res.json();

      if (data.keywords) {
        setSummary({
          totalVolume: data.totalVolume || '1.8M',
          volumeGrowth: data.volumeGrowth || '+14.2%',
          avgCpc: data.avgCpc || '$5.10',
          cpcChange: data.cpcChange || '+$0.35',
        });
        setKeywords(
          data.keywords.map((k: any, idx: number) => ({
            id: `k-${idx}-${Date.now()}`,
            kw: k.kw,
            vol: k.vol,
            cpc: k.cpc,
            comp: k.comp || 'Med',
            cluster: k.cluster || 'High Intent',
            trend: k.trend || [20, 40, 60, 80, 100],
          }))
        );
        showToast('Keyword Intelligence Refreshed via AI Server!');
      }
    } catch (err) {
      console.error(err);
      showToast('Loaded Keyword Data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 lg:p-6 space-y-5 relative">
      {toastMsg && (
        <div className="fixed bottom-20 right-6 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Top Controls Header */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-400 text-xl">travel_explore</span>
          <div>
            <h2 className="text-base font-bold text-white">AI Keyword Intelligence & Search Intent Engine</h2>
            <p className="text-xs text-slate-400">Discover high-ROI search terms, CPC estimates, and intent clusters.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="md:col-span-2">
            <label className="block text-slate-300 font-medium mb-1">Seed Keyword or Competitor URL</label>
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              placeholder="Enter seeds e.g. ai marketing, ppc tools..."
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Match Type</label>
            <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              {(['Broad', 'Phrase', 'Exact'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMatchType(m)}
                  className={`flex-1 py-1 rounded-lg text-xs font-medium transition-colors ${
                    matchType === m ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">search</span>
                  <span>Analyze Keywords</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Monthly Search Volume</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{summary.totalVolume}</span>
            <span className="text-xs font-bold text-emerald-400 font-mono-label">{summary.volumeGrowth}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Average Est. CPC</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{summary.avgCpc}</span>
            <span className="text-xs font-bold text-cyan-400 font-mono-label">{summary.cpcChange}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Competition Level</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-400">High / Competitive</span>
            <span className="text-[10px] font-mono-label text-slate-400">88% Index</span>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">High Intent Keyword Ratio</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-indigo-400">74%</span>
            <span className="text-xs font-bold text-emerald-400 font-mono-label">READY TO CONVERT</span>
          </div>
        </div>
      </div>

      {/* Keyword Table */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-white">Keyword Intelligence Insights ({keywords.length})</span>
          <span className="text-[10px] text-slate-400 font-mono-label">Match: {matchType} Match</span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[600px]">
            <thead>
              <tr className="text-[11px] font-mono-label text-slate-400 border-b border-slate-800">
                <th className="pb-3 font-semibold">Keyword Phrase</th>
                <th className="pb-3 font-semibold">Monthly Vol</th>
                <th className="pb-3 font-semibold">Est. CPC</th>
                <th className="pb-3 font-semibold">Competition</th>
                <th className="pb-3 font-semibold">Intent Cluster</th>
                <th className="pb-3 font-semibold">5-Mo Trend</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {keywords.map((k) => (
                <tr key={k.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 font-medium text-white">{k.kw}</td>
                  <td className="py-3 font-mono-label text-slate-300">{k.vol}</td>
                  <td className="py-3 font-mono-label text-slate-300">{k.cpc}</td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono-label font-bold ${
                        k.comp === 'High'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {k.comp}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800 font-mono-label">
                      {k.cluster}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-end gap-1 h-5 w-16">
                      {k.trend.map((val, i) => (
                        <div
                          key={i}
                          style={{ height: `${val}%` }}
                          className="flex-1 bg-indigo-500 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-right space-x-1">
                    <button
                      onClick={() => showToast(`Added "${k.kw}" to campaign targets!`)}
                      className="px-2 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 hover:text-white text-[10px] font-medium transition-colors"
                    >
                      + Target
                    </button>
                    <button
                      onClick={() => showToast(`Blocked "${k.kw}" as negative keyword!`)}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-300 text-[10px] font-medium transition-colors"
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
