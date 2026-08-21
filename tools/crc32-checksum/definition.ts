import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "crc32-checksum",
  "name": "CRC32 Checksum Calculator",
  "category": "Validation",
  "shortDescription": "Compute standard 32-bit CRC32 checksums (IEEE 802.3) in Hexadecimal, Decimal, and Binary.",
  "heroTitle": "Calculate 32-bit CRC32 Checksums",
  "heroDescription": "Compute IEEE 802.3 cyclic redundancy checks (CRC-32) in hexadecimal (0x...), unsigned decimal, and binary formats.",
  "about": "CRC32 (Cyclic Redundancy Check) is an error-detecting code commonly used in network protocols (Ethernet), archive formats (ZIP, PNG, GZIP), and data storage to detect accidental data corruption.",
  "howToUse": [
    "Paste text or code into the input area.",
    "Click 'Calculate CRC32'.",
    "View the checksum in Hex (0x...), Unsigned Decimal, Signed Integer, and 32-bit Binary."
  ],
  "whyUse": [
    "Useful for verifying ZIP archive integrity, PNG chunk checksums, and Ethernet packets.",
    "Instant client-side calculation using precomputed IEEE 802.3 polynomial tables."
  ],
  "faqs": [
    {
      "question": "Is CRC32 suitable for cryptographic security?",
      "answer": "No. CRC32 is designed for detecting accidental errors (noise, bit flips), not for cryptographic security. For security, use SHA-256."
    }
  ],
  "features": [
    "Standard IEEE 802.3 polynomial",
    "Hexadecimal, Decimal, and Binary outputs",
    "Fast lookup table implementation",
    "100% client-side execution"
  ],
  "tips": [
    "PNG files store a 4-byte CRC32 checksum after every chunk to verify image data integrity"
  ]
};
