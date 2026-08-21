import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-grid-generator",
  "name": "CSS Grid Layout Generator",
  "category": "Design",
  "shortDescription": "Create multi-column and multi-row CSS grid layouts with interactive column and gap controls.",
  "heroTitle": "CSS Grid Layout Generator & Code Builder",
  "heroDescription": "Build responsive CSS grid layouts with customizable column/row matrices, fractional units, and Tailwind classes.",
  "about": "CSS Grid Layout Generator lets you visually construct grid structures with custom column counts, row counts, and independent row/column gaps, generating both standard CSS and Tailwind CSS classes.",
  "howToUse": [
    "Set desired number of columns (1 to 6) and rows (1 to 6).",
    "Adjust column gap and row gap sliders.",
    "Review the live interactive grid matrix.",
    "Copy pure CSS or Tailwind CSS utility classes."
  ],
  "whyUse": [
    "Simplifies two-dimensional layout creation in CSS.",
    "Provides both CSS Grid syntax and Tailwind CSS classes.",
    "Instant visual matrix feedback."
  ],
  "faqs": [
    {
      "question": "When should I use CSS Grid instead of Flexbox?",
      "answer": "Use CSS Grid for 2D layouts (rows AND columns simultaneously) and Flexbox for 1D layouts (single row OR single column)."
    },
    {
      "question": "What does '1fr' mean in CSS grid?",
      "answer": "1fr represents one fraction of the available space inside the grid container."
    }
  ],
  "features": [
    "Interactive column and row sliders",
    "Independent column and row gap controls",
    "Live cell grid preview",
    "Tailwind CSS class generator"
  ],
  "tips": [
    "Use 'repeat(auto-fit, minmax(250px, 1fr))' in production for auto-responsive card grids",
    "Set distinct row and column gaps to improve layout hierarchy"
  ]
};
