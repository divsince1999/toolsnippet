import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "url-parser",
  "name": "URL Parser",
  "category": "Encoding",
  "shortDescription": "Parse URLs into components and query params.",
  "heroTitle": "Deconstruct any URL",
  "heroDescription": "Break down complex URLs into protocol, host, path, and query parameters.",
  "about": "URL Parser is useful for developers debugging routing issues or analyzing query string parameters.",
  "howToUse": [
    "Paste a full URL into the input.",
    "View the parsed components and query params table.",
    "Copy specific parts as needed."
  ],
  "whyUse": [
    "Easily see all query parameters.",
    "Quickly identify protocol and host.",
    "Great for debugging API URLs."
  ],
  "faqs": [
    {
      "question": "Can it handle encoded URLs?",
      "answer": "Yes, it will automatically decode components for readability."
    }
  ],
  "features": [
    "Parse URL components instantly",
    "Extract query parameters",
    "Identify protocol and host",
    "Decode encoded parts",
    "Copy individual components"
  ],
  "tips": [
    "Use for debugging routing issues",
    "Analyze API request URLs",
    "Check query string structure",
    "Great for security auditing"
  ]
};
