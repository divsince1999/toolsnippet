import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "graphql-query-prettifier",
  "name": "GraphQL Query Prettifier & Minifier",
  "category": "Data",
  "shortDescription": "Format, indent, or compact single-line GraphQL queries, mutations, and variables.",
  "heroTitle": "Prettify & Minify GraphQL Queries",
  "heroDescription": "Format, clean, and indent GraphQL queries, mutations, and fragments, or minify into single-line POST bodies.",
  "about": "GraphQL Query Prettifier formats unreadable or minified GraphQL queries with clean indentation, and compresses multi-line queries into single-line strings suitable for HTTP POST payloads.",
  "howToUse": [
    "Paste your GraphQL query, mutation, or fragment.",
    "Optionally enter query variables in the JSON editor.",
    "Click 'Prettify Query' for formatted view or 'Minify for POST Body' for compact output."
  ],
  "whyUse": [
    "Improves GraphQL code readability in PRs and documentation, and optimizes payload sizes for network transmission.",
    "Strips comments and formats nested selections automatically."
  ],
  "faqs": [
    {
      "question": "Why should I minify GraphQL queries for production?",
      "answer": "Minifying queries removes extra whitespace and comments, reducing HTTP request payload size and saving bandwidth across high-throughput APIs."
    }
  ],
  "features": [
    "GraphQL query and mutation prettifier",
    "Single-line query minification",
    "Query variables JSON editor",
    "One-click copyable formatted output"
  ],
  "tips": [
    "Use GraphQL fragments to reuse common field selections across multiple queries"
  ]
};
