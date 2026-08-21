import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-size-analyzer",
  "name": "JSON Size & Depth Analyzer",
  "category": "Data",
  "shortDescription": "Inspect byte size, minified size, gzip estimate, key counts, and nesting depth.",
  "heroTitle": "Analyze JSON payload size, gzip estimate, and depth",
  "heroDescription": "Measure byte weight, estimated gzip size, total key counts, and object nesting levels.",
  "about": "JSON Size & Depth Analyzer helps backend and frontend engineers analyze the payload weight, compression savings, and structural complexity of API responses.",
  "howToUse": [
    "Paste any JSON string or payload into the input box.",
    "View instant metrics on raw size, minified size, and estimated gzip transfer weight.",
    "Review nesting depth and total object/array counts to optimize API performance."
  ],
  "whyUse": [
    "Catch bloated API responses before shipping code to production.",
    "Calculate realistic over-the-wire data transfer metrics for mobile users.",
    "100% private analysis with zero data leaving your browser."
  ],
  "faqs": [
    {
      "question": "How is the gzip size estimated?",
      "answer": "Gzip size is calculated based on standard DEFLATE compression ratios for JSON structures (~65% reduction)."
    },
    {
      "question": "What is nesting depth?",
      "answer": "Nesting depth measures how many layers of nested objects and arrays exist inside the JSON payload."
    }
  ],
  "features": [
    "Raw bytes and human-readable KB/MB sizes",
    "Minification savings percentage",
    "Total key, object, and array counters",
    "Maximum nesting depth measurement"
  ],
  "tips": [
    "Keep API response depth under 6-8 levels to ensure high frontend parsing performance",
    "Minifying JSON before transmission saves noticeable bandwidth on high-throughput endpoints"
  ]
};
