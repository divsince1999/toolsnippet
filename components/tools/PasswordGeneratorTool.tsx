"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PasswordGeneratorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [length, setLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);

  const handleGenerate = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
      (includeNumbers ? "0123456789" : "") + 
      (includeSymbols ? "!@#$%^&*()_+~`|}{[]:;?><,./-=" : "");
    let retVal = "";
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setOutput(retVal);
  };

  return (
    <ToolContainer title="Password Generator" description="Generate secure and random passwords.">
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Length</label>
            <input type="number" min="4" max="128" value={length} onChange={(e) => setLength(parseInt(e.target.value) || 16)} className="w-24 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex items-center gap-2 pt-8">
            <input type="checkbox" id="numbers" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            <label htmlFor="numbers" className="text-sm">Include Numbers</label>
          </div>
          <div className="flex items-center gap-2 pt-8">
            <input type="checkbox" id="symbols" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
            <label htmlFor="symbols" className="text-sm">Include Symbols</label>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Password</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>
        {output && <TextArea label="Generated Password" readOnly copyable value={output} rows={1} />}
      </div>
    </ToolContainer>
  );
}
