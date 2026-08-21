import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "basic-auth-header-generator",
  "name": "HTTP Basic Auth Header Builder & Decoder",
  "category": "Auth",
  "shortDescription": "Generate standard Authorization: Basic Base64 headers from credentials or decode existing tokens.",
  "heroTitle": "Generate & Decode HTTP Basic Auth Headers",
  "heroDescription": "Build RFC 7617 Authorization: Basic Base64 headers from credentials or decode tokens to inspect usernames.",
  "about": "HTTP Basic Auth Header Builder encodes username and password pairs into standard Base64 Authorization headers, cURL flags, and Fetch headers, and decodes existing tokens back into credentials.",
  "howToUse": [
    "Select 'Encode Credentials' and enter Username and Password to generate the Basic Auth header.",
    "Select 'Decode Header' and paste any Basic Auth header or token to retrieve the credentials."
  ],
  "whyUse": [
    "Essential for testing protected REST APIs, configuring webhooks, and debugging Basic Auth issues.",
    "Provides ready-to-use cURL commands and JavaScript Fetch configurations."
  ],
  "faqs": [
    {
      "question": "Is HTTP Basic Auth secure?",
      "answer": "Basic Auth sends Base64-encoded credentials which are trivially reversible; it is only secure when transmitted over encrypted HTTPS connections."
    }
  ],
  "features": [
    "Bidirectional encoding and decoding",
    "Generates HTTP header, cURL flag (-H 'Authorization: Basic...'), and Fetch headers",
    "Safe client-side Base64 processing"
  ],
  "tips": [
    "Never use Basic Auth over unencrypted HTTP in production environments"
  ]
};
