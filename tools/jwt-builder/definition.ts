import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "jwt-builder",
  name: "JWT Builder & Signer",
  category: "Auth",
  shortDescription: "Build, sign, and verify JSON Web Tokens (JWT) with HMAC-SHA256 and custom payload claims 100% in-browser.",
  heroTitle: "Online JWT Builder, Signer & Verifier",
  heroDescription: "Construct custom JSON Web Tokens (JWT), configure standard registered claims (exp, iat, sub, iss), sign tokens using HMAC-SHA256/384/512, and verify signatures with zero server exposure.",
  about: "ToolSnippet's JWT Builder is a cryptographic utility for backend and full-stack developers. It allows you to generate signed JWTs for testing API authentication, debugging microservices, and validating auth tokens with client-side Web Crypto APIs.",
  howToUse: [
    "Choose your signing algorithm (HS256, HS384, HS512, or none).",
    "Edit your Header and Payload JSON claims in the workstation.",
    "Use the quick expiration helpers (+15m, +1 hour, +24h, +7 days) to set the 'exp' claim timestamp.",
    "Enter your secret key (or generate a secure random secret).",
    "View your generated 3-part signed JWT (Header.Payload.Signature) in real-time.",
    "Copy the token or test signature verification with 1-click.",
  ],
  whyUse: [
    "Zero Server Transmission: Cryptographic HMAC signing executes locally in browser RAM using the native Web Crypto API.",
    "Quick Time Claim Calculators: Easily inject accurate UNIX epoch timestamps for 'iat', 'nbf', and 'exp'.",
    "Visual Color-Coded Breakdown: Instantly distinguish Base64URL header, payload, and cryptographic signature segments.",
  ],
  faqs: [
    {
      question: "Is my secret key safe when signing JWTs here?",
      answer: "Yes, 100%. All cryptographic hashing and HMAC signature generation are executed locally via window.crypto.subtle. No secrets or tokens are ever sent across the network.",
    },
    {
      question: "What is the structure of a signed JWT?",
      answer: "A JWT consists of three Base64URL-encoded parts separated by dots: 1. Header (algorithm and token type), 2. Payload (claims and data), 3. Signature (HMAC or digital signature ensuring data integrity).",
    },
  ],
  features: [
    "HMAC signing with HS256, HS384, and HS512",
    "Custom payload claims editor with JSON validation",
    "1-click Epoch expiration calculator (+15m to +30 days)",
    "Secure random secret key generator",
    "Interactive signature verification tester",
    "1-click copy for signed tokens",
  ],
  tips: [
    "Always use strong, high-entropy secret keys (at least 256 bits) for HS256 tokens in production.",
    "Verify that the 'exp' claim is set in UNIX epoch seconds, not milliseconds.",
  ],
};
