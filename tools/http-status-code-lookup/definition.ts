import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "http-status-code-lookup",
  "name": "HTTP Status Codes Directory",
  "category": "Data",
  "shortDescription": "Instant search and reference directory for all RFC HTTP status codes with caching and retry semantics.",
  "heroTitle": "HTTP Status Codes Directory & Reference",
  "heroDescription": "Explore all standard RFC HTTP status codes across 1xx, 2xx, 3xx, 4xx, and 5xx series with caching rules.",
  "about": "HTTP Status Codes Directory provides an interactive, searchable catalog of all official HTTP response status codes defined by IANA and RFC 9110, including cacheability, specification links, and troubleshooting guides.",
  "howToUse": [
    "Type any code number (e.g. 404), name (e.g. Created), or description into the search bar.",
    "Filter by status code series (1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error).",
    "Inspect detailed specifications, default caching behaviors, and resolution advice."
  ],
  "whyUse": [
    "Essential for web developers, API designers, and DevOps engineers debugging HTTP responses.",
    "Fast instant filtering with zero server roundtrips."
  ],
  "faqs": [
    {
      "question": "What is the difference between 301 and 302 redirects?",
      "answer": "A 301 Moved Permanently redirect signals to search engines and browsers that a URL change is permanent, transferring SEO equity, while 302 Found is a temporary redirect."
    }
  ],
  "features": [
    "Complete coverage of 1xx, 2xx, 3xx, 4xx, and 5xx status codes",
    "RFC 9110 & RFC 6585 official specifications",
    "Cacheability status indicator",
    "Instant real-time search filter"
  ],
  "tips": [
    "Use 308 instead of 301 when you need to ensure the HTTP method (e.g. POST) is preserved across redirects"
  ]
};
