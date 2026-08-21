import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "html-to-markdown",
  "name": "HTML to Markdown Converter",
  "category": "Text",
  "shortDescription": "Convert HTML source code and articles into clean Markdown syntax.",
  "heroTitle": "Convert HTML code to clean Markdown",
  "heroDescription": "Strip complex HTML tags and turn web pages and articles into clean Markdown documents.",
  "about": "HTML to Markdown Converter transforms HTML markup into lightweight, clean Markdown syntax ideal for documentation, GitHub READMEs, and static site generators.",
  "howToUse": [
    "Paste your HTML source code in the input area.",
    "Click Convert to Markdown.",
    "Copy the formatted Markdown for documentation or content publishing."
  ],
  "whyUse": [
    "Quickly convert HTML documentation into Markdown for GitHub or Notion.",
    "Strips unnecessary style tags and scripts while preserving text structure.",
    "Zero latency and 100% private."
  ],
  "faqs": [
    {
      "question": "Will inline formatting like bold and italic be preserved?",
      "answer": "Yes, strong, b, em, and i tags are properly mapped to **bold** and *italic* syntax."
    },
    {
      "question": "How are headings handled?",
      "answer": "H1 through H6 elements are converted into corresponding # through ###### Markdown headings."
    }
  ],
  "features": [
    "Preserves link and image targets",
    "Converts code blocks and pre elements",
    "Cleans up excessive whitespace",
    "Handles HTML entity decoding"
  ],
  "tips": [
    "Remove wrapper navigation or footer HTML before converting for best results",
    "Use the preview to verify list nesting and heading levels"
  ]
};
