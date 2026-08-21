"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const GO_ACRONYMS = new Set(["ID", "URL", "IP", "HTTP", "JSON", "XML", "SQL", "API", "UUID", "HTML"]);

function toGoFieldName(str: string): string {
  const parts = str.split(/_|-|\s+/);
  return parts
    .map((p) => {
      const upper = p.toUpperCase();
      if (GO_ACRONYMS.has(upper)) return upper;
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join("");
}

function inferGoType(val: unknown, key: string, structs: string[]): string {
  if (val === null || val === undefined) return "interface{}";
  if (typeof val === "boolean") return "bool";
  if (typeof val === "number") return Number.isInteger(val) ? "int64" : "float64";
  if (typeof val === "string") return "string";

  if (Array.isArray(val)) {
    if (val.length === 0) return "[]interface{}";
    const itemType = inferGoType(val[0], `${key}Item`, structs);
    return `[]${itemType}`;
  }

  if (typeof val === "object") {
    const structName = toGoFieldName(key);
    generateGoStruct(val as Record<string, unknown>, structName, structs);
    return structName;
  }

  return "interface{}";
}

function generateGoStruct(obj: Record<string, unknown>, structName: string, structs: string[]): void {
  const fields = Object.entries(obj).map(([k, v]) => {
    const fieldName = toGoFieldName(k);
    const goType = inferGoType(v, k, structs);
    return `\t${fieldName.padEnd(16)} ${goType.padEnd(14)} \`json:"${k}"\``;
  });

  const structDef = `type ${structName} struct {\n${fields.join("\n")}\n}`;
  structs.unshift(structDef);
}

export default function JsonToGoStructTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        user_id: 42,
        user_name: "gopher99",
        email_address: "gopher@golang.org",
        is_active: true,
        hourly_rate: 125.5,
        ip_address: "192.168.1.1",
        api_keys: ["sk_live_123", "sk_test_456"],
        server_config: {
          http_port: 8080,
          enable_tls: true,
        },
      },
      null,
      2
    )
  );
  const [rootStruct, setRootStruct] = useState("UserPayload");

  const { goCode, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { goCode: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const structs: string[] = [];

      generateGoStruct(parsed, rootStruct || "RootStruct", structs);
      return { goCode: structs.join("\n\n"), error: "" };
    } catch (err: unknown) {
      return { goCode: "", error: err instanceof Error ? err.message : "Invalid JSON input" };
    }
  }, [jsonInput, rootStruct]);

  return (
    <ToolContainer
      title="JSON to Go Struct Generator"
      description="Convert JSON payloads into idiomatic Go (Golang) structs with json struct tags."
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
              Root Go Struct Name
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
            label="Generated Go Structs (Golang)"
            readOnly
            copyable
            value={goCode}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
