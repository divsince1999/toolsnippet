import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "tsv-to-csv",
  "name": "TSV to CSV Converter",
  "category": "Data",
  "shortDescription": "Convert Tab-Separated Values (TSV) to Comma-Separated Values (CSV) and vice-versa.",
  "heroTitle": "Convert TSV to CSV and CSV to TSV fast",
  "heroDescription": "Seamlessly convert tab-delimited spreadsheet data into comma-separated files with proper quote escaping.",
  "about": "TSV to CSV Converter allows data analysts, researchers, and developers to convert between Tab-Separated Values and Comma-Separated Values while maintaining proper quote and delimiter escaping.",
  "howToUse": [
    "Paste your TSV or CSV data into the input box.",
    "Click TSV to CSV or CSV to TSV.",
    "Copy the converted tabular output for Excel, Google Sheets, or database imports."
  ],
  "whyUse": [
    "Effortlessly migrate data copied from Excel into CSV files.",
    "Properly handles embedded commas, newlines, and double quotes.",
    "Runs completely offline in your browser session."
  ],
  "faqs": [
    {
      "question": "How are cells with embedded commas handled when converting to CSV?",
      "answer": "Any cell containing commas, quotes, or newlines is safely enclosed in double quotes according to RFC 4180."
    },
    {
      "question": "Can I paste directly from Excel or Google Sheets?",
      "answer": "Yes! When you copy cells from a spreadsheet, clipboard data is formatted as TSV, which converts instantly to CSV."
    }
  ],
  "features": [
    "Bidirectional TSV <-> CSV transformation",
    "RFC 4180 compliant quotation escaping",
    "Multi-row batch processing",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Copying rows from Google Sheets or Excel pastes as TSV by default",
    "Use CSV format for broad compatibility with database importing tools"
  ]
};
