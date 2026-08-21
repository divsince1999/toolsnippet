import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "nanoid-generator",
  "name": "Nano ID Generator",
  "category": "Data",
  "shortDescription": "Generate cryptographically secure, URL-safe compact unique IDs with customizable length and alphabets.",
  "heroTitle": "Generate Compact & Secure Nano IDs",
  "heroDescription": "Create URL-safe, compact unique string IDs with custom lengths (5-64) and alphabet presets (Numbers, Hex, Custom).",
  "about": "Nano ID is a tiny, secure, URL-friendly unique string ID generator. It uses cryptographically strong hardware random values and is twice as compact as UUIDs with equal collision resistance.",
  "howToUse": [
    "Select your ID length (default 21 characters) and batch count.",
    "Choose an alphabet preset (URL-Safe, Numbers Only, Hexadecimal, or Custom).",
    "Click 'Generate Nano IDs' to copy your generated IDs."
  ],
  "whyUse": [
    "Significantly shorter and more URL-friendly than standard 36-character UUIDs.",
    "Customizable alphabet allows generating numeric OTPs, short URLs, or alphanumeric codes."
  ],
  "faqs": [
    {
      "question": "How collision-resistant is a 21-character Nano ID?",
      "answer": "With a 21-character URL-safe alphabet, generating 1,000 IDs per second would take roughly 4,000 years for a single collision to occur."
    }
  ],
  "features": [
    "Customizable length from 5 to 64 characters",
    "Presets for URL-safe, Numbers, Hex, and Custom alphabets",
    "Batch generation up to 50 IDs",
    "Cryptographically secure randomness"
  ],
  "tips": [
    "Use standard 21-character Nano IDs for modern database primary keys and public slug URLs"
  ]
};
