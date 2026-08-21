import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "html-entity-encoder",
  "name": "HTML Entity Encoder",
  "category": "Encoding",
  "shortDescription": "Encode special characters into HTML entities.",
  "heroTitle": "Secure your HTML",
  "heroDescription": "Prevent XSS by encoding special characters like <, >, and &.",
  "about": "HTML Entity Encoder makes your content safe for display in HTML documents.",
  "howToUse": [
    "Paste your text.",
    "Click Encode.",
    "Copy the entity-encoded result."
  ],
  "whyUse": [
    "Prevents security issues.",
    "Ensures correct rendering.",
    "Handles special symbols."
  ],
  "faqs": [
    {
      "question": "What characters are encoded?",
      "answer": "All characters that have special meaning in HTML."
    }
  ],
  "features": [
    "Encode special characters instantly",
    "Prevent XSS attacks",
    "Handle all HTML entities",
    "One-click copy",
    "Security-focused"
  ],
  "tips": [
    "Use for user-generated content",
    "Prevent XSS vulnerabilities",
    "Encode before displaying in HTML",
    "Great for security hardening"
  ]
};
