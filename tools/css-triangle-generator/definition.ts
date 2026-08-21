import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-triangle-generator",
  "name": "CSS Triangle Generator",
  "category": "Design",
  "shortDescription": "Create pure CSS triangles pointing in any direction with custom dimensions and colors.",
  "heroTitle": "Pure CSS Triangle Generator & Code Builder",
  "heroDescription": "Generate lightweight CSS border triangles pointing top, bottom, left, right, or diagonally with custom colors.",
  "about": "CSS Triangle Generator uses the classic CSS border geometry technique to create pure vector triangles without images or SVGs, perfect for tooltips, popover arrows, and dropdown indicators.",
  "howToUse": [
    "Select your triangle direction (Top, Bottom, Left, Right, or Diagonals).",
    "Adjust width and height sliders.",
    "Pick your triangle color.",
    "Copy the pure CSS code."
  ],
  "whyUse": [
    "Zero HTTP requests or extra asset dependencies.",
    "Works in all browsers back to IE6.",
    "Ideal for tooltip pointers, breadcrumbs, and accordion arrows."
  ],
  "faqs": [
    {
      "question": "How do CSS border triangles work?",
      "answer": "By setting width and height to 0 and applying colored borders opposite to transparent borders, the browser renders triangular border miters."
    },
    {
      "question": "Can I use CSS triangles in pseudo-elements?",
      "answer": "Yes, CSS triangles are commonly placed inside ::before and ::after pseudo-elements with 'content: \"\"'."
    }
  ],
  "features": [
    "8 triangle directions (cardinal and diagonal)",
    "Custom width and height sliders",
    "Hex and RGB color picker",
    "Clean CSS code generator"
  ],
  "tips": [
    "Attach your triangle to a tooltip box using 'position: absolute' on the ::after pseudo-element",
    "For diagonal triangles, set the adjacent borders to transparent"
  ]
};
