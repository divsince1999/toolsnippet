import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "hmac-generator",
  "name": "HMAC Generator & Verifier",
  "category": "Auth",
  "shortDescription": "Generate and verify Hash-based Message Authentication Codes (HMAC) with SHA-256, SHA-512, and secret keys.",
  "heroTitle": "Generate Secure HMAC Authentication Codes",
  "heroDescription": "Compute cryptographically verified HMAC codes using SHA-256, SHA-512, SHA-384, or SHA-1 with secret signing keys.",
  "about": "HMAC Generator & Verifier calculates Hash-based Message Authentication Codes used for API request signing, webhook authentication (GitHub, Stripe, Shopify), and tamper-proof message verification.",
  "howToUse": [
    "Enter the message or webhook payload in the input field.",
    "Provide your secret API key or signing secret.",
    "Select your hashing algorithm (HMAC-SHA256, HMAC-SHA512) and output encoding (Hex or Base64).",
    "Click 'Generate HMAC Code' and copy the resulting signature."
  ],
  "whyUse": [
    "Essential for verifying and testing Webhook signatures from Stripe, GitHub, and Shopify.",
    "Runs 100% in your browser using the native Web Crypto API for zero latency and privacy.",
    "Supports uppercase and lowercase hexadecimal output."
  ],
  "faqs": [
    {
      "question": "What is an HMAC?",
      "answer": "HMAC stands for Hash-based Message Authentication Code. It is a cryptographic mechanism that combines a secret key with a message to verify both data integrity and authentication."
    },
    {
      "question": "Is my secret key sent to any server?",
      "answer": "No. The entire HMAC signature is calculated locally in your browser using window.crypto.subtle."
    }
  ],
  "features": [
    "Supports HMAC-SHA256, HMAC-SHA512, HMAC-SHA384, HMAC-SHA1",
    "Hexadecimal and Base64 output encodings",
    "Uppercase and lowercase hex options",
    "100% client-side Web Crypto API"
  ],
  "tips": [
    "Use HMAC-SHA256 for standard modern webhook verification (GitHub, Stripe, AWS)",
    "Always keep your secret key confidential"
  ]
};
