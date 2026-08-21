import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "ad-copy-character-counter",
  "name": "Ad Copy Character & Limit Validator",
  "category": "Text",
  "shortDescription": "Validate character limits and guidelines for Google Ads, Meta/Facebook, LinkedIn, and X/Twitter Ads.",
  "heroTitle": "Google Ads & Social Ad Copy Limit Validator",
  "heroDescription": "Check character counts, line breaks, and policy limits for Google Search Ads, Facebook Ads, and LinkedIn campaigns.",
  "about": "The Ad Copy Character & Limit Validator helps digital marketers draft and verify advertising copy against strict platform character boundaries. It calculates live character usage across headlines, descriptions, and path fields for Google Search Ads, Meta/Facebook Ads, and LinkedIn sponsored content.",
  "howToUse": [
    "Select your ad platform (Google Search Ads, Meta Ads, LinkedIn, or Twitter/X).",
    "Fill in headlines, descriptions, and display paths.",
    "Monitor the live character count indicators and warnings.",
    "Copy compliant ad assets directly into Google Ads Editor or Meta Ads Manager."
  ],
  "whyUse": [
    "Prevent costly ad rejections and truncation across ad networks.",
    "Maximize visual ad real estate within platform character allowances.",
    "Draft multi-headline responsive search ads (RSAs) efficiently.",
    "100% free and client-side."
  ],
  "faqs": [
    {
      "question": "What are the character limits for Google Responsive Search Ads (RSA)?",
      "answer": "Google RSAs allow up to 15 headlines (max 30 characters each), up to 4 descriptions (max 90 characters each), and 2 display path fields (max 15 characters each)."
    },
    {
      "question": "What is the recommended character count for Facebook ad primary text?",
      "answer": "While Meta supports up to 125 characters before the 'See More' cutoff on mobile feeds, total supported length is up to 2,000+ characters."
    }
  ]
};
