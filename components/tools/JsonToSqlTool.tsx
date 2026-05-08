"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToSqlTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [tableName, setTableName] = useState("users");

  const handleConvert = () => {
    try {
      if (!input) return;
      const parsed = JSON.parse(input);
      const data = Array.isArray(parsed) ? parsed : [parsed];
      if (data.length === 0) return;

      const columns = Object.keys(data[0]);
      let sql = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES\n`;

      const values = data.map(row => {
        const rowValues = columns.map(col => {
          const val = row[col];
          return typeof val === "string" ? `'${val.replace(/'/g, "''")}'` : val;
        });
        return `(${rowValues.join(", ")})`;
      });

      sql += values.join(",\n") + ";";
      setOutput(sql);
      setError("");
    } catch (err) {
      setError("Invalid JSON array");
    }
  };

  return (
    <ToolContainer title="JSON to SQL Converter" description="Generate SQL INSERT statements from JSON data.">
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Table Name</label>
          <input value={tableName} onChange={e => setTableName(e.target.value)} className="w-full max-w-xs rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
        </div>
        <TextArea label="Input JSON Array" value={input} onChange={(e) => setInput(e.target.value)} placeholder='[{"name": "John", "age": 30}]' rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to SQL</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="SQL Result" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
