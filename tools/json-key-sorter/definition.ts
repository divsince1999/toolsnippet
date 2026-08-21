import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-key-sorter",
  "name": "JSON Key Alphabetical Sorter",
  "category": "Data",
  "shortDescription": "Recursively sort all JSON keys alphabetically (A-Z or Z-A) for clean git diffs.",
  "heroTitle": "Sort JSON keys alphabetically for clean diffs",
  "heroDescription": "Recursively sort all object keys in JSON structures in ascending or descending alphabetical order.",
  "about": "JSON Key Alphabetical Sorter organizes JSON object keys alphabetically at every nesting level, making configuration files and API snapshots easy to compare and version control in Git.",
  "howToUse": [
    "Paste your JSON document in the input editor.",
    "Choose Ascending (A-Z) or Descending (Z-A) order.",
    "Select 2 spaces or 4 spaces indentation.",
    "Click Sort JSON Keys and copy the formatted result."
  ],
  "whyUse": [
    "Eliminates noisy git diffs caused by disordered object keys.",
    "Maintains clean and predictable schema configurations.",
    "Recursively sorts nested objects and arrays of objects."
  ],
  "faqs": [
    {
      "question": "Are nested objects inside arrays also sorted?",
      "answer": "Yes, the sorter traverses all nested objects, arrays, and sub-objects recursively."
    },
    {
      "question": "Are array item orders modified?",
      "answer": "Array element order is preserved; only key/value pairs within objects are sorted alphabetically."
    }
  ],
  "features": [
    "Deep recursive key sorting",
    "A-Z and Z-A sorting order options",
    "Customizable JSON formatting indentation",
    "Instant syntax validation and copy"
  ],
  "tips": [
    "Run your package.json or i18n translation files through this tool to maintain clean alphabetical keys",
    "Sorted keys make comparing two JSON API payloads significantly faster"
  ]
};
