import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "xml-minifier",
  "name": "XML Minifier",
  "category": "Data",
  "shortDescription": "Compress XML data by removing whitespace.",
  "heroTitle": "Compact XML payloads",
  "heroDescription": "Reduce the size of XML files for data transfer.",
  "about": "XML Minifier removes all unnecessary formatting from XML strings.",
  "howToUse": [
    "Paste your XML.",
    "Click Minify XML.",
    "Copy the result."
  ],
  "whyUse": [
    "Efficient data transfer.",
    "Saves bandwidth.",
    "Smaller file sizes."
  ],
  "faqs": [
    {
      "question": "Is the XML still valid?",
      "answer": "Yes, valid XML remains valid after minification."
    }
  ],
  "features": [
    "Minify XML instantly",
    "Remove whitespace",
    "Reduce file size",
    "Faster data transfer",
    "Maintain validity"
  ],
  "tips": [
    "Use for production APIs",
    "Keep formatted copy for debugging",
    "Test minified output",
    "Saves bandwidth"
  ]
};
