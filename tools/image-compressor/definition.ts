import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "image-compressor",
  name: "Image Compressor",
  category: "Design",
  shortDescription: "Compress, optimize, and resize JPG, PNG, and WebP images directly in your browser with zero server uploads.",
  heroTitle: "100% Client-Side Image Compressor & Optimizer",
  heroDescription: "Reduce image file sizes up to 90% without compromising visual clarity. Convert to modern WebP, JPG, or PNG entirely in your browser memory.",
  about: "ToolSnippet's Image Compressor is a zero-knowledge, high-speed image optimization tool built on the HTML5 Canvas and Web APIs. It allows developers, designers, and content creators to compress, convert, and scale images instantly on their local device without uploading sensitive photos or assets to remote servers.",
  howToUse: [
    "Upload or drag & drop one or more JPG, PNG, WebP, GIF, or BMP images.",
    "Select your target format (WebP for maximum compression, JPEG for standard photos, or PNG).",
    "Adjust the Quality slider (e.g. 75% Balanced) and optional Max Width / Height dimensions.",
    "Inspect the real-time compression ratio and side-by-side visual preview.",
    "Click Download Compressed Image or Copy Base64 Data URI.",
  ],
  whyUse: [
    "100% Client-Side Privacy: Your images are never uploaded to any remote server or third-party cloud.",
    "Next-Gen WebP Conversion: Cut image payload sizes by up to 90% compared to legacy PNG and JPG formats.",
    "Instant Zero-Latency Processing: Powered by your device's GPU and browser Canvas rasterizer.",
    "Full Dimension Control: Scale down massive 4K/8K camera uploads to web-ready dimensions with locked aspect ratios.",
    "Free & Unlimited: Compress as many high-resolution images as you need with no file size limits or daily quotas.",
  ],
  faqs: [
    {
      question: "How does 100% client-side image compression work?",
      answer: "When you upload an image, your browser decodes the image into an in-memory HTML5 Canvas element. The canvas then uses native hardware-accelerated image encoding algorithms to re-compress the pixel buffer at your chosen quality level and format (such as image/webp or image/jpeg). No data ever leaves your computer or phone.",
    },
    {
      question: "Which image formats offer the best compression ratio?",
      answer: "WebP generally provides the highest compression ratio—often 30% to 80% smaller than comparable JPEG or PNG files with identical perceptual visual quality. We recommend WebP for all modern websites and web applications.",
    },
    {
      question: "Are there any file size or quantity limits?",
      answer: "No. Because all compression runs in your browser's local memory using your machine's hardware, there are no artificial file size caps, watermarks, or daily usage limits.",
    },
    {
      question: "Does compressing an image remove transparent backgrounds?",
      answer: "WebP and PNG formats preserve full alpha transparency. If you choose JPEG, transparent areas will automatically blend into a solid white background since the JPEG standard does not support alpha channels.",
    },
    {
      question: "Can I resize the width and height while compressing?",
      answer: "Yes. You can specify a maximum width or maximum height in pixels, and the tool will proportionally scale down your image while preserving the original aspect ratio.",
    },
  ],
  features: [
    "100% client-side zero-knowledge compression via Canvas API",
    "Support for WebP, JPEG, and PNG export formats",
    "Interactive quality slider with 1-click presets (50%, 75%, 90%)",
    "Proportional dimension scaling (Max Width / Height)",
    "Real-time file size comparison and savings percentage counter",
    "Interactive side-by-side visual comparison preview",
    "Direct 1-click image download with preserved or custom naming",
    "Base64 Data URI export for inline CSS/HTML embedding",
    "Batch multi-file queue processing",
  ],
  tips: [
    "Use 75%–80% WebP for the sweet spot between tiny file size and crisp visual fidelity on the web.",
    "For website hero banners, set Max Width to 1920px to avoid serving bloated multi-megabyte camera originals.",
    "Check the side-by-side preview to verify text and fine lines before exporting.",
  ],
};
