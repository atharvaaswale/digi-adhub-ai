import React, { useState } from 'react';
import { MainNavTab, ToolView } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AiCampaignBuilderView } from './components/AiCampaignBuilderView';
import { RsaGeneratorView } from './components/RsaGeneratorView';
import { PMaxAssetGenView } from './components/PMaxAssetGenView';
import { AdCopyRewriterView } from './components/AdCopyRewriterView';
import { KeywordResearchView } from './components/KeywordResearchView';
import { LandingPageAuditView } from './components/LandingPageAuditView';
import { RoasCalculatorView } from './components/RoasCalculatorView';
import { ReportingView } from './components/ReportingView';
import { AssetLibraryView } from './components/AssetLibraryView';
import { LaunchModal } from './components/LaunchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('campaigns');
  const [currentView, setCurrentView] = useState<ToolView>('ai_builder');
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const showGlobalToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 3000);
  };

  const handleSaveDraft = () => {
    showGlobalToast('Workspace Draft Saved Successfully!');
  };

  return (
    <div className="h-screen w-screen max-w-full flex flex-col bg-[#020617] text-[#dae2fd] overflow-x-hidden overflow-y-hidden">
      {/* Global Toast Notification */}
      {globalToast && (
        <div className="fixed top-20 right-6 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-medium">{globalToast}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLaunchCampaign={() => setIsLaunchModalOpen(true)}
        onSaveDraft={handleSaveDraft}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 w-full max-w-full overflow-x-hidden overflow-y-hidden">
        {/* Left Sidebar Navigation & Mobile Drawer */}
        <Sidebar
          currentView={currentView}
          onSelectView={setCurrentView}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === 'campaigns' && (
          <main className="flex-1 flex flex-col min-w-0 max-w-full bg-[#020617] overflow-y-auto lg:overflow-hidden">
            {currentView === 'ai_builder' && (
              <AiCampaignBuilderView onLaunchCampaign={() => setIsLaunchModalOpen(true)} />
            )}
            {currentView === 'rsa_gen' && <RsaGeneratorView />}
            {currentView === 'pmax_gen' && <PMaxAssetGenView />}
            {currentView === 'ad_rewriter' && <AdCopyRewriterView />}
            {currentView === 'keyword_intel' && <KeywordResearchView />}
            {currentView === 'negative_kw' && <KeywordResearchView />}
            {currentView === 'competitor_analysis' && <KeywordResearchView />}
            {currentView === 'landing_audit' && <LandingPageAuditView />}
            {currentView === 'quality_score' && <LandingPageAuditView />}
            {currentView === 'conversion_checker' && <LandingPageAuditView />}
            {currentView === 'roas_calc' && (
              <RoasCalculatorView onSyncGoogleAds={() => setIsLaunchModalOpen(true)} />
            )}
            {currentView === 'budget_planner' && (
              <RoasCalculatorView onSyncGoogleAds={() => setIsLaunchModalOpen(true)} />
            )}
          </main>
        )}

        {activeTab === 'reporting' && <ReportingView />}
        {activeTab === 'assets' && <AssetLibraryView />}
      </div>

      {/* Launch Campaign Modal */}
      <LaunchModal isOpen={isLaunchModalOpen} onClose={() => setIsLaunchModalOpen(false)} />
    </div>
  );
}
