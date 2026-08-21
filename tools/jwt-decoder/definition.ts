import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "jwt-decoder",
  "name": "JWT Decoder",
  "category": "Auth",
  "shortDescription": "Decode JWT header and payload for inspection.",
  "heroTitle": "Inspect JWT tokens quickly",
  "heroDescription": "View token header and payload in readable JSON while debugging auth flows.",
  "about": "JWT Decoder helps developers inspect token claims, expiry, and issuer values during local development and testing.",
  "howToUse": [
    "Paste a JWT token in the input area.",
    "The tool decodes header and payload automatically.",
    "Review claims like exp, sub, and roles."
  ],
  "whyUse": [
    "Speeds up authentication debugging.",
    "Makes claims visible without writing scripts.",
    "Useful during API and frontend auth integration."
  ],
  "faqs": [
    {
      "question": "Does this verify JWT signatures?",
      "answer": "No. It decodes only; signature verification is separate."
    },
    {
      "question": "Can I decode expired tokens?",
      "answer": "Yes, decoding works even if token is expired."
    }
  ],
  "features": [
    "Decode JWT header and payload",
    "View token claims instantly",
    "Check expiry dates",
    "Identify issuer information",
    "No data sent to server"
  ],
  "tips": [
    "Never share tokens with untrusted parties",
    "Check the exp claim for expiry",
    "Verify issuer with your backend",
    "This does not validate signatures"
  ]
};
