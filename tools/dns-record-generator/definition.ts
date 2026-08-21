import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "dns-record-generator",
  "name": "DNS Zone Record Generator (BIND / RFC 1035)",
  "category": "Data",
  "shortDescription": "Create formatted A, AAAA, CNAME, MX, TXT (SPF/DMARC), and SRV records for Cloudflare, Route53, and BIND.",
  "heroTitle": "Generate DNS Records (BIND & Cloudflare Formats)",
  "heroDescription": "Build standard RFC 1035 BIND zone records and Cloudflare JSON imports for A, AAAA, CNAME, MX, and TXT.",
  "about": "DNS Zone Record Generator builds syntax-validated DNS records for domain configuration across Cloudflare, AWS Route53, and BIND zone files, with built-in presets for SPF and DMARC email security records.",
  "howToUse": [
    "Select your DNS record type: A, AAAA, CNAME, MX, TXT, or SRV.",
    "Enter Host Name (@ for root) and Target Value.",
    "Use SPF or DMARC presets for instant email security record generation.",
    "Copy the BIND zone line or Cloudflare / Terraform JSON format."
  ],
  "whyUse": [
    "Prevents DNS syntax errors and mail delivery failures by providing validated record formatting.",
    "Includes presets for SPF, DKIM, and DMARC records."
  ],
  "faqs": [
    {
      "question": "What is a DMARC DNS record?",
      "answer": "A DMARC TXT record (_dmarc.example.com) specifies policies for how email receivers should handle messages that fail SPF or DKIM authentication (e.g. p=reject)."
    }
  ],
  "features": [
    "Supports A, AAAA, CNAME, MX, TXT, and SRV records",
    "Built-in presets for SPF and DMARC email authentication",
    "Standard RFC 1035 BIND zone formatting",
    "Cloudflare and Terraform JSON import export"
  ],
  "tips": [
    "Always set a trailing dot on CNAME values in BIND zone files to prevent unintended domain concatenation"
  ]
};
