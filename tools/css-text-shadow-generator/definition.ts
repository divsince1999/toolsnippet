import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "css-text-shadow-generator",
  "name": "CSS Text Shadow Generator",
  "category": "Design",
  "shortDescription": "Create custom CSS text shadows, neon glow effects, and 3D typography styling.",
  "heroTitle": "CSS Text Shadow Generator & 3D Text Styler",
  "heroDescription": "Design glowing neon, vintage 3D, and soft drop text shadows with real-time typography previews.",
  "about": "CSS Text Shadow Generator lets designers create stunning text effects including neon glow, retro 3D extrusions, and soft readability shadows with copyable CSS code.",
  "howToUse": [
    "Type your custom preview text.",
    "Adjust horizontal offset, vertical offset, and blur radius.",
    "Select shadow color, text color, and background color.",
    "Or choose from presets like Neon Glow, Retro 3D, or Fire Glow.",
    "Copy the text-shadow CSS property."
  ],
  "whyUse": [
    "Make text readable over complex image or video backgrounds.",
    "Create stylized 80s neon, cyberpunk, or gaming typography.",
    "Visual real-time preview on custom text."
  ],
  "faqs": [
    {
      "question": "How does text-shadow differ from box-shadow in CSS?",
      "answer": "text-shadow applies directly to the glyph contours of text characters and does not accept a 'spread' radius."
    },
    {
      "question": "How do I create a neon text glow effect?",
      "answer": "Set X and Y offsets to 0, use a bright saturated shadow color, and increase the blur radius to 15-25px."
    }
  ],
  "features": [
    "X and Y offset and blur sliders",
    "Color pickers for text, shadow, and background",
    "Curated style presets (Neon, Retro 3D, Subtle Drop)",
    "Live typographic preview canvas"
  ],
  "tips": [
    "Use '0 1px 2px rgba(0,0,0,0.6)' on white text over hero background images to improve readability",
    "Use neon glow on dark backgrounds for gaming or tech landing pages"
  ]
};
