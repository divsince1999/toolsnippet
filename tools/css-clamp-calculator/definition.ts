import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-clamp-calculator",
  "name": "CSS Clamp() Typography Calculator",
  "category": "Design",
  "shortDescription": "Generate fluid responsive font-size and spacing values using modern CSS clamp() formulas.",
  "heroTitle": "Fluid CSS Clamp() Typography & Spacing Calculator",
  "heroDescription": "Calculate mathematical CSS clamp(min, preferred, max) formulas for responsive fluid typography without media queries.",
  "about": "CSS Clamp() Typography Calculator computes the exact linear equation and viewport-width (vw) slope needed for fluid typography that scales smoothly between minimum and maximum screen sizes.",
  "howToUse": [
    "Enter your minimum and maximum viewport widths (e.g., 375px and 1440px).",
    "Enter your minimum and maximum font sizes (e.g., 16px and 36px).",
    "Adjust the preview viewport slider to verify responsive scaling.",
    "Copy the clamp() formula."
  ],
  "whyUse": [
    "Eliminates dozens of breakpoint media queries across your CSS.",
    "Guarantees pixel-perfect typography across all mobile, tablet, and desktop screens.",
    "Converts px to rem automatically based on your root font size."
  ],
  "faqs": [
    {
      "question": "How does CSS clamp() work?",
      "answer": "clamp(MIN, PREFERRED, MAX) keeps a value between MIN and MAX, scaling dynamically with the PREFERRED formula."
    },
    {
      "question": "Can I use clamp() for padding and margins?",
      "answer": "Yes, clamp() works on any CSS length property including font-size, padding, margin, width, and gap."
    }
  ],
  "features": [
    "Linear interpolation slope calculation",
    "Automatic rem conversion",
    "Configurable root font size",
    "Interactive viewport width preview slider",
    "Live font-size readout in pixels"
  ],
  "tips": [
    "Use clamp() on heading h1-h3 tags to prevent awkward line breaks on mobile screens",
    "Set your minimum viewport to 375px (iPhone standard) and maximum to 1440px or 1920px"
  ]
};
