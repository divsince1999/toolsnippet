import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "http-header-analyzer",
  name: "HTTP Security Header Analyzer",
  category: "Web",
  shortDescription: "Analyze HTTP response headers for security vulnerabilities, caching policies, and SEO optimization.",
  heroTitle: "Online HTTP Security Header Analyzer",
  heroDescription: "Inspect HTTP response headers, audit Content Security Policy (CSP), HSTS, and X-Frame-Options, and calculate your site's security score instantly.",
  about: "ToolSnippet's HTTP Security Header Analyzer is a web security auditing tool for frontend and DevOps engineers. It parses raw HTTP headers to identify missing defense-in-depth headers, information leakage banners, and inefficient caching configurations.",
  howToUse: [
    "Paste your raw HTTP response headers into the input editor.",
    "Or click a quick preset (Secure Production Headers, Legacy Server, Default Nginx).",
    "View your calculated Security Grade (A+ to F).",
    "Inspect the detailed breakdown of mandatory security headers and recommended fixes.",
    "Copy remediation snippet recommendations for Nginx, Apache, or Cloudflare.",
  ],
  whyUse: [
    "Security Hardening: Identify missing CSP, HSTS, and Clickjacking headers before vulnerability scanners flag them.",
    "Information Leakage Detection: Flags exposed 'Server' and 'X-Powered-By' backend framework banners.",
    "100% Client-Side: Zero proxy servers, ensuring internal staging headers remain confidential.",
  ],
  faqs: [
    {
      question: "Which HTTP security headers are most critical?",
      answer: "The top critical security headers are Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.",
    },
    {
      question: "Why is exposing 'X-Powered-By' considered a security risk?",
      answer: "The X-Powered-By header (e.g. Express, PHP/8.1) leaks exact backend framework versions to attackers, making it easier to target known CVE vulnerabilities.",
    },
  ],
  features: [
    "Automated Security Health Grade (A+, A, B, C, D, F)",
    "Audit of 8+ major security defense headers",
    "Information leakage and server fingerprint detection",
    "Caching policy validation (Cache-Control, ETag)",
    "Quick sample presets for benchmarking",
    "1-click copy for remediation suggestions",
  ],
  tips: [
    "Aim for an A+ grade by adding a strict Content-Security-Policy and HSTS header.",
    "Ensure 'X-Frame-Options: DENY' or 'SAMEORIGIN' is configured to prevent clickjacking attacks.",
  ],
};
