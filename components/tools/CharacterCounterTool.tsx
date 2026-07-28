"use client";

import { useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CharacterCounterTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();

  const metrics = useMemo(() => {
    const charsWithSpaces = input.length;
    const charsNoSpaces = input.replace(/\s/g, "").length;
    const byteSize = new Blob([input]).size;

    const formatBytes = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return {
      charsWithSpaces,
      charsNoSpaces,
      byteSize: formatBytes(byteSize),
    };
  }, [input]);

  const summaryText = `Characters (with spaces): ${metrics.charsWithSpaces}\nCharacters (without spaces): ${metrics.charsNoSpaces}\nEstimated Size: ${metrics.byteSize}`;

  return (
    <ToolContainer
      title="Character Counter"
      description="Count characters with and without spaces, and estimate UTF-8 byte size."
      maxWidth="4xl"
    >
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.charsWithSpaces}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">With Spaces</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.charsNoSpaces}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Without Spaces</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.byteSize}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Byte Size</div>
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
