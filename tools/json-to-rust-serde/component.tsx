"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "")
    .replace(/__+/g, "_");
}

function toPascalCase(str: string): string {
  return str.replace(/(^|_|-|\s)(\w)/g, (_, __, c) => c.toUpperCase());
}

function inferRustType(val: unknown, key: string, structs: string[]): string {
  if (val === null || val === undefined) return "Option<serde_json::Value>";
  if (typeof val === "boolean") return "bool";
  if (typeof val === "number") return Number.isInteger(val) ? "i64" : "f64";
  if (typeof val === "string") return "String";

  if (Array.isArray(val)) {
    if (val.length === 0) return "Vec<serde_json::Value>";
    const itemType = inferRustType(val[0], `${key}Item`, structs);
    return `Vec<${itemType}>`;
  }

  if (typeof val === "object") {
    const structName = toPascalCase(key);
    generateRustStruct(val as Record<string, unknown>, structName, structs);
    return structName;
  }

  return "serde_json::Value";
}

function generateRustStruct(obj: Record<string, unknown>, structName: string, structs: string[]): void {
  const fields = Object.entries(obj).map(([k, v]) => {
    const rustFieldName = toSnakeCase(k);
    const rustType = inferRustType(v, k, structs);
    const renameAttr = rustFieldName !== k ? `    #[serde(rename = "${k}")]\n` : "";
    return `${renameAttr}    pub ${rustFieldName}: ${rustType},`;
  });

  const structDef = `#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]\n#[serde(rename_all = "camelCase")]\npub struct ${structName} {\n${fields.join("\n")}\n}`;
  structs.unshift(structDef);
}

export default function JsonToRustSerdeTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: 991,
        crateName: "tokio",
        downloadsCount: 15420000,
        isPublished: true,
        versionInfo: {
          latestVersion: "1.38.0",
          editionYear: 2021,
        },
        authors: ["Carl Lerche", "Tokio Contributors"],
      },
      null,
      2
    )
  );
  const [rootStruct, setRootStruct] = useState("CrateMetadata");

  const { rustCode, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { rustCode: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const structs: string[] = [];

      generateRustStruct(parsed, rootStruct || "RootStruct", structs);

      return {
        rustCode:
          `use serde::{Deserialize, Serialize};\n\n` +
          structs.join("\n\n"),
        error: "",
      };
    } catch (err: unknown) {
      return { rustCode: "", error: err instanceof Error ? err.message : "Invalid JSON input" };
    }
  }, [jsonInput, rootStruct]);

  return (
    <ToolContainer
      title="JSON to Rust Struct (Serde) Generator"
      description="Convert JSON data into Rust structs with #[derive(Serialize, Deserialize)] annotations."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="JSON Input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={14}
            error={error}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Root Rust Struct Name
            </label>
            <input
              type="text"
              value={rootStruct}
              onChange={(e) => setRootStruct(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated Rust Structs (Serde)"
            readOnly
            copyable
            value={rustCode}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
