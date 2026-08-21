import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "xml-to-json",
  name: "XML to JSON Converter",
  category: "Data",
  shortDescription: "Parse XML documents and elements into clean, structured JSON objects with attribute preservation.",
  heroTitle: "Convert XML Documents to Structured JSON",
  heroDescription: "Transform XML documents, tags, and attributes into structured JSON objects with type inference.",
  about: "XML to JSON Converter provides fast client-side XML DOM parsing, converting XML tags, nested hierarchies, and attributes into clean JSON objects with automatic boolean and numeric type detection.",
  howToUse: [
  "Paste your XML document into the input editor.",
  "Review the parsed JSON output in the preview panel.",
  "Copy the formatted JSON with one click."
],
  whyUse: [
  "Essential for modernizing legacy SOAP/XML web services into modern REST/JSON architectures.",
  "Preserves XML attributes under @attributes key."
],
  faqs: [
  {
    "question": "How are XML attributes preserved in JSON?",
    "answer": "XML element attributes are stored inside a dedicated '@attributes' object within each corresponding JSON element."
  }
],
  features: [
  "Client-side XML DOM parsing with error detection",
  "Attribute preservation and nested node mapping",
  "Automatic numeric and boolean value coercion"
],
  tips: [
  "Ensure your XML input has a single root element (e.g. <root>...</root>) for standard document parsing"
],
};
