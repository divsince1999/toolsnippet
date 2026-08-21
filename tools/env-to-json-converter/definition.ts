import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "env-to-json-converter",
  name: ".env to JSON & Environment Config Converter",
  category: "Data",
  shortDescription: "Convert .env key-value variables to structured JSON and transform JSON objects into formatted .env files.",
  heroTitle: ".env to JSON & Environment Config Converter",
  heroDescription: "Convert .env key-value variables to structured JSON and transform JSON objects into formatted .env files.",
  about: "The .env to JSON Converter parses environment configuration strings into typed JSON objects (with numbers, booleans, and string coercion) and exports JSON data into valid .env format.",
  features: [
    "Bi-directional `.env ➔ JSON` and `JSON ➔ .env` conversion",
    "Automatic type coercion (parses `true`/`false`, integers, and floats)",
    "Handles quoted strings and multiline values",
    "1-click copy with instant syntax validation"
],
  howToUse: [
    "Select conversion mode (.env to JSON or JSON to .env).",
    "Paste your configuration content.",
    "Instantly view and copy the converted output."
],
  whyUse: [
    "Convert `.env` secrets into JSON payloads for Docker secrets or Kubernetes ConfigMaps.",
    "Export database settings or API configs directly into environment variable files."
],
  tips: [
    "Lines starting with `#` are recognized as comments and excluded from JSON output."
],
  faqs: [
    {
        "question": "How does type coercion work for .env variables?",
        "answer": "Values like `true` or `false` are converted to booleans, pure digits are converted to numbers, and text or quoted values remain strings."
    },
    {
        "question": "Can I convert nested JSON back into a .env file?",
        "answer": "Yes, nested JSON objects will have their keys flattened using uppercase underscore notation (e.g. `DATABASE_HOST`)."
    }
]
};
