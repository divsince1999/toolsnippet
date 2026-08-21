import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "url-extractor",
  "name": "URL & Link Extractor",
  "category": "Text",
  "shortDescription": "Extract and filter all HTTP/HTTPS links from raw text or source code.",
  "heroTitle": "Extract and filter URLs from raw text and HTML",
  "heroDescription": "Pull all web links and HTTP/HTTPS URLs from articles, source code, and documents.",
  "about": "URL & Link Extractor scans text, HTML source code, and logs to extract all valid web links with optional domain filtering and deduplication.",
  "howToUse": [
    "Paste text containing web links into the input box.",
    "Optionally enter a domain filter (e.g. github.com) to isolate specific links.",
    "Click Extract URLs and copy the clean link list."
  ],
  "whyUse": [
    "Quickly collect references and resource links from research documents.",
    "Filters out trailing punctuation like periods and brackets automatically.",
    "Client-side processing ensures fast performance."
  ],
  "faqs": [
    {
      "question": "Does it support both HTTP and HTTPS links?",
      "answer": "Yes, it extracts all links starting with http:// or https://."
    },
    {
      "question": "How does domain filtering work?",
      "answer": "Entering a domain like example.com keeps only URLs containing that domain in the output."
    }
  ],
  "features": [
    "Robust URL regex extraction",
    "Domain keyword filtering",
    "Automatic URL deduplication",
    "Live extracted link counter"
  ],
  "tips": [
    "Use domain filtering to isolate API endpoints from third-party links",
    "Clean link lists can be pasted into bulk URL checkers or sitemaps"
  ]
};
