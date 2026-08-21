import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "case-converter-camel-snake-kebab",
  "name": "Code Variable Case Converter",
  "category": "Text",
  "shortDescription": "Convert identifiers between camelCase, snake_case, kebab-case, and PascalCase.",
  "heroTitle": "Convert variable names across code case conventions",
  "heroDescription": "Simultaneously generate camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, and dot.case.",
  "about": "Code Variable Case Converter helps software engineers convert variable names, function identifiers, database column names, and API keys across all major programming case styles.",
  "howToUse": [
    "Enter one or more variable names (one per line).",
    "View all case transformations rendered in real-time.",
    "Click Copy next to your desired naming style."
  ],
  "whyUse": [
    "Standardize naming conventions when switching between frontend (camelCase) and backend/database (snake_case).",
    "Batch convert multi-line variable lists in seconds.",
    "Instant copy with zero page reload."
  ],
  "faqs": [
    {
      "question": "Can I convert multiple lines at once?",
      "answer": "Yes, you can paste dozens of variable names and every case style will transform all lines simultaneously."
    },
    {
      "question": "How does it handle existing delimiters like dashes or underscores?",
      "answer": "The parser intelligently splits words on dashes, underscores, dots, and camelCase boundaries."
    }
  ],
  "features": [
    "camelCase, snake_case, kebab-case",
    "PascalCase, CONSTANT_CASE, dot.case, path/case",
    "Multi-line batch support",
    "Individual one-click copy buttons"
  ],
  "tips": [
    "Use CONSTANT_CASE for environment variables and constants",
    "Use kebab-case for URL slugs, CSS class names, and filenames"
  ]
};
