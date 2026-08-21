import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-neumorphism-generator",
  "name": "CSS Neumorphism (Soft UI) Generator",
  "category": "Design",
  "shortDescription": "Create modern Soft UI extruded and pressed neumorphic shadows with customized lighting.",
  "heroTitle": "CSS Neumorphism & Soft UI Generator",
  "heroDescription": "Generate soft extruded and pressed neumorphic cards with light/dark shadow contrasts and shape styles.",
  "about": "CSS Neumorphism Generator calculates the dual light and dark shadow pairs required to produce tactile Soft UI (Neumorphic) surfaces, supporting flat, concave, convex, and inset pressed states.",
  "howToUse": [
    "Pick your base background color.",
    "Choose shape type: Flat, Concave, Convex, or Inset.",
    "Adjust shadow distance, blur radius, and corner radius.",
    "Copy the generated Soft UI CSS code."
  ],
  "whyUse": [
    "Calculates mathematically paired light and dark highlight shadows automatically.",
    "Supports 4 distinct tactile surface shapes.",
    "Live interactive canvas preview."
  ],
  "faqs": [
    {
      "question": "What is Neumorphism / Soft UI?",
      "answer": "Neumorphism is a design trend that uses dual soft shadows (one dark, one light) to make UI elements appear extruded directly from the background."
    },
    {
      "question": "Why does the background color need to match the element color in Neumorphism?",
      "answer": "Neumorphic effects rely on the illusion that the element is molded from the same physical surface as the background."
    }
  ],
  "features": [
    "Automatic light and dark highlight shadow calculation",
    "4 surface modes: Flat, Concave, Convex, and Inset",
    "Distance, blur, and corner radius sliders",
    "One-click CSS code copy"
  ],
  "tips": [
    "Soft off-white (#e0e5ec) and light slate backgrounds yield the most realistic neumorphic lighting",
    "Use inset pressed shadows for active button states and checkboxes"
  ]
};
