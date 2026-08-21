import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-validator",
  "name": "JSON Validator",
  "category": "Validation",
  "shortDescription": "Check if your JSON data is valid and well-formed.",
  "heroTitle": "Validate your JSON",
  "heroDescription": "Find syntax errors in your JSON data instantly.",
  "about": "JSON Validator ensures your data follows the strict JSON specification.",
  "howToUse": [
    "Paste your JSON.",
    "See if it's valid or get error details.",
    "Fix errors live."
  ],
  "whyUse": [
    "Debugging APIs.",
    "Config file validation.",
    "Catching syntax errors."
  ],
  "faqs": [
    {
      "question": "Will it fix my JSON?",
      "answer": "It points out errors so you can fix them easily."
    }
  ],
  "features": [
    "Validate JSON syntax instantly",
    "Show detailed error messages",
    "Highlight syntax errors",
    "Check structure integrity",
    "Real-time validation"
  ],
  "tips": [
    "Use before API integration",
    "Debug config files",
    "Catch syntax errors early",
    "Ensure data integrity"
  ]
};
