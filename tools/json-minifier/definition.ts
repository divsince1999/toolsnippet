import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-minifier",
  "name": "JSON Minifier",
  "category": "Data",
  "shortDescription": "Compress JSON data by removing whitespace and comments.",
  "heroTitle": "Minify JSON for production",
  "heroDescription": "Reduce the size of your JSON payloads for faster transmission and storage.",
  "about": "JSON Minifier removes all unnecessary whitespace, newlines, and indentation from your JSON data.",
  "howToUse": [
    "Paste your formatted JSON.",
    "Click Minify JSON.",
    "Copy the compact result."
  ],
  "whyUse": [
    "Reduces payload size.",
    "Faster API responses.",
    "Saves storage space."
  ],
  "faqs": [
    {
      "question": "Is minified JSON still valid?",
      "answer": "Yes, minification only affects formatting, not the data structure."
    }
  ],
  "features": [
    "Minify JSON instantly",
    "Remove all whitespace",
    "Reduce payload size",
    "Faster data transfer",
    "Maintain data integrity"
  ],
  "tips": [
    "Use for production API responses",
    "Reduces bandwidth usage",
    "Keep a formatted copy for debugging",
    "Test minified output before deployment"
  ]
};
