import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "rsa-key-generator",
  "name": "RSA Public & Private Key Pair Generator",
  "category": "Auth",
  "shortDescription": "Generate cryptographically secure 2048-bit and 4096-bit RSA key pairs in standard PEM format.",
  "heroTitle": "Generate RSA 2048-bit & 4096-bit Key Pairs",
  "heroDescription": "Create asymmetric RSA public and private key pairs formatted in standard SPKI and PKCS#8 PEM formats.",
  "about": "RSA (Rivest–Shamir–Adleman) is an asymmetric cryptographic algorithm used for secure data transmission, SSH keys, digital signatures, and SSL/TLS certificates.",
  "howToUse": [
    "Select your key size: 2048-bit (Standard) or 4096-bit (Maximum Security).",
    "Click 'Generate RSA Key Pair'.",
    "Copy your Public Key (SPKI PEM) and Private Key (PKCS#8 PEM)."
  ],
  "whyUse": [
    "Generates standard PEM blocks (-----BEGIN PUBLIC KEY-----, -----BEGIN PRIVATE KEY-----).",
    "Generated securely inside your browser's crypto sandbox with zero network requests."
  ],
  "faqs": [
    {
      "question": "Should I use 2048-bit or 4096-bit RSA?",
      "answer": "2048-bit is the industry standard and offers high security with fast operations. 4096-bit offers future-proof security but takes slightly longer to compute."
    }
  ],
  "features": [
    "2048-bit and 4096-bit key generation",
    "Standard PEM export format",
    "Web Crypto RSA-OAEP engine",
    "One-click copyable cards"
  ],
  "tips": [
    "Never share your private key with anyone; only distribute your public key"
  ]
};
