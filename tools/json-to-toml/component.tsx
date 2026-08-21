"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function formatTomlValue(val: unknown): string {
  if (typeof val === "string") return JSON.stringify(val);
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  if (Array.isArray(val)) {
    return `[${val.map(formatTomlValue).join(", ")}]`;
  }
  return '""';
}

function jsonToToml(obj: Record<string, unknown>, prefix = ""): string {
  let toml = "";
  const nestedObjects: [string, Record<string, unknown>][] = [];

  Object.entries(obj).forEach(([key, val]) => {
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      nestedObjects.push([key, val as Record<string, unknown>]);
    } else {
      toml += `${key} = ${formatTomlValue(val)}\n`;
    }
  });

  nestedObjects.forEach(([subKey, subObj]) => {
    const fullSection = prefix ? `${prefix}.${subKey}` : subKey;
    toml += `\n[${fullSection}]\n`;
    toml += jsonToToml(subObj, fullSection);
  });

  return toml;
}

export default function JsonToTomlTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        title: "TOML Configuration Example",
        owner: {
          name: "Tom Preston-Werner",
          organization: "GitHub",
          active: true,
        },
        database: {
          server: "192.168.1.1",
          ports: [8001, 8001, 8002],
          connection_max: 5000,
          enabled: true,
        },
      },
      null,
      2
    )
  );

  const { tomlOutput, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { tomlOutput: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        throw new Error("Top-level JSON must be an object");
      }

      return { tomlOutput: jsonToToml(parsed).trim(), error: "" };
    } catch (err: unknown) {
      return { tomlOutput: "", error: err instanceof Error ? err.message : "Error converting JSON to TOML" };
    }
  }, [jsonInput]);

  return (
    <ToolContainer
      title="JSON to TOML Converter"
      description="Convert JSON objects into clean, formatted TOML configuration files."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="JSON Input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={15}
            error={error}
          />
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated TOML Document"
            readOnly
            copyable
            value={tomlOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
