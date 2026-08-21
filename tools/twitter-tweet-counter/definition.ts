import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "twitter-tweet-counter",
  "name": "Twitter / X Thread Splitter & Counter",
  "category": "Text",
  "shortDescription": "Calculate weighted 280-character Twitter limits and automatically split long paragraphs into numbered threads.",
  "heroTitle": "Twitter / X Thread Splitter & Character Counter",
  "heroDescription": "Count exact weighted characters for X/Twitter posts and split long text into numbered thread tweets (1/n) automatically.",
  "about": "The Twitter / X Thread Splitter & Counter calculates Twitter's official character rules (URLs count as 23 characters, emojis count as 2 characters). When text exceeds 280 characters, it intelligently breaks sentences into clean, numbered thread segments (1/N, 2/N) with 1-click copy buttons.",
  "howToUse": [
    "Paste or write your long thought, announcement, or essay.",
    "Inspect the character count and remaining character limit for single tweets.",
    "If text exceeds 280 chars, view the generated multi-tweet thread.",
    "Copy individual numbered tweets or click 'Copy Entire Thread'."
  ],
  "whyUse": [
    "Auto-split essays into viral, readable Twitter/X threads.",
    "Account for weighted emoji and short link (t.co) length rules.",
    "Preserve natural sentence endings without cutting off mid-word.",
    "100% client-side with instant formatting."
  ],
  "faqs": [
    {
      "question": "How does Twitter calculate URL character length?",
      "answer": "Twitter automatically wraps all URLs in its t.co shortener, which occupies exactly 23 characters regardless of the original link length."
    },
    {
      "question": "How does thread splitting preserve formatting?",
      "answer": "The algorithm breaks paragraphs and sentences cleanly before 280 characters, reserving space for the '(1/N)' thread counter suffix."
    }
  ]
};
