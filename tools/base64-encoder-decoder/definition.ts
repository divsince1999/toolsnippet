import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "base64-encoder-decoder",
  "name": "Base64 Encoder/Decoder",
  "category": "Encoding",
  "shortDescription": "Encode and decode Base64 text quickly.",
  "heroTitle": "Encode and decode Base64 instantly",
  "heroDescription": "Useful for auth headers, tokens, and payload experiments while testing integrations.",
  "about": "This tool converts plain text to Base64 and back, making it practical for API testing and debugging.",
  "howToUse": [
    "Enter plain text or Base64 text.",
    "Choose Encode or Decode.",
    "Copy the result into your app, request, or script."
  ],
  "whyUse": [
    "Helpful for quick auth and payload checks.",
    "Avoids writing throwaway scripts for simple conversions.",
    "Runs directly in the browser."
  ],
  "faqs": [
    {
      "question": "Is Base64 encryption?",
      "answer": "No. Base64 is encoding, not encryption."
    },
    {
      "question": "Why does decode fail sometimes?",
      "answer": "The input must be valid Base64 text."
    }
  ],
  "features": [
    "Encode and decode instantly",
    "UTF-8 support",
    "Browser-based",
    "One-click copy",
    "No data upload"
  ],
  "tips": [
    "Base64 is encoding, not encryption",
    "Double-check UTF-8 encoding for special characters",
    "Never store secrets as Base64 expecting security",
    "Use for auth headers and tokens"
  ]
};
