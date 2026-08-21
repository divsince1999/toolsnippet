import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "base64-to-image",
  "name": "Base64 to Image Decoder & Downloader",
  "category": "Design",
  "shortDescription": "Convert Base64 data strings into viewable and downloadable PNG, JPEG, SVG, or WEBP images.",
  "heroTitle": "Decode Base64 strings to downloadable images",
  "heroDescription": "Paste Base64 data URIs or raw base64 strings to instantly preview and download the image file.",
  "about": "Base64 to Image Decoder transforms base64 data strings and Data URIs into rendered image previews with format detection and one-click file downloads.",
  "howToUse": [
    "Paste your Base64 string or data:image/... Data URI into the editor.",
    "View the live image preview, format, and estimated file size.",
    "Enter an optional filename and click Download Image."
  ],
  "whyUse": [
    "Quickly inspect and save images embedded in JSON payloads, CSS, or HTML.",
    "Auto-detects PNG, JPEG, WEBP, and SVG image formats.",
    "100% private: image decoding is performed entirely on your device."
  ],
  "faqs": [
    {
      "question": "Does the tool accept raw base64 without data:image prefix?",
      "answer": "Yes, it automatically detects and prefixes raw base64 strings if the data URI header is missing."
    },
    {
      "question": "Can I download the decoded image directly?",
      "answer": "Yes, clicking the Download button saves the image directly to your device with the correct file extension."
    }
  ],
  "features": [
    "Automatic MIME type and extension detection",
    "Live visual image preview",
    "Custom filename output downloader",
    "Instant client-side decoding"
  ],
  "tips": [
    "Verify the base64 string is complete to prevent image decoding artifacts",
    "Use this tool to extract logo assets and favicons embedded in inline CSS or HTML"
  ]
};
