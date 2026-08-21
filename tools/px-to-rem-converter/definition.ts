import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "px-to-rem-converter",
  "name": "PX to REM & REM to PX Converter",
  "category": "Design",
  "shortDescription": "Convert pixels (px) to rem/em units and back with customizable base root font sizes.",
  "heroTitle": "Bidirectional PX to REM & REM to PX Converter",
  "heroDescription": "Convert pixels to rem and rem to pixels instantly with custom root font size (16px / 10px) and standard Tailwind reference table.",
  "about": "PX to REM Converter helps developers convert pixel values into relative REM units for accessible, scalable web layouts, featuring customizable root font sizes and a full Tailwind CSS conversion reference table.",
  "howToUse": [
    "Enter a pixel value or a rem value in either input box.",
    "Choose your root font size (default 16px, or 10px 62.5% trick).",
    "Conversion updates bidirectionally in real time.",
    "Click any item in the reference table to load standard sizes."
  ],
  "whyUse": [
    "REM units respect user browser font size preferences for accessibility.",
    "Bidirectional: calculate px from rem or rem from px instantly.",
    "Includes complete conversion reference table matching Tailwind CSS spacing scales."
  ],
  "faqs": [
    {
      "question": "Why should I use REM instead of PX in CSS?",
      "answer": "REM units scale proportionally when users change their default browser font size, improving web accessibility."
    },
    {
      "question": "What is the 62.5% CSS font-size trick?",
      "answer": "Setting 'html { font-size: 62.5%; }' makes 1rem equal to exactly 10px (e.g. 1.6rem = 16px), simplifying mental math."
    }
  ],
  "features": [
    "Real-time bidirectional conversion (PX <-> REM)",
    "Customizable root base font size (16px, 10px, or custom)",
    "Interactive Tailwind CSS size reference table",
    "One-click values loading"
  ],
  "tips": [
    "Use REM for font sizes, margins, and padding, and PX for 1px borders",
    "Standard browser default root font size is 16px (1rem = 16px)"
  ]
};
