import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "hash-comparator",
  "name": "Hash & Checksum Comparator",
  "category": "Validation",
  "shortDescription": "Compare two cryptographic hashes or file checksums with instant character-by-character integrity verification.",
  "heroTitle": "Compare & Verify Cryptographic Checksums",
  "heroDescription": "Compare downloaded file hashes against official checksums with instant character-matching diagnostics.",
  "about": "Hash & Checksum Comparator eliminates human error when verifying file integrity, comparing two cryptographic hashes (SHA-256, MD5, SHA-512) and providing visual confirmation of exact matches.",
  "howToUse": [
    "Paste your calculated file hash into Hash 1.",
    "Paste the vendor's official checksum into Hash 2.",
    "View the instant Match / Mismatch status banner."
  ],
  "whyUse": [
    "Prevents malware and corrupted file execution by ensuring downloaded binaries match vendor checksums.",
    "Includes case-insensitive normalization and automatic whitespace trimming."
  ],
  "faqs": [
    {
      "question": "Why should I compare checksums?",
      "answer": "Comparing checksums ensures that downloaded software or files have not been corrupted during download or tampered with by malicious third parties."
    }
  ],
  "features": [
    "Case-insensitive comparison toggle",
    "Automatic whitespace trimming",
    "Instant visual match / mismatch banner",
    "Character length diagnostic report"
  ],
  "tips": [
    "Always verify checksums when downloading OS disk images, cryptographic software, or developer binaries"
  ]
};
