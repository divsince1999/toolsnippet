import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-zod",
  name: "JSON to Zod Schema Generator",
  category: "Validation",
  shortDescription: "Convert JSON objects into strict TypeScript Zod validation schemas with automatic type inference.",
  heroTitle: "Convert JSON to Strict TypeScript Zod Schemas",
  heroDescription: "Transform JSON payloads into type-safe Zod validation schemas with inferred TypeScript types.",
  about: "JSON to Zod Schema Generator automatically analyzes JSON data structures and produces strict Zod schemas with email, URL, and date format detection alongside inferred TypeScript types.",
  howToUse: [
  "Paste your sample JSON object into the input area.",
  "Customize the schema constant name and TypeScript type name.",
  "Copy the generated Zod validation schema and inferred type."
],
  whyUse: [
  "Speed up Next.js server actions, tRPC, and API validation by auto-generating Zod schemas.",
  "Prevents manual schema typing errors on complex nested JSON payloads."
],
  faqs: [
  {
    "question": "How does the tool infer string formats in Zod?",
    "answer": "The generator tests string values against standard regex patterns for email addresses, HTTP/HTTPS URLs, and ISO datetime strings, adding .email(), .url(), or .datetime() automatically."
  }
],
  features: [
  "Auto-detects email, url, and ISO datetime strings",
  "Nested objects and homogeneous/heterogeneous array support",
  "Exports both Zod schema and z.infer<typeof schema> TypeScript type"
],
  tips: [
  "Use this schema with react-hook-form and @hookform/resolvers/zod for client-side form validation"
],
};
