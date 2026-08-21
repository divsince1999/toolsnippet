import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "cors-header-generator",
  "name": "CORS Header Generator",
  "category": "Auth",
  "shortDescription": "Generate Cross-Origin Resource Sharing (CORS) rules for Raw HTTP, Nginx, Apache, Express, and Next.js.",
  "heroTitle": "Generate Production-Ready CORS Headers",
  "heroDescription": "Build Access-Control-* CORS headers configured for Nginx, Apache, Express, and Next.js.",
  "about": "CORS Header Generator helps web developers construct correct Cross-Origin Resource Sharing headers, eliminating 'CORS error' browser blocks across multiple server architectures.",
  "howToUse": [
    "Specify your allowed origin (e.g. https://example.com or *).",
    "Select allowed HTTP methods (GET, POST, PUT, DELETE, OPTIONS).",
    "Choose your target server: Raw HTTP, Nginx, Apache, Express.js, or Next.js.",
    "Copy the generated configuration directly into your server config."
  ],
  "whyUse": [
    "Avoid common CORS misconfigurations that break frontend API calls or expose sensitive credentials.",
    "Generates syntax for 5 popular backend platforms."
  ],
  "faqs": [
    {
      "question": "Can I use wildcard (*) with Access-Control-Allow-Credentials: true?",
      "answer": "No. Browsers reject CORS responses where Access-Control-Allow-Origin is wildcard (*) if Access-Control-Allow-Credentials is set to true. You must specify the exact origin."
    }
  ],
  "features": [
    "Support for Nginx, Apache .htaccess, Express.js, and Next.js configs",
    "Configurable methods, allowed headers, and preflight max-age",
    "Credentials toggle with validation safeguards"
  ],
  "tips": [
    "Set Access-Control-Max-Age to 86400 (24h) to minimize repeated OPTIONS preflight requests"
  ]
};
