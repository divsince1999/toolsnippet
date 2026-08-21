import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "aspect-ratio-calculator",
  "name": "Aspect Ratio Calculator",
  "category": "Number",
  "shortDescription": "Calculate missing width or height from an aspect ratio.",
  "heroTitle": "Calculate aspect ratios for any size",
  "heroDescription": "Find missing dimensions for images, videos, and UI elements based on standard or custom aspect ratios.",
  "about": "Aspect Ratio Calculator is essential for designers and developers who need to maintain correct proportions when resizing images, videos, or responsive UI containers.",
  "howToUse": [
    "Select a preset ratio (e.g. 16:9) or enter a custom ratio.",
    "Enter either the width or height.",
    "The missing dimension is calculated instantly."
  ],
  "whyUse": [
    "Prevents distorted images when resizing for different screens.",
    "Covers common video, photo, and social media aspect ratios.",
    "Works completely offline in the browser."
  ],
  "faqs": [
    {
      "question": "What is aspect ratio?",
      "answer": "Aspect ratio is the proportional relationship between width and height, e.g. 16:9 means for every 16 units of width, there are 9 units of height."
    },
    {
      "question": "Can I enter a custom ratio?",
      "answer": "Yes, you can enter any W:H ratio in the custom ratio fields."
    },
    {
      "question": "What units are used?",
      "answer": "The tool is unit-agnostic. You can use pixels, centimetres, inches — just be consistent."
    }
  ],
  "features": [
    "Common presets: 16:9, 4:3, 1:1, 3:2, 9:16",
    "Custom ratio input",
    "Solve for width or height",
    "Pixel-perfect results",
    "Instant real-time calculation"
  ],
  "tips": [
    "Use 16:9 for YouTube thumbnails and video embeds",
    "Use 1:1 for Instagram post images",
    "Use 9:16 for mobile stories and TikTok-style vertical video"
  ]
};
