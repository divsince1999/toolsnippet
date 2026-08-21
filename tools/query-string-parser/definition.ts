import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "query-string-parser",
  "name": "Query String to JSON & JSON to Query Converter",
  "category": "Data",
  "shortDescription": "Bidirectional parser converting URL query parameters to formatted JSON and JSON objects to query strings.",
  "heroTitle": "Convert URL Query Strings to JSON & Vice Versa",
  "heroDescription": "Easily parse URL parameters into structured JSON objects or generate encoded query strings from JSON.",
  "about": "Query String Parser provides bidirectional conversion between URL parameter strings and JSON, handling array brackets, encoded characters, booleans, and nested numbers seamlessly.",
  "howToUse": [
    "Choose 'URL Query String → JSON' or 'JSON → URL Query String'.",
    "Paste your query string or JSON payload.",
    "Click Convert to view and copy the transformed output."
  ],
  "whyUse": [
    "Essential for inspecting complex API URLs, debugging webhook query parameters, and preparing HTTP GET requests.",
    "Automatically types booleans and numbers where applicable."
  ],
  "faqs": [
    {
      "question": "How does the parser handle duplicate query keys?",
      "answer": "Duplicate keys (e.g. tag=react&tag=next) or bracketed arrays (tags[]=a&tags[]=b) are automatically combined into clean JSON arrays."
    }
  ],
  "features": [
    "Bidirectional Query String <-> JSON conversion",
    "Automatic numeric and boolean type inference",
    "Support for array parameters (tags[]=1&tags[]=2)",
    "One-click clipboard copy"
  ],
  "tips": [
    "You can paste full URLs with domains; the parser will extract only the query portion automatically"
  ]
};
