import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-minifier",
  "name": "CSS Minifier",
  "category": "Data",
  "shortDescription": "Compress CSS files for faster website loading.",
  "heroTitle": "Optimize CSS performance",
  "heroDescription": "Remove whitespace and comments from CSS to reduce file size.",
  "about": "CSS Minifier is a tool to optimize your stylesheets for production environments.",
  "howToUse": [
    "Paste your CSS.",
    "Click Minify CSS.",
    "Copy the optimized code."
  ],
  "whyUse": [
    "Improves page load speed.",
    "Reduces bandwidth usage.",
    "Production-ready code."
  ],
  "faqs": [
    {
      "question": "Will it break my styles?",
      "answer": "No, it only removes non-functional characters like spaces and comments."
    }
  ],
  "features": [
    "Minify CSS for production",
    "Remove whitespace and comments",
    "Reduce file size",
    "Faster page load",
    "Maintain functionality"
  ],
  "tips": [
    "Use for production builds",
    "Keep source CSS for development",
    "Test minified output thoroughly",
    "Improves website performance"
  ]
};
