import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "svg-path-visualizer",
  "name": "SVG Path Visualizer & Scaler",
  "category": "Design",
  "shortDescription": "Inspect, render, and convert raw SVG path d-strings into complete scalable SVG elements.",
  "heroTitle": "SVG Path (d attribute) Visualizer & Scaler",
  "heroDescription": "Paste any SVG <path d=\"...\"> coordinate string to render, inspect, customize stroke/fill, and export full SVG code.",
  "about": "SVG Path Visualizer renders raw path coordinate strings (the 'd' attribute) found in vector icons and charts, enabling developers to inspect geometry, adjust fill and stroke colors, and wrap coordinates in a full SVG element.",
  "howToUse": [
    "Paste your SVG path 'd' string or entire <path> element.",
    "Set viewBox dimensions (e.g. 24, 100).",
    "Toggle and customize fill color, stroke color, and stroke width.",
    "Click Generate SVG Markup and copy the complete SVG code."
  ],
  "whyUse": [
    "Inspect path coordinates extracted from icon libraries or font files.",
    "Turn raw coordinate snippets into valid, copyable SVG tags.",
    "Customize stroke and fill colors visually before adding to code."
  ],
  "faqs": [
    {
      "question": "What does the SVG 'd' attribute stand for?",
      "answer": "The 'd' attribute stands for 'data' and contains a sequence of path drawing commands like M (moveto), L (lineto), C (curveto), and Z (closepath)."
    },
    {
      "question": "Can I paste an entire <path ...> tag?",
      "answer": "Yes, the tool automatically extracts the 'd' coordinate attribute if you paste an entire <path> or d=\"...\" tag."
    }
  ],
  "features": [
    "Auto-extracts d-coordinates from raw path strings or tags",
    "Customizable fill, stroke color, and stroke width",
    "Scalable viewBox dimensions",
    "Full SVG element code generator"
  ],
  "tips": [
    "Use this tool to verify SVG icon paths copied from GitHub or icon packs before embedding in React",
    "Set fill to none and stroke to currentColor for clean outline icons"
  ]
};
