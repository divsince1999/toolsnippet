import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "markdown-to-html",
  "name": "Markdown to HTML Converter",
  "category": "Text",
  "shortDescription": "Convert GitHub Flavored Markdown into clean, exportable HTML code.",
  "heroTitle": "Convert Markdown to clean HTML markup",
  "heroDescription": "Transform Markdown headers, lists, code blocks, and links into semantic HTML tags.",
  "about": "Markdown to HTML Converter transforms standard Markdown into valid, semantic HTML tags suitable for embedding in blog posts, email templates, and websites.",
  "howToUse": [
    "Type or paste your Markdown content in the editor.",
    "Click Convert to HTML.",
    "Copy the generated HTML code directly to your clipboard."
  ],
  "whyUse": [
    "Fast conversion without installing CLI dependencies.",
    "Outputs clean semantic HTML without unnecessary wrapper bloat.",
    "Runs completely in the browser for maximum privacy."
  ],
  "faqs": [
    {
      "question": "Does this tool support fenced code blocks?",
      "answer": "Yes, it converts ```language blocks into pre and code elements with syntax classes."
    },
    {
      "question": "Are images and hyperlinks converted?",
      "answer": "Yes, standard Markdown image and link syntax are converted to img and a tags."
    }
  ],
  "features": [
    "Supports headers H1 through H6",
    "Ordered and unordered list conversion",
    "Fenced code blocks with language detection",
    "Blockquote and table conversion"
  ],
  "tips": [
    "Use double line breaks for paragraph separation",
    "Check that your URLs are complete with https:// for link tags"
  ]
};
