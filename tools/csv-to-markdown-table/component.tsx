"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function parseCsv(csv: string): string[][] {
  return csv
    .trim()
    .split("\n")
    .map((line) => line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, "")));
}

export default function CsvToMarkdownTableTool() {
  const [csvInput, setCsvInput] = useState(
    `Product Name,Category,Price,In Stock\n` +
    `Mechanical Keyboard,Electronics,$129.99,Yes\n` +
    `Ergonomic Mouse,Accessories,$79.50,Yes\n` +
    `USB-C Hub,Adapters,$45.00,No`
  );
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");

  const { markdownOutput, error } = useMemo(() => {
    try {
      if (!csvInput.trim()) return { markdownOutput: "", error: "" };
      const rows = parseCsv(csvInput);
      if (rows.length < 1) return { markdownOutput: "", error: "" };

      const headers = rows[0];
      const dataRows = rows.slice(1);

      let sep = "---";
      if (alignment === "center") sep = ":---:";
      else if (alignment === "right") sep = "---:";
      else sep = ":---";

      const headerLine = `| ${headers.join(" | ")} |`;
      const sepLine = `| ${headers.map(() => sep).join(" | ")} |`;
      const dataLines = dataRows.map((r) => `| ${r.join(" | ")} |`);

      return { markdownOutput: [headerLine, sepLine, ...dataLines].join("\n"), error: "" };
    } catch (err: unknown) {
      return { markdownOutput: "", error: err instanceof Error ? err.message : "Failed to parse CSV" };
    }
  }, [csvInput, alignment]);

  return (
    <ToolContainer
      title="CSV to Markdown Table Converter"
      description="Convert CSV and TSV spreadsheet data into clean GitHub-Flavored Markdown tables."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="CSV Data"
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            rows={14}
            error={error}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Column Alignment
            </label>
            <select
              value={alignment}
              onChange={(e) => setAlignment(e.target.value as typeof alignment)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="left">Left Aligned (:---)</option>
              <option value="center">Center Aligned (:---:)</option>
              <option value="right">Right Aligned (---:)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated Markdown Table"
            readOnly
            copyable
            value={markdownOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
