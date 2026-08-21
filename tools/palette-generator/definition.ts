import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "palette-generator",
  "name": "Harmonious Color Palette Generator",
  "category": "Design",
  "shortDescription": "Generate complementary, analogous, triadic, and monochromatic color palettes from any base color.",
  "heroTitle": "Harmonious Color Palette Generator",
  "heroDescription": "Generate color palettes based on color theory harmonies (Complementary, Analogous, Triadic, Monochromatic).",
  "about": "Harmonious Color Palette Generator creates balanced color schemes from any seed color using mathematical HSL color wheel harmony rules, providing instant one-click hex copying.",
  "howToUse": [
    "Pick a seed color with the color picker or enter a hex code.",
    "Review generated Complementary, Analogous, Triadic, and Monochromatic palettes.",
    "Click any color swatch to copy its HEX code."
  ],
  "whyUse": [
    "Guarantees visually balanced, mathematically harmonious color pairings.",
    "Covers all 4 core color theory harmony models.",
    "One-click clipboard copying for rapid UI design prototyping."
  ],
  "faqs": [
    {
      "question": "What is a Triadic color harmony?",
      "answer": "A triadic harmony uses three colors evenly spaced by 120 degrees around the color wheel, creating vibrant yet balanced contrast."
    },
    {
      "question": "What are Analogous colors?",
      "answer": "Analogous colors are located adjacent to each other on the color wheel, creating serene and comfortable color schemes."
    }
  ],
  "features": [
    "HSL mathematical color wheel algorithms",
    "4 harmony models (Complementary, Analogous, Triadic, Monochromatic)",
    "Interactive color swatches with one-click copy",
    "Live HEX code display"
  ],
  "tips": [
    "Use Analogous colors for subtle background gradients and accents",
    "Use Complementary colors for call-to-action buttons against primary brand backgrounds"
  ]
};
