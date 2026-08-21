import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "jwt-generator",
  "name": "JWT Token Generator & Signer",
  "category": "Auth",
  "shortDescription": "Create, customize claims, and cryptographically sign JSON Web Tokens with HMAC-SHA256.",
  "heroTitle": "Create & Sign JSON Web Tokens (JWT)",
  "heroDescription": "Build custom JWT headers and payload claims, set expiration timestamps, and sign tokens with secret keys.",
  "about": "JWT Token Generator & Signer allows developers to create standard RFC 7519 JSON Web Tokens (header.payload.signature) with custom claims (sub, name, admin, iat, exp) and HMAC-SHA256 signatures.",
  "howToUse": [
    "Edit the Header JSON and Payload Claims JSON.",
    "Use the quick expiration buttons (+1h, +24h, +7d) to set valid exp timestamps.",
    "Enter your HMAC secret key.",
    "Click 'Sign & Generate JWT Token' to copy the signed token string."
  ],
  "whyUse": [
    "Ideal for mocking authentication tokens, testing API endpoints, and debugging microservices.",
    "Provides color-coded visual breakdowns of the header, payload, and signature."
  ],
  "faqs": [
    {
      "question": "What algorithm is used to sign the token?",
      "answer": "This tool uses HMAC-SHA256 (HS256) running via the browser's native Web Crypto API."
    }
  ],
  "features": [
    "Customizable JSON header and payload claims",
    "Quick expiration presets (+1h, +24h, +7d)",
    "HMAC-SHA256 cryptographic signing",
    "Color-coded 3-part token breakdown"
  ],
  "tips": [
    "Standard JWT tokens consist of three Base64URL parts separated by dots: header.payload.signature"
  ]
};
