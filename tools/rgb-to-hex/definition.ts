import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "rgb-to-hex",
  "name": "RGB to HEX Converter",
  "category": "Design",
  "shortDescription": "Convert RGB colors to HEX codes.",
  "heroTitle": "RGB to HEX",
  "heroDescription": "Transform RGB color values into web-ready HEX color codes.",
  "about": "RGB to HEX Converter is a handy tool for web designers and developers.",
  "howToUse": [
    "Enter R, G, and B values (0-255).",
    "The HEX code is updated live.",
    "Copy the HEX value."
  ],
  "whyUse": [
    "Web design workflow.",
    "CSS development.",
    "Quick color conversion."
  ],
  "faqs": [
    {
      "question": "Does it support transparency?",
      "answer": "This version focuses on standard RGB to HEX."
    }
  ],
  "features": [
    "Convert RGB to HEX instantly",
    "Support 0-255 range",
    "Live color preview",
    "One-click copy",
    "Web-ready format"
  ],
  "tips": [
    "Use for CSS color values",
    "Check RGB values before conversion",
    "Great for web design",
    "Works with design tools"
  ]
};
