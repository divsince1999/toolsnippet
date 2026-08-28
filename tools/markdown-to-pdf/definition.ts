import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "markdown-to-pdf",
  name: "Markdown to PDF Converter",
  category: "Text",
  shortDescription: "Convert Markdown documents into beautifully styled, printable PDF documents directly in your browser.",
  heroTitle: "Online Markdown to PDF Converter",
  heroDescription: "Format, preview, and export GitHub-flavored Markdown notes, documentation, and resumes into clean, printable PDFs with customizable paper themes and zero server tracking.",
  about: "ToolSnippet's Markdown to PDF Converter lets you transform Markdown text into publication-ready PDF documents directly from your browser. It supports tables, fenced code blocks, checklists, typography themes, and standard A4 / US Letter paper formatting.",
  howToUse: [
    "Type or paste your Markdown content into the left editor.",
    "Select your preferred styling theme (Modern Clean, Academic Formal, GitHub Document).",
    "Choose your target paper size (A4 or US Letter).",
    "Preview the formatted document in real-time.",
    "Click 'Export / Print PDF' to generate your PDF using the browser's high-resolution print engine.",
  ],
  whyUse: [
    "Zero Server Uploads: Your documents, notes, and private texts remain 100% in your local browser memory.",
    "Vector-Quality Printing: Produces crisp text and vector elements via browser PDF rendering.",
    "Full GFM Support: Includes GitHub Flavored Markdown tables, strikethrough, checklists, and code snippets.",
  ],
  faqs: [
    {
      question: "How do I save the Markdown output as a PDF file?",
      answer: "When you click 'Export / Print PDF', your browser's native print dialog will open. In the destination dropdown, select 'Save as PDF' to download the formatted PDF file directly.",
    },
    {
      question: "Are code blocks and syntax highlighted in the PDF?",
      answer: "Yes! Fenced code blocks and inline code are formatted with monospace styling and background contrast blocks suitable for printing.",
    },
  ],
  features: [
    "Real-time Markdown live preview rendering",
    "Pre-designed print themes (Modern, Academic, Minimal)",
    "A4 and US Letter page sizing options",
    "Table and task list GFM support",
    "1-click native PDF generation trigger",
  ],
  tips: [
    "In your browser's Print dialog, make sure 'Background graphics' is checked for optimal styling.",
    "Use headers (# and ##) to automatically create structured sections in your exported document.",
  ],
};
