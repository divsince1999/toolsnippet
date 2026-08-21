import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "unix-timestamp-converter",
  "name": "Unix Timestamp Converter",
  "category": "Data",
  "shortDescription": "Convert Unix timestamps to readable dates.",
  "heroTitle": "Timestamp to Date",
  "heroDescription": "Instantly convert Unix epochs to human-readable date and time.",
  "about": "Unix Timestamp Converter helps developers understand epoch times in logs and databases.",
  "howToUse": [
    "Enter a Unix timestamp.",
    "The readable date appears instantly.",
    "Toggle between seconds and milliseconds."
  ],
  "whyUse": [
    "Essential for debugging.",
    "Quick time conversion.",
    "Supports various formats."
  ],
  "faqs": [
    {
      "question": "What is a Unix timestamp?",
      "answer": "It's the number of seconds since Jan 01 1970 (UTC)."
    }
  ],
  "features": [
    "Convert Unix timestamp to date",
    "Support seconds and milliseconds",
    "Instant conversion",
    "Multiple date formats",
    "Timezone aware"
  ],
  "tips": [
    "Check if timestamp is in seconds or milliseconds",
    "Useful for debugging logs",
    "Understand UTC vs local time",
    "Great for API development"
  ]
};
