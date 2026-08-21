import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "ripemd160-generator",
  "name": "RIPEMD-160 Hash Generator",
  "category": "Encoding",
  "shortDescription": "Compute 160-bit (40 hex characters) RIPEMD-160 cryptographic hashes used in Bitcoin address generation and PGP.",
  "heroTitle": "Generate RIPEMD-160 Cryptographic Hashes",
  "heroDescription": "Calculate 160-bit RIPEMD-160 hashes used in Bitcoin (BTC) address derivation, PGP, and European cryptographic standards.",
  "about": "RIPEMD-160 (RACE Integrity Primitives Evaluation Message Digest) is a 160-bit cryptographic hash function widely recognized for its use in Bitcoin's address generation algorithm (SHA-256 followed by RIPEMD-160).",
  "howToUse": [
    "Paste your text or hex data in the input box.",
    "Click 'Generate RIPEMD-160 Hash'.",
    "Copy the resulting 40-character hex hash."
  ],
  "whyUse": [
    "Essential for developers building Bitcoin, cryptocurrency, and blockchain address tools.",
    "High-speed 160-bit hash calculation running locally in the browser."
  ],
  "faqs": [
    {
      "question": "Why does Bitcoin use RIPEMD-160?",
      "answer": "Bitcoin uses RIPEMD-160 to produce shorter (20-byte / 160-bit) address hashes from 256-bit public keys, reducing blockchain transaction data sizes."
    }
  ],
  "features": [
    "160-bit digest (40 hex chars)",
    "Standard Bitcoin & PGP algorithm",
    "Uppercase / lowercase toggle",
    "100% private in-browser computation"
  ],
  "tips": [
    "Combine with SHA-256 for Bitcoin Hash160 simulation"
  ]
};
