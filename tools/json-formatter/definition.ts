import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-formatter",
  "name": "JSON Formatter",
  "category": "Data",
  "shortDescription": "Format and validate JSON with instant error feedback.",
  "heroTitle": "Format and validate JSON fast",
  "heroDescription": "Beautify API payloads and instantly catch invalid JSON before shipping code.",
  "about": "JSON Formatter is useful for debugging API responses, request bodies, and config files during daily development.",
  "howToUse": [
    "Paste JSON in the input box.",
    "Click Format JSON to prettify and validate.",
    "If invalid, review the shown error and fix the source."
  ],
  "whyUse": [
    "Readable JSON speeds up debugging.",
    "Validation catches syntax mistakes early.",
    "No need to switch to external formatter sites."
  ],
  "faqs": [
    {
      "question": "Will this fix invalid JSON automatically?",
      "answer": "It shows parse errors, but you still edit the source manually."
    },
    {
      "question": "Can I minify JSON too?",
      "answer": "Yes, use the Minify JSON action on this page."
    }
  ],
  "features": [
    "Beautify JSON instantly",
    "Validate JSON syntax",
    "Minify JSON",
    "Client-side processing",
    "Works on mobile"
  ],
  "tips": [
    "Validate before formatting",
    "Remove trailing commas if parsing fails",
    "Large files may take slightly longer",
    "Check for escaped characters"
  ]
};
