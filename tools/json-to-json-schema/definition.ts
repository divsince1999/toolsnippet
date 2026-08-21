import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-json-schema",
  name: "JSON to JSON Schema Generator",
  category: "Data",
  shortDescription: "Generate standard Draft-07 and 2020-12 JSON Schema specifications from sample JSON objects.",
  heroTitle: "Generate JSON Schema Specifications from JSON",
  heroDescription: "Create Draft-07 and 2020-12 JSON Schemas from sample JSON data with required fields and formats.",
  about: "JSON to JSON Schema Generator parses sample JSON structures and builds standard JSON Schema specifications with type inference, property declarations, and optional required field constraints.",
  howToUse: [
  "Paste your sample JSON payload into the input editor.",
  "Select Draft-07 or 2020-12 JSON Schema specification.",
  "Toggle whether all fields should be marked as required.",
  "Copy the generated JSON Schema definition."
],
  whyUse: [
  "Standardize API payloads across microservices and OpenAPI/Swagger documentation.",
  "Supports Draft-07 and 2020-12 specifications."
],
  faqs: [
  {
    "question": "What is the difference between JSON Schema Draft-07 and 2020-12?",
    "answer": "Draft-07 is the most widely supported schema version across legacy tooling and validators, while 2020-12 includes modern vocabulary modularity and improved dynamic referencing."
  }
],
  features: [
  "Supports Draft-07 and 2020-12 drafts",
  "Deeply nested object and array item inspection",
  "Configurable required properties enforcement"
],
  tips: [
  "Include realistic edge-case sample data in your JSON to generate comprehensive schema constraints"
],
};
