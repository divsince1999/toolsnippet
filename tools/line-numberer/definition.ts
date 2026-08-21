import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "line-numberer",
  "name": "Line Numberer",
  "category": "Text",
  "shortDescription": "Add line numbers to text lines with customizable format and padding.",
  "heroTitle": "Add line numbers to any text",
  "heroDescription": "Prepend sequential line numbers to text, code snippets, or lists with custom separators and padding.",
  "about": "Line Numberer makes it easy to reference specific lines in documentation, code reviews, or raw text files.",
  "howToUse": [
    "Paste text into the input box.",
    "Customize the starting number, padding style, and separator (e.g., dot, colon).",
    "Copy the numbered text."
  ],
  "whyUse": [
    "Great for sharing code snippets that need line referencing.",
    "Useful for numbering long lists of names or items.",
    "Fully customizable and works locally in the browser."
  ],
  "faqs": [
    {
      "question": "What is zero-padding?",
      "answer": "Zero-padding adds leading zeros to numbers so they all align perfectly (e.g., 01, 02... 10)."
    },
    {
      "question": "Can I skip empty lines?",
      "answer": "Yes, you can choose whether empty lines increment the counter or are skipped."
    }
  ],
  "features": [
    "Custom starting number",
    "Zero-padding for visual alignment",
    "Custom separator choices (. , : |)",
    "Option to skip empty lines",
    "Real-time preview"
  ],
  "tips": [
    "Use zero-padding to keep the text aligned vertically",
    "Use a pipe (|) separator when numbering code snippets",
    "Skip empty lines when numbering a list of disjointed paragraphs"
  ]
};
