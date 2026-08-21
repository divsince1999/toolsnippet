"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MarkdownTableToCsvTool() {
  const [mdInput, setMdInput] = useState(
    `| Name | Role | Department | Salary |\n` +
    `| :--- | :--- | :--- | :--- |\n` +
    `| Alice Smith | Tech Lead | Engineering | $160,000 |\n` +
    `| Bob Jones | Designer | Product | $125,000 |\n` +
    `| Charlie Brown | DevOps | Infrastructure | $145,000 |`
  );
  const [format, setFormat] = useState<"csv" | "tsv">("csv");

  const { outputData, error } = useMemo(() => {
    try {
      if (!mdInput.trim()) return { outputData: "", error: "" };
      const lines = mdInput
        .trim()
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.startsWith("|") && l.endsWith("|"));

      if (lines.length === 0) return { outputData: "", error: "" };

      const parsedRows: string[][] = [];

      lines.forEach((line) => {
        if (/^\|(\s*:?-+:?\s*\|)+$/.test(line)) return;

        const cells = line
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim());

        parsedRows.push(cells);
      });

      const delimiter = format === "tsv" ? "\t" : ",";

      const out = parsedRows
        .map((row) =>
          row
            .map((cell) => {
              if (format === "csv" && (cell.includes(",") || cell.includes('"') || cell.includes("\n"))) {
                return `"${cell.replace(/"/g, '""')}"`;
              }
              return cell;
            })
            .join(delimiter)
        )
        .join("\n");

      return { outputData: out, error: "" };
    } catch (err: unknown) {
      return { outputData: "", error: err instanceof Error ? err.message : "Failed to parse Markdown Table" };
    }
  }, [mdInput, format]);

  return (
    <ToolContainer
      title="Markdown Table to CSV & TSV Converter"
      description="Parse GitHub-Flavored Markdown tables back into comma-separated (CSV) or tab-separated (TSV) spreadsheets."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="Markdown Table Input"
            value={mdInput}
            onChange={(e) => setMdInput(e.target.value)}
            rows={14}
            error={error}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Target Output Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as typeof format)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="csv">Comma-Separated Values (CSV)</option>
              <option value="tsv">Tab-Separated Values (TSV)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label={format === "csv" ? "Generated CSV Spreadsheet" : "Generated TSV Spreadsheet"}
            readOnly
            copyable
            value={outputData}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
