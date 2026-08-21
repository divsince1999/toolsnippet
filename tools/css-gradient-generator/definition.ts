import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-gradient-generator",
  "name": "CSS Gradient Generator",
  "category": "Design",
  "shortDescription": "Create beautiful linear and radial CSS gradients with multi-color stops and angles.",
  "heroTitle": "CSS Linear & Radial Gradient Generator",
  "heroDescription": "Build smooth CSS gradients with multi-color stops, 360-degree angle controls, and curated color presets.",
  "about": "CSS Gradient Generator lets frontend engineers and UI designers create vibrant linear and radial gradients with customizable color stops, angles, and one-click CSS copy.",
  "howToUse": [
    "Select Linear or Radial gradient mode.",
    "Adjust the gradient angle dial or slider.",
    "Pick your color stops (supports 2 or 3 colors).",
    "Click one of the curated presets for instant inspiration.",
    "Copy the CSS code."
  ],
  "whyUse": [
    "Fast visual color blending with real-time gradient preview.",
    "Supports 360-degree orientation angles.",
    "Includes popular design system presets (Hyper, Sunset, Ocean, Emerald)."
  ],
  "faqs": [
    {
      "question": "What is the standard angle for diagonal gradients?",
      "answer": "135 degrees (top-left to bottom-right) is the most popular angle in modern web design."
    },
    {
      "question": "Is there a fallback color in the generated CSS?",
      "answer": "Yes, the code includes a solid background fallback for legacy browsers that do not support CSS gradients."
    }
  ],
  "features": [
    "Linear and Radial gradient modes",
    "360-degree angle slider",
    "Multi-stop color picker with hex inputs",
    "Curated gradient preset library",
    "Copyable CSS code with fallback"
  ],
  "tips": [
    "Pair adjacent color hues (e.g. indigo to purple to pink) for smooth, non-muddy gradients",
    "Use radial gradients as ambient background glow under hero sections"
  ]
};
