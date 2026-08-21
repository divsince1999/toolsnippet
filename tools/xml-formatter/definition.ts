import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "xml-formatter",
  "name": "XML Formatter",
  "category": "Data",
  "shortDescription": "Beautify and format XML data.",
  "heroTitle": "Format XML for readability",
  "heroDescription": "Prettify messy XML strings with proper indentation and structure.",
  "about": "XML Formatter helps developers work with XML-based APIs, config files, and data structures.",
  "howToUse": [
    "Paste your XML string into the input.",
    "Click Format XML.",
    "Copy the formatted result."
  ],
  "whyUse": [
    "Improves XML readability.",
    "Helps find structural errors in XML.",
    "Fast and browser-based."
  ],
  "faqs": [
    {
      "question": "Does it validate the XML?",
      "answer": "Yes, it will alert you if the XML is malformed."
    }
  ],
  "features": [
    "Format XML with proper indentation",
    "Validate XML structure",
    "Handle nested elements",
    "Detect syntax errors",
    "Instant beautification"
  ],
  "tips": [
    "Use for debugging XML APIs",
    "Check config file formatting",
    "Validate before processing",
    "Great for data integration"
  ]
};
