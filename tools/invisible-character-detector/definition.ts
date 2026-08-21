import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "invisible-character-detector",
  "name": "Zero-Width & Invisible Character Detector",
  "category": "Validation",
  "shortDescription": "Detect, reveal, and remove hidden zero-width spaces, soft hyphens, and invisible Unicode control characters.",
  "heroTitle": "Free Zero-Width & Invisible Character Detector",
  "heroDescription": "Find and remove hidden zero-width spaces (ZWSP), non-breaking spaces (NBSP), and invisible Unicode characters from text.",
  "about": "The Zero-Width & Invisible Character Detector reveals hidden characters that often cause syntax errors in code, broken database queries, or unexpected string comparison bugs. It detects Zero-Width Spaces (U+200B), Zero-Width Joiners (U+200D), Byte Order Marks (U+FEFF), Soft Hyphens (U+00AD), and Non-Breaking Spaces (U+00A0).",
  "howToUse": [
    "Paste your text, code snippet, or database string.",
    "Review the highlighted badges indicating exact positions of hidden characters.",
    "Inspect the character count breakdown table.",
    "Click 'Remove All Invisible Characters' to copy a cleaned version."
  ],
  "whyUse": [
    "Fix mystery code syntax errors caused by copied zero-width characters.",
    "Sanitize copy-pasted text from PDFs, formatted documents, and LLMs.",
    "Audit string tokens and credentials for hidden trailing whitespace.",
    "100% private in-browser detection."
  ],
  "faqs": [
    {
      "question": "What are Zero-Width Spaces (ZWSP)?",
      "answer": "A Zero-Width Space (Unicode U+200B) is an invisible character used in typesetting to indicate word boundaries without rendering a visible space."
    },
    {
      "question": "Why do invisible characters break code?",
      "answer": "Compilers, JSON parsers, and regex engines treat invisible Unicode control characters as invalid syntax tokens, causing errors that are impossible to spot visually."
    }
  ]
};
