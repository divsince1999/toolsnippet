import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "number-to-words",
  "name": "Number to Words",
  "category": "Number",
  "shortDescription": "Convert numeric figures into written English words.",
  "heroTitle": "Convert numbers to English words",
  "heroDescription": "Instantly spell out any number in English — useful for writing checks, legal documents, and formal writing.",
  "about": "Number to Words converts any integer up to one trillion into its English word form, helping writers and developers avoid errors when transcribing numbers in formal contexts.",
  "howToUse": [
    "Type or paste a number into the input field.",
    "The English word form appears instantly.",
    "Copy it for use in documents or code."
  ],
  "whyUse": [
    "Essential for check-writing and legal document drafting.",
    "Useful for generating test data with number labels.",
    "Handles numbers up to one trillion."
  ],
  "faqs": [
    {
      "question": "Does it support negative numbers?",
      "answer": "Yes, negative numbers are prefixed with 'negative' in the output."
    },
    {
      "question": "What is the maximum supported number?",
      "answer": "The tool supports integers up to 999 trillion (999,999,999,999,999)."
    },
    {
      "question": "Does it handle decimals?",
      "answer": "No, this tool converts integers only. Decimal support may be added in a future update."
    }
  ],
  "features": [
    "Converts integers to English words",
    "Supports negative numbers",
    "Handles up to hundreds of trillions",
    "Handles special cases: 0, 11-19",
    "One-click copy to clipboard"
  ],
  "tips": [
    "Use for filling out cheque amount fields",
    "Great for legal contracts that require numeric amounts spelled out",
    "Zero is spelled 'zero', not 'nil' or 'nought'"
  ]
};
