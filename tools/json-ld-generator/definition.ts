import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "json-ld-generator",
  "name": "JSON-LD Schema Markup Generator",
  "category": "Data",
  "shortDescription": "Create Google-compliant structured data markup (JSON-LD) for Articles, Organizations, FAQs, and Products.",
  "heroTitle": "Generate JSON-LD Structured Data for SEO",
  "heroDescription": "Build Schema.org JSON-LD structured data scripts to boost Google Rich Results and organic search visibility.",
  "about": "JSON-LD Schema Markup Generator generates standard Schema.org structured data script tags for Articles, FAQs, Organizations, and Products, helping search engines understand page content and render rich snippets.",
  "howToUse": [
    "Select your Schema type (Article, FAQ Page, Organization, or Product).",
    "Fill in headlines, URLs, images, questions, or product pricing.",
    "Copy the generated <script type='application/ld+json'> code block directly into your HTML <head>."
  ],
  "whyUse": [
    "Structured data enables Google Rich Snippets, increasing click-through rates and search impression share.",
    "Syntax validated against official Schema.org standards."
  ],
  "faqs": [
    {
      "question": "Where should I place JSON-LD script tags?",
      "answer": "JSON-LD script tags can be placed in either the <head> or <body> section of your HTML, though the <head> is generally recommended for clean organization."
    }
  ],
  "features": [
    "Supports Article, FAQPage, Organization, and Product schemas",
    "Google Rich Results compliant formatting",
    "One-click copyable HTML <script> tag"
  ],
  "tips": [
    "Test your generated JSON-LD using Google's official Rich Results Test tool before deploying"
  ]
};
