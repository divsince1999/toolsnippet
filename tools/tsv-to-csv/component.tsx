"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TsvToCsvTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const convertTsvToCsv = () => {
    try {
      if (!input.trim()) return;

      const lines = input.split("\n");
      const csvLines = lines.map((line) => {
        const parts = line.split("\t");
        return parts
          .map((part) => {
            const clean = part.replace(/"/g, '""');
            return clean.includes(",") || clean.includes('"') || clean.includes("\n")
              ? `"${clean}"`
              : clean;
          })
          .join(",");
      });

      setOutput(csvLines.join("\n"));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
    }
  };

  const convertCsvToTsv = () => {
    try {
      if (!input.trim()) return;

      const lines = input.split("\n");
      const tsvLines = lines.map((line) => {
        // Regex parse CSV row accounting for quotes
        const pattern = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
        const matches: string[] = [];
        let match;
        while ((match = pattern.exec(line)) !== null) {
          let field = match[1];
          if (field === undefined) break;
          if (field.startsWith('"') && field.endsWith('"')) {
            field = field.slice(1, -1).replace(/""/g, '"');
          }
          matches.push(field);
          if (pattern.lastIndex >= line.length) break;
        }
        return matches.length > 0 ? matches.join("\t") : line.split(",").join("\t");
      });

      setOutput(tsvLines.join("\n"));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
    }
  };

  return (
    <ToolContainer
      title="TSV to CSV Converter"
      description="Convert Tab-Separated Values (TSV) to Comma-Separated Values (CSV) and vice-versa."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Data (TSV or CSV)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Name\tAge\tCountry\nAlice\t30\tUSA\nBob\t25\tCanada`}
          rows={8}
          error={error}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={convertTsvToCsv}>TSV → CSV</Button>
          <Button variant="outline" onClick={convertCsvToTsv}>CSV → TSV</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <TextArea
            label="Converted Output"
            readOnly
            copyable
            value={output}
            rows={8}
          />
        )}
      </div>
    </ToolContainer>
  );
}
