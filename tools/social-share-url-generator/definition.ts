import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "social-share-url-generator",
  "name": "Social Share URL & Intent Link Builder",
  "category": "Text",
  "shortDescription": "Generate 1-click social sharing links for Twitter/X, LinkedIn, Facebook, WhatsApp, Reddit, and Telegram.",
  "heroTitle": "Free Social Share URL & Intent Link Builder",
  "heroDescription": "Build clean, URL-encoded social sharing intent links with custom text, URLs, hashtags, and mentions.",
  "about": "The Social Share URL & Intent Link Builder creates instant, click-to-share URLs for all major social networks and messaging platforms (X/Twitter, LinkedIn, Facebook, WhatsApp, Reddit, Telegram, and Email).",
  "howToUse": [
    "Enter your Target URL, Title, and optional Share Text/Hashtags.",
    "Inspect the generated share links for each social platform.",
    "Test the live share buttons or copy the direct intent URLs.",
    "Integrate the share links into your blog templates or web apps."
  ],
  "whyUse": [
    "Eliminate heavy third-party tracking scripts by using lightweight vanilla HTML share links.",
    "Properly encode spaces, emojis, and special characters in share payloads.",
    "Pre-populate hashtags and Twitter handles automatically.",
    "100% free and client-side."
  ],
  "faqs": [
    {
      "question": "Why use URL intent links instead of social SDKs?",
      "answer": "Direct intent links require 0 KB of external JavaScript, preserve user privacy, and load instantaneously without slowing down Core Web Vitals."
    },
    {
      "question": "How do WhatsApp and Telegram share links work on mobile?",
      "answer": "They automatically open the native WhatsApp or Telegram apps on mobile devices with the message pre-filled in the chat composer."
    }
  ]
};
