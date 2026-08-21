import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "url-encoder-decoder",
  "name": "URL Encoder/Decoder",
  "category": "Encoding",
  "shortDescription": "Encode or decode URL components safely.",
  "heroTitle": "Handle URL encoding without mistakes",
  "heroDescription": "Encode query values and decode encoded URLs to avoid malformed requests.",
  "about": "URL Encoder/Decoder helps when building links, query strings, and API params that contain spaces or special characters.",
  "howToUse": [
    "Paste the URL or text component.",
    "Click Encode to make it URL-safe.",
    "Click Decode to restore readable text."
  ],
  "whyUse": [
    "Prevents broken links and query bugs.",
    "Makes debugging encoded params easier.",
    "Saves time during API integration work."
  ],
  "faqs": [
    {
      "question": "Should I encode full URLs or components?",
      "answer": "Usually encode query/path components, not the entire URL."
    },
    {
      "question": "Is this different from Base64?",
      "answer": "Yes. URL encoding and Base64 solve different problems."
    }
  ],
  "features": [
    "Encode URL components safely",
    "Decode encoded URLs",
    "Handle special characters",
    "Instant conversion",
    "No server calls"
  ],
  "tips": [
    "Encode query parameters, not full URLs",
    "Double-check encoding for spaces and symbols",
    "Use for API request building",
    "Test encoded URLs before deployment"
  ]
};
