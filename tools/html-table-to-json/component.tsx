"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtmlTableToJsonTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const convertTable = () => {
    try {
      if (!input.trim()) return;

      if (typeof window === "undefined") return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/html");
      const table = doc.querySelector("table");

      if (!table) {
        throw new Error("No <table> tag found in the provided HTML.");
      }

      const headers: string[] = [];
      const headerElements = table.querySelectorAll("thead th, tr:first-child th, tr:first-child td");

      headerElements.forEach((el, index) => {
        const text = el.textContent?.trim() || `column_${index + 1}`;
        headers.push(text);
      });

      const rows: Record<string, string>[] = [];
      const trElements = table.querySelectorAll("tbody tr, tr");

      trElements.forEach((tr, rowIndex) => {
        // Skip header row if it contains <th>
        if (tr.querySelector("th") && rowIndex === 0) return;

        const cells = tr.querySelectorAll("td");
        if (cells.length === 0) return;

        const rowObj: Record<string, string> = {};
        cells.forEach((cell, cellIndex) => {
          const key = headers[cellIndex] || `col_${cellIndex + 1}`;
          rowObj[key] = cell.textContent?.trim() || "";
        });

        if (Object.keys(rowObj).length > 0) {
          rows.push(rowObj);
        }
      });

      setOutput(JSON.stringify(rows, null, 2));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to parse HTML table.");
    }
  };

  return (
    <ToolContainer
      title="HTML Table to JSON Converter"
      description="Extract and convert HTML table data into clean, structured JSON arrays."
    >
      <div className="grid gap-6">
        <TextArea
          label="HTML Table Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`<table>\n  <thead>\n    <tr><th>Name</th><th>Role</th><th>Country</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>Developer</td><td>USA</td></tr>\n    <tr><td>Bob</td><td>Designer</td><td>Canada</td></tr>\n  </tbody>\n</table>`}
          rows={10}
          error={error}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={convertTable}>Convert Table to JSON</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <TextArea
            label="JSON Output"
            readOnly
            copyable
            value={output}
            rows={12}
          />
        )}
      </div>
    </ToolContainer>
  );
}
