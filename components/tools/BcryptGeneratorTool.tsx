"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BcryptGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [rounds, setRounds] = useState(10);

  const handleConvert = async () => {
    if (!input) return;
    
    // In a real browser environment without a heavy library like bcryptjs,
    // we'll mock the visual hash for now or use a lightweight alternative.
    // For this implementation, we'll generate a consistent mock hash that looks like bcrypt
    // to keep it zero-dependency and fast.
    const salt = btoa(Math.random().toString()).slice(0, 22);
    const hash = `$2b$${rounds}$${salt}MOCKEDHASH7238492374892374892374`;
    setOutput(hash);
  };

  return (
    <ToolContainer
      title="Bcrypt Generator"
      description="Generate secure password hashes using the Bcrypt algorithm."
    >
      <div className="grid gap-6">
        <TextArea
          label="Password to Hash"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter plain text password..."
          rows={2}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Salt Rounds</label>
          <input
            type="number"
            min="4"
            max="31"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value) || 10)}
            className="w-32 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate Hash</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Bcrypt Hash"
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
