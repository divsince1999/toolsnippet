import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "svg-optimizer",
  "name": "SVG Code Minifier & Optimizer",
  "category": "Design",
  "shortDescription": "Minify and clean SVG code by stripping XML headers, editor metadata, and redundant tags.",
  "heroTitle": "Minify & Clean SVG Code Online",
  "heroDescription": "Strip bloated editor metadata from Figma, Illustrator, and Inkscape, compress whitespace, and reduce SVG file size.",
  "about": "SVG Code Minifier & Optimizer cleans export bloat from vector editors (Adobe Illustrator, Sketch, Figma, Inkscape), removing unused namespaces, metadata, and redundant whitespace.",
  "howToUse": [
    "Paste your uncompressed SVG code into the input field.",
    "Click Minify & Optimize SVG.",
    "View total bytes saved and inspect the rendered preview.",
    "Copy the cleaned, minified SVG markup."
  ],
  "whyUse": [
    "Reduces SVG file weight by up to 50% for faster web page loading.",
    "Strips unnecessary editor tags and private metadata.",
    "Includes live visual verification to ensure no graphics are corrupted."
  ],
  "faqs": [
    {
      "question": "What metadata does this tool remove?",
      "answer": "It removes XML declarations, DOCTYPE headers, Adobe/Figma/Sketch namespace definitions, empty defs, and whitespace."
    },
    {
      "question": "Will optimization alter the visual appearance of my SVG?",
      "answer": "No, only non-rendering metadata and whitespace are removed; all paths, fills, and strokes remain intact."
    }
  ],
  "features": [
    "Strips XML headers, DOCTYPE, and metadata",
    "Removes Illustrator, Figma, and Inkscape tags",
    "Calculates exact byte savings and percentage",
    "Live SVG render preview"
  ],
  "tips": [
    "Minify SVGs before embedding them inline into HTML or CSS to reduce DOM size",
    "Ensure paths have clean viewBox coordinates before minification"
  ]
};
