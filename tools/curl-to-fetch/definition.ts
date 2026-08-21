import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "curl-to-fetch",
  "name": "cURL to Fetch & Axios Converter",
  "category": "Data",
  "shortDescription": "Convert cURL commands to modern JavaScript fetch() and axios code.",
  "heroTitle": "Convert cURL to JavaScript Fetch and Axios code",
  "heroDescription": "Instantly turn raw cURL terminal commands into ready-to-run fetch or axios API calls.",
  "about": "cURL to Fetch converter allows developers to seamlessly migrate API examples from terminal commands and Postman directly into modern JavaScript and TypeScript frontends.",
  "howToUse": [
    "Paste any valid cURL command into the input area.",
    "Select Fetch API or Axios as your target syntax.",
    "Click Convert to Code and copy the generated JavaScript."
  ],
  "whyUse": [
    "Saves time manually translating headers, methods, and request bodies.",
    "Supports modern async/await syntax with JSON parsing.",
    "Runs 100% locally in your browser with zero network requests."
  ],
  "faqs": [
    {
      "question": "Does it support custom headers and POST bodies?",
      "answer": "Yes, it parses -H headers, -d/--data JSON and raw bodies, and -X HTTP methods."
    },
    {
      "question": "Is multi-line cURL syntax supported?",
      "answer": "Yes, backslash line continuations are automatically normalized and parsed."
    }
  ],
  "features": [
    "Supports Fetch and Axios syntax",
    "Auto-formats request bodies and headers",
    "Async/await ready code generation",
    "One-click copy to clipboard"
  ],
  "tips": [
    "Ensure double quotes in JSON bodies are properly escaped in your cURL command",
    "Use Axios mode if you are working with older Node.js versions without native fetch"
  ]
};
