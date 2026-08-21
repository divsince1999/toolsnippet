import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "string-unescape",
  "name": "String Unescape",
  "category": "Encoding",
  "shortDescription": "Remove escapes from programming strings.",
  "heroTitle": "Restore escaped strings",
  "heroDescription": "Convert sequences like \\n and \\\" back to their actual characters.",
  "about": "String Unescape helps in reading raw string data from code or logs.",
  "howToUse": [
    "Paste escaped string.",
    "Click Unescape.",
    "See the original text."
  ],
  "whyUse": [
    "Log analysis.",
    "Debugging code.",
    "Data extraction."
  ],
  "faqs": [
    {
      "question": "Which styles are supported?",
      "answer": "Common C-style escapes used in JS, Java, and Python."
    }
  ],
  "features": [
    "Unescape strings instantly",
    "Restore escaped characters",
    "Handle C-style escapes",
    "One-click copy",
    "Read raw string data"
  ],
  "tips": [
    "Use for log analysis",
    "Debug escaped code",
    "Extract data from logs",
    "Great for data processing"
  ]
};
