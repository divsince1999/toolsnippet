import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "csv-to-json",
  "name": "CSV to JSON Converter",
  "category": "Data",
  "shortDescription": "Convert CSV data to JSON format.",
  "heroTitle": "Transform CSV to JSON",
  "heroDescription": "Easily convert spreadsheet data (CSV) into JSON arrays.",
  "about": "CSV to JSON Converter is perfect for importing data from Excel or Google Sheets into apps.",
  "howToUse": [
    "Paste your CSV data.",
    "Click Convert to JSON.",
    "Copy the JSON output."
  ],
  "whyUse": [
    "Easy data migration.",
    "Developer-friendly format.",
    "Fast conversion."
  ],
  "faqs": [
    {
      "question": "Does it support headers?",
      "answer": "Yes, it uses the first row as keys for the JSON objects."
    }
  ],
  "features": [
    "Convert CSV to JSON instantly",
    "Handle headers automatically",
    "Support large files",
    "Preserve data structure",
    "One-click copy"
  ],
  "tips": [
    "Ensure first row has headers",
    "Check for special characters",
    "Use for Excel data import",
    "Validate output structure"
  ]
};
