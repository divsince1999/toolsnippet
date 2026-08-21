import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "markdown-heading-extractor",
  "name": "Markdown Table of Contents Generator",
  "category": "Text",
  "shortDescription": "Extract Markdown H1 to H6 headings and generate indented, clickable Table of Contents (TOC) lists.",
  "heroTitle": "Free Markdown Table of Contents (TOC) Generator",
  "heroDescription": "Extract headers (# through ######) from README.md or documentation and generate clickable Markdown TOCs instantly.",
  "about": "The Markdown Table of Contents Generator parses Markdown headings and builds standard GitHub-Flavored Markdown (GFM) anchor lists. It automatically normalizes heading titles into lowercase hyphenated URL slugs for seamless documentation navigation.",
  "howToUse": [
    "Paste your Markdown documentation or README.md content.",
    "Select your preferred list style (Unordered '-' or Ordered '1.').",
    "Set your minimum and maximum heading depth (e.g. H2 to H4).",
    "Copy the generated Table of Contents markdown into your document."
  ],
  "whyUse": [
    "Create clean GitHub README.md navigation menus effortlessly.",
    "Ensure anchor links follow GitHub Flavored Markdown slug conventions.",
    "Customize heading levels to exclude H1 or deeply nested headers.",
    "100% instant in-browser markdown parsing."
  ],
  "faqs": [
    {
      "question": "How are Markdown anchor slugs formatted?",
      "answer": "GitHub anchors convert heading text to lowercase, remove punctuation, and replace spaces with hyphens (e.g., '# Getting Started' becomes '#getting-started')."
    },
    {
      "question": "Can I limit the TOC depth?",
      "answer": "Yes, you can configure the extractor to only include H2 and H3 headings to keep the Table of Contents concise."
    }
  ]
};
