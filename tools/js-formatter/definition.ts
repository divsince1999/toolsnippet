import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "js-formatter",
  "name": "JS Formatter",
  "category": "Data",
  "shortDescription": "Format and beautify JavaScript code.",
  "heroTitle": "Readable JavaScript code",
  "heroDescription": "Instantly beautify minified or messy JavaScript code.",
  "about": "JS Formatter applies standard indentation and spacing to JavaScript files.",
  "howToUse": [
    "Paste your JS code.",
    "Click Format JS.",
    "Copy the result."
  ],
  "whyUse": [
    "Easier code reviews.",
    "Better debugging experience.",
    "Standardizes formatting."
  ],
  "faqs": [
    {
      "question": "Does it support ES6+?",
      "answer": "Yes, it supports modern JavaScript syntax."
    }
  ],
  "features": [
    "Format JavaScript instantly",
    "Support ES6+ syntax",
    "Proper indentation",
    "Consistent code style",
    "Handle arrow functions"
  ],
  "tips": [
    "Use for code reviews",
    "Standardize team JS formatting",
    "Great for debugging minified code",
    "Improves code readability"
  ]
};
