import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "open-graph-meta-generator",
  "name": "Open Graph & Twitter Card Generator",
  "category": "Data",
  "shortDescription": "Create social sharing meta tags (OG & Twitter) with live interactive social preview cards.",
  "heroTitle": "Open Graph (OG) & Twitter Card Meta Generator",
  "heroDescription": "Generate Open Graph and Twitter Card HTML meta tags with live interactive social preview cards.",
  "about": "Open Graph Meta Generator crafts complete social sharing metadata for Facebook, Twitter/X, LinkedIn, and Slack, featuring a real-time social card preview to ensure link shares look professional.",
  "howToUse": [
    "Enter your Page Title, Meta Description, Canonical URL, and OG Image URL.",
    "Choose your Open Graph type and Twitter Card layout (summary or summary_large_image).",
    "Preview how your link will look when shared on social platforms.",
    "Copy the generated HTML <meta> tags into your website's <head>."
  ],
  "whyUse": [
    "Boosts click-through rates and brand presence on social media and messaging platforms.",
    "Includes live visual social card preview."
  ],
  "faqs": [
    {
      "question": "What is the recommended image size for Open Graph images?",
      "answer": "The standard recommended size for og:image is 1200 x 630 pixels with a 1.91:1 aspect ratio for crisp display on high-DPI screens."
    }
  ],
  "features": [
    "Generates complete Open Graph (og:*) tags",
    "Generates complete Twitter Card (twitter:*) tags",
    "Live interactive social card preview",
    "One-click HTML markup copy"
  ],
  "tips": [
    "Always use absolute URLs (https://example.com/image.jpg) for og:image so scrapers can resolve assets correctly"
  ]
};
