import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "roman-numeral-converter",
  "name": "Roman Numeral Converter",
  "category": "Number",
  "shortDescription": "Convert numbers (1–3999) to Roman numerals and back.",
  "heroTitle": "Convert Roman numerals instantly",
  "heroDescription": "Quickly convert between standard integers and Roman numeral notation in both directions.",
  "about": "Roman Numeral Converter is a handy utility for historians, students, designers working with clock faces or chapter numbering, and developers building internationalization features.",
  "howToUse": [
    "Enter a number (1–3999) to convert to Roman numerals.",
    "Or enter Roman numerals (e.g. XIV) to convert back to a number.",
    "The conversion is automatic and instant."
  ],
  "whyUse": [
    "Supports both conversion directions in a single tool.",
    "Handles full standard Roman numeral notation up to 3999.",
    "Useful for design, publishing, and academic work."
  ],
  "faqs": [
    {
      "question": "What is the largest Roman numeral?",
      "answer": "Standard Roman numerals go up to 3999 (MMMCMXCIX). Beyond that, a bar notation is required."
    },
    {
      "question": "Is 0 representable in Roman numerals?",
      "answer": "No. Roman numerals do not have a symbol for zero."
    },
    {
      "question": "Are Roman numerals case-sensitive?",
      "answer": "No, the tool accepts both uppercase (XIV) and lowercase (xiv) input."
    }
  ],
  "features": [
    "Number to Roman numeral conversion",
    "Roman numeral to number conversion",
    "Supports full range (1–3999)",
    "Case-insensitive Roman input",
    "Instant bidirectional conversion"
  ],
  "tips": [
    "Use for book chapter numbering in documents",
    "Great for clock face design and decorative typography",
    "Test edge cases: 4 = IV, 9 = IX, 40 = XL, 90 = XC"
  ]
};
