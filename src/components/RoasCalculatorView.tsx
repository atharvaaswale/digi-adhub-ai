import React, { useState } from 'react';

interface RoasCalculatorViewProps {
  onSyncGoogleAds: () => void;
}

export const RoasCalculatorView: React.FC<RoasCalculatorViewProps> = ({ onSyncGoogleAds }) => {
  const [adSpend, setAdSpend] = useState<number>(15000);
  const [targetRevenue, setTargetRevenue] = useState<number>(65000);
  const [cpc, setCpc] = useState<number>(3.50);
  const [conversionRate, setConversionRate] = useState<number>(3.2);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Financial Calculations
  const roas = adSpend > 0 ? ((targetRevenue / adSpend) * 100).toFixed(0) : '0';
  const netProfit = targetRevenue - adSpend;
  const clicks = cpc > 0 ? Math.round(adSpend / cpc) : 0;
  const estimatedConversions = Math.round(clicks * (conversionRate / 100));
  const cpa = estimatedConversions > 0 ? (adSpend / estimatedConversions).toFixed(2) : '0';
  const breakEvenCpa = estimatedConversions > 0 ? (targetRevenue / estimatedConversions).toFixed(2) : '0';

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto custom-scrollbar p-4 lg:p-6 gap-6 relative">
      {toastMsg && (
        <div className="fixed bottom-20 right-6 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-emerald-400 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Inputs Side Panel */}
      <div className="w-full lg:w-[460px] flex flex-col gap-5 shrink-0">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-xl">calculate</span>
            <div>
              <h2 className="text-base font-bold text-white">ROAS & Campaign Financial Modeler</h2>
              <p className="text-xs text-slate-400">Simulate ad spend, click volume, and target return on ad spend.</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Monthly Ad Spend */}
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Monthly Ad Spend</span>
                <span className="font-mono-label text-emerald-400 font-bold">${adSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={200000}
                step={1000}
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>

            {/* Target Monthly Revenue */}
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Target Monthly Revenue</span>
                <span className="font-mono-label text-emerald-400 font-bold">${targetRevenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={500000}
                step={5000}
                value={targetRevenue}
                onChange={(e) => setTargetRevenue(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>

            {/* Avg CPC */}
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Average Cost Per Click (CPC)</span>
                <span className="font-mono-label text-emerald-400 font-bold">${cpc.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={20}
                step={0.1}
                value={cpc}
                onChange={(e) => setCpc(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex justify-between font-medium text-slate-300 mb-1">
                <span>Landing Page Conversion Rate (%)</span>
                <span className="font-mono-label text-emerald-400 font-bold">{conversionRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={15}
                step={0.1}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={() => showToast('Financial ROAS Model Saved to Campaign Draft!')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">save</span>
            <span>Save Financial Target Model</span>
          </button>
        </div>
      </div>

      {/* Right Forecast Cards & Graphs */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {/* Top ROAS Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Forecasted ROAS</span>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono-label">{roas}%</div>
            <span className="text-[10px] text-slate-400 font-mono-label">Target Metric</span>
          </div>

          <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Projected Net Profit</span>
            <div className="text-2xl font-extrabold text-white font-mono-label">${netProfit.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-400 font-mono-label">After Ad Spend</span>
          </div>

          <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Est. Cost Per Acquisition</span>
            <div className="text-2xl font-extrabold text-cyan-400 font-mono-label">${cpa}</div>
            <span className="text-[10px] text-slate-400 font-mono-label">Break-even: ${breakEvenCpa}</span>
          </div>

          <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Est. Click Volume</span>
            <div className="text-2xl font-extrabold text-indigo-400 font-mono-label">{clicks.toLocaleString()}</div>
            <span className="text-[10px] text-slate-400 font-mono-label">~{estimatedConversions} Conversions</span>
          </div>
        </div>

        {/* Visual Revenue vs Spend Chart */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-base">show_chart</span>
              12-Month Projected Revenue vs Ad Spend Growth
            </span>
            <span className="text-[10px] font-mono-label text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              HIGH ROI MODEL
            </span>
          </div>

          {/* SVG Trend Chart */}
          <div className="h-48 w-full flex items-end gap-2 pt-4 px-2">
            {[20, 28, 35, 42, 55, 68, 75, 84, 90, 96, 100, 110].map((v, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full flex items-end gap-1 h-full">
                  <div
                    style={{ height: `${v * 0.3}%` }}
                    className="w-1/2 bg-slate-700 rounded-t-sm group-hover:bg-slate-600 transition-colors"
                    title={`Month ${idx + 1} Spend`}
                  />
                  <div
                    style={{ height: `${v}%` }}
                    className="w-1/2 bg-emerald-500 rounded-t-sm group-hover:bg-emerald-400 transition-colors"
                    title={`Month ${idx + 1} Revenue`}
                  />
                </div>
                <span className="text-[9px] text-slate-500 font-mono-label">M{idx + 1}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-slate-700 rounded-sm" />
              <span>Ad Spend Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-sm" />
              <span>Gross Sales Revenue</span>
            </div>
          </div>
        </div>

        {/* Sync Action Callout */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Apply Bidding Strategy to Google Ads</div>
            <div className="text-[11px] text-slate-400">Target ROAS bidding strategy automatically configures max bid limits based on model.</div>
          </div>
          <button
            onClick={onSyncGoogleAds}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">cloud_sync</span>
            <span>Sync Strategy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
