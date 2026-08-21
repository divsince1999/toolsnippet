import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "csv-column-extractor",
  "name": "CSV Column Extractor",
  "category": "Text",
  "shortDescription": "Extract or reorder specific columns from CSV data.",
  "heroTitle": "Extract CSV columns without Excel",
  "heroDescription": "Quickly pull out specific columns, names, or emails from raw CSV text using column indexes.",
  "about": "CSV Column Extractor is perfect for quickly grabbing a list of emails, IDs, or specific data points from a large CSV dump without needing to open a heavy spreadsheet app.",
  "howToUse": [
    "Paste raw CSV text into the input.",
    "Enter the column numbers you want to extract (e.g., 1, 3).",
    "Choose a separator (Comma or Tab).",
    "Copy the extracted output."
  ],
  "whyUse": [
    "Faster than opening Excel or writing a Python script.",
    "Great for extracting email lists for marketing tools.",
    "100% private processing in the browser."
  ],
  "faqs": [
    {
      "question": "How do I specify columns?",
      "answer": "Columns are 1-indexed. Entering '1' extracts the first column. Enter multiple columns separated by commas (e.g., 1, 3)."
    },
    {
      "question": "Does it handle quotes in CSV?",
      "answer": "This is a simple text splitter tool. It splits blindly by the delimiter. For advanced CSV parsing with escaped quotes, use the CSV to JSON tool."
    }
  ],
  "features": [
    "Extract single or multiple columns",
    "1-based column indexing",
    "Supports comma and tab delimiters",
    "Real-time extraction preview",
    "Copy extracted list instantly"
  ],
  "tips": [
    "Extract just the email column (e.g. Column 2) for mailing lists",
    "Extract multiple columns (e.g. 1, 3) to drop unnecessary data",
    "Switch delimiter to Tab to parse TSV data pasted from Excel"
  ]
};
