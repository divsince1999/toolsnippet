import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-graphql-schema",
  name: "JSON to GraphQL Schema Generator",
  category: "Data",
  shortDescription: "Convert JSON sample responses into GraphQL SDL type definitions with scalar types and nullability flags.",
  heroTitle: "Convert JSON to GraphQL SDL Schema Definitions",
  heroDescription: "Transform sample JSON responses into clean GraphQL type definitions with ID, String, Int, and Float scalars.",
  about: "JSON to GraphQL Schema Generator converts sample JSON API payloads into Schema Definition Language (SDL) type blocks, inferring ID, Int, Float, String, and Boolean scalars with nested object types.",
  howToUse: [
  "Paste your sample JSON payload into the input editor.",
  "Set your root GraphQL type name.",
  "Copy the generated GraphQL SDL type definitions."
],
  whyUse: [
  "Accelerate GraphQL API schema design and Apollo Server development.",
  "Automatically extracts nested objects into distinct GraphQL types."
],
  faqs: [
  {
    "question": "How are ID fields detected in GraphQL schema generation?",
    "answer": "Fields named 'id' or ending in 'Id' (e.g. userId) are automatically mapped to the GraphQL ID! scalar."
  }
],
  features: [
  "Generates GraphQL Schema Definition Language (SDL) type blocks",
  "Automatic ID, Int, Float, String, and Boolean scalar inference",
  "Nested type decomposition and non-null (!) assertions"
],
  tips: [
  "Paste these types directly into your schema.graphql or Apollo Server typeDefs template string"
],
};
