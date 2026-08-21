import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-toml",
  name: "JSON to TOML Converter",
  category: "Data",
  shortDescription: "Convert JSON objects into clean, formatted TOML configuration files.",
  heroTitle: "Convert JSON Data to Formatted TOML",
  heroDescription: "Transform structured JSON objects and configuration datasets into formatted TOML files.",
  about: "JSON to TOML Converter transforms nested JSON objects into clean, readable TOML format with proper section headers ([section]) and formatted primitive values.",
  howToUse: [
  "Paste your JSON object into the input editor.",
  "Review the generated TOML document in the output preview.",
  "Copy the TOML configuration."
],
  whyUse: [
  "Prepare TOML configuration files for Rust, Python, and Hugo projects from JSON templates.",
  "Produces clean, readable TOML section headers."
],
  faqs: [
  {
    "question": "Can JSON arrays of objects be converted to TOML?",
    "answer": "Yes, nested objects are rendered as distinct [section] headers with indented sub-properties."
  }
],
  features: [
  "Transforms nested JSON to TOML section headers ([table])",
  "Formats strings, numbers, booleans, and arrays accurately",
  "Clean, human-readable output formatting"
],
  tips: [
  "Ensure the top-level JSON is an object ({ ... }) rather than an array for valid TOML document generation"
],
};
