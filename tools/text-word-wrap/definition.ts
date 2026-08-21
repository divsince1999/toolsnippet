import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "text-word-wrap",
  "name": "Text Word Wrap",
  "category": "Text",
  "shortDescription": "Wrap text lines at a specified column width.",
  "heroTitle": "Wrap text to specific column widths",
  "heroDescription": "Automatically wrap long paragraphs and lines of text to a specific character column width.",
  "about": "Text Word Wrap is a formatting tool useful for writing email plain-text fallbacks, writing git commit messages, or formatting code comments to a standard width like 80 characters.",
  "howToUse": [
    "Paste your long text into the input area.",
    "Enter the desired character width (e.g., 80).",
    "The tool wraps the text at the nearest space before the column limit."
  ],
  "whyUse": [
    "Ensures plain text emails read well on all devices.",
    "Fixes horizontal scrolling issues in code editors.",
    "No data is sent to the server."
  ],
  "faqs": [
    {
      "question": "Will it cut words in half?",
      "answer": "No, the tool intelligently wraps at the last space before the column width limit to preserve words."
    },
    {
      "question": "What happens to existing line breaks?",
      "answer": "Existing line breaks and paragraphs are preserved during the wrapping process."
    }
  ],
  "features": [
    "Custom character width limit",
    "Word-safe wrapping (does not split words)",
    "Preserves existing paragraphs",
    "Live preview",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Use 80 characters for standard code comments and git commit messages",
    "Use 60-70 characters for plain-text email newsletters",
    "Long URLs cannot be split, so they may exceed the column limit"
  ]
};
