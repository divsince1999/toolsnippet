"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function LineNumbererTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [startNumber, setStartNumber] = useState(1);
  const [separator, setSeparator] = useState(". ");
  const [zeroPad, setZeroPad] = useState(true);
  const [skipEmpty, setSkipEmpty] = useState(false);

  const formattedOutput = useMemo(() => {
    if (!input && input.length === 0) return "";

    const lines = input.split("\n");
    let counter = startNumber;

    // Determine max length for padding
    const maxNumber = skipEmpty 
      ? startNumber + lines.filter(l => l.trim().length > 0).length - 1
      : startNumber + lines.length - 1;
      
    const padLength = zeroPad ? maxNumber.toString().length : 0;

    return lines
      .map((line) => {
        if (skipEmpty && line.trim() === "") {
          return line;
        }
        
        const numStr = counter.toString().padStart(padLength, "0");
        counter++;
        return `${numStr}${separator}${line}`;
      })
      .join("\n");
  }, [input, startNumber, separator, zeroPad, skipEmpty]);

  return (
    <ToolContainer
      title="Line Numberer"
      description="Add line numbers to text lines with customizable format."
      maxWidth="5xl"
    >
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <div>
          <label className="block text-sm font-medium mb-1">Start Number</label>
          <input
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(parseInt(e.target.value) || 0)}
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
          >
            <option value=". ">. (Dot space)</option>
            <option value=") ">) (Bracket space)</option>
            <option value=": ">: (Colon space)</option>
            <option value=" | "> | (Pipe)</option>
            <option value=" "> (Space)</option>
            <option value="	"> (Tab)</option>
          </select>
        </div>
        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={zeroPad}
              onChange={(e) => setZeroPad(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Zero Padding
          </label>
        </div>
        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={skipEmpty}
              onChange={(e) => setSkipEmpty(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Skip empty lines
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Input Lines</label>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your lines here..."
            rows={12}
            className="whitespace-pre font-mono text-sm"
          />
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Numbered Output</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(formattedOutput)}
              disabled={!formattedOutput}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </label>
          <TextArea value={formattedOutput} readOnly rows={12} className="whitespace-pre font-mono text-sm" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="ghost" onClick={clearAll} disabled={!input}>
          Clear All
        </Button>
      </div>
    </ToolContainer>
  );
}
