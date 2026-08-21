"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function parseTomlValue(valStr: string): unknown {
  const v = valStr.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (!isNaN(Number(v)) && v !== "") return Number(v);
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  if (v.startsWith("[") && v.endsWith("]")) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((item) => parseTomlValue(item));
  }
  return v;
}

function parseToml(tomlStr: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  let currentSection = result;
  const lines = tomlStr.split("\n");

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const sectionMatch = trimmed.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      const parts = sectionMatch[1].split(".");
      let target = result;
      parts.forEach((p) => {
        if (!target[p] || typeof target[p] !== "object") {
          target[p] = {};
        }
        target = target[p] as Record<string, unknown>;
      });
      currentSection = target;
      return;
    }

    const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      const rawVal = kvMatch[2].trim();
      currentSection[key] = parseTomlValue(rawVal);
    }
  });

  return result;
}

export default function TomlToJsonTool() {
  const [tomlInput, setTomlInput] = useState(
    `# Cargo.toml Package Definition\n` +
    `[package]\n` +
    `name = "toolsnippet-core"\n` +
    `version = "0.2.1"\n` +
    `edition = "2021"\n` +
    `authors = ["Alex Developer <alex@toolsnippet.com>"]\n\n` +
    `[dependencies]\n` +
    `serde = "1.0"\n` +
    `serde_json = "1.0"\n` +
    `tokio = "1.38"`
  );

  const { jsonOutput, error } = useMemo(() => {
    try {
      if (!tomlInput.trim()) return { jsonOutput: "", error: "" };
      const parsed = parseToml(tomlInput);
      return { jsonOutput: JSON.stringify(parsed, null, 2), error: "" };
    } catch (err: unknown) {
      return { jsonOutput: "", error: err instanceof Error ? err.message : "Error parsing TOML" };
    }
  }, [tomlInput]);

  return (
    <ToolContainer
      title="TOML to JSON Converter"
      description="Parse Cargo, PyProject, and generic TOML configuration files into clean structured JSON."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="TOML Document Input"
            value={tomlInput}
            onChange={(e) => setTomlInput(e.target.value)}
            rows={15}
            error={error}
          />
        </div>

        <div className="space-y-4">
          <TextArea
            label="Converted JSON Output"
            readOnly
            copyable
            value={jsonOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
