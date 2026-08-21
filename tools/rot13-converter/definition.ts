import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "rot13-converter",
  "name": "ROT13 Converter",
  "category": "Encoding",
  "shortDescription": "Encode or decode text using the ROT13 cipher.",
  "heroTitle": "ROT13 Cipher",
  "heroDescription": "A simple letter substitution cipher that replaces a letter with the 13th letter after it.",
  "about": "ROT13 is a common way to hide spoilers or obfuscate text in online forums.",
  "howToUse": [
    "Enter your text.",
    "The ROT13 version is generated live.",
    "Copy the result."
  ],
  "whyUse": [
    "Obfuscating spoilers.",
    "Basic encryption puzzles.",
    "CS history."
  ],
  "faqs": [
    {
      "question": "Is ROT13 secure?",
      "answer": "No, it's easily reversible and not for security."
    }
  ],
  "features": [
    "Encode and decode ROT13 instantly",
    "Simple letter substitution",
    "Reversible cipher",
    "One-click copy",
    "No server calls"
  ],
  "tips": [
    "Use for obfuscating spoilers",
    "Basic encryption puzzles",
    "CS history education",
    "Not for security purposes"
  ]
};
