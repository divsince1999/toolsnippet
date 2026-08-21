import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "meta-robots-tag-generator",
  "name": "Meta Robots & X-Robots-Tag Generator",
  "category": "Validation",
  "shortDescription": "Generate granular HTML meta robots directives (noindex, nofollow, nosnippet) and HTTP X-Robots-Tag response headers.",
  "heroTitle": "Meta Robots Tag & X-Robots-Tag Generator",
  "heroDescription": "Build precise crawling and indexing rules for Googlebot, Bingbot, and web spiders with HTML tags and HTTP headers.",
  "about": "The Meta Robots & X-Robots-Tag Generator creates standard HTML `<meta name='robots'>` tags and server-level HTTP `X-Robots-Tag` response headers. Control crawling, indexing, snippet lengths, image previews, and caching archives across your website.",
  "howToUse": [
    "Toggle crawling and indexing directives (noindex, nofollow, noarchive, nosnippet, noimageindex).",
    "Configure Google snippet limits (max-snippet, max-image-preview, max-video-preview).",
    "Copy the HTML `<meta>` tag for individual page templates or the HTTP header for Nginx/Apache.",
    "Deploy to your staging or production environment."
  ],
  "whyUse": [
    "Prevent staging, admin, or thin-content pages from appearing in Google search results.",
    "Generate valid Apache Header and Nginx add_header directives.",
    "Optimize Google Discover eligibility with `max-image-preview:large`.",
    "100% instant and private."
  ],
  "faqs": [
    {
      "question": "What is the difference between meta robots and X-Robots-Tag?",
      "answer": "Meta robots is an HTML tag placed in the `<head>` of HTML files, while X-Robots-Tag is an HTTP response header that can control indexing on non-HTML files like PDFs, images, and API endpoints."
    },
    {
      "question": "Why should I use max-image-preview:large?",
      "answer": "Google requires `max-image-preview:large` to display large visual thumbnail cards in Google Discover and Google Search."
    }
  ]
};
