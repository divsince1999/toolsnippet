import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "content-security-policy-generator",
  "name": "Content Security Policy (CSP) Generator",
  "category": "Auth",
  "shortDescription": "Build strict, production-ready Content-Security-Policy HTTP headers to protect against XSS and injection attacks.",
  "heroTitle": "Generate Content-Security-Policy (CSP) Headers",
  "heroDescription": "Build strict, production-ready CSP directives to safeguard web applications against cross-site scripting (XSS).",
  "about": "Content Security Policy (CSP) Generator provides an interactive interface for defining resource-loading policies, generating HTTP headers, HTML meta tags, and Nginx configurations.",
  "howToUse": [
    "Configure default-src, script-src, style-src, img-src, and connect-src sources.",
    "Set frame-ancestors to 'none' to prevent clickjacking.",
    "Toggle 'Upgrade Insecure Requests' for automated HTTPS upgrading.",
    "Copy the generated HTTP header or Nginx directive."
  ],
  "whyUse": [
    "CSP is the most effective defense against modern Cross-Site Scripting (XSS) and data injection vulnerabilities.",
    "Generates syntax ready for HTTP headers, HTML <meta> tags, and Nginx configs."
  ],
  "faqs": [
    {
      "question": "Can I test CSP without breaking my website?",
      "answer": "Yes! Use the 'Content-Security-Policy-Report-Only' header name to test your policy in production while monitoring violations without blocking user assets."
    }
  ],
  "features": [
    "Covers all primary CSP directives (default-src, script-src, style-src, img-src, connect-src, frame-ancestors)",
    "Outputs HTTP Header, HTML <meta> tag, and Nginx format",
    "Upgrade-insecure-requests directive support"
  ],
  "tips": [
    "Avoid 'unsafe-inline' in script-src by migrating inline scripts to cryptographic nonces or hashes"
  ]
};
