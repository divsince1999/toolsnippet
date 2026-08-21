import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "markdown-table-to-csv",
  name: "Markdown Table to CSV & TSV Converter",
  category: "Data",
  shortDescription: "Parse GitHub-Flavored Markdown tables back into comma-separated (CSV) or tab-separated (TSV) spreadsheets.",
  heroTitle: "Convert Markdown Tables to CSV & TSV",
  heroDescription: "Extract data from Markdown documentation tables back into CSV or TSV format for Excel and Google Sheets.",
  about: "Markdown Table to CSV Converter parses Markdown tables from READMEs and technical docs back into structured CSV or TSV files, handling cell escaping and separator line filtering seamlessly.",
  howToUse: [
  "Paste your Markdown table into the input editor.",
  "Select your target output format (CSV or TSV).",
  "Copy the exported spreadsheet data."
],
  whyUse: [
  "Extract tabular data from GitHub documentation directly into Excel, Google Sheets, or database loaders.",
  "Filters out alignment separator rows automatically."
],
  faqs: [
  {
    "question": "Can I paste this output directly into Excel?",
    "answer": "Yes! Select TSV (Tab-Separated Values) format, click copy, and paste directly into Microsoft Excel or Google Sheets cells."
  }
],
  features: [
  "Supports CSV and TSV output formats",
  "Filters markdown alignment syntax (:---, ---:)",
  "Handles double-quote escaping for commas within cells"
],
  tips: [
  "Use TSV format for direct clipboard pasting into spreadsheet software without creating temporary files"
],
};
