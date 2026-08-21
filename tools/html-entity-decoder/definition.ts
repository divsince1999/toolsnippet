import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "html-entity-decoder",
  "name": "HTML Entity Decoder",
  "category": "Encoding",
  "shortDescription": "Decode HTML entities back to characters.",
  "heroTitle": "Restore HTML entities",
  "heroDescription": "Convert entities like &amp; back into their original characters.",
  "about": "HTML Entity Decoder helps in reading encoded HTML content or data from APIs.",
  "howToUse": [
    "Paste encoded text.",
    "Click Decode.",
    "Read the original characters."
  ],
  "whyUse": [
    "Data cleanup.",
    "Debugging encoded text.",
    "API integration."
  ],
  "faqs": [
    {
      "question": "Does it support numeric entities?",
      "answer": "Yes, both named and numeric entities are supported."
    }
  ],
  "features": [
    "Decode HTML entities instantly",
    "Support named and numeric entities",
    "Restore original characters",
    "One-click copy",
    "Handle all entity types"
  ],
  "tips": [
    "Use for reading encoded content",
    "Debug API responses",
    "Clean up encoded text",
    "Great for data processing"
  ]
};
