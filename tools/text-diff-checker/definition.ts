import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "text-diff-checker",
  "name": "Text Diff Checker",
  "category": "Text",
  "shortDescription": "Compare two texts to highlight line differences.",
  "heroTitle": "Compare text and find differences",
  "heroDescription": "Quickly compare two text documents, code files, or configurations to see exactly what changed.",
  "about": "Text Diff Checker helps developers and writers spot insertions, deletions, and modifications between two versions of text without needing git or an IDE.",
  "howToUse": [
    "Paste the original text into the 'Original' box.",
    "Paste the new text into the 'Modified' box.",
    "The tool instantly highlights the line-by-line differences."
  ],
  "whyUse": [
    "Spot tiny typos or missing punctuation instantly.",
    "Compare configuration files (JSON, YAML) before deploying.",
    "All comparisons happen in the browser, keeping your data secure."
  ],
  "faqs": [
    {
      "question": "Does it compare word-by-word or line-by-line?",
      "answer": "This tool performs a line-by-line comparison, highlighting lines that were added or removed."
    },
    {
      "question": "Is there a limit on how much text I can compare?",
      "answer": "It handles large files efficiently, up to a few megabytes in size, directly in your browser."
    }
  ],
  "features": [
    "Line-by-line diff comparison",
    "Highlight added (green) and removed (red) lines",
    "Real-time comparison",
    "Handles long text and code",
    "No data sent to server"
  ],
  "tips": [
    "Use this to review changes in a legal document or contract draft",
    "Compare two API JSON responses to see what data changed",
    "Format your code before comparing to get a cleaner diff"
  ]
};
