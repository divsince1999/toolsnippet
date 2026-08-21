import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "toml-to-json",
  name: "TOML to JSON Converter",
  category: "Data",
  shortDescription: "Parse Cargo, PyProject, and generic TOML configuration files into clean structured JSON.",
  heroTitle: "Convert TOML Configuration Files to JSON",
  heroDescription: "Parse Rust Cargo.toml, Python pyproject.toml, and generic TOML files into structured JSON.",
  about: "TOML to JSON Converter parses TOML configuration documents (tables, arrays, key-values, comments) into clean, formatted JSON with zero server roundtrips.",
  howToUse: [
  "Paste your TOML document (e.g. Cargo.toml or pyproject.toml) into the input area.",
  "Inspect the converted JSON object in the output editor.",
  "Copy the JSON output with one click."
],
  whyUse: [
  "Inspect and validate Rust, Python, and Hugo TOML configs in JSON format.",
  "Fast client-side TOML parsing."
],
  faqs: [
  {
    "question": "What is TOML commonly used for?",
    "answer": "TOML (Tom's Obvious, Minimal Language) is widely used for configuration in the Rust ecosystem (Cargo.toml) and modern Python projects (pyproject.toml)."
  }
],
  features: [
  "Parses section headers ([table] and [table.sub])",
  "Extracts string, numeric, boolean, and array values",
  "Filters out TOML comments (#)"
],
  tips: [
  "Paste your Cargo.toml dependencies section to inspect crate versions as a structured JSON object"
],
};
