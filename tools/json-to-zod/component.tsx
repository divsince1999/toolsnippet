"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function inferZodType(val: unknown, indent = 2): string {
  const pad = " ".repeat(indent);
  const nextPad = " ".repeat(indent + 2);

  if (val === null || val === undefined) return "z.null()";
  if (typeof val === "boolean") return "z.boolean()";
  if (typeof val === "number") return Number.isInteger(val) ? "z.number().int()" : "z.number()";
  if (typeof val === "string") {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "z.string().email()";
    if (/^https?:\/\//.test(val)) return "z.string().url()";
    if (/^\d{4}-\d{2}-\d{2}/.test(val)) return "z.string().datetime()";
    return "z.string()";
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return "z.array(z.unknown())";
    const itemType = inferZodType(val[0], indent);
    return `z.array(${itemType})`;
  }

  if (typeof val === "object") {
    const entries = Object.entries(val as Record<string, unknown>);
    if (entries.length === 0) return "z.record(z.unknown())";

    const fields = entries
      .map(([k, v]) => `${nextPad}${JSON.stringify(k)}: ${inferZodType(v, indent + 2)},`)
      .join("\n");

    return `z.object({\n${fields}\n${pad}})`;
  }

  return "z.unknown()";
}

export default function JsonToZodTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: "usr_1001",
        name: "Alex Developer",
        email: "alex@example.com",
        age: 28,
        website: "https://toolsnippet.com",
        isActive: true,
        roles: ["admin", "developer"],
        address: {
          city: "San Francisco",
          zipCode: 94107,
        },
      },
      null,
      2
    )
  );
  const [schemaName, setSchemaName] = useState("userSchema");
  const [typeName, setTypeName] = useState("User");

  const { zodCode, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { zodCode: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const schemaDef = inferZodType(parsed, 0);

      return {
        zodCode:
          `import { z } from "zod";\n\n` +
          `export const ${schemaName} = ${schemaDef};\n\n` +
          `export type ${typeName} = z.infer<typeof ${schemaName}>;`,
        error: "",
      };
    } catch (err: unknown) {
      return {
        zodCode: "",
        error: err instanceof Error ? err.message : "Invalid JSON input",
      };
    }
  }, [jsonInput, schemaName, typeName]);

  return (
    <ToolContainer
      title="JSON to Zod Schema Generator"
      description="Convert JSON objects into strict TypeScript Zod validation schemas with automatic type inference."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="JSON Input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{\n  "name": "John"\n}'
            rows={14}
            error={error}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Schema Constant Name
              </label>
              <input
                type="text"
                value={schemaName}
                onChange={(e) => setSchemaName(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                TypeScript Type Name
              </label>
              <input
                type="text"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated Zod Schema & TypeScript Type"
            readOnly
            copyable
            value={zodCode}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
