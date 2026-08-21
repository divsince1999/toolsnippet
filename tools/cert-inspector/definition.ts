import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "cert-inspector",
  "name": "SSL / X.509 Certificate Inspector",
  "category": "Validation",
  "shortDescription": "Inspect and decode PEM / CRT SSL certificates to view Common Name, Issuer, SANs, and Expiry.",
  "heroTitle": "Decode & Inspect SSL / X.509 Certificates",
  "heroDescription": "Parse PEM/CRT SSL certificates to view Common Name (CN), Issuer, Subject Alternative Names (SAN), and Expiration.",
  "about": "SSL / X.509 Certificate Inspector decodes raw PEM certificate blocks (-----BEGIN CERTIFICATE-----) to reveal certificate metadata, issuer authority, validity dates, days remaining, and SAN domains without requiring OpenSSL CLI.",
  "howToUse": [
    "Paste your PEM-formatted certificate block or click 'Load Sample Cert'.",
    "Click 'Inspect Certificate' to extract details.",
    "Review the Common Name, Issuer, Expiry status pill, and SAN domains."
  ],
  "whyUse": [
    "Quickly check certificate expiration and domain coverage without installing OpenSSL.",
    "Works entirely in the browser with zero certificate transmission."
  ],
  "faqs": [
    {
      "question": "What is an X.509 certificate?",
      "answer": "X.509 is the standard format for public key certificates used in TLS/SSL to bind public keys to domains and organizations."
    }
  ],
  "features": [
    "Decodes Common Name (CN) and Issuer",
    "Displays validity start and expiration dates",
    "Calculates days remaining with status badge",
    "Lists Subject Alternative Names (SAN)"
  ],
  "tips": [
    "Use this tool to verify SSL certificates before deploying them to production web servers"
  ]
};
