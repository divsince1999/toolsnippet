import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "aes-encryption-decryption",
  "name": "AES-GCM Text Encryptor & Decryptor",
  "category": "Auth",
  "shortDescription": "Military-grade 256-bit AES-GCM client-side text encryption with PBKDF2 salt derivation.",
  "heroTitle": "256-bit AES-GCM Text Encryptor & Decryptor",
  "heroDescription": "Encrypt and decrypt confidential messages using authenticated 256-bit AES-GCM and PBKDF2 passphrase key derivation.",
  "about": "AES-GCM (Advanced Encryption Standard in Galois/Counter Mode) provides both confidentiality and cryptographic integrity verification. This tool runs 100% in your browser using the native Web Crypto API.",
  "howToUse": [
    "To Encrypt: Enter your text, choose a secret passphrase, and click 'Encrypt with AES-256-GCM'.",
    "To Decrypt: Paste the Base64 ciphertext, enter the exact passphrase, and click 'Decrypt Ciphertext'."
  ],
  "whyUse": [
    "Complete end-to-end security: your passphrase and messages never leave your browser.",
    "Uses 256-bit keys, unique 16-byte random salts, and 12-byte initialization vectors (IV)."
  ],
  "faqs": [
    {
      "question": "What makes AES-GCM superior to AES-CBC?",
      "answer": "AES-GCM includes authenticated data validation, which immediately detects if the ciphertext was tampered with or modified."
    }
  ],
  "features": [
    "256-bit AES-GCM authenticated encryption",
    "PBKDF2 key derivation (100,000 iterations)",
    "Random 16-byte salt and 12-byte IV per encryption",
    "100% private in-browser Web Crypto API"
  ],
  "tips": [
    "Always use a strong, complex passphrase for reliable encryption strength"
  ]
};
