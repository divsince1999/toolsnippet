import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "random-number-generator",
  "name": "Random Number Generator",
  "category": "Number",
  "shortDescription": "Generate random numbers with custom min, max, and quantity settings.",
  "heroTitle": "Generate random numbers fast",
  "heroDescription": "Create one or many random integers or decimals within any range, suitable for testing, sampling, and games.",
  "about": "Random Number Generator produces cryptographically-seeded random numbers using the browser's built-in crypto API for better randomness than standard Math.random().",
  "howToUse": [
    "Set your minimum and maximum range.",
    "Choose how many numbers to generate.",
    "Toggle between integers and decimals.",
    "Click Generate and copy the results."
  ],
  "whyUse": [
    "Better randomness using the browser crypto API.",
    "Generate batches of random values for testing data.",
    "Supports both integer and decimal modes."
  ],
  "faqs": [
    {
      "question": "Are these numbers truly random?",
      "answer": "They use the browser's crypto.getRandomValues(), which provides cryptographically strong random values."
    },
    {
      "question": "Can I generate floating-point decimals?",
      "answer": "Yes, toggle on 'Decimal Mode' to get random numbers with decimal precision."
    },
    {
      "question": "Is there a limit to how many numbers I can generate?",
      "answer": "You can generate up to 10,000 numbers at once."
    }
  ],
  "features": [
    "Configurable min and max range",
    "Batch generation (1 to 10,000 numbers)",
    "Integer and decimal modes",
    "Cryptographically strong randomness",
    "Copy all results at once"
  ],
  "tips": [
    "Use for generating test data and mock IDs",
    "Generate dice rolls by setting range 1-6",
    "Use decimal mode for random probability weights"
  ]
};
