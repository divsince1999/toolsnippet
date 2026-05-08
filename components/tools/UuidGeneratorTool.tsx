"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UuidGeneratorTool() {
  const { output, setOutput, copyToClipboard, isCopied, clearAll } = useTool();
  const [count, setCount] = useState(1);

  const generateUuids = () => {
    const uuids = Array.from({ length: Math.min(Math.max(count, 1), 100) }, () =>
      crypto.randomUUID()
    ).join("\n");
    setOutput(uuids);
  };

  return (
    <ToolContainer
      title="UUID Generator"
      description="Generate random UUIDs (v4) for your projects instantly."
    >
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Number of UUIDs</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full max-w-xs rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={generateUuids}>Generate UUIDs</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>

        {output && (
          <TextArea
            label="Generated UUIDs"
            readOnly
            copyable
            value={output}
            rows={Math.min(count, 10)}
          />
        )}
      </div>
    </ToolContainer>
  );
}
