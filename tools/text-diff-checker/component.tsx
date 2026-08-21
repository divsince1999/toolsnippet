"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TextDiffCheckerTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  const diffResult = useMemo(() => {
    if (!original && !modified) return [];

    const origLines = original.split("\n");
    const modLines = modified.split("\n");
    const result = [];

    // Simple line-by-line diff without a heavy external library
    // This isn't a Myers diff algorithm, just a basic exact-match scan for simple text comparison.
    let origIdx = 0;
    let modIdx = 0;

    while (origIdx < origLines.length || modIdx < modLines.length) {
      if (origIdx >= origLines.length) {
        result.push({ type: "added", line: modLines[modIdx], num: modIdx + 1 });
        modIdx++;
      } else if (modIdx >= modLines.length) {
        result.push({ type: "removed", line: origLines[origIdx], num: origIdx + 1 });
        origIdx++;
      } else if (origLines[origIdx] === modLines[modIdx]) {
        result.push({ type: "unchanged", line: origLines[origIdx], num: origIdx + 1 });
        origIdx++;
        modIdx++;
      } else {
        // Look ahead in modified for original line
        const lookAheadMod = modLines.indexOf(origLines[origIdx], modIdx);
        // Look ahead in original for modified line
        const lookAheadOrig = origLines.indexOf(modLines[modIdx], origIdx);

        if (lookAheadMod !== -1 && (lookAheadOrig === -1 || lookAheadMod - modIdx < lookAheadOrig - origIdx)) {
          // Lines were added
          while (modIdx < lookAheadMod) {
            result.push({ type: "added", line: modLines[modIdx], num: modIdx + 1 });
            modIdx++;
          }
        } else if (lookAheadOrig !== -1) {
          // Lines were removed
          while (origIdx < lookAheadOrig) {
            result.push({ type: "removed", line: origLines[origIdx], num: origIdx + 1 });
            origIdx++;
          }
        } else {
          // Both changed
          result.push({ type: "removed", line: origLines[origIdx], num: origIdx + 1 });
          result.push({ type: "added", line: modLines[modIdx], num: modIdx + 1 });
          origIdx++;
          modIdx++;
        }
      }
    }

    return result;
  }, [original, modified]);

  return (
    <ToolContainer
      title="Text Diff Checker"
      description="Compare two texts side-by-side to highlight line differences."
      maxWidth="6xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="mb-2 flex justify-between text-sm font-medium">
            <span>Original Text</span>
            <Button variant="ghost" size="sm" onClick={() => setOriginal("")} disabled={!original}>
              Clear
            </Button>
          </label>
          <TextArea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
            rows={10}
            className="font-mono text-sm whitespace-pre"
          />
        </div>
        <div>
          <label className="mb-2 flex justify-between text-sm font-medium">
            <span>Modified Text</span>
            <Button variant="ghost" size="sm" onClick={() => setModified("")} disabled={!modified}>
              Clear
            </Button>
          </label>
          <TextArea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
            rows={10}
            className="font-mono text-sm whitespace-pre"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="mb-4 block text-lg font-semibold border-b border-black/10 dark:border-white/10 pb-2">
          Difference Viewer
        </label>
        
        {diffResult.length > 0 ? (
          <div className="bg-[#f8f9fa] dark:bg-[#1e1e1e] border border-black/10 dark:border-white/10 rounded-lg overflow-x-auto font-mono text-sm">
            {diffResult.map((item, index) => (
              <div
                key={index}
                className={`flex whitespace-pre px-4 py-0.5 ${
                  item.type === "added"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300"
                    : item.type === "removed"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-300 line-through opacity-70"
                    : "text-gray-800 dark:text-gray-300"
                }`}
              >
                <div className="w-10 text-right pr-4 select-none opacity-50 border-r border-black/10 dark:border-white/10 mr-4">
                  {item.num}
                </div>
                <div className="flex-1 overflow-wrap break-word">
                  {item.type === "added" && "+ "}
                  {item.type === "removed" && "- "}
                  {item.type === "unchanged" && "  "}
                  {item.line || " "}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-500 bg-black/5 dark:bg-white/5 rounded-lg border border-dashed border-black/20 dark:border-white/20">
            Paste text in both fields above to see the differences.
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
