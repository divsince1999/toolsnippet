import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "md5-hash-generator",
  "name": "MD5 Hash & Checksum Generator",
  "category": "Encoding",
  "shortDescription": "Compute standard 128-bit (32 hex characters) MD5 cryptographic checksums instantly.",
  "heroTitle": "Fast MD5 Hash & Checksum Generator",
  "heroDescription": "Calculate standard 32-character hexadecimal MD5 checksums for file verification, database keys, and legacy hashes.",
  "about": "MD5 Hash & Checksum Generator calculates 128-bit MD5 hashes commonly used for caching keys, Gravatar email hashes, and legacy data integrity validation.",
  "howToUse": [
    "Enter your text or data into the input field.",
    "Toggle uppercase output if needed.",
    "Click 'Generate MD5 Checksum' to calculate the 32-character hash."
  ],
  "whyUse": [
    "Fast and ubiquitous for generating Gravatar hashes and cache keys.",
    "Useful for verifying file checksums from legacy downloads."
  ],
  "faqs": [
    {
      "question": "Is MD5 safe for password hashing?",
      "answer": "No. MD5 is not collision-resistant and should never be used for storing passwords. Use Bcrypt, Argon2, or PBKDF2 instead."
    }
  ],
  "features": [
    "Standard 128-bit MD5 calculation",
    "32-character hex output",
    "Uppercase/lowercase switcher",
    "Instant client-side calculation"
  ],
  "tips": [
    "To generate a Gravatar URL, trim your email, convert to lowercase, and generate the MD5 hash"
  ]
};
