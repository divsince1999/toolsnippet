import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-xml",
  name: "JSON to XML Converter",
  category: "Data",
  shortDescription: "Convert structured JSON objects and arrays into clean, indented XML documents.",
  heroTitle: "Convert JSON Objects to Well-Formed XML",
  heroDescription: "Transform JSON payloads and arrays into clean, indented XML documents with customizable root tags.",
  about: "JSON to XML Converter transforms nested JSON structures and arrays into well-formed XML documents with XML entity escaping and customizable root element naming.",
  howToUse: [
  "Paste your JSON payload into the input editor.",
  "Customize the Root Element Tag name and toggle XML Declaration.",
  "Copy the generated XML document."
],
  whyUse: [
  "Prepare payloads for legacy enterprise integrations, SOAP endpoints, and XML-based configuration files.",
  "Escapes XML special characters (&, <, >) automatically."
],
  faqs: [
  {
    "question": "How are JSON arrays converted to XML?",
    "answer": "JSON arrays are converted to sequential child tags using singularized naming or <item> tags."
  }
],
  features: [
  "Customizable root element tag name",
  "Optional XML declaration header (<?xml version=\"1.0\" encoding=\"UTF-8\"?>)",
  "Automatic XML entity escaping for special characters"
],
  tips: [
  "If your top-level JSON object already has a single root key, the converter uses it as the document root automatically"
],
};
