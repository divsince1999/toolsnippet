import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-python-pydantic",
  name: "JSON to Python Pydantic (v2) Generator",
  category: "Data",
  shortDescription: "Convert JSON payloads into strict Python Pydantic v2 BaseModel classes with type annotations.",
  heroTitle: "Convert JSON to Python Pydantic v2 Models",
  heroDescription: "Generate Python Pydantic BaseModel classes from JSON with type annotations and Field aliases.",
  about: "JSON to Python Pydantic Generator converts JSON objects into modern Pydantic v2 BaseModel classes, configuring type hints, field aliases, and optional types for FastAPI and data validation.",
  howToUse: [
  "Paste your JSON payload into the input area.",
  "Provide a root Pydantic model name.",
  "Copy the generated Python code."
],
  whyUse: [
  "Indispensable for FastAPI, LangChain, and modern Python 3.10+ data pipelines.",
  "Creates nested models with proper snake_case aliases and type hints."
],
  faqs: [
  {
    "question": "Is the output compatible with Pydantic v2?",
    "answer": "Yes, generated models use standard Python type annotations (list[str], Optional[Any]) and Pydantic v2 Field(alias=\"...\") syntax."
  }
],
  features: [
  "Generates Pydantic v2 BaseModel classes",
  "Automatic snake_case conversion with Field(alias=...) support",
  "Supports nested models, lists, and optional fields"
],
  tips: [
  "Use model_validate_json() in Pydantic v2 to parse JSON strings directly into these models"
],
};
