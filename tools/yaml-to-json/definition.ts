import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "yaml-to-json",
  "name": "YAML to JSON Converter",
  "category": "Data",
  "shortDescription": "Convert YAML data to JSON format.",
  "heroTitle": "Convert YAML to JSON instantly",
  "heroDescription": "Quickly transform YAML configuration files into JSON for easier processing.",
  "about": "YAML to JSON Converter is essential for developers working with multiple configuration formats or APIs.",
  "howToUse": [
    "Paste your YAML content into the input.",
    "Click Convert to JSON.",
    "Copy the resulting JSON output."
  ],
  "whyUse": [
    "Essential for cross-format compatibility.",
    "Fast and accurate conversion.",
    "Handles complex nested structures."
  ],
  "faqs": [
    {
      "question": "Can I convert JSON back to YAML?",
      "answer": "Yes, we also have a JSON to YAML converter tool."
    }
  ],
  "features": [
    "Convert YAML to JSON instantly",
    "Handle nested structures",
    "Preserve data types",
    "Error detection",
    "One-click copy"
  ],
  "tips": [
    "Check YAML indentation before conversion",
    "Use for config file migration",
    "Validate output structure",
    "Works with complex nested data"
  ]
};
