import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  "slug": "faq-schema-generator",
  "name": "FAQ Page JSON-LD Schema Generator",
  "category": "Validation",
  "shortDescription": "Build interactive FAQPage JSON-LD structured data for Google Search rich snippets.",
  "heroTitle": "Free FAQPage JSON-LD Schema Generator",
  "heroDescription": "Create valid Google Rich Results FAQPage structured data markup with interactive question and answer fields.",
  "about": "The FAQ Page JSON-LD Schema Generator builds Google-compliant schema markup for Frequently Asked Questions. Adding FAQPage structured data to your web pages enables collapsible question accordions in Google search results, dramatically increasing organic CTR.",
  "howToUse": [
    "Add question and answer pairs using the interactive form.",
    "Add or remove FAQ items dynamically.",
    "Review the validated JSON-LD code block in real time.",
    "Copy the `<script type='application/ld+json'>` snippet and paste it into your page HTML `<head>`."
  ],
  "whyUse": [
    "Eligible for Google FAQ rich snippet search enhancements.",
    "Validates against standard schema.org/FAQPage specifications.",
    "Generates clean, minified or formatted JSON-LD.",
    "100% browser-based and fast."
  ],
  "faqs": [
    {
      "question": "Where do I paste the FAQPage JSON-LD code?",
      "answer": "Paste the `<script type='application/ld+json'>` code inside the `<head>` or before the closing `</body>` tag of your HTML document."
    },
    {
      "question": "Can I use HTML inside FAQ answers?",
      "answer": "Yes, Google supports basic HTML tags like `<a>`, `<b>`, `<strong>`, `<i>`, and `<p>` inside FAQPage answers."
    }
  ]
};
