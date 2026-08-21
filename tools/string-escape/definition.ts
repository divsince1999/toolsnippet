import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "string-escape",
  "name": "String Escape",
  "category": "Encoding",
  "shortDescription": "Escape strings for use in programming languages.",
  "heroTitle": "Escape special characters",
  "heroDescription": "Add backslashes to quotes, newlines, and other special characters.",
  "about": "String Escape helps developers paste text into code strings without syntax errors.",
  "howToUse": [
    "Paste your text.",
    "Select language style (JS, C#, etc.).",
    "Copy the escaped string."
  ],
  "whyUse": [
    "Code generation.",
    "Avoids syntax errors.",
    "Saves time manual escaping."
  ],
  "faqs": [
    {
      "question": "Does it handle newlines?",
      "answer": "Yes, it converts them to \\n sequences."
    }
  ],
  "features": [
    "Escape strings for code instantly",
    "Handle quotes and newlines",
    "Support multiple language styles",
    "One-click copy",
    "Prevent syntax errors"
  ],
  "tips": [
    "Use for code generation",
    "Select appropriate language style",
    "Check escaped output",
    "Saves manual escaping time"
  ]
};
