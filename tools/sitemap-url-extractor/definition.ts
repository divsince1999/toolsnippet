import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "sitemap-url-extractor",
  "name": "XML Sitemap URL & Link Extractor",
  "category": "Data",
  "shortDescription": "Parse XML sitemaps to extract all <loc> URLs, lastmod timestamps, and changefreq tags into CSV or URL lists.",
  "heroTitle": "Free Online XML Sitemap URL & Link Extractor",
  "heroDescription": "Extract and export all page URLs, lastmod dates, and priority scores from XML sitemap files directly in browser.",
  "about": "The XML Sitemap URL & Link Extractor parses standard XML sitemap files (and sitemap indexes) to extract clean URL lists, last modified dates, and change frequencies. Perfect for SEO audits, link verification, and site inventory checks.",
  "howToUse": [
    "Paste your XML sitemap content (or XML sitemap string).",
    "Select your export format (Clean URL List, CSV with metadata, or JSON Array).",
    "Inspect summary metrics (total URLs, unique domains).",
    "Copy or download the parsed link dataset."
  ],
  "whyUse": [
    "Audit all indexed URLs from any XML sitemap quickly.",
    "Export URLs into spreadsheet CSV format for crawler and backlink analysis.",
    "Extract URLs from nested sitemap index tags.",
    "100% private and runs offline in browser."
  ],
  "faqs": [
    {
      "question": "Does this tool work with sitemap indexes?",
      "answer": "Yes, it extracts all `<loc>` entries whether they represent individual page URLs or child sitemap XML endpoints."
    },
    {
      "question": "Can I export as CSV?",
      "answer": "Yes, toggle to CSV format to export columns for URL, lastmod, changefreq, and priority."
    }
  ]
};
