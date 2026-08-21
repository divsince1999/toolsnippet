import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-xml-schema-xsd",
  name: "JSON to XML Schema (XSD) Generator",
  category: "Data",
  shortDescription: "Generate standard W3C XML Schema Definition (XSD) documents from JSON objects and XML data.",
  heroTitle: "JSON to XML Schema (XSD) Generator",
  heroDescription: "Generate standard W3C XML Schema Definition (XSD) documents from JSON objects and XML data.",
  about: "The JSON to XML Schema Generator analyzes JSON structures and generates valid W3C XML Schema Definition (XSD) models with element type inference (`xs:string`, `xs:integer`, `xs:decimal`, `xs:boolean`, `xs:complexType`).",
  features: [
    "Infers strict XSD primitive types from sample JSON payloads",
    "Handles nested objects (`xs:complexType`) and arrays (`maxOccurs='unbounded'`)",
    "Generates valid `xmlns:xs='http://www.w3.org/2001/XMLSchema'` schema definitions",
    "Instant copy for enterprise SOAP, EDI, and XML validation"
],
  howToUse: [
    "Paste sample JSON payload into the input box.",
    "Instantly view the generated W3C XML Schema (XSD).",
    "Save as `.xsd` file for validating incoming XML payloads."
],
  whyUse: [
    "Quickly generate enterprise XSD contracts for SOAP web services and XML document validation.",
    "Enforce strict schema validation rules on legacy systems."
],
  tips: [
    "Array fields in JSON are automatically given `minOccurs='0'` and `maxOccurs='unbounded'` in the XSD."
],
  faqs: [
    {
        "question": "What is an XML Schema Definition (XSD)?",
        "answer": "XSD is a W3C recommendation that formally describes the elements, attributes, and data types allowed within an XML document."
    },
    {
        "question": "How does type inference work from JSON to XSD?",
        "answer": "Whole numbers map to `xs:integer`, floating point numbers map to `xs:decimal`, booleans map to `xs:boolean`, objects map to `xs:complexType`, and strings map to `xs:string`."
    }
]
};
