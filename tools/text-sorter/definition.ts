import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "text-sorter",
  "name": "Text Sorter",
  "category": "Text",
  "shortDescription": "Sort text lines alphabetically (A-Z, Z-A), numerically, or by length.",
  "heroTitle": "Sort lists and lines instantly",
  "heroDescription": "Sort lines of text alphabetically, in reverse, numerically, or by line length with options to ignore case.",
  "about": "Text Sorter helps you quickly organize unsorted lists, tags, or code lines in the exact order you need.",
  "howToUse": [
    "Paste your unsorted list into the input box.",
    "Select a sorting method: A-Z, Z-A, Length, or Numeric.",
    "Copy the sorted result back to your clipboard."
  ],
  "whyUse": [
    "No need to use a heavy spreadsheet app just to sort a list.",
    "Works perfectly for organizing tags, names, or code imports.",
    "Client-side processing means zero latency and high privacy."
  ],
  "faqs": [
    {
      "question": "Does it support numeric sorting?",
      "answer": "Yes, you can choose numeric sorting to properly order lines that start with numbers (e.g., 2 before 10)."
    },
    {
      "question": "Can it ignore case while sorting?",
      "answer": "Yes, there is a toggle to enable or disable case-sensitive sorting."
    }
  ],
  "features": [
    "Sort alphabetically (A-Z and Z-A)",
    "Sort by line length",
    "Sort numerically",
    "Case-sensitive or insensitive sorting",
    "Remove duplicates option"
  ],
  "tips": [
    "Use 'Remove duplicates' to clean your list before sorting",
    "Sort CSS properties alphabetically for better code organization",
    "Sort tags by length to create visual 'tag clouds'"
  ]
};
