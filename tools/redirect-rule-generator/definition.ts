import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "redirect-rule-generator",
  "name": "Bulk 301/302 Redirect Rule Generator",
  "category": "Data",
  "shortDescription": "Generate bulk 301/302 redirects for Apache .htaccess, Nginx, Next.js config, and Cloudflare rules.",
  "heroTitle": "Free Bulk 301/302 Redirect Rule Generator",
  "heroDescription": "Convert URL migration lists into Apache .htaccess, Nginx rewrite blocks, Next.js redirects(), and Cloudflare _redirects.",
  "about": "The Bulk 301/302 Redirect Rule Generator transforms old-to-new URL path pairs into ready-to-deploy web server configuration files. Perfect for website migrations, domain rebranding, and SEO URL structure updates.",
  "howToUse": [
    "Paste your old and new URL pairs (separated by space, tab, or comma).",
    "Select your target server (Apache .htaccess, Nginx, Next.js redirects, or Netlify/Cloudflare).",
    "Choose HTTP redirect status (301 Permanent or 302 Temporary).",
    "Copy the generated server configuration block."
  ],
  "whyUse": [
    "Preserve SEO link equity during site redesigns and migrations.",
    "Eliminate syntax errors when writing Nginx rewrite and Apache RedirectMatch rules.",
    "Generate Next.js async redirects() arrays formatted in TypeScript.",
    "Instant client-side processing."
  ],
  "faqs": [
    {
      "question": "When should I use a 301 vs 302 redirect?",
      "answer": "Use 301 (Moved Permanently) when a URL is permanently changed to pass full PageRank/link equity. Use 302 (Found/Temporary) only for temporary A/B tests or maintenance."
    },
    {
      "question": "How are query parameters handled?",
      "answer": "Standard 301 path rules typically preserve query strings automatically in modern servers like Nginx and Cloudflare."
    }
  ]
};
