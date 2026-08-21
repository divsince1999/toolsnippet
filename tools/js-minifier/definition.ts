import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "js-minifier",
  "name": "JS Minifier",
  "category": "Data",
  "shortDescription": "Minify JavaScript to reduce file size.",
  "heroTitle": "Compress JS for production",
  "heroDescription": "Optimize your JavaScript files by removing unnecessary characters.",
  "about": "JS Minifier helps in reducing the footprint of your script files for better performance.",
  "howToUse": [
    "Paste your JS code.",
    "Click Minify JS.",
    "Copy the result."
  ],
  "whyUse": [
    "Faster script loading.",
    "Saves bandwidth.",
    "Protects source code slightly."
  ],
  "faqs": [
    {
      "question": "Is the code still executable?",
      "answer": "Yes, it remains functionally identical to the source."
    }
  ],
  "features": [
    "Minify JavaScript for production",
    "Remove unnecessary characters",
    "Reduce file size",
    "Faster script loading",
    "Maintain functionality"
  ],
  "tips": [
    "Use for production bundles",
    "Keep source for debugging",
    "Test minified code thoroughly",
    "Improves website performance"
  ]
};
