"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function parsePropertiesToJson(text: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = text.split("\n");

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("!")) return;

    const match = trimmed.match(/^([^=:]+)[=:](.*)$/);
    if (!match) return;

    const rawKey = match[1].trim();
    let valStr = match[2].trim();

    if ((valStr.startsWith('"') && valStr.endsWith('"')) || (valStr.startsWith("'") && valStr.endsWith("'"))) {
      valStr = valStr.slice(1, -1);
    }

    let parsedVal: unknown = valStr;
    if (valStr === "true") parsedVal = true;
    else if (valStr === "false") parsedVal = false;
    else if (valStr === "null") parsedVal = null;
    else if (!isNaN(Number(valStr)) && valStr !== "") parsedVal = Number(valStr);

    const path = rawKey.split(".");
    let current = result;

    for (let i = 0; i < path.length - 1; i++) {
      const part = path[i];
      if (!current[part] || typeof current[part] !== "object") {
        current[part] = {};
      }
      current = current[part] as Record<string, unknown>;
    }

    current[path[path.length - 1]] = parsedVal;
  });

  return result;
}

export default function PropertiesToJsonTool() {
  const [propInput, setPropInput] = useState(
    `# Application Configuration Properties\n` +
    `server.port=8080\n` +
    `server.host=127.0.0.1\n` +
    `server.ssl.enabled=true\n\n` +
    `# Database settings\n` +
    `spring.datasource.url=jdbc:postgresql://localhost:5432/mydb\n` +
    `spring.datasource.username=postgres_admin\n` +
    `spring.datasource.max-pool-size=20\n` +
    `spring.jpa.show-sql=false`
  );

  const { jsonOutput, error } = useMemo(() => {
    try {
      if (!propInput.trim()) return { jsonOutput: "", error: "" };
      const parsed = parsePropertiesToJson(propInput);
      return { jsonOutput: JSON.stringify(parsed, null, 2), error: "" };
    } catch (err: unknown) {
      return { jsonOutput: "", error: err instanceof Error ? err.message : "Error converting properties to JSON" };
    }
  }, [propInput]);

  return (
    <ToolContainer
      title="Java .properties / .env to JSON Converter"
      description="Convert dot-notated Java .properties configuration files and .env variables into nested JSON."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label=".properties / .env Content"
            value={propInput}
            onChange={(e) => setPropInput(e.target.value)}
            rows={15}
            error={error}
          />
        </div>

        <div className="space-y-4">
          <TextArea
            label="Converted Nested JSON Object"
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
