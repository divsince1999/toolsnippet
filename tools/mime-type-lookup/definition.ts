import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "mime-type-lookup",
  "name": "MIME Type & File Extension Directory",
  "category": "Data",
  "shortDescription": "Instant lookup connecting file extensions to official IANA MIME content-type headers.",
  "heroTitle": "MIME Type & File Extension Directory",
  "heroDescription": "Search and discover standard MIME types (Content-Type) for web assets, media, fonts, and documents.",
  "about": "MIME Type Lookup connects file extensions (.png, .wasm, .json, .pdf) with official IANA Media Types, providing correct Content-Type header values for web servers and API endpoints.",
  "howToUse": [
    "Search by file extension (e.g. .webp, wasm) or MIME type (e.g. video/mp4).",
    "Filter by category (Application, Image, Text, Audio, Video, Font).",
    "Copy the exact MIME string to configure web server content types."
  ],
  "whyUse": [
    "Prevent browser download glitches and CORS issues caused by incorrect Content-Type response headers.",
    "Comprehensive catalog of modern web formats including AVIF, WebP, WOFF2, and WebAssembly."
  ],
  "faqs": [
    {
      "question": "What happens if a server sends the wrong MIME type?",
      "answer": "If a server serves JavaScript as text/plain or WebAssembly as application/octet-stream, modern browsers with nosniff enabled will block execution for security reasons."
    }
  ],
  "features": [
    "Bidirectional search (Extension <-> MIME Type)",
    "Categorized by Media Type (Audio, Video, Image, Font, Application, Text)",
    "Covers modern web formats (AVIF, WebP, WASM, WOFF2)"
  ],
  "tips": [
    "Always serve WebAssembly files with 'application/wasm' to enable WebAssembly.instantiateStreaming compilation in browsers"
  ]
};
