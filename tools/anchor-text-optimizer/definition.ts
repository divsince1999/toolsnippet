import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "anchor-text-optimizer",
  "name": "Anchor Text Diversity & SEO Optimizer",
  "category": "Text",
  "shortDescription": "Classify anchor texts into Exact, Partial, Branded, Generic, and Naked URLs to audit link profile balance.",
  "heroTitle": "Anchor Text Diversity & Over-Optimization Optimizer",
  "heroDescription": "Audit internal and backlink anchor text distribution against Google Penguin guidelines to prevent over-optimization penalties.",
  "about": "The Anchor Text Diversity Optimizer categorizes your inbound links and internal link anchors into Exact Match, Partial Match, Branded, Generic, and Naked URL categories. It calculates percentage ratios against industry-standard SEO link profile thresholds.",
  "howToUse": [
    "Paste your list of anchor texts (one per line).",
    "Enter your Brand Name (e.g., 'ToolSnippet') and Target Primary Keyword (e.g., 'developer tools').",
    "Inspect the categorized breakdown and distribution percentages.",
    "Verify that exact match anchors remain within safe natural link thresholds (under 20%)."
  ],
  "whyUse": [
    "Protect your website from Google over-optimization penalties.",
    "Plan healthy internal linking structures for major content hubs.",
    "Audit competitor backlink profiles and guest post anchors.",
    "100% free client-side tool."
  ],
  "faqs": [
    {
      "question": "What is a healthy anchor text distribution?",
      "answer": "A natural link profile typically consists of ~40-50% Branded/Naked URLs, ~25-30% Partial Match, ~15-20% Generic ('click here', 'website'), and less than 15-20% Exact Match."
    },
    {
      "question": "What happens if exact match anchors are too high?",
      "answer": "Excessive exact match anchors can trigger algorithmic spam filters for unnatural link patterns."
    }
  ]
};
