import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "image-to-base64",
  "name": "Image to Base64",
  "category": "Encoding",
  "shortDescription": "Convert images to Base64 data strings.",
  "heroTitle": "Embed Images in Code",
  "heroDescription": "Turn any image file into a Base64 string for CSS or HTML embedding.",
  "about": "Image to Base64 is useful for small icons or preventing extra HTTP requests.",
  "howToUse": [
    "Upload an image file.",
    "Copy the generated Base64 data URI.",
    "Paste into your code."
  ],
  "whyUse": [
    "Reducing HTTP requests.",
    "CSS background images.",
    "Email template embedding."
  ],
  "faqs": [
    {
      "question": "What is the file limit?",
      "answer": "It supports files up to 5MB for browser stability."
    }
  ],
  "features": [
    "Convert images to Base64 instantly",
    "Support multiple formats",
    "Generate data URI strings",
    "Client-side processing",
    "No server upload"
  ],
  "tips": [
    "Use for small icons only",
    "Reduces HTTP requests",
    "CSS background images",
    "Email template embedding"
  ]
};
