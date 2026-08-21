import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "line-counter",
  "name": "Line Counter",
  "category": "Text",
  "shortDescription": "Count total lines, empty lines, and non-empty lines in text.",
  "heroTitle": "Count text lines instantly",
  "heroDescription": "Quickly analyze text to find total lines, empty lines, and non-empty lines without leaving your browser.",
  "about": "Line Counter is a simple utility for developers, writers, and data analysts to instantly count the number of lines in logs, code, or large text documents.",
  "howToUse": [
    "Paste or type text in the input area.",
    "The tool instantly counts total lines, empty lines, and non-empty lines.",
    "View the summary metrics or copy them for your records."
  ],
  "whyUse": [
    "Useful for analyzing log files or code files.",
    "Helps verify dataset sizes before processing.",
    "Works instantly on the client side with no data uploads."
  ],
  "faqs": [
    {
      "question": "What is considered an empty line?",
      "answer": "An empty line is a line containing no characters or only whitespace characters (spaces, tabs)."
    },
    {
      "question": "Can I count lines in very large text?",
      "answer": "Yes, it can handle large text chunks efficiently within your browser's memory limits."
    }
  ],
  "features": [
    "Count total lines",
    "Count empty lines",
    "Count non-empty lines",
    "Real-time processing",
    "100% private and secure"
  ],
  "tips": [
    "Use this to estimate the size of a text dataset",
    "Quickly check if a file has trailing empty lines",
    "Compare total lines vs non-empty lines to gauge text density"
  ]
};
