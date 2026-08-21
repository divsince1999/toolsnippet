import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "svg-to-css-data-uri",
  "name": "SVG to CSS Data URI Generator",
  "category": "Design",
  "shortDescription": "Convert SVG code into optimized, URL-encoded CSS background-image Data URIs.",
  "heroTitle": "Convert SVG to URL-Encoded CSS Data URI",
  "heroDescription": "Transform raw SVG markup into lightweight, URL-encoded CSS background-image data without base64 overhead.",
  "about": "SVG to CSS Data URI Generator encodes raw SVG code into UTF-8 URL-encoded CSS data URIs. Unlike Base64 encoding, URL-encoded SVGs are smaller, compressible via Gzip, and remain human-readable.",
  "howToUse": [
    "Paste your raw <svg> markup into the input editor.",
    "Click Generate CSS Data URI.",
    "Copy the background-image CSS rule and test in the live background preview."
  ],
  "whyUse": [
    "Up to 30% smaller payload than Base64 encoding.",
    "Eliminates extra HTTP requests for small UI icons and background patterns.",
    "Automatically injects required XML namespaces and cleans special characters."
  ],
  "faqs": [
    {
      "question": "Why is URL encoding better than Base64 for SVG?",
      "answer": "Base64 increases file size by ~33%, whereas UTF-8 URL encoding only escapes necessary characters, resulting in a much lighter footprint that compresses well with Gzip/Brotli."
    },
    {
      "question": "Does this require an xmlns attribute?",
      "answer": "Yes, CSS data URIs require xmlns='http://www.w3.org/2000/svg', which our tool automatically injects if missing."
    }
  ],
  "features": [
    "RFC 3986 compliant URL encoding",
    "Automatic xmlns validation and injection",
    "Live repeating CSS background preview",
    "Smaller than Base64 encoding"
  ],
  "tips": [
    "Use SVG data URIs for custom form select dropdown arrows and subtle grid backgrounds",
    "Ensure color hex values (#000) are URL-encoded (%23000) to render properly across all browsers"
  ]
};
