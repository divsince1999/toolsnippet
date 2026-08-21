"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function parseCsvRows(csv: string): string[][] {
  const lines = csv.trim().split("\n").filter(Boolean);
  return lines.map((line) => {
    const row: string[] = [];
    let inQuotes = false;
    let current = "";

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(current.trim().replace(/^"|"$/g, ""));
        current = "";
      } else {
        current += char;
      }
    }
    row.push(current.trim().replace(/^"|"$/g, ""));
    return row;
  });
}

export default function CsvToSqlInsertsTool() {
  const [csvInput, setCsvInput] = useState(
    `id,name,email,role,is_active\n` +
    `1,"Alice Smith",alice@example.com,admin,true\n` +
    `2,"Bob Jones",bob@example.com,member,false\n` +
    `3,"Charlie O'Connor",charlie@example.com,developer,true`
  );
  const [tableName, setTableName] = useState("users");
  const [batchMode, setBatchMode] = useState<"individual" | "batch">("batch");

  const { sqlInserts, error } = useMemo(() => {
    try {
      if (!csvInput.trim()) return { sqlInserts: "", error: "" };
      const rows = parseCsvRows(csvInput);
      if (rows.length < 2) return { sqlInserts: "-- Please provide a header row and at least one data row.", error: "" };

      const headers = rows[0].map((h) => h.replace(/[^a-zA-Z0-9_]/g, "_"));
      const dataRows = rows.slice(1);

      const formatValue = (val: string) => {
        if (val === "" || val.toLowerCase() === "null") return "NULL";
        if (val.toLowerCase() === "true") return "TRUE";
        if (val.toLowerCase() === "false") return "FALSE";
        if (!isNaN(Number(val)) && val.trim() !== "") return Number(val);
        return `'${val.replace(/'/g, "''")}'`;
      };

      if (batchMode === "batch") {
        const valueTuples = dataRows
          .map((row) => `  (${row.map(formatValue).join(", ")})`)
          .join(",\n");

        return {
          sqlInserts: `INSERT INTO ${tableName || "my_table"} (${headers.join(", ")})\nVALUES\n${valueTuples};`,
          error: "",
        };
      }

      return {
        sqlInserts: dataRows
          .map((row) => `INSERT INTO ${tableName || "my_table"} (${headers.join(", ")}) VALUES (${row.map(formatValue).join(", ")});`)
          .join("\n"),
        error: "",
      };
    } catch (err: unknown) {
      return { sqlInserts: "", error: err instanceof Error ? err.message : "Error parsing CSV" };
    }
  }, [csvInput, tableName, batchMode]);

  return (
    <ToolContainer
      title="CSV to SQL INSERT Statements Generator"
      description="Convert CSV spreadsheets into batched or single SQL INSERT INTO queries."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="CSV Data (with header row)"
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            rows={14}
            error={error}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Target Table Name
              </label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Query Format
              </label>
              <select
                value={batchMode}
                onChange={(e) => setBatchMode(e.target.value as typeof batchMode)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              >
                <option value="batch">Multi-Row Batch INSERT</option>
                <option value="individual">Individual INSERT Lines</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated SQL INSERT Queries"
            readOnly
            copyable
            value={sqlInserts}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
