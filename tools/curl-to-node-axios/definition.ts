import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "curl-to-node-axios",
  "name": "cURL to Node.js Axios & Fetch Converter",
  "category": "Data",
  "shortDescription": "Convert cURL commands into clean async/await Node.js Axios and native Fetch code snippets.",
  "heroTitle": "Convert cURL Commands to Node.js (Axios & Fetch)",
  "heroDescription": "Transform cURL commands into clean async/await Node.js Axios scripts or native browser Fetch calls.",
  "about": "cURL to Node.js Converter parses command-line cURL statements into structured JavaScript and TypeScript code, supporting Axios promise handling and native Node 18+ Fetch APIs.",
  "howToUse": [
    "Paste any cURL command line into the editor.",
    "Select your target library: Axios or Native Fetch.",
    "Copy the generated async/await JavaScript snippet."
  ],
  "whyUse": [
    "Rapidly port third-party API documentation and cURL snippets into Next.js, Node.js, and React applications.",
    "Includes error handling and JSON body serialization."
  ],
  "faqs": [
    {
      "question": "Does native Fetch require installing external npm packages?",
      "answer": "No. Modern Node.js (v18+) and all modern browsers support native fetch() natively without any external dependencies like axios or node-fetch."
    }
  ],
  "features": [
    "Outputs clean async/await Axios code",
    "Outputs native Fetch API code (Node 18+ / Browser)",
    "Extracts Bearer tokens and custom headers",
    "Automatic JSON parsing and error handling wrappers"
  ],
  "tips": [
    "When using native Fetch, remember that 4xx and 5xx status codes do not reject the promise; always check response.ok"
  ]
};
