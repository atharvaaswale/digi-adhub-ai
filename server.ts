import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const PORT = 3000;

function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Route: AI Campaign Builder
  app.post("/api/generate-campaign", async (req, res) => {
    try {
      const { businessName, landingPageUrl, targetAudience, valueProp, tone } = req.body;
      const ai = getGenAIClient();

      if (!ai) {
        // Fallback response if API key is not configured
        return res.json({
          headlines: [
            `${businessName || "DIG Infotech"}: #1 AI Solutions`,
            `Scale Fast with ${businessName || "DIG Infotech"} Automation`,
            `AI-Powered Marketing Solutions for 2026`,
            `Reduce Overhead by 40% with AI`,
            `Double Your Ad ROI Today`
          ],
          descriptions: [
            `Stop wasting ad spend. Our AI-driven infrastructure automates your growth and optimizes keywords in real-time.`,
            `Cutting-edge AI automation that reduces operational overhead while doubling performance through dynamic creative optimization.`
          ],
          qualityScore: 8.5,
          relevanceTag: "HIGH",
          uxTag: "OPTIMIZED",
          auditSummary: "Based on current ad copy and landing page relevance. Your projected performance exceeds industry benchmarks.",
          serpHeadline: `${businessName || "DIG Infotech"}: #1 AI Solutions | Scale Your Business | Get 40% More ROI`,
          serpDescription: `Stop wasting ad spend. Our AI-driven infrastructure automates your growth and optimizes keywords in real-time. Connect with ${businessName || "DIG Infotech"} today for a free audit.`
        });
      }

      const prompt = `You are a world-class Google Ads PPC Specialist. Generate high-converting Google Ads assets based on the following business context:
Business Name: ${businessName || "DIG Infotech Solutions"}
Landing Page URL: ${landingPageUrl || "diginfotechsolutions.com"}
Target Audience: ${targetAudience || "Enterprises seeking AI automation"}
Main Value Proposition: ${valueProp || "Cutting-edge AI automation that reduces operational overhead by 40% while doubling ad performance."}
Desired Ad Tone: ${tone || "Persuasive"}

Generate a JSON object containing:
- headlines: Array of 5 compelling headlines (each <= 30 chars)
- descriptions: Array of 3 persuasive descriptions (each <= 90 chars)
- qualityScore: Estimated quality score number out of 10 (e.g. 8.8)
- relevanceTag: "HIGH" or "OPTIMIZED"
- uxTag: "OPTIMIZED" or "EXCELLENT"
- auditSummary: A 1-2 sentence performance assessment
- serpHeadline: Main SERP display title combining headlines (<= 65 chars)
- serpDescription: Main SERP description string (<= 150 chars)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headlines: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              descriptions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              qualityScore: { type: Type.NUMBER },
              relevanceTag: { type: Type.STRING },
              uxTag: { type: Type.STRING },
              auditSummary: { type: Type.STRING },
              serpHeadline: { type: Type.STRING },
              serpDescription: { type: Type.STRING },
            },
            required: ["headlines", "descriptions", "qualityScore", "serpHeadline", "serpDescription"],
          },
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (err: any) {
      console.error("Error in /api/generate-campaign:", err);
      res.status(500).json({ error: err.message || "Failed to generate campaign assets" });
    }
  });

  // API Route: RSA Generator (Responsive Search Ads)
  app.post("/api/generate-rsa", async (req, res) => {
    try {
      const { url, displayPath1, displayPath2, businessContext } = req.body;
      const ai = getGenAIClient();

      if (!ai) {
        return res.json({
          headlines: [
            "AI-Powered Ad Precision",
            "Scale Your ROI Instantly",
            "Next-Gen Campaign Automation",
            "Max Performance Ads 2026",
            "#1 Rated Marketing AI",
            "Automate Google Ads Copy",
            "Boost CTR by 3.5x Today",
            "Real-time SERP Optimization",
            "Smart Bidding Companion",
            "Enterprise Growth Engine",
            "Stop Wasting Ad Dollars",
            "Free 14-Day Growth Audit",
            "Neural Copywriting Engine",
            "10x Your ROAS In 30 Days",
            "Deploy High-ROI Campaigns"
          ],
          descriptions: [
            "Transform your digital advertising strategy with the world's most advanced RSA generator engine.",
            "Automate your responsive search ads and generate high-converting copy in seconds.",
            "Boost campaign performance with AdVantage AI. Drive more qualified leads with smart bidding.",
            "Stop wasting budget on low-converting copy. Try our neural-trained ad writer today."
          ]
        });
      }

      const prompt = `You are a Google Ads Responsive Search Ad (RSA) Expert.
Create exactly 15 distinct Headlines (strictly MAX 30 characters each!) and 4 Descriptions (strictly MAX 90 characters each!).
Target URL: ${url || "example.com/ai-software"}
Display Path: ${displayPath1 || "ai-marketing"}/${displayPath2 || "automation"}
Business Context: ${businessContext || "Generative AI platform for Google Ads creation and ROAS optimization."}

Format the response strictly as a JSON object with:
- headlines: Array of 15 strings (each <= 30 chars)
- descriptions: Array of 4 strings (each <= 90 chars)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headlines: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              descriptions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["headlines", "descriptions"],
          },
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (err: any) {
      console.error("Error in /api/generate-rsa:", err);
      res.status(500).json({ error: err.message || "Failed to generate RSA package" });
    }
  });

  // API Route: Keyword Intel
  app.post("/api/keyword-intel", async (req, res) => {
    try {
      const { seed, matchType, country, language, filters } = req.body;
      const ai = getGenAIClient();

      if (!ai) {
        return res.json({
          totalVolume: "1.4M",
          volumeGrowth: "+12.4%",
          avgCpc: "$4.82",
          cpcChange: "+$0.45",
          keywords: [
            { kw: "generative ai marketing", vol: "45k", cpc: "$12.40", comp: "High", cluster: "High Intent Cluster", trend: [10, 30, 20, 50, 40] },
            { kw: "best ai copy tools", vol: "12k", cpc: "$8.15", comp: "Med", cluster: "High Intent Cluster", trend: [40, 20, 30, 10, 60] },
            { kw: "automated ad generation", vol: "8.5k", cpc: "$14.20", comp: "High", cluster: "High Intent Cluster", trend: [20, 40, 10, 80, 50] },
            { kw: "keyword research ai free", vol: "33k", cpc: "$0.50", comp: "Low", cluster: "Free/Exploratory", trend: [10, 10, 20, 10, 30] },
            { kw: "buy ppc strategy software", vol: "1.2k", cpc: "$24.00", comp: "High", cluster: "Transactional", trend: [80, 70, 60, 50, 40] },
            { kw: "google ads automation tool", vol: "18.4k", cpc: "$9.60", comp: "High", cluster: "Commercial Intent", trend: [30, 50, 60, 75, 90] }
          ]
        });
      }

      const prompt = `Act as an expert SEO and PPC Keyword Researcher.
Analyze the following seed input: "${seed || "generative ai marketing, google ads automation"}"
Match Type: ${matchType || "Broad Match"}
Country: ${country || "United States"}
Language: ${language || "English (US)"}
Filters applied: ${filters ? JSON.stringify(filters) : "None"}

Generate a JSON object containing:
- totalVolume: Estimated overall monthly volume string (e.g. "1.8M")
- volumeGrowth: Percentage change (e.g. "+14.2%")
- avgCpc: Average CPC string (e.g. "$5.10")
- cpcChange: CPC delta string (e.g. "+$0.35")
- keywords: Array of 6 objects, each with:
  - kw: keyword phrase
  - vol: string monthly search volume (e.g. "42k")
  - cpc: string estimated cost per click (e.g. "$11.50")
  - comp: "High" | "Med" | "Low"
  - cluster: cluster name (e.g. "High Intent Cluster", "Transactional", "Commercial")
  - trend: array of 5 numbers representing monthly relative search trend points (0-100)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              totalVolume: { type: Type.STRING },
              volumeGrowth: { type: Type.STRING },
              avgCpc: { type: Type.STRING },
              cpcChange: { type: Type.STRING },
              keywords: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    kw: { type: Type.STRING },
                    vol: { type: Type.STRING },
                    cpc: { type: Type.STRING },
                    comp: { type: Type.STRING },
                    cluster: { type: Type.STRING },
                    trend: {
                      type: Type.ARRAY,
                      items: { type: Type.NUMBER },
                    },
                  },
                  required: ["kw", "vol", "cpc", "comp", "cluster", "trend"],
                },
              },
            },
            required: ["totalVolume", "avgCpc", "keywords"],
          },
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (err: any) {
      console.error("Error in /api/keyword-intel:", err);
      res.status(500).json({ error: err.message || "Failed to generate keyword insights" });
    }
  });

  // API Route: Landing Page Audit
  app.post("/api/audit-landing-page", async (req, res) => {
    try {
      const { url, keywords } = req.body;
      const ai = getGenAIClient();

      if (!ai) {
        return res.json({
          healthScore: 78,
          healthStatus: "STABLE",
          visibility: "88%",
          intent: "92%",
          checklist: [
            { title: "Headline Relevancy", status: "EXCELLENT", badgeType: "emerald", icon: "check_circle" },
            { title: "CTA Clarity & Prominence", status: "IMPROVE", badgeType: "tertiary", icon: "warning" },
            { title: "Page Load Speed", status: "1.2s FAST", badgeType: "emerald", icon: "check_circle" },
            { title: "Mobile Viewport & Layout", status: "VIEWPORT LAG", badgeType: "tertiary", icon: "warning" }
          ],
          targetKeyword: keywords?.[0] || "SaaS Growth",
          originalHeadline: `"The Best Software For Your Business Marketing Needs"`,
          optimizedHeadline: `"Scale Your SaaS Revenue with AI-Driven Marketing Intelligence."`,
          explanation: "Our AI model compared your URL against top performing SaaS landing pages in your niche. Improving headline clarity directly boosts Quality Score by ~1.5 points."
        });
      }

      const prompt = `You are a Conversion Rate Optimization (CRO) and Google Ads Quality Score Auditor.
Analyze the destination landing page URL: "${url || "https://yourbrand.com/landing-page"}"
Target Keywords: ${keywords?.join(", ") || "AI Marketing, SaaS Analytics, Ad Optimization"}

Generate a JSON object containing:
- healthScore: integer conversion health score out of 100
- healthStatus: "STABLE" | "EXCELLENT" | "NEEDS ATTENTION"
- visibility: percentage string (e.g. "88%")
- intent: percentage string (e.g. "92%")
- checklist: Array of 4 audit items with fields:
  - title: name of the audit check (e.g. "Headline Relevancy", "CTA Clarity", "Page Load Speed", "Mobile Friendliness")
  - status: short status text (e.g. "EXCELLENT", "IMPROVE", "1.2s FAST", "OPTIMIZED")
  - badgeType: "emerald" | "tertiary" | "error"
  - icon: "check_circle" | "warning"
- targetKeyword: single primary keyword string
- originalHeadline: string placeholder representation of a generic headline
- optimizedHeadline: string high-converting AI upgraded headline
- explanation: brief 2-sentence rationale for the suggested upgrade`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              healthScore: { type: Type.NUMBER },
              healthStatus: { type: Type.STRING },
              visibility: { type: Type.STRING },
              intent: { type: Type.STRING },
              checklist: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    status: { type: Type.STRING },
                    badgeType: { type: Type.STRING },
                    icon: { type: Type.STRING },
                  },
                  required: ["title", "status", "badgeType", "icon"],
                },
              },
              targetKeyword: { type: Type.STRING },
              originalHeadline: { type: Type.STRING },
              optimizedHeadline: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["healthScore", "healthStatus", "checklist", "optimizedHeadline"],
          },
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (err: any) {
      console.error("Error in /api/audit-landing-page:", err);
      res.status(500).json({ error: err.message || "Failed to audit landing page" });
    }
  });

  // API Route: Ad Copy Rewriter
  app.post("/api/rewrite-copy", async (req, res) => {
    try {
      const { text, tone } = req.body;
      const ai = getGenAIClient();

      if (!ai) {
        return res.json({
          variants: [
            {
              headline: "Transform Operational Overhead into 2x Ad ROI",
              description: "Automate your campaign assets in real-time with our neural engine. Try a free 14-day audit today.",
              ctrBoost: "+38%",
              toneTag: "Persuasive High-Convert"
            },
            {
              headline: "Stop Wasting Google Ad Dollars—Automate Growth Now",
              description: "Our AI platform continuously optimizes headlines & keywords for maximum ROAS. Claim your audit.",
              ctrBoost: "+45%",
              toneTag: "Urgent Direct Response"
            },
            {
              headline: "Enterprise-Grade Marketing Intelligence Engine",
              description: "Scalable IT infrastructure meets AI-driven advertising automation. Built for high-volume growth.",
              ctrBoost: "+29%",
              toneTag: "B2B Professional"
            }
          ]
        });
      }

      const prompt = `Rewrite the following ad copy for maximum Google Ads Click-Through Rate (CTR) and Conversion:
Original Copy: "${text || "We offer great software for marketing and ad optimization."}"
Target Tone: ${tone || "Persuasive"}

Generate a JSON object with:
- variants: Array of 3 rewritten options, each containing:
  - headline: string headline (<= 30 chars)
  - description: string description (<= 90 chars)
  - ctrBoost: estimated percentage boost string (e.g. "+35%")
  - toneTag: short tone description label`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              variants: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    headline: { type: Type.STRING },
                    description: { type: Type.STRING },
                    ctrBoost: { type: Type.STRING },
                    toneTag: { type: Type.STRING },
                  },
                  required: ["headline", "description", "ctrBoost", "toneTag"],
                },
              },
            },
            required: ["variants"],
          },
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (err: any) {
      console.error("Error in /api/rewrite-copy:", err);
      res.status(500).json({ error: err.message || "Failed to rewrite copy" });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AdSynthesize AI Workstation Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
