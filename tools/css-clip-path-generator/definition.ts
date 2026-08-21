import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-clip-path-generator",
  "name": "CSS Clip-Path Shape Generator",
  "category": "Design",
  "shortDescription": "Create polygon, star, geometric, and banner shapes using CSS clip-path.",
  "heroTitle": "CSS Clip-Path Shape & Polygon Generator",
  "heroDescription": "Create custom geometric shapes, banners, hexagons, chevrons, and stars using modern CSS clip-path.",
  "about": "CSS Clip-Path Shape Generator allows designers and developers to create complex vector mask shapes in pure CSS, including polygons, stars, chevrons, arrows, and speech bubbles.",
  "howToUse": [
    "Choose a shape from the preset shape matrix (Hexagon, Star, Chevron, Arrow, Message, etc.).",
    "Review the live clipped card preview.",
    "Copy the clip-path and -webkit-clip-path CSS rules."
  ],
  "whyUse": [
    "Creates stunning geometric UI masks without image masks or SVG clipping.",
    "Responsive and scales automatically with container dimensions.",
    "Hardware-accelerated rendering in modern browsers."
  ],
  "faqs": [
    {
      "question": "What is CSS clip-path?",
      "answer": "clip-path creates a clipping region that sets what part of an element should be visible, hiding everything outside the path."
    },
    {
      "question": "Can clip-path shapes be animated?",
      "answer": "Yes, you can transition clip-path polygon points smoothly as long as both states have the same number of vertices."
    }
  ],
  "features": [
    "12+ geometric and UI shape presets",
    "Live visual gradient mask preview",
    "Includes -webkit-clip-path prefix",
    "One-click copy"
  ],
  "tips": [
    "Use chevron or slant clip-paths on hero section bottom dividers for dynamic page transitions",
    "Use hexagon and circle clip-paths for modern profile avatars"
  ]
};
