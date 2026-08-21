import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "punycode-converter",
  "name": "Punycode (IDN) Converter",
  "category": "Encoding",
  "shortDescription": "Convert Internationalized Domain Names (IDNs) to Punycode (xn--) and back.",
  "heroTitle": "Convert Internationalized Domain Names to Punycode",
  "heroDescription": "Encode non-ASCII domain names and emojis into DNS-compatible Punycode and decode xn-- domains to text.",
  "about": "Punycode (IDN) Converter translates Internationalized Domain Names containing accents, umlauts, non-Latin alphabets, and emojis into ASCII-compatible Punycode (xn--...) and vice versa.",
  "howToUse": [
    "Enter one or more domain names (one per line).",
    "Click To Punycode (xn--) to convert to DNS ASCII format.",
    "Click To Unicode (Text) to decode Punycode into readable native characters."
  ],
  "whyUse": [
    "Essential for configuring DNS records and SSL certificates for international domains.",
    "Batch convert multiple domains in one click.",
    "Uses modern browser-native URL encoding standards."
  ],
  "faqs": [
    {
      "question": "What is Punycode?",
      "answer": "Punycode is a special encoding syntax used by the Domain Name System (DNS) to represent non-ASCII Unicode characters using limited ASCII letters, digits, and hyphens."
    },
    {
      "question": "Why do Punycode domains start with xn--?",
      "answer": "The xn-- prefix is the standardized Internationalizing Domain Names in Applications (IDNA) indicator for Punycode strings."
    }
  ],
  "features": [
    "Bidirectional conversion (Unicode <-> Punycode)",
    "Multi-domain batch conversion support",
    "Emoji and non-Latin character support",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Use Punycode format when adding DNS records at your domain registrar",
    "Punycode ensures international domain names resolve reliably across all email and web servers"
  ]
};
