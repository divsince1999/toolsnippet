import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-go-struct",
  name: "JSON to Go Struct Generator",
  category: "Data",
  shortDescription: "Convert JSON payloads into idiomatic Go (Golang) structs with json struct tags.",
  heroTitle: "Convert JSON to Idiomatic Go Structs",
  heroDescription: "Generate Go (Golang) structs with json struct tags, nested structs, and standard acronym casing.",
  about: "JSON to Go Struct Generator parses JSON objects and creates strongly-typed Go struct declarations with json struct tags, aligning field names with Go naming conventions and standard acronyms (ID, URL, IP).",
  howToUse: [
  "Paste your JSON payload into the input area.",
  "Enter the root Go struct name.",
  "Copy the generated Go struct code."
],
  whyUse: [
  "Save time writing boilerplate structs when building Golang microservices and API clients.",
  "Follows Go standard library conventions including uppercase acronyms (ID, URL, API)."
],
  faqs: [
  {
    "question": "How does the tool handle unknown or null values in Go?",
    "answer": "Null or untyped fields default to interface{} (or any in Go 1.18+), allowing flexible unmarshaling."
  }
],
  features: [
  "Generates Go struct tags (json:\"...\")",
  "Idiomatic PascalCase naming with acronym capitalization (ID, IP, URL)",
  "Supports nested structs and primitive slices ([]string, []int64)"
],
  tips: [
  "Pass structs directly into json.Unmarshal(data, &payload) for zero-boilerplate decoding"
],
};
