"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CsvColumnExtractorTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [columnsInput, setColumnsInput] = useState("1");
  const [separator, setSeparator] = useState(",");

  const extractedOutput = useMemo(() => {
    if (!input || input.trim().length === 0) return "";
    
    // Parse indices
    // Example: "1, 3, 4" -> [0, 2, 3]
    const indices = columnsInput
      .split(",")
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n > 0)
      .map(n => n - 1); // convert to 0-indexed

    if (indices.length === 0) return "";

    const lines = input.split("\n");
    return lines
      .map(line => {
        if (line.trim() === "") return "";
        const parts = line.split(separator);
        const extractedParts = indices.map(idx => (idx < parts.length ? parts[idx] : ""));
        return extractedParts.join(separator);
      })
      .filter(line => line !== "")
      .join("\n");

  }, [input, columnsInput, separator]);

  return (
    <ToolContainer
      title="CSV Column Extractor"
      description="Extract or reorder specific columns from CSV or TSV data."
      maxWidth="5xl"
    >
      <div className="mb-4 flex flex-wrap gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <div>
          <label className="block text-sm font-medium mb-1">Columns to Extract (1-indexed)</label>
          <input
            type="text"
            value={columnsInput}
            onChange={(e) => setColumnsInput(e.target.value)}
            placeholder="e.g. 1, 3"
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary font-mono"
          />
          <div className="text-xs text-gray-500 mt-1">Separate with commas. E.g. &quot;1, 3&quot;</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
          >
            <option value=",">Comma (,)</option>
            <option value="	">Tab (\t)</option>
            <option value=";">Semicolon (;)</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Input Data</label>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSV/TSV data here..."
            rows={12}
            className="whitespace-pre font-mono text-sm overflow-auto"
          />
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Extracted Columns</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(extractedOutput)}
              disabled={!extractedOutput}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </label>
          <TextArea 
            value={extractedOutput} 
            readOnly 
            rows={12} 
            className="whitespace-pre font-mono text-sm overflow-auto bg-gray-50 dark:bg-gray-900" 
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="ghost" onClick={clearAll} disabled={!input}>
          Clear Input
        </Button>
      </div>
    </ToolContainer>
  );
}
