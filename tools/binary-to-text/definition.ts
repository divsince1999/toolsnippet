import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "binary-to-text",
  "name": "Binary to Text Converter",
  "category": "Encoding",
  "shortDescription": "Convert binary code into readable text.",
  "heroTitle": "Binary to Text",
  "heroDescription": "Decode binary strings (0s and 1s) into human-readable ASCII text.",
  "about": "Binary to Text Converter is useful for decoding data or solving puzzles.",
  "howToUse": [
    "Paste your binary string.",
    "Click Convert.",
    "Read the decoded text."
  ],
  "whyUse": [
    "Data decoding.",
    "Educational purposes.",
    "Fun and puzzles."
  ],
  "faqs": [
    {
      "question": "What encoding is used?",
      "answer": "It uses standard ASCII/UTF-8 character encoding."
    }
  ],
  "features": [
    "Convert binary to text instantly",
    "Support ASCII and UTF-8",
    "Handle 8-bit binary",
    "One-click copy",
    "No server calls"
  ],
  "tips": [
    "Ensure binary is 8-bit aligned",
    "Check for Unicode characters",
    "Use for data decoding",
    "Educational purposes"
  ]
};
