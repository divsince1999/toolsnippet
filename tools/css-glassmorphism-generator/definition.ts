import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-glassmorphism-generator",
  "name": "CSS Glassmorphism Generator",
  "category": "Design",
  "shortDescription": "Create modern frosted glass UI cards with backdrop blur, transparency, and glossy borders.",
  "heroTitle": "CSS Glassmorphism & Frosted Glass Generator",
  "heroDescription": "Generate frosted glass UI effects with backdrop-filter blur, opacity, gloss highlights, and Tailwind CSS classes.",
  "about": "CSS Glassmorphism Generator creates modern frosted glass cards and modal dialogs with backdrop-filter blur, background opacity, saturation, and subtle translucent borders.",
  "howToUse": [
    "Adjust backdrop blur slider to control frosting intensity.",
    "Adjust background opacity to balance translucency and readability.",
    "Fine-tune border opacity to create crisp glossy edge highlights.",
    "Copy either the pure CSS code or Tailwind CSS utility classes."
  ],
  "whyUse": [
    "Modern UI aesthetic used in Apple macOS, Windows Fluent, and cutting-edge web apps.",
    "Generates both pure CSS and Tailwind CSS classes.",
    "Includes vendor prefixes (-webkit-backdrop-filter) for Safari compatibility."
  ],
  "faqs": [
    {
      "question": "Why does backdrop-filter require a vendor prefix?",
      "answer": "Safari requires -webkit-backdrop-filter for hardware-accelerated blur rendering."
    },
    {
      "question": "Does glassmorphism work on plain white backgrounds?",
      "answer": "Glassmorphism looks best over vibrant gradients, patterns, or images where the blur refraction is visible."
    }
  ],
  "features": [
    "Backdrop blur and saturation controls",
    "Background and border opacity sliders",
    "Live vibrant gradient card preview",
    "Instant pure CSS and Tailwind CSS export"
  ],
  "tips": [
    "Keep text contrast high by using pure white or black text with subtle text-shadow",
    "Add a 1px semi-transparent white border to give the illusion of physical glass edges"
  ]
};
