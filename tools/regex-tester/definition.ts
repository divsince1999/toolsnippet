import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "regex-tester",
  "name": "Regex Tester",
  "category": "Validation",
  "shortDescription": "Test regular expressions with live match results.",
  "heroTitle": "Test regex patterns in real time",
  "heroDescription": "Validate patterns quickly before adding them to application code.",
  "about": "Regex Tester lets you experiment with patterns and flags against sample text so you can debug matching behavior faster.",
  "howToUse": [
    "Enter a regex pattern and test text.",
    "Choose flags like g, i, or m.",
    "Run test and inspect all matches."
  ],
  "whyUse": [
    "Reduces regex trial-and-error in code.",
    "Shows exact matches clearly.",
    "Great for validation and parsing tasks."
  ],
  "faqs": [
    {
      "question": "What regex syntax does this use?",
      "answer": "It uses JavaScript RegExp syntax."
    },
    {
      "question": "Why do I get no matches?",
      "answer": "Check pattern, flags, and escaping in your expression."
    }
  ],
  "features": [
    "Test regex patterns in real-time",
    "Highlight all matches",
    "Support for flags (g, i, m, etc.)",
    "Show match groups",
    "Instant feedback"
  ],
  "tips": [
    "Test edge cases with your pattern",
    "Use the i flag for case-insensitive matching",
    "Escape special characters properly",
    "Test with realistic sample data"
  ]
};
