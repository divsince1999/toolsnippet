import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-to-typescript",
  "name": "JSON to TypeScript",
  "category": "Data",
  "shortDescription": "Convert JSON objects to TypeScript interfaces.",
  "heroTitle": "JSON to Type Definitions",
  "heroDescription": "Generate clean TypeScript interfaces from your JSON data automatically.",
  "about": "JSON to TypeScript Converter helps frontend developers define types for API responses quickly.",
  "howToUse": [
    "Paste your JSON object.",
    "Click Convert to TypeScript.",
    "Copy the generated interfaces."
  ],
  "whyUse": [
    "Saves manual typing time.",
    "Ensures type safety.",
    "Handles nested objects."
  ],
  "faqs": [
    {
      "question": "Does it support nested arrays?",
      "answer": "Yes, it recursively generates types for nested structures."
    }
  ],
  "features": [
    "Convert JSON to TypeScript instantly",
    "Generate interface definitions",
    "Handle nested objects",
    "Support arrays and unions",
    "One-click copy"
  ],
  "tips": [
    "Use for API response types",
    "Saves manual typing time",
    "Ensure type safety",
    "Great for frontend development"
  ]
};
