import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "robots-txt-generator",
  "name": "Robots.txt Generator",
  "category": "Validation",
  "shortDescription": "Visual builder for search engine crawler directives and sitemap declarations.",
  "heroTitle": "Create optimized robots.txt files in seconds",
  "heroDescription": "Configure search engine crawler rules, disallow private directories, and add sitemap links.",
  "about": "Robots.txt Generator gives webmasters and developers an interactive interface to build robots.txt files that guide Googlebot, Bingbot, and AI crawlers on what pages to index.",
  "howToUse": [
    "Select your default crawler policy (Allow or Disallow).",
    "Enter paths you wish to disallow or allow specifically.",
    "Add your sitemap URL and optional crawl delay.",
    "Toggle AI bot blocking if desired and copy the generated robots.txt."
  ],
  "whyUse": [
    "Prevents indexing of private staging directories, admin pages, and APIs.",
    "Includes one-click blocking of common AI scraping bots.",
    "Valid syntax guaranteed according to standard Robots Exclusion Protocol."
  ],
  "faqs": [
    {
      "question": "Where should the robots.txt file be placed?",
      "answer": "Upload the generated file to the root directory of your domain (e.g. https://example.com/robots.txt)."
    },
    {
      "question": "Can robots.txt hide sensitive pages from users?",
      "answer": "No. Robots.txt is publicly readable. Sensitive pages should always be protected by authentication."
    }
  ],
  "features": [
    "AI bot blocking toggle (GPTBot, CCBot, ClaudeBot)",
    "Multi-path allow/disallow configuration",
    "Sitemap and crawl-delay directives",
    "Instant copy to clipboard"
  ],
  "tips": [
    "Always test your robots.txt file in Google Search Console after uploading",
    "Remember that robots.txt paths are case-sensitive"
  ]
};
