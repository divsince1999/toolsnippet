import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "sha3-hash-generator",
  "name": "SHA-3 (Keccak) Hash Generator",
  "category": "Encoding",
  "shortDescription": "Generate FIPS 202 compliant SHA-3 (Keccak) cryptographic hashes (SHA3-256, SHA3-512, SHA3-384, SHA3-224).",
  "heroTitle": "SHA-3 / Keccak Cryptographic Hash Generator",
  "heroDescription": "Compute official FIPS 202 SHA-3 and Keccak sponge cryptographic hashes for blockchain, Ethereum, and modern security.",
  "about": "SHA-3 (Secure Hash Algorithm 3) is the latest cryptographic hash standard released by NIST based on the Keccak sponge function. It provides a fundamentally different mathematical structure from SHA-2.",
  "howToUse": [
    "Paste your text string into the input area.",
    "Select your SHA-3 variant: SHA3-256, SHA3-512, SHA3-384, or SHA3-224.",
    "Click 'Generate SHA-3 Hash' to view the output."
  ],
  "whyUse": [
    "Immune to length-extension attacks that affect older hash algorithms.",
    "Widely used across Web3, Ethereum, and next-generation security standards.",
    "Pure client-side implementation with zero server transmission."
  ],
  "faqs": [
    {
      "question": "How does SHA-3 differ from SHA-2?",
      "answer": "While SHA-2 uses the Merkle–Damgård construction, SHA-3 uses the innovative Keccak sponge construction, making it completely immune to length extension attacks."
    }
  ],
  "features": [
    "Supports SHA3-256, SHA3-512, SHA3-384, SHA3-224",
    "FIPS 202 compliant Keccak implementation",
    "Uppercase / lowercase hexadecimal output",
    "One-click copy"
  ],
  "tips": [
    "Use SHA3-256 for modern cryptographic projects requiring non-SHA-2 diversity"
  ]
};
