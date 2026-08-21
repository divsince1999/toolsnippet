import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "hash-generator",
  "name": "Hash Generator",
  "category": "Auth",
  "shortDescription": "Generate MD5, SHA-1, and SHA-256 hashes.",
  "heroTitle": "Generate secure hashes",
  "heroDescription": "Quickly create cryptographic hashes for strings in various algorithms.",
  "about": "Hash Generator is useful for checking data integrity, generating file checksums, or testing auth flows.",
  "howToUse": [
    "Enter the text you want to hash.",
    "Select the algorithm (MD5, SHA-256, etc.).",
    "Copy the generated hash."
  ],
  "whyUse": [
    "Multiple algorithms supported.",
    "Instant generation in the browser.",
    "Useful for security testing."
  ],
  "faqs": [
    {
      "question": "Is MD5 secure for passwords?",
      "answer": "No, MD5 is considered insecure for password storage. Use SHA-256 or better."
    }
  ],
  "features": [
    "Generate MD5, SHA-1, SHA-256 hashes",
    "Instant hash calculation",
    "Multiple algorithm support",
    "Client-side processing",
    "One-click copy"
  ],
  "tips": [
    "Use SHA-256 for security-critical data",
    "MD5 is only for non-security use cases",
    "Great for file checksums",
    "Never use MD5 for passwords"
  ]
};
