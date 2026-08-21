import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "markdown-to-pdf-cleaner",
  name: "Markdown Print & PDF Layout Optimizer",
  category: "Text",
  shortDescription: "Optimize and format raw Markdown for clean PDF exports and printing with automatic page breaks and print typography.",
  heroTitle: "Markdown Print & PDF Layout Optimizer",
  heroDescription: "Optimize and format raw Markdown for clean PDF exports and printing with automatic page breaks and print typography.",
  about: "The Markdown Print & PDF Layout Optimizer prepares Markdown documents for clean browser printing and PDF generation by injecting page-break rules (`<div style='page-break-after: always;'></div>`), table wrappers, and clean typography styling.",
  features: [
    "Injects automatic or manual page breaks before H1/H2 headings",
    "Cleans broken link formats and non-printable elements",
    "Formats code blocks and Markdown tables with full-width print styles",
    "Instant copy with print CSS recommendations"
],
  howToUse: [
    "Paste your raw Markdown text into the input area.",
    "Select page break placement (Before H1 or Before H2).",
    "Copy the cleaned Markdown ready for Pandoc, Marp, or browser PDF printing."
],
  whyUse: [
    "Eliminate awkward mid-table or mid-heading page cuts in generated PDF reports.",
    "Standardize font sizes and margins for documentation export."
],
  tips: [
    "Use `page-break-inside: avoid` on tables to prevent rows from splitting across physical pages."
],
  faqs: [
    {
        "question": "How do page breaks work in Markdown PDF converters?",
        "answer": "Most Markdown PDF converters (like VS Code Markdown PDF, Marp, and Chrome Print) recognize standard HTML `<div style='page-break-after: always;'></div>` tags to enforce hard page transitions."
    },
    {
        "question": "Does this tool modify my source text content?",
        "answer": "No, it only adjusts heading layout markers, table wrappers, and page break dividers without altering your original text."
    }
]
};
