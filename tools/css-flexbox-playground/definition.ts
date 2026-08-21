import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-flexbox-playground",
  "name": "CSS Flexbox Generator & Playground",
  "category": "Design",
  "shortDescription": "Visual interactive builder for CSS Flexbox layouts with direction, alignment, and gap controls.",
  "heroTitle": "Interactive CSS Flexbox Generator & Visual Playground",
  "heroDescription": "Experiment with flex-direction, justify-content, align-items, flex-wrap, and gap with real-time visual cards.",
  "about": "CSS Flexbox Generator & Playground provides an interactive canvas to visually test and generate CSS flexbox container code.",
  "howToUse": [
    "Select flex-direction (row, column, row-reverse, column-reverse).",
    "Choose justify-content and align-items alignments.",
    "Adjust gap and flex-wrap properties.",
    "Add or remove items to test responsive wrapping.",
    "Copy the CSS code."
  ],
  "whyUse": [
    "Master CSS flexbox alignment rules visually without guessing.",
    "Instant copyable CSS container rules.",
    "Interactive item count testing."
  ],
  "faqs": [
    {
      "question": "What is the difference between justify-content and align-items?",
      "answer": "justify-content aligns items along the primary axis (horizontal in row mode), while align-items aligns along the cross axis (vertical in row mode)."
    },
    {
      "question": "What does flex-wrap: wrap do?",
      "answer": "It allows flex items to wrap onto multiple lines when there is not enough room in the container."
    }
  ],
  "features": [
    "Full primary and cross axis controls",
    "Live interactive flex container preview",
    "Adjustable gap and item counters",
    "One-click CSS code copy"
  ],
  "tips": [
    "Use 'justify-content: space-between' with 'align-items: center' for navigation headers",
    "Use modern 'gap' property instead of adding margins to child elements"
  ]
};
