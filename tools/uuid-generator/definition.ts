import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "uuid-generator",
  "name": "UUID Generator",
  "category": "Data",
  "shortDescription": "Generate random UUIDs (v4) for your projects.",
  "heroTitle": "Generate UUIDs instantly",
  "heroDescription": "Generate unique identifiers for your database, testing, or mock data.",
  "about": "UUID Generator allows you to quickly generate version 4 UUIDs (Universally Unique Identifiers) directly in your browser.",
  "howToUse": [
    "Click the Generate button to create a new UUID.",
    "Specify how many UUIDs you want to generate at once.",
    "Copy the result to your clipboard."
  ],
  "whyUse": [
    "Fast and easy to use.",
    "No external dependencies or scripts needed.",
    "Perfect for mock data and testing."
  ],
  "faqs": [
    {
      "question": "What version of UUID is generated?",
      "answer": "This tool generates UUID version 4 (random)."
    },
    {
      "question": "Are these UUIDs truly unique?",
      "answer": "UUID v4 has a very low probability of collision, making it suitable for most applications."
    }
  ],
  "features": [
    "Generate UUID v4 instantly",
    "Generate multiple UUIDs at once",
    "Cryptographically random",
    "One-click copy",
    "No external dependencies"
  ],
  "tips": [
    "Use UUIDs for database primary keys",
    "Perfect for mock data generation",
    "Suitable for session identifiers",
    "Not for security-critical secrets"
  ]
};
