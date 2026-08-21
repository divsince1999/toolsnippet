import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "text-case",
  "name": "Text Case Converter",
  "category": "Text",
  "shortDescription": "Convert text to uppercase, lowercase, and title case.",
  "heroTitle": "Convert text case in seconds",
  "heroDescription": "Quickly switch between uppercase, lowercase, and title case without leaving your browser.",
  "about": "Text Case Converter helps clean and standardize text for documentation, code comments, emails, and content drafts.",
  "howToUse": [
    "Paste or type text in the input area.",
    "Click UPPERCASE, lowercase, or Title Case.",
    "Copy the transformed output for your workflow."
  ],
  "whyUse": [
    "Saves repetitive editing time.",
    "Keeps naming and writing styles consistent.",
    "Works instantly without external services."
  ],
  "faqs": [
    {
      "question": "Does this tool store my text?",
      "answer": "No. Processing runs in your browser session."
    },
    {
      "question": "Can I convert long paragraphs?",
      "answer": "Yes, it works for both short and long text."
    }
  ],
  "features": [
    "Convert to uppercase, lowercase, and title case",
    "Instant transformation",
    "One-click copy to clipboard",
    "Works with any text length",
    "Client-side processing"
  ],
  "tips": [
    "Use title case for headings and titles",
    "Use uppercase for emphasis or acronyms",
    "Use lowercase for normal body text",
    "Check special characters after conversion"
  ]
};
