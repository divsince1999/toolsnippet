import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "how-to-schema-generator",
  "name": "HowTo Step-by-Step Schema Generator",
  "category": "Validation",
  "shortDescription": "Build structured @type: 'HowTo' JSON-LD schema markup with step titles, descriptions, and supplies for Google.",
  "heroTitle": "Free HowTo JSON-LD Schema Markup Generator",
  "heroDescription": "Generate Google-compliant HowTo structured data markup with step-by-step instructions, supplies, and tools.",
  "about": "The HowTo Schema Generator creates valid schema.org/HowTo JSON-LD markup. Adding HowTo structured data enables rich card carousels, expandable steps, and video thumbnails in Google search results for tutorials and step-by-step guides.",
  "howToUse": [
    "Enter the Guide Title, Description, Total Estimated Time (e.g. PT20M), and Estimated Cost.",
    "Add interactive instructional steps with step titles and detailed directions.",
    "Add required supplies and tools if applicable.",
    "Copy the generated `<script type='application/ld+json'>` code snippet into your page `<head>`."
  ],
  "whyUse": [
    "Qualify for Google HowTo Rich Snippets and carousel search displays.",
    "Provide structured instructions for smart assistants like Google Assistant.",
    "Automates proper ISO 8601 duration formatting (PT30M).",
    "100% free and client-side."
  ],
  "faqs": [
    {
      "question": "What is ISO 8601 duration format?",
      "answer": "Durations are formatted with a 'PT' prefix (e.g., 'PT15M' for 15 minutes, 'PT1H30M' for 1 hour 30 minutes, or 'P1D' for 1 day)."
    },
    {
      "question": "Can I add images to HowTo steps?",
      "answer": "Yes, you can provide image URLs for individual steps to render image thumbnails in Google Search carousels."
    }
  ]
};
