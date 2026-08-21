"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function inferSqlType(val: unknown, dialect: "postgres" | "mysql" | "sqlite"): string {
  if (val === null || val === undefined) return "TEXT";
  if (typeof val === "boolean") return dialect === "sqlite" ? "INTEGER" : "BOOLEAN";
  if (typeof val === "number") {
    if (Number.isInteger(val)) return dialect === "postgres" ? "BIGINT" : "INT";
    return dialect === "postgres" ? "DOUBLE PRECISION" : "FLOAT";
  }
  if (typeof val === "string") {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(val)) return dialect === "postgres" ? "TIMESTAMPTZ" : "DATETIME";
    if (val.length < 100) return "VARCHAR(255)";
    return "TEXT";
  }
  if (typeof val === "object") {
    if (dialect === "postgres") return "JSONB";
    if (dialect === "mysql") return "JSON";
    return "TEXT";
  }
  return "TEXT";
}

export default function JsonToSqlSchemaTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: 101,
        user_uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        full_name: "John Doe",
        email: "john.doe@example.com",
        age: 32,
        is_verified: true,
        account_balance: 1450.5,
        created_at: "2026-08-19T14:30:00Z",
        preferences: {
          dark_mode: true,
          email_alerts: false,
        },
      },
      null,
      2
    )
  );
  const [tableName, setTableName] = useState("users");
  const [dialect, setDialect] = useState<"postgres" | "mysql" | "sqlite">("postgres");

  const { sqlOutput, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { sqlOutput: "", error: "" };
      let obj = JSON.parse(jsonInput);
      if (Array.isArray(obj)) {
        if (obj.length === 0) return { sqlOutput: "-- Empty JSON array", error: "" };
        obj = obj[0];
      }

      const columns = Object.entries(obj).map(([colName, val]) => {
        const sqlType = inferSqlType(val, dialect);
        const isPrimary = colName === "id" || colName === "_id" ? " PRIMARY KEY" : "";
        return `    ${colName.padEnd(20)} ${sqlType}${isPrimary}`;
      });

      return {
        sqlOutput:
          `-- SQL DDL generated for ${dialect.toUpperCase()}\n` +
          `CREATE TABLE ${tableName || "my_table"} (\n` +
          columns.join(",\n") +
          `\n);`,
        error: "",
      };
    } catch (err: unknown) {
      return { sqlOutput: "", error: err instanceof Error ? err.message : "Invalid JSON input" };
    }
  }, [jsonInput, tableName, dialect]);

  return (
    <ToolContainer
      title="JSON to SQL DDL Table Creator"
      description="Infer SQL column types from JSON objects to generate CREATE TABLE statements for PostgreSQL, MySQL, and SQLite."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="Sample JSON Input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={14}
            error={error}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Table Name
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
                SQL Database Dialect
              </label>
              <select
                value={dialect}
                onChange={(e) => setDialect(e.target.value as typeof dialect)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              >
                <option value="postgres">PostgreSQL</option>
                <option value="mysql">MySQL / MariaDB</option>
                <option value="sqlite">SQLite</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated SQL CREATE TABLE Statement"
            readOnly
            copyable
            value={sqlOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
