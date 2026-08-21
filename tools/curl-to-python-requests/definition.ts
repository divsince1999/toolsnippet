import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "curl-to-python-requests",
  "name": "cURL to Python Requests Converter",
  "category": "Data",
  "shortDescription": "Transform cURL commands into clean, idiomatic Python requests or async httpx code blocks.",
  "heroTitle": "Convert cURL Commands to Python (Requests & Httpx)",
  "heroDescription": "Convert cURL terminal commands into clean, executable Python requests and async httpx scripts.",
  "about": "cURL to Python Converter translates command-line cURL statements into idiomatic Python code, extracting HTTP methods, URLs, headers, and JSON payloads into clean requests or httpx snippets.",
  "howToUse": [
    "Paste any cURL command (including multi-line commands with backslashes).",
    "Choose your preferred library: Python Requests (sync) or HTTPX (async).",
    "Copy the generated, ready-to-execute Python code."
  ],
  "whyUse": [
    "Saves time translating API documentation cURL examples into backend Python services and scripts.",
    "Properly formats JSON payloads and authorization headers."
  ],
  "faqs": [
    {
      "question": "When should I use httpx over requests in Python?",
      "answer": "Use HTTPX when building asynchronous applications with FastAPI, asyncio, or when making high-concurrency outbound HTTP requests."
    }
  ],
  "features": [
    "Supports Python Requests (synchronous)",
    "Supports Python HTTPX (modern async/await)",
    "Extracts headers, methods, and JSON request bodies",
    "Handles multi-line cURL backslashes automatically"
  ],
  "tips": [
    "Use response.raise_for_status() in Python to automatically raise exceptions for 4xx and 5xx responses"
  ]
};
