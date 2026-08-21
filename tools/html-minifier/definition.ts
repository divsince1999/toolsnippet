import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "html-minifier",
  "name": "HTML Minifier",
  "category": "Data",
  "shortDescription": "Compress HTML markup for better performance.",
  "heroTitle": "Optimize HTML delivery",
  "heroDescription": "Remove whitespace and comments from HTML documents.",
  "about": "HTML Minifier helps in delivering lean HTML to the client browser.",
  "howToUse": [
    "Paste your HTML.",
    "Click Minify HTML.",
    "Copy the result."
  ],
  "whyUse": [
    "Faster TTI (Time to Interactive).",
    "Lower page weight.",
    "Cleaner production source."
  ],
  "faqs": [
    {
      "question": "Does it remove script tags?",
      "answer": "No, it only minifies the markup itself."
    }
  ],
  "features": [
    "Minify HTML for production",
    "Remove whitespace and comments",
    "Reduce page weight",
    "Faster TTI",
    "Maintain functionality"
  ],
  "tips": [
    "Use for production builds",
    "Keep source for development",
    "Test minified HTML thoroughly",
    "Improves page load speed"
  ]
};
