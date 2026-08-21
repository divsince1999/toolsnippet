import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-box-shadow-generator",
  "name": "CSS Box Shadow Generator",
  "category": "Design",
  "shortDescription": "Create custom CSS box shadows with live visual preview, opacity, spread, and inset controls.",
  "heroTitle": "Interactive CSS Box Shadow Generator & Preview",
  "heroDescription": "Design multi-layer CSS box shadows with live visual feedback, blur, spread radius, color, and inset controls.",
  "about": "CSS Box Shadow Generator allows web developers and designers to craft smooth, modern drop shadows and inset shadows visually without guessing CSS pixel values.",
  "howToUse": [
    "Adjust horizontal and vertical offset sliders.",
    "Fine-tune blur radius and spread radius.",
    "Pick your shadow color, box background, and opacity.",
    "Toggle Inset Shadow for inner shadow effects.",
    "Click Copy CSS Code to paste directly into your stylesheet."
  ],
  "whyUse": [
    "Visual real-time shadow manipulation eliminates trial-and-error in CSS.",
    "Supports modern multi-vendor prefixes for cross-browser compatibility.",
    "Includes instant color opacity and inset controls."
  ],
  "faqs": [
    {
      "question": "What is the difference between blur and spread in CSS box-shadow?",
      "answer": "Blur softens the edges of the shadow, while spread expands or contracts the shadow footprint before blurring."
    },
    {
      "question": "How do I create an inner shadow?",
      "answer": "Check the 'Inset Shadow' option, which places the shadow inside the container frame instead of behind it."
    }
  ],
  "features": [
    "Interactive X and Y offset controls",
    "Blur and spread radius sliders",
    "Hex and RGBA color opacity picker",
    "Inset shadow toggle",
    "One-click CSS code copy"
  ],
  "tips": [
    "Use negative spread radius with large blur to create soft, modern elevated cards",
    "Lower shadow opacity (10-20%) creates much cleaner, more realistic lighting"
  ]
};
