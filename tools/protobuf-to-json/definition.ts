import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "protobuf-to-json",
  name: "Protobuf (.proto) to JSON Schema Converter",
  category: "Data",
  shortDescription: "Parse Protocol Buffer (proto3) message definitions into mock JSON data or JSON Schema specifications.",
  heroTitle: "Convert Protocol Buffers (.proto) to JSON & Schema",
  heroDescription: "Parse proto3 message definitions into mock JSON payloads or Draft-07 JSON Schema specifications.",
  about: "Protobuf to JSON Schema Converter parses Protocol Buffer (proto3) message definitions, extracting field tags, scalar types, and repeated fields to generate mock JSON objects or Draft-07 JSON Schema specifications.",
  howToUse: [
  "Paste your .proto message definition into the input editor.",
  "Select conversion target: Sample Mock JSON Payload or Draft-07 JSON Schema.",
  "Copy the generated output."
],
  whyUse: [
  "Quickly generate sample REST JSON payloads for testing gRPC-to-JSON gateways.",
  "Generate standard JSON Schema validation files directly from protobuf contracts."
],
  faqs: [
  {
    "question": "How are repeated fields handled in Protobuf conversion?",
    "answer": "Repeated proto fields are automatically mapped to JSON arrays ([ ... ]) containing sample elements of the designated scalar type."
  }
],
  features: [
  "Parses proto3 message { ... } syntax and field tags",
  "Outputs either mock JSON data or Draft-07 JSON Schema",
  "Maps int32, int64, float, double, bool, string, and repeated fields"
],
  tips: [
  "Use Mock JSON mode to quickly test API endpoints before your gRPC services are fully deployed"
],
};
