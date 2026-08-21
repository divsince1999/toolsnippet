import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "text-indent-formatter",
  "name": "Text Indent Formatter",
  "category": "Text",
  "shortDescription": "Indent or un-indent lines of text by tabs or spaces.",
  "heroTitle": "Indent text and code easily",
  "heroDescription": "Bulk add or remove indentation from lists, code blocks, and plain text using spaces or tabs.",
  "about": "Text Indent Formatter is a simple utility to fix indentation issues when pasting code or text from different editors that mix tabs and spaces.",
  "howToUse": [
    "Paste text into the input area.",
    "Select your indent type (Tabs or Spaces).",
    "Click 'Indent' to add indentation, or 'Un-Indent' to remove it."
  ],
  "whyUse": [
    "Quickly fix messy Python or YAML code indentation.",
    "Align lists and paragraphs uniformly.",
    "Works fully offline and instantly."
  ],
  "faqs": [
    {
      "question": "Will un-indenting delete my text?",
      "answer": "No, un-indenting only removes leading whitespace (spaces or tabs) up to the specified amount."
    },
    {
      "question": "Can I convert tabs to spaces?",
      "answer": "You can un-indent completely and then re-indent with spaces."
    }
  ],
  "features": [
    "Add indentation (Tabs or Spaces)",
    "Remove indentation (Un-indent)",
    "Customizable space count (2, 4, 8)",
    "Instant preview",
    "One-click copy"
  ],
  "tips": [
    "Use 2 spaces for JSON/YAML and 4 spaces for Python/Java",
    "Un-indent completely to flush all text to the left margin",
    "Use this to prepare code snippets for markdown files"
  ]
};
