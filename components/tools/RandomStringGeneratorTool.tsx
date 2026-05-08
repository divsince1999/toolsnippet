"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function RandomStringGeneratorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [length, setLength] = useState(16);
  const [charset, setCharset] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");

  const handleGenerate = () => {
    let result = "";
    const charactersLength = charset.length;
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    setOutput(result);
  };

  return (
    <ToolContainer title="Random String Generator" description="Generate secure random strings for tokens, passwords, or IDs.">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">String Length</label>
            <input type="number" min="1" max="1000" value={length} onChange={e => setLength(parseInt(e.target.value) || 1)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Character Set</label>
            <input value={charset} onChange={e => setCharset(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate String</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>
        {output && <TextArea label="Generated String" readOnly copyable value={output} rows={2} />}
      </div>
    </ToolContainer>
  );
}
