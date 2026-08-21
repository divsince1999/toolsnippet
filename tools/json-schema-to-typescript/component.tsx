"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

interface SchemaProp {
  type?: string;
  items?: SchemaProp;
  properties?: Record<string, SchemaProp>;
  required?: string[];
  description?: string;
}

function schemaToTs(prop: SchemaProp, indent = 2): string {
  const pad = " ".repeat(indent);
  const nextPad = " ".repeat(indent + 2);

  if (!prop || !prop.type) return "unknown";

  if (prop.type === "string") return "string";
  if (prop.type === "number" || prop.type === "integer") return "number";
  if (prop.type === "boolean") return "boolean";
  if (prop.type === "null") return "null";

  if (prop.type === "array") {
    const itemType = prop.items ? schemaToTs(prop.items, indent) : "unknown";
    return `${itemType}[]`;
  }

  if (prop.type === "object") {
    if (!prop.properties) return "Record<string, unknown>";
    const reqSet = new Set(prop.required || []);

    const lines = Object.entries(prop.properties).map(([k, v]) => {
      const isReq = reqSet.has(k);
      const doc = v.description ? `${nextPad}/** ${v.description} */\n` : "";
      return `${doc}${nextPad}${k}${isReq ? "" : "?"}: ${schemaToTs(v, indent + 2)};`;
    });

    return `{\n${lines.join("\n")}\n${pad}}`;
  }

  return "unknown";
}

export default function JsonSchemaToTypescriptTool() {
  const [schemaInput, setSchemaInput] = useState(
    JSON.stringify(
      {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "UserAccount",
        type: "object",
        required: ["id", "username", "email"],
        properties: {
          id: { type: "integer", description: "Unique user identifier" },
          username: { type: "string" },
          email: { type: "string" },
          bio: { type: "string", description: "Optional public bio" },
          isVerified: { type: "boolean" },
          skills: {
            type: "array",
            items: { type: "string" },
          },
          settings: {
            type: "object",
            properties: {
              darkMode: { type: "boolean" },
              notifications: { type: "boolean" },
            },
          },
        },
      },
      null,
      2
    )
  );
  const [rootInterface, setRootInterface] = useState("UserAccount");

  const { tsOutput, error } = useMemo(() => {
    try {
      if (!schemaInput.trim()) return { tsOutput: "", error: "" };
      const parsed = JSON.parse(schemaInput);
      const name = parsed.title || rootInterface || "RootObject";
      const body = schemaToTs(parsed, 0);

      return { tsOutput: `export interface ${name} ${body}`, error: "" };
    } catch (err: unknown) {
      return { tsOutput: "", error: err instanceof Error ? err.message : "Invalid JSON Schema input" };
    }
  }, [schemaInput, rootInterface]);

  return (
    <ToolContainer
      title="JSON Schema to TypeScript Converter"
      description="Convert Draft-07 and 2020-12 JSON Schema specifications into clean TypeScript interfaces."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="JSON Schema Input"
            value={schemaInput}
            onChange={(e) => setSchemaInput(e.target.value)}
            placeholder='{\n  "type": "object"\n}'
            rows={14}
            error={error}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Fallback Root Interface Name
            </label>
            <input
              type="text"
              value={rootInterface}
              onChange={(e) => setRootInterface(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated TypeScript Interface"
            readOnly
            copyable
            value={tsOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
