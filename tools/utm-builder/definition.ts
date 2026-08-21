import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "utm-builder",
  "name": "UTM Campaign URL Builder",
  "category": "Data",
  "shortDescription": "Create trackable marketing URLs for Google Analytics with UTM parameters.",
  "heroTitle": "Build trackable UTM campaign URLs for Google Analytics",
  "heroDescription": "Generate clean, validated Google Analytics campaign URLs with utm_source, utm_medium, and utm_campaign.",
  "about": "UTM Campaign URL Builder helps marketers, developers, and creators build standardized trackable URLs to accurately measure campaign performance in Google Analytics (GA4).",
  "howToUse": [
    "Enter your destination Website URL.",
    "Fill in Campaign Source (e.g. newsletter), Medium (e.g. email), and Name (e.g. launch).",
    "Optionally specify Campaign Term and Campaign Content.",
    "Copy your generated trackable campaign URL."
  ],
  "whyUse": [
    "Ensures zero typos and valid URL encoding in marketing campaigns.",
    "Helps keep tracking naming conventions consistent across marketing channels.",
    "Runs locally in your browser with zero data collection."
  ],
  "faqs": [
    {
      "question": "Which UTM parameters are required?",
      "answer": "Website URL, utm_source, utm_medium, and utm_campaign are standard requirements for GA4 attribution."
    },
    {
      "question": "Does it work with URLs that already have query parameters?",
      "answer": "Yes, parameters are properly appended with & if query parameters already exist."
    }
  ],
  "features": [
    "Live real-time URL preview",
    "Standard GA4 UTM parameter validation",
    "One-click copy to clipboard",
    "Automatic URL encoding"
  ],
  "tips": [
    "Use lowercase letters and underscores for consistent analytics aggregation",
    "Avoid spaces in UTM parameters to keep links clean and reliable"
  ]
};
