import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "html-table-to-json",
  "name": "HTML Table to JSON Converter",
  "category": "Data",
  "shortDescription": "Extract and convert HTML table data into clean structured JSON.",
  "heroTitle": "Convert HTML tables to JSON arrays instantly",
  "heroDescription": "Paste any HTML table code and extract structured JSON objects with custom column keys.",
  "about": "HTML Table to JSON Converter parses HTML <table> structures and extracts all table headers and table rows into clean, structured JSON arrays.",
  "howToUse": [
    "Paste your raw HTML <table> markup in the input editor.",
    "Click Convert Table to JSON.",
    "Copy or export the structured JSON array for your app or database."
  ],
  "whyUse": [
    "Quickly scrape or extract data from web pages into API payloads.",
    "Accurately maps thead th headers to JSON object keys.",
    "Browser-based parsing with zero server transmission."
  ],
  "faqs": [
    {
      "question": "What happens if a table has no <th> headers?",
      "answer": "The tool automatically generates column keys like column_1, column_2 for every cell."
    },
    {
      "question": "Can I convert large tables?",
      "answer": "Yes, modern browser DOM parsing handles tables with thousands of rows smoothly."
    }
  ],
  "features": [
    "Automatic thead header detection",
    "Formatted 2-space indented JSON output",
    "Handles nested cell text and whitespace cleaning",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Clean up empty rows in the HTML before converting for the cleanest output",
    "Inspect the generated JSON keys to ensure column headers were parsed accurately"
  ]
};
