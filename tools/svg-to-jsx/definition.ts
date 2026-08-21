import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "svg-to-jsx",
  "name": "SVG to React JSX Converter",
  "category": "Design",
  "shortDescription": "Convert SVG code into clean React and React Native JSX components with camelCase attributes.",
  "heroTitle": "Convert SVG to React & Next.js JSX Components",
  "heroDescription": "Transform raw SVG files into production-ready React JSX components with camelCase properties and TypeScript support.",
  "about": "SVG to React JSX Converter cleans and transforms raw SVG markup into standard React and Next.js functional components, converting kebab-case SVG attributes (e.g. stroke-width -> strokeWidth) and stripping XML boilerplate.",
  "howToUse": [
    "Paste raw SVG code into the editor.",
    "Enter a custom component name (e.g., UserIcon).",
    "Toggle TypeScript SVGProps support if desired.",
    "Click Convert to JSX Component and copy your component code."
  ],
  "whyUse": [
    "Eliminates manual attribute renaming in React.",
    "Removes XML DOCTYPE and comment bloat.",
    "Generates clean TypeScript or JavaScript components ready to import."
  ],
  "faqs": [
    {
      "question": "Why do SVG attributes need to be camelCase in React?",
      "answer": "React JSX maps HTML and SVG attributes to DOM properties, requiring camelCase naming like strokeWidth, fillRule, and clipPath."
    },
    {
      "question": "Does it support spreading props onto the SVG?",
      "answer": "Yes, the generated component accepts and spreads props (like className, onClick, and size) onto the root <svg> element."
    }
  ],
  "features": [
    "Converts all kebab-case SVG attributes to camelCase",
    "Strips XML headers, DOCTYPE, and comments",
    "Custom component naming",
    "TypeScript SVGProps support",
    "One-click copy"
  ],
  "tips": [
    "Pass 'props' to your SVG component so you can easily override width, height, and colors in Tailwind",
    "Set 'stroke=\"currentColor\"' to allow the icon color to inherit from parent CSS text colors"
  ]
};
