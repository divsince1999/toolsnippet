import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "csv-to-markdown-table",
  name: "CSV to Markdown Table Converter",
  category: "Data",
  shortDescription: "Convert CSV and TSV spreadsheet data into clean GitHub-Flavored Markdown tables.",
  heroTitle: "Convert CSV to GitHub-Flavored Markdown Tables",
  heroDescription: "Transform CSV and TSV spreadsheet records into clean Markdown tables with customizable column alignment.",
  about: "CSV to Markdown Table Converter converts raw comma-separated spreadsheet data into formatted GitHub-Flavored Markdown tables with customizable left, center, or right column text alignments.",
  howToUse: [
  "Paste your CSV text into the input area.",
  "Choose your preferred column alignment (Left, Center, Right).",
  "Copy the formatted Markdown table directly into your documentation."
],
  whyUse: [
  "Effortlessly format spreadsheet data for GitHub READMEs, Notion pages, and technical documentation.",
  "Cleans quotation marks and whitespace automatically."
],
  faqs: [
  {
    "question": "How do Markdown table alignments work?",
    "answer": "Markdown uses colons on the delimiter line: ':---' for left align, ':---:' for center align, and '---:' for right align."
  }
],
  features: [
  "Generates GitHub-Flavored Markdown (GFM) tables",
  "Configurable Left, Center, and Right column alignment",
  "Handles quoted strings and commas cleanly"
],
  tips: [
  "Use Center alignment for status badges or icons, and Right alignment for numerical currency amounts"
],
};
