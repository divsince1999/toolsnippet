"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function toPascalCase(str: string): string {
  return str.replace(/(^|_|-|\s)(\w)/g, (_, __, c) => c.toUpperCase());
}

function inferGraphqlType(val: unknown, key: string, types: string[]): string {
  if (val === null || val === undefined) return "String";
  if (typeof val === "boolean") return "Boolean!";
  if (typeof val === "number") return Number.isInteger(val) ? (key.toLowerCase().endsWith("id") ? "ID!" : "Int!") : "Float!";
  if (typeof val === "string") return key.toLowerCase() === "id" ? "ID!" : "String!";

  if (Array.isArray(val)) {
    if (val.length === 0) return "[String!]!";
    const itemType = inferGraphqlType(val[0], `${key}Item`, types);
    return `[${itemType}]!`;
  }

  if (typeof val === "object") {
    const typeName = toPascalCase(key);
    generateGraphqlType(val as Record<string, unknown>, typeName, types);
    return `${typeName}!`;
  }

  return "String";
}

function generateGraphqlType(obj: Record<string, unknown>, typeName: string, types: string[]): void {
  const fields = Object.entries(obj).map(([k, v]) => {
    const gqlType = inferGraphqlType(v, k, types);
    return `  ${k}: ${gqlType}`;
  });

  const typeDef = `type ${typeName} {\n${fields.join("\n")}\n}`;
  types.unshift(typeDef);
}

export default function JsonToGraphqlSchemaTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: "usr_1001",
        name: "GraphQL Master",
        email: "graphql@example.com",
        age: 30,
        isActive: true,
        rating: 4.85,
        tags: ["api", "schema", "graphql"],
        organization: {
          id: "org_99",
          orgName: "Apollo Labs",
        },
      },
      null,
      2
    )
  );
  const [rootType, setRootType] = useState("User");

  const { schemaOutput, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { schemaOutput: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const types: string[] = [];

      generateGraphqlType(parsed, rootType || "RootType", types);
      return { schemaOutput: types.join("\n\n"), error: "" };
    } catch (err: unknown) {
      return { schemaOutput: "", error: err instanceof Error ? err.message : "Invalid JSON input" };
    }
  }, [jsonInput, rootType]);

  return (
    <ToolContainer
      title="JSON to GraphQL Schema Generator"
      description="Convert JSON sample responses into GraphQL SDL type definitions with scalar types and nullability flags."
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
              Root GraphQL Type Name
            </label>
            <input
              type="text"
              value={rootType}
              onChange={(e) => setRootType(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated GraphQL SDL Schema"
            readOnly
            copyable
            value={schemaOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
