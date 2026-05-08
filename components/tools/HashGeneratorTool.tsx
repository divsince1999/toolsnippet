"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HashGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-1" | "SHA-512">("SHA-256");

  const generateHash = async () => {
    if (!input) return;
    const msgUint8 = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setOutput(hashHex);
  };

  return (
    <ToolContainer
      title="Hash Generator"
      description="Generate secure cryptographic hashes (SHA-256, SHA-1, SHA-512)."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          rows={4}
        />

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as any)}
              className="w-40 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
            >
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-1">SHA-1</option>
              <option value="SHA-512">SHA-512</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={generateHash}>Generate Hash</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>Clear</Button>
          </div>
        </div>

        {output && (
          <TextArea
            label={`Generated ${algorithm} Hash`}
            readOnly
            copyable
            value={output}
            rows={2}
          />
        )}
      </div>
    </ToolContainer>
  );
}
