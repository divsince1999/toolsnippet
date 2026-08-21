import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "whitespace-remover",
  "name": "Whitespace Remover",
  "category": "Text",
  "shortDescription": "Remove all spaces, tabs, or newlines from text.",
  "heroTitle": "Remove whitespace instantly",
  "heroDescription": "Strip out spaces, tabs, empty lines, or all whitespace characters from your text completely.",
  "about": "Whitespace Remover is an essential utility for cleaning up copy-pasted text, preparing code for minification manually, or cleaning data imports.",
  "howToUse": [
    "Paste your text into the input area.",
    "Select what to remove: Spaces, Tabs, Newlines, or All Whitespace.",
    "The cleaned text appears instantly for copying."
  ],
  "whyUse": [
    "Quickly compress text blocks.",
    "Fix formatting errors from copying out of PDFs or Word documents.",
    "Runs instantly in the browser without server processing."
  ],
  "faqs": [
    {
      "question": "Can I remove just newlines?",
      "answer": "Yes, you can toggle specific whitespace characters like just newlines or just tabs."
    },
    {
      "question": "Is this different from the Text Trimmer tool?",
      "answer": "Yes, Text Trimmer only cleans the edges and extra spaces, whereas this tool can remove ALL spaces entirely."
    }
  ],
  "features": [
    "Remove all spaces",
    "Remove all tabs",
    "Remove all line breaks (newlines)",
    "Remove all whitespace (spaces + tabs + newlines)",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Use 'Remove Newlines' to turn a vertical list into a single paragraph",
    "Use 'Remove All' to quickly strip spaces out of phone numbers or credit cards",
    "Remove tabs to clean up poorly aligned code snippets before pasting into a terminal"
  ]
};
