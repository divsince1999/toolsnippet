import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "ndjson-to-json",
  name: "NDJSON / JSONL to JSON Array Converter",
  category: "Data",
  shortDescription: "Bidirectional converter between Newline Delimited JSON (.ndjson / .jsonl) and formatted JSON arrays.",
  heroTitle: "Convert NDJSON / JSONL to JSON Arrays & Vice Versa",
  heroDescription: "Bidirectional converter between streaming Newline Delimited JSON (.jsonl) and formatted JSON arrays.",
  about: "NDJSON to JSON Converter provides bidirectional conversion between streaming Newline Delimited JSON (.ndjson / .jsonl) and standard JSON arrays, essential for analyzing log streams and database dumps.",
  howToUse: [
  "Select conversion direction: 'NDJSON → JSON Array' or 'JSON Array → NDJSON'.",
  "Paste your NDJSON stream or JSON array into the input editor.",
  "Copy the converted output with one click."
],
  whyUse: [
  "Crucial for working with BigQuery, Elasticsearch, and JSON log stream exports.",
  "Validates each line independently and identifies syntax error line numbers."
],
  faqs: [
  {
    "question": "What is NDJSON / JSONL?",
    "answer": "NDJSON (Newline Delimited JSON) or JSON Lines (.jsonl) is a format where each line is a standalone, valid JSON object, ideal for streaming large datasets without parsing the entire file into memory."
  }
],
  features: [
  "Bidirectional NDJSON <-> JSON Array conversion",
  "Line-by-line validation with error line reporting",
  "One-click clipboard copy"
],
  tips: [
  "NDJSON is the preferred format for streaming BigQuery exports and OpenAI fine-tuning dataset files"
],
};
