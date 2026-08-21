import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "number-base-converter",
  "name": "Number Base Converter",
  "category": "Data",
  "shortDescription": "Convert numbers between Binary, Octal, Decimal, and Hex.",
  "heroTitle": "Convert Number Bases",
  "heroDescription": "Instantly switch numbers between different mathematical bases.",
  "about": "Number Base Converter is essential for low-level programming and CS students.",
  "howToUse": [
    "Enter a number in any base.",
    "See it converted to all other bases live.",
    "Copy the result you need."
  ],
  "whyUse": [
    "CS education.",
    "Embedded programming.",
    "Quick math checks."
  ],
  "faqs": [
    {
      "question": "What is the limit?",
      "answer": "It supports standard 64-bit integer ranges."
    }
  ],
  "features": [
    "Convert between number bases",
    "Support Binary, Octal, Decimal, Hex",
    "Instant conversion",
    "Live updates",
    "One-click copy"
  ],
  "tips": [
    "Use for CS education",
    "Great for embedded programming",
    "Check base before conversion",
    "Understand binary representation"
  ]
};
