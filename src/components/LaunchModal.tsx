import React, { useState, useEffect } from 'react';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setProgress(0);
      return;
    }

    const timer1 = setTimeout(() => {
      setStep(1);
      setProgress(30);
    }, 1000);

    const timer2 = setTimeout(() => {
      setStep(2);
      setProgress(65);
    }, 2500);

    const timer3 = setTimeout(() => {
      setStep(3);
      setProgress(100);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">cloud_upload</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Google Ads Campaign Sync Engine</h3>
              <p className="text-xs text-slate-400">Account CID: 482-910-3301 (DIG Infotech Solutions)</p>
            </div>
          </div>

          {step === 3 && (
            <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">
              ×
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono-label">
            <span className="text-slate-300">Syncing Assets to Google Ads API</span>
            <span className="text-indigo-400 font-bold">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-indigo-600 to-cyan-400 transition-all duration-700"
            />
          </div>
        </div>

        {/* Step Items */}
        <div className="space-y-3 text-xs">
          {[
            { id: 1, title: 'RSA & Copy Asset Verification', desc: 'Validating 15 headlines & 4 descriptions against Google Ads policies.' },
            { id: 2, title: 'Multi-Channel PMax Media Asset Upload', desc: 'Syncing landscape, square, and vertical banners to asset library.' },
            { id: 3, title: 'Target ROAS Bidding Strategy Applied', desc: 'Campaign status is now LIVE in Google Ads Account (CID: 482-910-3301).' },
          ].map((item) => {
            const isDone = step >= item.id;
            const isCurrent = step === item.id - 1;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  isDone
                    ? 'bg-indigo-950/40 border-indigo-800/60 text-slate-200'
                    : isCurrent
                    ? 'bg-slate-950 border-slate-800 text-slate-300 animate-pulse'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : isCurrent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {isDone ? '✓' : item.id}
                </div>
                <div>
                  <div className="font-semibold text-slate-200">{item.title}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {step === 3 ? (
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span>Return to Workstation Dashboard</span>
          </button>
        ) : (
          <div className="text-center text-[11px] text-slate-500 font-mono-label animate-pulse">
            Establishing secure OAuth handshake with Google Ads API...
          </div>
        )}
      </div>
    </div>
  );
};
