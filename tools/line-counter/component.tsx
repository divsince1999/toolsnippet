"use client";

import { useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function LineCounterTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();

  const metrics = useMemo(() => {
    if (!input && input.length === 0) {
      return { total: 0, empty: 0, nonEmpty: 0 };
    }
    const lines = input.split("\n");
    const total = lines.length;
    let empty = 0;
    let nonEmpty = 0;

    for (const line of lines) {
      if (line.trim().length === 0) {
        empty++;
      } else {
        nonEmpty++;
      }
    }

    return { total, empty, nonEmpty };
  }, [input]);

  const summaryText = `Total Lines: ${metrics.total}\nEmpty Lines: ${metrics.empty}\nNon-Empty Lines: ${metrics.nonEmpty}`;

  return (
    <ToolContainer
      title="Line Counter"
      description="Count total lines, empty lines, and non-empty lines instantly."
      maxWidth="4xl"
    >
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.total}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Lines</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.empty}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Empty Lines</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.nonEmpty}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Non-Empty Lines</div>
        </div>
      </div>

      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste your text here..."
        rows={10}
      />

      <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => copyToClipboard(summaryText)} disabled={!input}>
            {isCopied ? "Copied Summary!" : "Copy Summary"}
          </Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>
            Clear
          </Button>
        </div>
      </div>
    </ToolContainer>
  );
}
