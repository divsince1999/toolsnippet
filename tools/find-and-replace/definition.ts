import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "find-and-replace",
  "name": "Find and Replace",
  "category": "Text",
  "shortDescription": "Find and replace text with case sensitivity and whole word options.",
  "heroTitle": "Find and replace text in bulk",
  "heroDescription": "Quickly find occurrences of a word or phrase and replace them all instantly.",
  "about": "Find and Replace helps writers and coders bulk-edit text directly in the browser without needing to open a full IDE or word processor.",
  "howToUse": [
    "Paste your text into the input area.",
    "Enter the text you want to find.",
    "Enter the replacement text.",
    "Toggle options like Match Case or Whole Word if needed."
  ],
  "whyUse": [
    "Faster than opening a desktop app for a quick edit.",
    "Great for renaming variables, names, or fixing common typos in bulk.",
    "100% private and runs securely on your device."
  ],
  "faqs": [
    {
      "question": "What does 'Whole Word' mean?",
      "answer": "It ensures that searching for 'cat' doesn't accidentally replace the 'cat' inside 'category'."
    },
    {
      "question": "Does it support regular expressions?",
      "answer": "No, this tool performs literal text replacement. Use the Regex Tester tool for regex-based workflows."
    }
  ],
  "features": [
    "Find all occurrences instantly",
    "Replace all matches",
    "Match Case (case-sensitive) option",
    "Match Whole Word option",
    "Live preview of modified text"
  ],
  "tips": [
    "Use 'Whole Word' when replacing variable names to avoid breaking other words",
    "Check the 'Match Case' option when renaming proper nouns",
    "You can leave the replace field empty to simply delete the matched text"
  ]
};
