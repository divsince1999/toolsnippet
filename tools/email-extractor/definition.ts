import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "email-extractor",
  "name": "Email Extractor from Text",
  "category": "Text",
  "shortDescription": "Scan and extract all valid unique email addresses from unstructured text.",
  "heroTitle": "Extract and deduplicate email addresses from text",
  "heroDescription": "Extract all email addresses from documents, code, logs, and websites with sorting and deduplication.",
  "about": "Email Extractor from Text scans unstructured text, source code, and documents to extract, deduplicate, and organize all valid email addresses.",
  "howToUse": [
    "Paste text, logs, or HTML containing email addresses into the editor.",
    "Choose output format (one per line, comma-separated, or JSON array).",
    "Optionally enable alphabetical sorting and lowercase normalization.",
    "Click Extract Emails and copy the results."
  ],
  "whyUse": [
    "Quickly harvest contact lists from newsletters, meeting notes, or source code.",
    "Automatically deduplicates repeated email addresses.",
    "100% private: no emails are ever sent to or stored on a server."
  ],
  "faqs": [
    {
      "question": "Does it filter out duplicate emails?",
      "answer": "Yes, all duplicate email addresses are automatically merged into a single unique entry."
    },
    {
      "question": "Is my text or email list stored anywhere?",
      "answer": "No. Extraction runs entirely in your browser RAM and is immediately discarded when you close the tab."
    }
  ],
  "features": [
    "Standard RFC 5322 regex extraction",
    "Automatic deduplication and counter",
    "Multiple export formats (Newline, Comma, JSON)",
    "Alphabetical sorting and lowercase conversion"
  ],
  "tips": [
    "Use comma-separated mode when pasting directly into email client BCC fields",
    "Use JSON array mode when importing emails into database seed scripts"
  ]
};
