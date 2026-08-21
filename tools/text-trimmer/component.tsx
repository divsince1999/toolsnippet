"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TextTrimmerTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [trimLeading, setTrimLeading] = useState(true);
  const [trimTrailing, setTrimTrailing] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(false);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);

  const trimmedOutput = useMemo(() => {
    if (!input) return "";

    let lines = input.split("\n");

    if (trimLeading || trimTrailing) {
      lines = lines.map((line) => {
        let l = line;
        if (trimLeading) l = l.replace(/^\s+/, "");
        if (trimTrailing) l = l.replace(/\s+$/, "");
        return l;
      });
    }

    if (collapseSpaces) {
      lines = lines.map((line) => line.replace(/[ \t]{2,}/g, " "));
    }

    if (removeEmptyLines) {
      lines = lines.filter((line) => line.trim().length > 0);
    }

    return lines.join("\n");
  }, [input, trimLeading, trimTrailing, collapseSpaces, removeEmptyLines]);

  return (
    <ToolContainer
      title="Text Trimmer"
      description="Remove leading, trailing, and extra whitespace from text."
      maxWidth="5xl"
    >
      <div className="mb-4 flex flex-wrap gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimLeading}
            onChange={(e) => setTrimLeading(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Trim Leading Spaces
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimTrailing}
            onChange={(e) => setTrimTrailing(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Trim Trailing Spaces
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={collapseSpaces}
            onChange={(e) => setCollapseSpaces(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Collapse Extra Spaces
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeEmptyLines}
            onChange={(e) => setRemoveEmptyLines(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Remove Empty Lines
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Input Text</label>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with messy whitespace here..."
            rows={12}
          />
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Trimmed Output</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(trimmedOutput)}
              disabled={!trimmedOutput}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </label>
          <TextArea value={trimmedOutput} readOnly rows={12} />
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
