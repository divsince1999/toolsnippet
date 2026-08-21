import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "argon2-hasher",
  "name": "PBKDF2 / Password Key Hasher",
  "category": "Auth",
  "shortDescription": "Derive secure cryptographic password hashes using PBKDF2 with custom iterations, salt, and SHA-512.",
  "heroTitle": "Derive Cryptographic Keys & Hashes with PBKDF2",
  "heroDescription": "Compute memory-hard key derivations using PBKDF2 with up to 600,000 iterations, custom salts, and SHA-512.",
  "about": "PBKDF2 (Password-Based Key Derivation Function 2) applies a pseudorandom function to input passwords along with a cryptographic salt, repeating the process hundreds of thousands of times to thwart brute-force attacks.",
  "howToUse": [
    "Enter the password to derive.",
    "Set your custom salt or click 'Random Salt'.",
    "Choose iteration count (100,000+ recommended) and key length (256 or 512 bits).",
    "Click 'Derive Cryptographic Key' to view the output in Hex or Base64."
  ],
  "whyUse": [
    "Complies with OWASP Password Storage Guidelines (100,000+ iterations for SHA-512).",
    "Used in password managers (Bitwarden, 1Password) and encrypted storage systems."
  ],
  "faqs": [
    {
      "question": "What is PBKDF2 used for?",
      "answer": "PBKDF2 is used to turn weak human passwords into strong, cryptographically secure keys for AES encryption and password storage."
    }
  ],
  "features": [
    "Configurable iterations (10k to 600k)",
    "Supports SHA-512 and SHA-256",
    "256-bit and 512-bit key lengths",
    "Hexadecimal and Base64 export"
  ],
  "tips": [
    "OWASP recommends at least 100,000 iterations of PBKDF2-SHA512 for modern applications"
  ]
};
