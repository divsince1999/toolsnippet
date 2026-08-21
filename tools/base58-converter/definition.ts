import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "base58-converter",
  "name": "Base58 Encoder & Decoder",
  "category": "Encoding",
  "shortDescription": "Encode and decode text strings using Bitcoin, IPFS, and Solana Base58 format.",
  "heroTitle": "Base58 (Bitcoin & IPFS) Encoder & Decoder",
  "heroDescription": "Convert text and hexadecimal data to and from Bitcoin Base58 encoding without ambiguous characters.",
  "about": "Base58 is a binary-to-text encoding scheme used in Bitcoin, IPFS, and Solana. It is designed specifically for humans by removing easily confused characters: 0 (zero), O (capital o), I (capital i), and l (lower L).",
  "howToUse": [
    "Select 'Encode to Base58' or 'Decode from Base58'.",
    "Enter your input text or Base58 string.",
    "Click the convert button to view the result."
  ],
  "whyUse": [
    "Standard encoding for Bitcoin wallet addresses and IPFS content identifiers (CIDs).",
    "Eliminates typographic errors caused by visually ambiguous letters."
  ],
  "faqs": [
    {
      "question": "How does Base58 differ from Base64?",
      "answer": "Base58 removes non-alphanumeric symbols (+, /, =) and ambiguous characters (0, O, I, l) to make strings easier to copy and read on mobile devices."
    }
  ],
  "features": [
    "Bitcoin & IPFS Base58 alphabet",
    "Bidirectional encode and decode modes",
    "Preserves leading zero bytes as '1's",
    "Client-side execution"
  ],
  "tips": [
    "Base58 is widely used across Solana public keys and Bitcoin legacy address formats"
  ]
};
