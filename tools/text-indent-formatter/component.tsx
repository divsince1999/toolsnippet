"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TextIndentFormatterTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [indentType, setIndentType] = useState<"tabs" | "spaces">("spaces");
  const [spaceCount, setSpaceCount] = useState(2);

  const indentString = indentType === "tabs" ? "\t" : " ".repeat(spaceCount);

  const handleIndent = () => {
    if (!input) return;
    const lines = input.split("\n");
    const indented = lines.map((line) => indentString + line).join("\n");
    setInput(indented);
  };

  const handleUnindent = () => {
    if (!input) return;
    const lines = input.split("\n");
    const unindented = lines.map((line) => {
      if (indentType === "tabs") {
        if (line.startsWith("\t")) return line.substring(1);
      } else {
        if (line.startsWith(indentString)) return line.substring(spaceCount);
        // If it starts with some spaces but less than spaceCount, remove what's there
        const match = line.match(/^ +/);
        if (match && match[0].length < spaceCount) {
          return line.substring(match[0].length);
        }
      }
      return line;
    }).join("\n");
    setInput(unindented);
  };

  return (
    <ToolContainer
      title="Text Indent Formatter"
      description="Add or remove indentation from lines of text."
      maxWidth="4xl"
    >
      <div className="mb-4 flex flex-wrap gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <div>
          <label className="block text-sm font-medium mb-1">Indent Type</label>
          <select
            value={indentType}
            onChange={(e) => setIndentType(e.target.value as "tabs" | "spaces")}
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
          >
            <option value="spaces">Spaces</option>
            <option value="tabs">Tabs</option>
          </select>
        </div>
        
        {indentType === "spaces" && (
          <div>
            <label className="block text-sm font-medium mb-1">Space Count</label>
            <select
              value={spaceCount}
              onChange={(e) => setSpaceCount(parseInt(e.target.value))}
              className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value={8}>8 Spaces</option>
            </select>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Text to format</label>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste code or text here..."
          rows={12}
          className="whitespace-pre font-mono text-sm"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleIndent} disabled={!input}>
            Indent (Right)
          </Button>
          <Button variant="secondary" onClick={handleUnindent} disabled={!input}>
            Un-Indent (Left)
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => copyToClipboard(input)} disabled={!input}>
            {isCopied ? "Copied!" : "Copy Output"}
          </Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>
            Clear
          </Button>
        </div>
      </div>
    </ToolContainer>
  );
}
