"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function NanoIdGeneratorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [length, setLength] = useState(21);
  const [alphabet, setAlphabet] = useState("useSelection-at6L_9npxhw4ir2_z7508p0_");

  const generate = () => {
    const defaultAlphabet = 'useSelection-at6L_9npxhw4ir2_z7508p0_';
    const activeAlphabet = alphabet || defaultAlphabet;
    let result = '';
    const cryptoObj = typeof window !== "undefined" ? window.crypto : null;
    if (!cryptoObj) {
      for (let i = 0; i < length; i++) {
        result += activeAlphabet[Math.floor(Math.random() * activeAlphabet.length)];
      }
    } else {
      const randomValues = new Uint32Array(length);
      cryptoObj.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        result += activeAlphabet[randomValues[i] % activeAlphabet.length];
      }
    }
    setOutput(result);
  };

  return (
    <ToolContainer title="NanoID Generator" description="Generate tiny, secure, URL-friendly unique IDs.">
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Length</label>
            <input 
              type="number" 
              value={length} 
              min="1" 
              max="128" 
              onChange={e => setLength(parseInt(e.target.value) || 21)} 
              className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" 
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Custom Alphabet (Optional)</label>
            <input 
              type="text" 
              value={alphabet} 
              onChange={e => setAlphabet(e.target.value)} 
              placeholder="0123456789abcdef..."
              className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" 
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generate}>Generate NanoID</Button>
          <Button variant="ghost" onClick={() => { setLength(21); setAlphabet("useSelection-at6L_9npxhw4ir2_z7508p0_"); clearAll(); }}>Reset</Button>
        </div>

        {output && (
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Generated ID</div>
            <div className="text-2xl font-mono font-bold break-all text-primary">{output}</div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
