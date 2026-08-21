import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "meta-description-previewer",
  "name": "Google SERP Snippet & Meta Previewer",
  "category": "Text",
  "shortDescription": "Simulate live Google Search desktop and mobile snippets with pixel-width measurement and truncation checks.",
  "heroTitle": "Google SERP Snippet & Meta Description Simulator",
  "heroDescription": "Preview exactly how your page title, meta description, and URL will appear in Google search results on desktop and mobile viewports.",
  "about": "The Google SERP Snippet Previewer renders a realistic search result simulator. Google calculates title truncation based on pixel width (typically ~580–600px desktop) rather than strict character counts. This tool measures both pixel width and character length in real time to prevent truncation ellipsis (...).",
  "howToUse": [
    "Enter your page Title tag, Meta Description, and Target Canonical URL.",
    "Toggle between Desktop Search and Mobile Search previews.",
    "Monitor the real-time pixel width and character counters.",
    "Ensure your title is under 600px (~60 characters) and description is between 120 and 160 characters."
  ],
  "whyUse": [
    "Avoid embarrassing cut-offs in Google search results.",
    "Optimize click-through rates (CTR) by perfecting snippet copy length.",
    "Test bold search keyword matching and favicon branding.",
    "100% free, real-time client-side calculation."
  ],
  "faqs": [
    {
      "question": "What is the pixel limit for Google titles?",
      "answer": "Google allocates roughly 600 pixels of width for desktop search titles and about 960 pixels on mobile devices. Titles exceeding ~60 characters or 580px are typically truncated with an ellipsis (...)."
    },
    {
      "question": "What is the recommended meta description length?",
      "answer": "Google generally displays up to 960 pixels on mobile and around 155–160 characters on desktop search results."
    }
  ]
};
