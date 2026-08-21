import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-kotlin",
  name: "JSON to Kotlin Data Class Converter",
  category: "Data",
  shortDescription: "Transform JSON payloads into Kotlin data classes with kotlinx.serialization annotations.",
  heroTitle: "Convert JSON to Kotlin Data Classes",
  heroDescription: "Generate Kotlin @Serializable data classes from JSON payloads with automatic type mapping.",
  about: "JSON to Kotlin Converter transforms raw JSON into idiomatic Kotlin data classes annotated with kotlinx.serialization @Serializable and @SerialName, ready for Android and backend Kotlin development.",
  howToUse: [
  "Paste your JSON payload into the input editor.",
  "Specify your root Kotlin class name.",
  "Copy the generated Kotlin data class hierarchy."
],
  whyUse: [
  "Eliminates manual boilerplate when integrating REST APIs into Android (Jetpack Compose) or Ktor applications.",
  "Generates clean, nested data class hierarchies automatically."
],
  faqs: [
  {
    "question": "Which serialization library is supported?",
    "answer": "Classes are generated using official kotlinx.serialization annotations (@Serializable and @SerialName), compatible with Ktor, Retrofit, and Kotlin Multiplatform."
  }
],
  features: [
  "Generates @Serializable Kotlin data classes",
  "Maps Int, Double, String, Boolean, and List<T> types",
  "Handles nested objects by extracting child data classes"
],
  tips: [
  "Ensure kotlinx.serialization plugin is enabled in your build.gradle.kts to use these classes"
],
};
