import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "api-mock-payload-generator",
  "name": "API Mock Payload & Fake Data Generator",
  "category": "Data",
  "shortDescription": "Generate mock JSON REST API responses for Users, Products, and Paginated datasets.",
  "heroTitle": "Generate Mock JSON REST API Payloads",
  "heroDescription": "Create mock JSON payloads for testing frontend components, prototyping APIs, and seeding databases.",
  "about": "API Mock Payload Generator creates structured fake JSON responses for Users, E-Commerce Products, and Paginated REST envelopes with customizable counts and reproducible seed generation.",
  "howToUse": [
    "Select your Data Entity Type (Users, Products, or Paginated Envelope).",
    "Set your desired item count (up to 50 items).",
    "Click 'Regenerate Random Seed' for fresh mock variations.",
    "Copy the formatted JSON response directly into your frontend mock handlers or tests."
  ],
  "whyUse": [
    "Speed up frontend development before backend endpoints are built.",
    "Deterministic data generation with realistic names, emails, SKUs, and prices."
  ],
  "faqs": [
    {
      "question": "Can I use this with MSW (Mock Service Worker)?",
      "answer": "Yes! The generated JSON objects are standard REST envelopes ready to be returned directly inside MSW or MirageJS request handlers."
    }
  ],
  "features": [
    "Generates User profiles with realistic names, emails, and roles",
    "Generates Product inventories with SKUs, ratings, and stock status",
    "Standard paginated REST response envelope formatting",
    "Custom item count and random seed generation"
  ],
  "tips": [
    "Use the Paginated Envelope preset to test pagination controls and infinite scroll components in React"
  ]
};
