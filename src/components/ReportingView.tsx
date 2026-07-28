import React, { useState } from 'react';

export const ReportingView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [searchQuery, setSearchQuery] = useState('');

  const campaigns = [
    { id: '1', name: 'Search_USA_GenerativeAI_Core', status: 'ACTIVE', spend: '$14,250', conv: '412', cpa: '$34.58', roas: '418%', ctr: '6.8%' },
    { id: '2', name: 'PMax_MultiChannel_SaaS_Scale', status: 'ACTIVE', spend: '$22,800', conv: '680', cpa: '$33.52', roas: '445%', ctr: '4.2%' },
    { id: '3', name: 'RSA_Retargeting_Enterprise_B2B', status: 'ACTIVE', spend: '$8,100', conv: '195', cpa: '$41.53', roas: '380%', ctr: '8.1%' },
    { id: '4', name: 'Search_UK_Automation_Niche', status: 'PAUSED', spend: '$4,200', conv: '88', cpa: '$47.72', roas: '290%', ctr: '5.1%' },
  ];

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-6 space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400 text-xl">analytics</span>
            Google Ads Performance Analytics Dashboard
          </h2>
          <p className="text-xs text-slate-400">Live API performance metrics, ROAS tracking, and AI budget optimization.</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                timeRange === r ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r === '7d' ? 'Last 7 Days' : r === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Ad Spend</span>
          <div className="text-2xl font-extrabold text-white font-mono-label">$49,350</div>
          <span className="text-xs font-bold text-emerald-400 font-mono-label">+12.8% vs last period</span>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Conversions</span>
          <div className="text-2xl font-extrabold text-white font-mono-label">1,375</div>
          <span className="text-xs font-bold text-emerald-400 font-mono-label">+18.4% vs last period</span>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Average Cost Per Acquisition</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono-label">$35.89</div>
          <span className="text-xs font-bold text-emerald-400 font-mono-label">-$4.20 CPA Savings</span>
        </div>

        <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Overall Portfolio ROAS</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono-label">428%</div>
          <span className="text-xs font-bold text-emerald-400 font-mono-label">+34% vs target</span>
        </div>
      </div>

      {/* Campaigns Performance Table */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-white">Active Google Ads Campaigns ({filteredCampaigns.length})</span>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns..."
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200"
          />
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[11px] font-mono-label text-slate-400 border-b border-slate-800">
                <th className="pb-3 font-semibold">Campaign Name</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Spend</th>
                <th className="pb-3 font-semibold">Conversions</th>
                <th className="pb-3 font-semibold">Avg CPA</th>
                <th className="pb-3 font-semibold">ROAS</th>
                <th className="pb-3 font-semibold">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 font-medium text-white">{c.name}</td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono-label font-bold ${
                        c.status === 'ACTIVE'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 font-mono-label text-slate-300">{c.spend}</td>
                  <td className="py-3 font-mono-label text-slate-300">{c.conv}</td>
                  <td className="py-3 font-mono-label text-cyan-400">{c.cpa}</td>
                  <td className="py-3 font-mono-label text-emerald-400 font-bold">{c.roas}</td>
                  <td className="py-3 font-mono-label text-slate-300">{c.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
