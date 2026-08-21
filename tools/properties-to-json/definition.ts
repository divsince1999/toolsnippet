import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "properties-to-json",
  name: "Java .properties / .env to JSON Converter",
  category: "Data",
  shortDescription: "Convert dot-notated Java .properties configuration files and .env variables into nested JSON.",
  heroTitle: "Convert Java .properties and .env to Nested JSON",
  heroDescription: "Transform dot-notated Java .properties and .env files into structured, nested JSON objects.",
  about: "Properties to JSON Converter parses Spring Boot and Java .properties files alongside .env files, converting dot-notated keys (server.port=8080) into deep, structured JSON objects.",
  howToUse: [
  "Paste your Java .properties or .env text into the input editor.",
  "Inspect the converted nested JSON object in real-time.",
  "Copy the formatted JSON."
],
  whyUse: [
  "Easily migrate Spring Boot configuration files or environment variables into JSON/YAML configuration formats.",
  "Expands dot notation into deep nested hierarchy."
],
  faqs: [
  {
    "question": "How are comments in .properties files handled?",
    "answer": "Lines starting with # or ! are recognized as comments and safely ignored during conversion."
  }
],
  features: [
  "Expands dot notation (app.db.url) into nested JSON objects",
  "Recognizes booleans, integers, and null values",
  "Filters out comments (# and !)"
],
  tips: [
  "Paste your application.properties file directly to view it as a clean configuration JSON object"
],
};
