import type { ToolDefinition } from "@/lib/tools/types";

export const definition: ToolDefinition = {
  slug: "json-to-rust-serde",
  name: "JSON to Rust Struct (Serde) Generator",
  category: "Data",
  shortDescription: "Convert JSON data into Rust structs with #[derive(Serialize, Deserialize)] annotations.",
  heroTitle: "Convert JSON to Rust Serde Structs",
  heroDescription: "Transform JSON payloads into Rust structs with Serde annotations and snake_case field mapping.",
  about: "JSON to Rust Struct Generator converts JSON payloads into memory-safe Rust structs with Serde serialization derives (Serialize, Deserialize, Debug, Clone) and custom rename attributes.",
  howToUse: [
  "Paste your JSON payload into the input area.",
  "Specify your root Rust struct name.",
  "Copy the generated Rust code."
],
  whyUse: [
  "Speed up Rust backend and Actix/Axum web service development.",
  "Automatically maps camelCase JSON keys to idiomatic snake_case Rust fields with #[serde(rename = \"...\")]."
],
  faqs: [
  {
    "question": "What derives are included on generated structs?",
    "answer": "Structs include #[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)] for full standard library ergonomics."
  }
],
  features: [
  "Full Serde Serialize/Deserialize derive support",
  "Automatic camelCase to snake_case field renaming",
  "Typed Vec<T>, Option<T>, i64, and f64 primitive mappings"
],
  tips: [
  "Add serde = { version = \"1.0\", features = [\"derive\"] } to your Cargo.toml dependencies"
],
};
