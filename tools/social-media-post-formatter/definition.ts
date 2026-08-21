import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "social-media-post-formatter",
  "name": "Social Media Unicode Font Formatter",
  "category": "Text",
  "shortDescription": "Convert plain text into Unicode bold, italic, monospace, cursive, and gothic font styles for social posts.",
  "heroTitle": "Free Social Media Unicode Font & Bio Formatter",
  "heroDescription": "Format custom aesthetic text for Twitter/X, LinkedIn, Instagram, Discord, and TikTok using mathematical Unicode symbols.",
  "about": "The Social Media Unicode Font Formatter converts standard ASCII text into stylized Mathematical Alphanumeric Unicode symbols. Because these are standard Unicode characters rather than rich text fonts, they can be pasted directly into social media bios, tweets, LinkedIn posts, and messaging apps.",
  "howToUse": [
    "Type or paste your social media update or bio into the input area.",
    "Browse the real-time converted Unicode styles (Bold, Italic, Monospace, Cursive, Gothic, etc.).",
    "Click 'Copy' on any font style to copy it directly to your clipboard.",
    "Paste your stylized text into Twitter/X, LinkedIn, Instagram, or Discord."
  ],
  "whyUse": [
    "Make important announcements stand out on Twitter and LinkedIn feeds.",
    "Format bold headlines and italic accents without markdown support.",
    "Create aesthetic profile bios and captions for Instagram and TikTok.",
    "Works universally across modern operating systems, iOS, and Android."
  ],
  "faqs": [
    {
      "question": "Why do these fonts work on Twitter and LinkedIn?",
      "answer": "These are not CSS fonts; they are standardized Mathematical Alphanumeric Unicode characters (like 𝐁, 𝘐, 𝙼) that modern devices and social networks render naturally as text."
    },
    {
      "question": "Are Unicode fonts accessible to screen readers?",
      "answer": "Some screen readers may spell out mathematical symbol names. Use stylized fonts sparingly for emphasis and headlines rather than whole paragraphs."
    }
  ]
};
