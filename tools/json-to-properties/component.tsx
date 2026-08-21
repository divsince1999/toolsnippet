"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function flattenJsonToEntries(obj: unknown, prefix = ""): [string, string][] {
  let entries: [string, string][] = [];

  if (obj === null || obj === undefined) {
    entries.push([prefix, "null"]);
    return entries;
  }

  if (typeof obj === "boolean" || typeof obj === "number" || typeof obj === "string") {
    entries.push([prefix, String(obj)]);
    return entries;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => {
      const arrayKey = prefix ? `${prefix}[${idx}]` : `[${idx}]`;
      entries = entries.concat(flattenJsonToEntries(item, arrayKey));
    });
    return entries;
  }

  if (typeof obj === "object") {
    Object.entries(obj as Record<string, unknown>).forEach(([k, v]) => {
      const nextKey = prefix ? `${prefix}.${k}` : k;
      entries = entries.concat(flattenJsonToEntries(v, nextKey));
    });
    return entries;
  }

  return entries;
}

export default function JsonToPropertiesTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        server: {
          port: 8080,
          host: "127.0.0.1",
          ssl: {
            enabled: true,
          },
        },
        spring: {
          datasource: {
            url: "jdbc:postgresql://localhost:5432/mydb",
            username: "postgres_admin",
            maxPoolSize: 20,
          },
          jpa: {
            showSql: false,
          },
        },
      },
      null,
      2
    )
  );
  const [formatMode, setFormatMode] = useState<"dot" | "env">("dot");

  const { propertiesOutput, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { propertiesOutput: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const entries = flattenJsonToEntries(parsed);

      if (formatMode === "env") {
        return {
          propertiesOutput: entries
            .map(([k, v]) => {
              const envKey = k.replace(/\./g, "_").replace(/\[\d+\]/g, "").toUpperCase();
              return `${envKey}=${v}`;
            })
            .join("\n"),
          error: "",
        };
      }

      return { propertiesOutput: entries.map(([k, v]) => `${k}=${v}`).join("\n"), error: "" };
    } catch (err: unknown) {
      return { propertiesOutput: "", error: err instanceof Error ? err.message : "Error converting JSON to properties" };
    }
  }, [jsonInput, formatMode]);

  return (
    <ToolContainer
      title="JSON to Java .properties / .env Converter"
      description="Flatten nested JSON objects into dot-notated Java .properties or UPPER_SNAKE_CASE .env files."
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
              Properties Formatting Style
            </label>
            <select
              value={formatMode}
              onChange={(e) => setFormatMode(e.target.value as typeof formatMode)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="dot">Standard Java .properties (dot.notation=value)</option>
              <option value="env">Environment File .env (UPPER_SNAKE_CASE=value)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label={formatMode === "dot" ? "Generated Java .properties" : "Generated .env Variables"}
            readOnly
            copyable
            value={propertiesOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
