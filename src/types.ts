export type MainNavTab = 'campaigns' | 'reporting' | 'assets';

export type ToolView =
  | 'ai_builder'
  | 'rsa_gen'
  | 'pmax_gen'
  | 'ad_rewriter'
  | 'keyword_intel'
  | 'negative_kw'
  | 'competitor_analysis'
  | 'landing_audit'
  | 'quality_score'
  | 'conversion_checker'
  | 'roas_calc'
  | 'budget_planner';

export interface CampaignFormData {
  businessName: string;
  landingPageUrl: string;
  targetAudience: string;
  valueProp: string;
  tone: string;
}

export interface GeneratedHeadline {
  id: string;
  text: string;
  charCount: number;
  pinned: boolean;
  pinPosition?: number;
}

export interface GeneratedDescription {
  id: string;
  text: string;
  charCount: number;
  pinned: boolean;
  pinPosition?: number;
}

export interface CampaignGenerationResult {
  headlines: GeneratedHeadline[];
  descriptions: GeneratedDescription[];
  qualityScore: number;
  relevanceTag: string;
  uxTag: string;
  auditSummary: string;
  serpHeadline: string;
  serpDescription: string;
}

export interface KeywordItem {
  id: string;
  kw: string;
  vol: string;
  cpc: string;
  comp: 'High' | 'Med' | 'Low';
  cluster: string;
  trend: number[];
  selected?: boolean;
}

export interface AuditChecklistItem {
  title: string;
  status: string;
  badgeType: 'emerald' | 'tertiary' | 'error';
  icon: 'check_circle' | 'warning' | 'error';
}

export interface AuditResult {
  healthScore: number;
  healthStatus: string;
  visibility: string;
  intent: string;
  checklist: AuditChecklistItem[];
  targetKeyword: string;
  originalHeadline: string;
  optimizedHeadline: string;
  explanation: string;
}

export interface CopyRewriteVariant {
  id: string;
  headline: string;
  description: string;
  ctrBoost: string;
  toneTag: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
}
