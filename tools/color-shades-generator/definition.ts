import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "color-shades-generator",
  "name": "Color Shades & Tint Generator",
  "category": "Design",
  "shortDescription": "Generate a full 50-950 Tailwind/CSS palette of tints and shades from any base color.",
  "heroTitle": "Generate 50–950 color shades and Tailwind palettes",
  "heroDescription": "Create harmonious lighter tints and darker shades from any HEX or RGB color code.",
  "about": "Color Shades & Tint Generator allows UI/UX designers and frontend developers to create a full 50-950 color scale compatible with Tailwind CSS and modern design systems.",
  "howToUse": [
    "Pick a color with the color picker or enter a HEX code.",
    "Explore the generated 50 through 950 color swatches.",
    "Click any swatch to copy its HEX code or copy the full Tailwind config."
  ],
  "whyUse": [
    "Quickly generate accessible color palettes for buttons, borders, and backgrounds.",
    "Generates ready-to-paste Tailwind CSS theme configuration JSON.",
    "Smooth mathematical tint and shade blending algorithms."
  ],
  "faqs": [
    {
      "question": "How are the 50 to 950 shades calculated?",
      "answer": "Lighter tints (50-400) blend toward pure white, while darker shades (600-950) blend mathematically toward black."
    },
    {
      "question": "Can I use this with Tailwind CSS v3 and v4?",
      "answer": "Yes, the exported JSON format works seamlessly with Tailwind theme color extensions."
    }
  ],
  "features": [
    "Interactive visual color picker and hex input",
    "Full 11-step 50 to 950 palette",
    "Exportable Tailwind CSS configuration",
    "One-click copy for individual hex codes"
  ],
  "tips": [
    "Use 500 for primary buttons and 50/100 for subtle card backgrounds",
    "Use 700 to 900 for dark mode accents and accessible text on light backgrounds"
  ]
};
