"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PrefixSuffixAdderTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [skipEmpty, setSkipEmpty] = useState(true);

  const formattedOutput = useMemo(() => {
    if (!input && input.length === 0) return "";

    const lines = input.split("\n");
    return lines
      .map((line) => {
        if (skipEmpty && line.trim() === "") return line;
        return `${prefix}${line}${suffix}`;
      })
      .join("\n");
  }, [input, prefix, suffix, skipEmpty]);

  return (
    <ToolContainer
      title="Prefix & Suffix Adder"
      description="Add a custom prefix or suffix to each line of text."
      maxWidth="5xl"
    >
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <div>
          <label className="block text-sm font-medium mb-1">Prefix (Beginning)</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="e.g. <li>"
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Suffix (End)</label>
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            placeholder="e.g. </li>"
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary font-mono"
          />
        </div>
        <div className="sm:col-span-2">
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
            className="whitespace-pre"
          />
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Result</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(formattedOutput)}
              disabled={!formattedOutput}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </label>
          <TextArea value={formattedOutput} readOnly rows={12} className="whitespace-pre" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="ghost" onClick={clearAll} disabled={!input && !prefix && !suffix}>
          Clear All
        </Button>
      </div>
    </ToolContainer>
  );
}
