"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TextSorterTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [sortMethod, setSortMethod] = useState<"a-z" | "z-a" | "length-asc" | "length-desc" | "numeric">("a-z");
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);

  const sortedOutput = useMemo(() => {
    if (!input) return "";

    let lines = input.split("\n");

    if (removeDuplicates) {
      if (ignoreCase) {
        const seen = new Set();
        lines = lines.filter((line) => {
          const lower = line.toLowerCase();
          if (seen.has(lower)) return false;
          seen.add(lower);
          return true;
        });
      } else {
        lines = Array.from(new Set(lines));
      }
    }

    lines.sort((a, b) => {
      const valA = ignoreCase ? a.toLowerCase() : a;
      const valB = ignoreCase ? b.toLowerCase() : b;

      switch (sortMethod) {
        case "a-z":
          return valA.localeCompare(valB);
        case "z-a":
          return valB.localeCompare(valA);
        case "length-asc":
          return a.length - b.length || valA.localeCompare(valB);
        case "length-desc":
          return b.length - a.length || valB.localeCompare(valA);
        case "numeric": {
          const numA = parseFloat(a.replace(/[^0-9.-]+/g, "")) || 0;
          const numB = parseFloat(b.replace(/[^0-9.-]+/g, "")) || 0;
          return numA - numB;
        }
        default:
          return 0;
      }
    });

    return lines.join("\n");
  }, [input, sortMethod, ignoreCase, removeDuplicates]);

  return (
    <ToolContainer
      title="Text Sorter"
      description="Sort text lines alphabetically, numerically, or by length."
      maxWidth="5xl"
    >
      <div className="mb-4 flex flex-col md:flex-row gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Sorting Method</label>
          <select
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value as any)}
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
          >
            <option value="a-z">Alphabetical (A-Z)</option>
            <option value="z-a">Alphabetical (Z-A)</option>
            <option value="length-asc">Length (Short to Long)</option>
            <option value="length-desc">Length (Long to Short)</option>
            <option value="numeric">Numeric</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 justify-end">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
              disabled={sortMethod === "numeric"}
            />
            Ignore Case
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Remove Duplicates
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Unsorted List</label>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your list here..."
            rows={12}
          />
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Sorted Output</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(sortedOutput)}
              disabled={!sortedOutput}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </label>
          <TextArea value={sortedOutput} readOnly rows={12} />
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
