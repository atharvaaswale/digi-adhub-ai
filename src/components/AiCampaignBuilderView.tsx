import React, { useState } from 'react';
import { CampaignFormData, CampaignGenerationResult } from '../types';

interface AiCampaignBuilderViewProps {
  onLaunchCampaign: () => void;
}

export const AiCampaignBuilderView: React.FC<AiCampaignBuilderViewProps> = ({ onLaunchCampaign }) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    businessName: 'DIG Infotech Solutions',
    landingPageUrl: 'https://diginfotechsolutions.com',
    targetAudience: 'CTOs, Marketing Directors, Enterprise SaaS Executives',
    valueProp: 'Cutting-edge AI automation that reduces operational overhead by 40% while doubling ad performance.',
    tone: 'Persuasive',
  });

  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('desktop');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'inputs' | 'preview'>('inputs');

  const [campaignResult, setCampaignResult] = useState<CampaignGenerationResult>({
    headlines: [
      { id: '1', text: 'DIG Infotech: #1 AI Solutions', charCount: 28, pinned: true, pinPosition: 1 },
      { id: '2', text: 'Scale Fast with AI Automation', charCount: 29, pinned: true, pinPosition: 2 },
      { id: '3', text: 'AI Marketing Software 2026', charCount: 26, pinned: false },
      { id: '4', text: 'Reduce Operational Overhead', charCount: 27, pinned: false },
      { id: '5', text: 'Double Your Ad ROI Today', charCount: 24, pinned: false },
    ],
    descriptions: [
      {
        id: 'd1',
        text: 'Stop wasting ad spend. Our AI-driven infrastructure automates your growth and optimizes keywords in real-time.',
        charCount: 114,
        pinned: true,
      },
      {
        id: 'd2',
        text: 'Cutting-edge AI automation that reduces operational overhead while doubling performance through dynamic creative optimization.',
        charCount: 128,
        pinned: false,
      },
    ],
    qualityScore: 8.5,
    relevanceTag: 'HIGH',
    uxTag: 'OPTIMIZED',
    auditSummary: 'Based on current ad copy and landing page relevance. Your projected performance exceeds industry benchmarks.',
    serpHeadline: 'DIG Infotech: #1 AI Solutions | Scale Fast with AI Automation',
    serpDescription: 'Stop wasting ad spend. Our AI-driven infrastructure automates your growth and optimizes keywords in real-time. Connect with DIG Infotech today.',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.headlines) {
        setCampaignResult({
          headlines: data.headlines.map((text: string, idx: number) => ({
            id: `h-${idx}-${Date.now()}`,
            text,
            charCount: text.length,
            pinned: idx < 2,
            pinPosition: idx < 2 ? idx + 1 : undefined,
          })),
          descriptions: (data.descriptions || []).map((text: string, idx: number) => ({
            id: `d-${idx}-${Date.now()}`,
            text,
            charCount: text.length,
            pinned: idx === 0,
          })),
          qualityScore: data.qualityScore || 8.8,
          relevanceTag: data.relevanceTag || 'HIGH',
          uxTag: data.uxTag || 'OPTIMIZED',
          auditSummary: data.auditSummary || 'High quality score predicted based on landing page alignment.',
          serpHeadline: data.serpHeadline || `${formData.businessName}: #1 AI Solutions`,
          serpDescription: data.serpDescription || formData.valueProp,
        });
        showToast('AI Campaign Assets Generated Successfully!');
      }
    } catch (err) {
      console.error('Generation error:', err);
      showToast('Failed to connect to AI server. Using local fallback generator.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePin = (id: string) => {
    setCampaignResult((prev) => ({
      ...prev,
      headlines: prev.headlines.map((h) => (h.id === id ? { ...h, pinned: !h.pinned } : h)),
    }));
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto custom-scrollbar p-3 sm:p-4 lg:p-6 gap-5 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-medium">{toastMessage}</span>
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
          <span>Live Preview</span>
        </button>
      </div>

      {/* Left Input Control Panel */}
      <div className={`w-full lg:w-[480px] xl:w-[520px] flex-col gap-5 shrink-0 ${mobileTab === 'inputs' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400 text-xl">auto_awesome</span>
              <h2 className="text-base font-bold text-white">AI Campaign Configurator</h2>
            </div>
            <span className="text-[10px] font-mono-label bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
              RSA + PMAX
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5 text-xs">
            {/* Business Name */}
            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                <span>Business Name</span>
                <span className="text-[10px] text-slate-400 font-mono-label">Required</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="e.g. DIG Infotech Solutions"
              />
            </div>

            {/* Landing Page URL */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Landing Page URL</label>
              <input
                type="url"
                value={formData.landingPageUrl}
                onChange={(e) => setFormData({ ...formData, landingPageUrl: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors font-mono-label"
                placeholder="https://yourbrand.com/landing"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Persona & Ideal Customer</label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="CTOs, Marketing Managers, SMB Owners"
              />
            </div>

            {/* Value Prop */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Main Value Proposition</label>
              <textarea
                rows={3}
                value={formData.valueProp}
                onChange={(e) => setFormData({ ...formData, valueProp: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="Highlight key benefits, metrics, discounts or unique features..."
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Ad Copy Tone & Style</label>
              <div className="flex flex-wrap gap-1.5">
                {['Persuasive', 'Urgent', 'Professional', 'Playful', 'Direct Response'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, tone: t })}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      formData.tone === t
                        ? 'bg-indigo-600 text-white border border-indigo-400 shadow-sm shadow-indigo-600/30'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Run Action Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-cyan-400 transition-all disabled:opacity-50 ai-glow-button mt-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Neural Copy...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                <span>Run AI Audit & Generate Campaign</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Inspector & Live SERP Panel */}
      <div className={`flex-1 flex-col gap-5 min-w-0 ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        {/* SERP Live Preview Card */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400 text-lg">preview</span>
              <h3 className="text-sm font-bold text-white">Google Search Live SERP Preview</h3>
            </div>
            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1 rounded text-xs transition-colors ${
                  previewDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <span className="material-symbols-outlined text-sm">desktop_windows</span>
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1 rounded text-xs transition-colors ${
                  previewDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <span className="material-symbols-outlined text-sm">smartphone</span>
              </button>
            </div>
          </div>

          {/* Google Search Mock Container */}
          <div
            className={`mx-auto bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-sans transition-all ${
              previewDevice === 'mobile' ? 'max-w-sm' : 'w-full'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold text-slate-200 bg-slate-800/80 px-1.5 py-0.5 rounded">
                Sponsored
              </span>
              <span className="text-[11px] text-slate-400 font-mono-label truncate">
                {formData.landingPageUrl || 'diginfotechsolutions.com'}
              </span>
            </div>

            <div className="text-indigo-400 hover:underline font-medium text-base leading-snug cursor-pointer mb-1.5">
              {campaignResult.serpHeadline}
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              {campaignResult.serpDescription}
            </p>

            {/* Ad Sitelinks Preview */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-900 text-[11px]">
              <div className="text-indigo-300 font-medium hover:underline cursor-pointer">
                • AI Case Studies & ROI
              </div>
              <div className="text-indigo-300 font-medium hover:underline cursor-pointer">
                • Request Free 14-Day Audit
              </div>
            </div>
          </div>
        </div>

        {/* Generated Headlines & Quality Score Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Quality Score Analysis Card */}
          <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Quality Score Gauge</span>
              <span className="material-symbols-outlined text-indigo-400 text-sm">speed</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-extrabold text-white flex items-baseline gap-1">
                <span>{campaignResult.qualityScore}</span>
                <span className="text-xs text-slate-400 font-normal">/ 10</span>
              </div>
              <div className="space-y-1 text-right">
                <span className="block text-[10px] font-mono-label bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                  Relevance: {campaignResult.relevanceTag}
                </span>
                <span className="block text-[10px] font-mono-label bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                  UX: {campaignResult.uxTag}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
              {campaignResult.auditSummary}
            </p>
          </div>

          {/* Headlines Card List */}
          <div className="md:col-span-2 p-4 rounded-xl glass-card border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Generated Headlines ({campaignResult.headlines.length})
              </span>
              <span className="text-[10px] text-slate-400 font-mono-label">Google Ads Cap: 30 Chars</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
              {campaignResult.headlines.map((h) => (
                <div
                  key={h.id}
                  className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-between group hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <button
                      onClick={() => togglePin(h.id)}
                      className={`p-1 rounded text-xs transition-colors ${
                        h.pinned ? 'text-indigo-400 bg-indigo-950/80' : 'text-slate-600 hover:text-slate-300'
                      }`}
                      title={h.pinned ? 'Unpin Headline' : 'Pin Headline'}
                    >
                      <span className="material-symbols-outlined text-sm">push_pin</span>
                    </button>
                    <span className="text-xs text-slate-200 font-medium truncate">{h.text}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono-label px-1.5 py-0.5 rounded ${
                        h.charCount <= 30 ? 'text-slate-400 bg-slate-800' : 'text-red-400 bg-red-950'
                      }`}
                    >
                      {h.charCount}/30
                    </span>
                    <button
                      onClick={() => handleCopy(h.id, h.text)}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Copy text"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copiedId === h.id ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Floating Action Bar */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">Ready for Google Ads Sync</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const all = campaignResult.headlines.map((h) => h.text).join('\n');
                navigator.clipboard.writeText(all);
                showToast('Copied all headlines to clipboard!');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              Copy All Headlines
            </button>

            <button
              onClick={onLaunchCampaign}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              <span>Sync to Google Ads</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
