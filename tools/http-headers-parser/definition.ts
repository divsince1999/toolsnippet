import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "http-headers-parser",
  "name": "HTTP Headers Parser & Security Audit",
  "category": "Validation",
  "shortDescription": "Parse raw HTTP request and response headers into structured JSON and perform an instant security audit.",
  "heroTitle": "Parse HTTP Headers & Audit Security Best Practices",
  "heroDescription": "Transform raw HTTP response headers into structured JSON and audit critical security headers.",
  "about": "HTTP Headers Parser converts raw header strings (from curl -I or browser Network tabs) into structured JSON while automatically auditing essential security headers like HSTS, CSP, and X-Frame-Options.",
  "howToUse": [
    "Paste raw HTTP headers into the input area.",
    "Click 'Parse Headers & Audit Security'.",
    "Review the structured JSON output and the security header checklist."
  ],
  "whyUse": [
    "Quickly diagnose missing security headers that leave web applications vulnerable to XSS and clickjacking.",
    "Converts raw headers into copyable JSON for documentation and tests."
  ],
  "faqs": [
    {
      "question": "Which security headers are most critical?",
      "answer": "Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), and X-Frame-Options are foundational headers for protecting web apps from eavesdropping and injection attacks."
    }
  ],
  "features": [
    "Converts raw header text to clean JSON",
    "Automated security header audit (HSTS, CSP, X-Frame-Options, Referrer-Policy)",
    "One-click JSON export and clipboard copy"
  ],
  "tips": [
    "Always set Strict-Transport-Security with max-age=31536000 and includeSubDomains on production HTTPS domains"
  ]
};
