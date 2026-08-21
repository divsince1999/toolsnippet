import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "duplicate-line-remover",
  "name": "Duplicate Line Remover",
  "category": "Text",
  "shortDescription": "Remove duplicate lines from a list or text.",
  "heroTitle": "Clean up duplicate lines",
  "heroDescription": "Instantly remove redundant rows from your text data.",
  "about": "Duplicate Line Remover is great for cleaning up lists, logs, and data exports.",
  "howToUse": [
    "Paste your multi-line text.",
    "Click Remove Duplicates.",
    "Copy the unique list."
  ],
  "whyUse": [
    "Data deduplication.",
    "Log cleanup.",
    "List management."
  ],
  "faqs": [
    {
      "question": "Is it case-sensitive?",
      "answer": "You can toggle case sensitivity as needed."
    }
  ],
  "features": [
    "Remove duplicate lines instantly",
    "Toggle case sensitivity",
    "Handle large lists",
    "One-click copy",
    "Clean data quickly"
  ],
  "tips": [
    "Use for data deduplication",
    "Clean up log files",
    "Manage email lists",
    "Toggle case for precision"
  ]
};
