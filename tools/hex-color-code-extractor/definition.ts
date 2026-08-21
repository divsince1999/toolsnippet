import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "hex-color-code-extractor",
  name: "CSS & Code Hex Color Extractor",
  category: "Design",
  shortDescription: "Extract all HEX, RGB, RGBA, and HSL color codes from CSS, HTML, and JavaScript with live color swatch previews.",
  heroTitle: "CSS & Code Hex Color Extractor",
  heroDescription: "Extract all HEX, RGB, RGBA, and HSL color codes from CSS, HTML, and JavaScript with live color swatch previews.",
  about: "The CSS & Code Hex Color Extractor scans raw CSS styles, Tailwind classes, SVG code, or JavaScript objects, extracts every color value, dedupes them, and provides interactive color swatches with 1-click copy.",
  features: [
    "Extracts 3, 6, and 8-digit HEX (#fff, #1a2b3c, #1a2b3c80)",
    "Extracts `rgb(...)`, `rgba(...)`, `hsl(...)`, and `hsla(...)` functions",
    "Renders live color preview swatches with click-to-copy",
    "Exports unique color palette as CSS variables or JSON array"
],
  howToUse: [
    "Paste any CSS stylesheet, SVG file, or code snippet.",
    "Instantly view all unique extracted colors rendered as preview cards.",
    "Click any color code to copy to your clipboard."
],
  whyUse: [
    "Quickly extract brand color palettes from client stylesheets.",
    "Audit and consolidate inconsistent hex shades across your design system."
],
  tips: [
    "Paste an entire SVG icon or illustration to extract its complete vector color palette."
],
  faqs: [
    {
        "question": "Does this extractor detect Tailwind arbitrary color values?",
        "answer": "Yes, it parses colors inside arbitrary Tailwind utility classes like `bg-[#4f46e5]` and `text-[rgba(0,0,0,0.5)]`."
    },
    {
        "question": "Can I export the extracted palette as CSS custom properties?",
        "answer": "Yes, you can copy all extracted colors formatted as `:root { --color-1: #...; }` variables."
    }
]
};
