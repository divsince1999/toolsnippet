import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-properties",
  name: "JSON to Java .properties / .env Converter",
  category: "Data",
  shortDescription: "Flatten nested JSON objects into dot-notated Java .properties or UPPER_SNAKE_CASE .env files.",
  heroTitle: "Convert JSON to Java .properties and .env Files",
  heroDescription: "Flatten nested JSON objects into dot-notated Java .properties or UPPER_SNAKE_CASE .env files.",
  about: "JSON to Properties Converter flattens deep JSON objects and configurations into standard Java .properties format (dot.notation=value) or environment variables (UPPER_SNAKE_CASE=value).",
  howToUse: [
  "Paste your JSON configuration into the input editor.",
  "Choose between Standard Java .properties or Environment .env format.",
  "Copy the generated key-value configuration lines."
],
  whyUse: [
  "Generate .env files from API configurations or Spring Boot application.properties from JSON templates.",
  "Handles deep nested structures and array indexing seamlessly."
],
  faqs: [
  {
    "question": "What is the difference between .properties and .env modes?",
    "answer": ".properties maintains lowercase dot notation (spring.datasource.url=...), while .env mode converts keys to UPPER_SNAKE_CASE (SPRING_DATASOURCE_URL=...)."
  }
],
  features: [
  "Standard Java .properties dot notation formatting",
  "Environment .env UPPER_SNAKE_CASE conversion",
  "Flattens arbitrarily deep nested objects and arrays"
],
  tips: [
  "Use .env mode when preparing Docker Compose or Kubernetes ConfigMap environment variable files"
],
};
