import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "base-62-converter",
  name: "Base62 URL Shortener & Number Encoder",
  category: "Encoding",
  shortDescription: "Convert base-10 integers into compact alphanumeric Base62 strings [0-9a-zA-Z] for URL shorteners and compact database IDs.",
  heroTitle: "Base62 URL Shortener & Number Encoder",
  heroDescription: "Convert base-10 integers into compact alphanumeric Base62 strings [0-9a-zA-Z] for URL shorteners and compact database IDs.",
  about: "The Base62 URL Shortener & Number Encoder converts large decimal integer IDs into compact 62-character alphanumeric tokens (0-9, a-z, A-Z). It is the industry standard encoding for URL shorteners (like Bitly and TinyURL) and database primary keys.",
  features: [
    "Encodes integers to compact Base62 strings [0-9a-zA-Z]",
    "Decodes Base62 strings back to exact decimal BigInt values",
    "Arbitrary precision BigInt support (handles large 64-bit and 128-bit integers)",
    "Instant 1-click clipboard copy"
],
  howToUse: [
    "Select Encode (Integer to Base62) or Decode (Base62 to Integer).",
    "Enter the decimal integer or alphanumeric Base62 string.",
    "View the compact shortened token."
],
  whyUse: [
    "Build custom URL shorteners (`example.com/aB3x`).",
    "Compress numerical database IDs into short, URL-safe strings.",
    "Obfuscate sequential database primary keys in public APIs."
],
  tips: [
    "Base62 is case-sensitive (has 62 distinct characters: 10 digits + 26 lowercase + 26 uppercase).",
    "Unlike Base64, Base62 does not use `+`, `/`, or `=` padding characters, making it completely URL safe without escaping."
],
  faqs: [
  {
    "question": "Why do URL shorteners use Base62 instead of Base64?",
    "answer": "Base62 uses only alphanumeric characters [0-9a-zA-Z] without '+' or '/' symbols, making shortened links 100% URL-safe without requiring URL encoding."
  },
  {
    "question": "How many unique IDs can a 6-character Base62 string hold?",
    "answer": "A 6-character Base62 string provides 62^6 = 56,800,235,584 (56.8 Billion) unique identifiers."
  }
]
};
