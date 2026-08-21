import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-to-csv",
  "name": "JSON to CSV Converter",
  "category": "Data",
  "shortDescription": "Convert JSON arrays to CSV format.",
  "heroTitle": "Transform JSON to CSV",
  "heroDescription": "Turn JSON data into spreadsheet-ready CSV files.",
  "about": "JSON to CSV Converter helps in exporting app data for use in Excel or other tools.",
  "howToUse": [
    "Paste your JSON array.",
    "Click Convert to CSV.",
    "Copy the result."
  ],
  "whyUse": [
    "Export data for analysis.",
    "Spreadsheet compatibility.",
    "Fast and reliable."
  ],
  "faqs": [
    {
      "question": "What JSON structure is required?",
      "answer": "It works best with arrays of objects."
    }
  ],
  "features": [
    "Convert JSON to CSV instantly",
    "Handle nested objects",
    "Export to spreadsheet format",
    "Support large datasets",
    "One-click copy"
  ],
  "tips": [
    "Use arrays of objects for best results",
    "Check for special characters",
    "Great for data analysis",
    "Works with Excel and Google Sheets"
  ]
};
