import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-border-radius-generator",
  "name": "CSS Border Radius & Blob Generator",
  "category": "Design",
  "shortDescription": "Create unique organic shapes, blobs, and fancy border-radius styling with 8-point controls.",
  "heroTitle": "8-Point CSS Border Radius & Organic Blob Generator",
  "heroDescription": "Craft organic blob shapes and asymmetric border radii using 8-value CSS border-radius notation.",
  "about": "CSS Border Radius & Blob Generator gives you full 8-point control over horizontal and vertical radii, enabling organic floating blobs and asymmetric shape styling.",
  "howToUse": [
    "Adjust horizontal radius sliders for all four corners.",
    "Adjust vertical radius sliders for all four corners.",
    "Or pick from organic presets like Blob, Egg, Leaf, Water Drop, or Pebble.",
    "Copy the generated border-radius CSS property."
  ],
  "whyUse": [
    "Creates organic, fluid shapes without needing external SVG or vector files.",
    "Provides granular control over the 8-value border-radius slash syntax.",
    "Lightweight, 100% pure CSS solution."
  ],
  "faqs": [
    {
      "question": "How does the 8-value border-radius syntax work?",
      "answer": "The format 'h1 h2 h3 h4 / v1 v2 v3 v4' defines individual horizontal (h) and vertical (v) radii for top-left, top-right, bottom-right, and bottom-left corners."
    },
    {
      "question": "Can I animate border-radius blobs in CSS?",
      "answer": "Yes, you can transition or keyframe-animate border-radius values smoothly to create morphing blobs."
    }
  ],
  "features": [
    "8-point independent corner sliders",
    "Live morphing shape preview",
    "Curated organic shape presets",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Combine an organic blob border-radius with a subtle CSS gradient for modern hero illustrations",
    "Animate border-radius between two blob states for a living background effect"
  ]
};
