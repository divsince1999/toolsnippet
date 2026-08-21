import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-schema-to-typescript",
  name: "JSON Schema to TypeScript Converter",
  category: "Data",
  shortDescription: "Convert Draft-07 and 2020-12 JSON Schema specifications into clean TypeScript interfaces.",
  heroTitle: "Convert JSON Schema to TypeScript Interfaces",
  heroDescription: "Transform standard JSON Schema definitions into clean, strongly-typed TypeScript interfaces.",
  about: "JSON Schema to TypeScript Converter translates Draft-07 and 2020-12 JSON Schema definitions into TypeScript interface declarations, handling optional properties, arrays, nested objects, and docstrings.",
  howToUse: [
  "Paste your JSON Schema specification into the editor.",
  "Optionally specify a root interface name fallback.",
  "Copy the generated TypeScript interface code."
],
  whyUse: [
  "Ensure TypeScript type definitions stay 100% in sync with backend JSON Schema specifications.",
  "Handles nested properties, array types, and required/optional keys accurately."
],
  faqs: [
  {
    "question": "How are optional properties handled?",
    "answer": "Properties not listed in the schema's 'required' array are automatically given the TypeScript optional modifier (?:)."
  }
],
  features: [
  "Translates JSON Schema objects, arrays, strings, numbers, and booleans",
  "Preserves schema descriptions as TypeScript JSDoc comments",
  "Accurate optional (?) property detection based on required list"
],
  tips: [
  "Use JSDoc comments in your JSON Schema 'description' fields to enrich IDE autocomplete tooltips in TypeScript"
],
};
