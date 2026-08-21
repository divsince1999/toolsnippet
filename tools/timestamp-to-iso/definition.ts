import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "timestamp-to-iso",
  "name": "Timestamp to ISO 8601 Converter",
  "category": "Number",
  "shortDescription": "Convert Unix timestamps (seconds/ms) to ISO 8601 UTC and local date formats.",
  "heroTitle": "Convert Unix timestamps to ISO 8601 UTC dates",
  "heroDescription": "Convert epoch seconds and milliseconds into standard ISO 8601, RFC 2822, and local timestamps.",
  "about": "Timestamp to ISO 8601 Converter translates Unix epoch timestamps into standardized UTC ISO 8601 strings (YYYY-MM-DDTHH:mm:ss.sssZ) and readable local dates.",
  "howToUse": [
    "Enter a Unix timestamp (10-digit seconds or 13-digit milliseconds) or an ISO date string.",
    "Click Set to Current Time to inspect the present moment.",
    "Copy your desired date format with one click."
  ],
  "whyUse": [
    "Quickly debug timestamps in server logs and database records.",
    "Automatically detects seconds vs milliseconds based on digit length.",
    "Provides both UTC and local timezone breakdowns."
  ],
  "faqs": [
    {
      "question": "How does it detect seconds versus milliseconds?",
      "answer": "Timestamps with 10 digits are treated as seconds; 13 digits or more are parsed as milliseconds."
    },
    {
      "question": "Can I enter a date string to get an ISO timestamp?",
      "answer": "Yes, you can enter readable date strings (e.g. 2026-03-16) to convert them to epoch milliseconds and ISO UTC."
    }
  ],
  "features": [
    "ISO 8601 UTC string generation",
    "RFC 2822 and local time formats",
    "Epoch seconds and milliseconds display",
    "Current timestamp generator button"
  ],
  "tips": [
    "Always store and transmit dates in ISO 8601 UTC format in REST and GraphQL APIs",
    "Remember that JavaScript Date.now() returns milliseconds, while Unix standard uses seconds"
  ]
};
