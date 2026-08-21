"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function inferJsonSchema(val: unknown, requireAll = true): Record<string, unknown> {
  if (val === null) return { type: "null" };
  if (typeof val === "boolean") return { type: "boolean" };
  if (typeof val === "number") return { type: Number.isInteger(val) ? "integer" : "number" };
  if (typeof val === "string") {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return { type: "string", format: "email" };
    if (/^https?:\/\//.test(val)) return { type: "string", format: "uri" };
    if (/^\d{4}-\d{2}-\d{2}/.test(val)) return { type: "string", format: "date-time" };
    return { type: "string" };
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return { type: "array", items: {} };
    return {
      type: "array",
      items: inferJsonSchema(val[0], requireAll),
    };
  }

  if (typeof val === "object") {
    const props: Record<string, unknown> = {};
    const required: string[] = [];

    Object.entries(val as Record<string, unknown>).forEach(([k, v]) => {
      props[k] = inferJsonSchema(v, requireAll);
      if (requireAll) required.push(k);
    });

    return {
      type: "object",
      properties: props,
      ...(required.length > 0 ? { required } : {}),
      additionalProperties: false,
    };
  }

  return {};
}

export default function JsonToJsonSchemaTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: 101,
        title: "Product Launch",
        price: 99.95,
        inStock: true,
        tags: ["tech", "gadget"],
        vendor: {
          name: "Acme Corp",
          contactEmail: "support@acme.com",
        },
      },
      null,
      2
    )
  );
  const [schemaDraft, setSchemaDraft] = useState<"draft-07" | "2020-12">("draft-07");
  const [requireAll, setRequireAll] = useState(true);

  const { schemaOutput, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { schemaOutput: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const schemaDef = inferJsonSchema(parsed, requireAll);

      const fullSchema = {
        $schema: schemaDraft === "draft-07" ? "http://json-schema.org/draft-07/schema#" : "https://json-schema.org/draft/2020-12/schema",
        title: "GeneratedSchema",
        ...schemaDef,
      };

      return { schemaOutput: JSON.stringify(fullSchema, null, 2), error: "" };
    } catch (err: unknown) {
      return { schemaOutput: "", error: err instanceof Error ? err.message : "Invalid JSON input" };
    }
  }, [jsonInput, schemaDraft, requireAll]);

  return (
    <ToolContainer
      title="JSON to JSON Schema Generator"
      description="Generate standard Draft-07 and 2020-12 JSON Schema specifications from sample JSON objects."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="JSON Sample Payload"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{\n  "name": "example"\n}'
            rows={14}
            error={error}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                JSON Schema Specification
              </label>
              <select
                value={schemaDraft}
                onChange={(e) => setSchemaDraft(e.target.value as typeof schemaDraft)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              >
                <option value="draft-07">Draft-07 (Most Compatible)</option>
                <option value="2020-12">2020-12 (Modern Specification)</option>
              </select>
            </div>

            <div className="flex items-end pb-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={requireAll}
                  onChange={(e) => setRequireAll(e.target.checked)}
                  className="rounded text-primary"
                />
                <span>Set All Fields as Required</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated JSON Schema (Specification)"
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
