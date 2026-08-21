import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "meta-tag-generator",
  "name": "Open Graph & Meta Tag Generator",
  "category": "Validation",
  "shortDescription": "Generate HTML meta tags, OpenGraph (Facebook/LinkedIn), and Twitter Cards.",
  "heroTitle": "Generate complete HTML Meta Tags and Social Cards",
  "heroDescription": "Create SEO-friendly meta tags, Open Graph properties, and Twitter summary cards for your website.",
  "about": "Open Graph & Meta Tag Generator creates standard HTML head tags, Open Graph meta tags for Facebook and LinkedIn, and Twitter Card specifications to optimize social sharing and search indexing.",
  "howToUse": [
    "Enter your page title, description, and canonical URL.",
    "Provide an image URL for social media share previews.",
    "Optionally enter author name and Twitter handle.",
    "Copy the generated HTML snippet into your website <head> tag."
  ],
  "whyUse": [
    "Maximizes click-through rates on social media with rich preview cards.",
    "Includes character count guides to avoid search engine snippet truncation.",
    "Generates modern, standard-compliant metadata."
  ],
  "faqs": [
    {
      "question": "What is the recommended Open Graph image size?",
      "answer": "The recommended resolution for og:image is 1200x630 pixels with a 1.91:1 aspect ratio."
    },
    {
      "question": "What is the ideal title and description length for SEO?",
      "answer": "Titles should be 50–60 characters, and descriptions should be 150–160 characters for optimal search display."
    }
  ],
  "features": [
    "Live character counter for title and description",
    "Open Graph (og:) and Twitter Card markup",
    "Canonical URL and author tagging",
    "Clean, copyable HTML code block"
  ],
  "tips": [
    "Always use absolute URLs (https://...) for og:image and canonical links",
    "Ensure your image is publicly accessible so social crawlers can scrape it"
  ]
};
