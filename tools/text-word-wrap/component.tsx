"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TextWordWrapTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [columnWidth, setColumnWidth] = useState(80);

  const wrappedOutput = useMemo(() => {
    if (!input || input.length === 0) return "";
    if (columnWidth < 1) return input;

    const wrapLine = (line: string, width: number) => {
      if (line.length <= width) return line;

      let wrapped = "";
      let currentLine = "";
      const words = line.split(" ");

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        // If the word itself is longer than the width, we have to put it on its own line
        // (unless we are aggressively breaking words, which we avoid here for readability)
        if (word.length > width) {
          if (currentLine.length > 0) {
            wrapped += currentLine.trimEnd() + "\n";
            currentLine = "";
          }
          wrapped += word + "\n";
        } else if (currentLine.length + word.length + (currentLine.length > 0 ? 1 : 0) <= width) {
          currentLine += (currentLine.length > 0 ? " " : "") + word;
        } else {
          wrapped += currentLine.trimEnd() + "\n";
          currentLine = word;
        }
      }

      if (currentLine.length > 0) {
        wrapped += currentLine.trimEnd();
      }

      return wrapped;
    };

    const lines = input.split("\n");
    return lines.map((line) => wrapLine(line, columnWidth)).join("\n");
  }, [input, columnWidth]);

  return (
    <ToolContainer
      title="Text Word Wrap"
      description="Wrap text lines at a specified column character width."
      maxWidth="5xl"
    >
      <div className="mb-4 flex flex-wrap gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <div>
          <label className="block text-sm font-medium mb-1">Column Width</label>
          <input
            type="number"
            value={columnWidth}
            onChange={(e) => setColumnWidth(parseInt(e.target.value) || 0)}
            min={1}
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setColumnWidth(60)}>60</Button>
          <Button variant="outline" size="sm" onClick={() => setColumnWidth(80)}>80</Button>
          <Button variant="outline" size="sm" onClick={() => setColumnWidth(100)}>100</Button>
          <Button variant="outline" size="sm" onClick={() => setColumnWidth(120)}>120</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Input Text</label>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your long text here..."
            rows={12}
            className="whitespace-pre font-mono text-sm"
          />
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Wrapped Output</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(wrappedOutput)}
              disabled={!wrappedOutput}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </label>
          <TextArea value={wrappedOutput} readOnly rows={12} className="whitespace-pre font-mono text-sm" />
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
