import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-to-yaml",
  "name": "JSON to YAML Converter",
  "category": "Data",
  "shortDescription": "Convert JSON data to YAML format.",
  "heroTitle": "Convert JSON to YAML instantly",
  "heroDescription": "Transform JSON payloads into human-readable YAML configuration files.",
  "about": "JSON to YAML Converter helps in creating readable config files from API responses or JSON data.",
  "howToUse": [
    "Paste your JSON data into the input.",
    "Click Convert to YAML.",
    "Copy the resulting YAML output."
  ],
  "whyUse": [
    "YAML is more human-readable for configs.",
    "Fast conversion for developers.",
    "Supports large JSON files."
  ],
  "faqs": [
    {
      "question": "Does it validate JSON before conversion?",
      "answer": "Yes, it will show an error if the input JSON is invalid."
    }
  ],
  "features": [
    "Convert JSON to YAML instantly",
    "Human-readable output",
    "Handle arrays and objects",
    "Preserve data integrity",
    "Instant validation"
  ],
  "tips": [
    "Validate JSON before conversion",
    "Use for creating config files",
    "Check output indentation",
    "Great for Kubernetes configs"
  ]
};
