import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "sha512-hash-generator",
  "name": "SHA-512 Hash Generator",
  "category": "Encoding",
  "shortDescription": "Compute secure 512-bit SHA-512 cryptographic checksums with client-side Web Crypto.",
  "heroTitle": "Generate Secure 512-bit SHA-512 Hashes",
  "heroDescription": "Instantly calculate 128-hex-character SHA-512 cryptographic hashes and checksums directly in your browser.",
  "about": "SHA-512 Hash Generator produces a 512-bit (64-byte) cryptographic digest formatted as a 128-character hexadecimal string, widely used for password hashing, file integrity verification, and digital signatures.",
  "howToUse": [
    "Type or paste your text into the input area.",
    "Toggle Uppercase HEX if required.",
    "Click 'Generate SHA-512 Hash' to compute the 128-character checksum.",
    "Copy the result with one click."
  ],
  "whyUse": [
    "Provides significantly higher collision resistance than SHA-256.",
    "Ideal for verifying high-security file downloads and cryptographic proofs.",
    "Calculated client-side with native browser Web Crypto performance."
  ],
  "faqs": [
    {
      "question": "How long is a SHA-512 hash?",
      "answer": "A SHA-512 hash is 512 bits long, which renders as exactly 128 hexadecimal characters."
    },
    {
      "question": "Can a SHA-512 hash be decrypted?",
      "answer": "No. SHA-512 is a one-way cryptographic hash function and cannot be reversed or decrypted back into the original input."
    }
  ],
  "features": [
    "512-bit cryptographic digest",
    "128 hexadecimal character output",
    "Uppercase and lowercase toggles",
    "Client-side Web Crypto execution"
  ],
  "tips": [
    "Use SHA-512 when building high-security signature systems or file integrity manifests"
  ]
};
