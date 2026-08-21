import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "text-to-binary",
  "name": "Text to Binary Converter",
  "category": "Encoding",
  "shortDescription": "Convert readable text into binary code.",
  "heroTitle": "Text to Binary",
  "heroDescription": "Encode any text into its binary representation (0s and 1s).",
  "about": "Text to Binary Converter shows you how text is represented at the lowest level.",
  "howToUse": [
    "Type your text.",
    "The binary code updates live.",
    "Copy the result."
  ],
  "whyUse": [
    "Learning binary.",
    "Secret messages.",
    "Data representation."
  ],
  "faqs": [
    {
      "question": "Does it support emojis?",
      "answer": "Yes, it handles Unicode characters including emojis."
    }
  ],
  "features": [
    "Convert text to binary instantly",
    "Support Unicode and emojis",
    "Live binary generation",
    "One-click copy",
    "No server calls"
  ],
  "tips": [
    "Understand binary representation",
    "Check for Unicode characters",
    "Use for educational purposes",
    "Great for learning encoding"
  ]
};
