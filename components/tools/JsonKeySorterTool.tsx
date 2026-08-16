"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonKeySorterTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [indent, setIndent] = useState<number>(2);

  const sortKeysRecursively = (obj: unknown, sortOrder: "asc" | "desc"): unknown => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => sortKeysRecursively(item, sortOrder));
    }

    const sortedObj: Record<string, unknown> = {};
    const keys = Object.keys(obj as Record<string, unknown>);

    keys.sort((a, b) => (sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)));

    for (const key of keys) {
      sortedObj[key] = sortKeysRecursively((obj as Record<string, unknown>)[key], sortOrder);
    }

    return sortedObj;
  };

  const handleSort = () => {
    try {
      if (!input.trim()) return;

      const parsed = JSON.parse(input);
      const sorted = sortKeysRecursively(parsed, order);
      setOutput(JSON.stringify(sorted, null, indent));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid JSON input.");
    }
  };

  return (
    <ToolContainer
      title="JSON Key Alphabetical Sorter"
      description="Recursively sort all JSON keys alphabetically (A-Z or Z-A) for clean git diffs and schema consistency."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input JSON"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`{\n  "zebra": 1,\n  "apple": 2,\n  "banana": {"c": 3, "a": 4}\n}`}
          rows={8}
          error={error}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Order:</label>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
                className="rounded-md border border-black/15 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              >
                <option value="asc">A to Z (Ascending)</option>
                <option value="desc">Z to A (Descending)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Indentation:</label>
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value))}
                className="rounded-md border border-black/15 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSort}>Sort JSON Keys</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <TextArea
            label="Sorted JSON Output"
            readOnly
            copyable
            value={output}
            rows={10}
          />
        )}
      </div>
    </ToolContainer>
  );
}
