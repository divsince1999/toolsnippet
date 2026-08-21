import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "hex-to-ascii",
  "name": "Hex to ASCII Converter",
  "category": "Encoding",
  "shortDescription": "Convert Hexadecimal strings to plain ASCII text and encode text into Hex dumps.",
  "heroTitle": "Convert Hex to ASCII text and text to Hexadecimal",
  "heroDescription": "Decode hex byte dumps into readable text and encode strings into space-separated or prefixed Hex.",
  "about": "Hex to ASCII Converter converts hexadecimal numbers and byte sequences into readable ASCII characters, and encodes plain text into clean hexadecimal values.",
  "howToUse": [
    "Enter a Hexadecimal string (e.g. 48 65 6c 6c 6f) or plain text.",
    "Choose your preferred Hex formatting (space-separated, continuous, or 0x prefixed).",
    "Click Hex to ASCII or ASCII to Hex to transform."
  ],
  "whyUse": [
    "Decode network packet dumps, binary streams, and memory hex values.",
    "Cleanly handles spaces, 0x prefixes, and continuous hex strings.",
    "100% client-side decoding with zero external services."
  ],
  "faqs": [
    {
      "question": "Does it matter if hex characters are uppercase or lowercase?",
      "answer": "No, the decoder supports both uppercase (4A) and lowercase (4a) hexadecimal characters."
    },
    {
      "question": "What happens if the hex string has an odd length?",
      "answer": "Hex strings must have an even number of digits (2 hex digits per ASCII byte). An error will be shown if invalid."
    }
  ],
  "features": [
    "Bidirectional conversion (Hex <-> ASCII)",
    "Space, continuous, and 0x prefix formatting",
    "Handles arbitrary text length",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Use 0x prefix mode when exporting hex constants for C, C++, or Solidity smart contracts",
    "Ensure non-hex characters like punctuation are stripped before decoding"
  ]
};
