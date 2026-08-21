import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "text-trimmer",
  "name": "Text Trimmer",
  "category": "Text",
  "shortDescription": "Remove leading, trailing, and extra whitespace from text.",
  "heroTitle": "Clean up messy whitespace in text",
  "heroDescription": "Instantly remove leading spaces, trailing spaces, and collapse multiple spaces into single spaces.",
  "about": "Text Trimmer helps you clean up messy text copied from PDFs, websites, or poorly formatted documents by normalizing whitespace.",
  "howToUse": [
    "Paste messy text into the input area.",
    "Select trimming options (Leading/Trailing, Extra Spaces, Empty Lines).",
    "Copy the cleaned text to your clipboard."
  ],
  "whyUse": [
    "Saves time manually deleting spaces.",
    "Ensures clean data for database entry or configuration files.",
    "Runs completely in the browser for privacy."
  ],
  "faqs": [
    {
      "question": "What does 'Trim Leading & Trailing' do?",
      "answer": "It removes spaces and tabs from the very beginning and very end of every line."
    },
    {
      "question": "What does 'Collapse Extra Spaces' do?",
      "answer": "It replaces multiple consecutive spaces within a line with a single space."
    }
  ],
  "features": [
    "Trim leading and trailing whitespace",
    "Collapse multiple spaces into one",
    "Remove empty lines",
    "Real-time preview",
    "One-click copy to clipboard"
  ],
  "tips": [
    "Use before comparing two text strings to avoid false negatives",
    "Clean up text copied from badly formatted PDFs",
    "Normalize user input before saving to a database"
  ]
};
