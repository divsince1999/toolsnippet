"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function RandomNumberGeneratorTool() {
  const { output, setOutput, clearAll } = useTool<number[]>();
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);

  function generate() {
    const results: number[] = [];
    const range = max - min + 1;
    
    if (unique && count > range) {
      alert("Count cannot be larger than range for unique numbers.");
      return;
    }

    while (results.length < count) {
      const cryptoObj = typeof window !== "undefined" ? window.crypto : null;
      if (!cryptoObj) {
        // Fallback for non-browser or insecure context
        results.push(Math.floor(Math.random() * range) + min);
        continue;
      }
      const array = new Uint32Array(1);
      cryptoObj.getRandomValues(array);
      const val = min + (array[0] % range);
      
      if (!unique || !results.includes(val)) {
        results.push(val);
      }
    }
    setOutput(results);
  }

  return (
    <ToolContainer title="Random Number Generator" description="Generate secure random numbers in a range.">
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Min</label>
            <input type="number" value={min} onChange={e => setMin(parseInt(e.target.value) || 0)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Max</label>
            <input type="number" value={max} onChange={e => setMax(parseInt(e.target.value) || 0)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Count</label>
            <input type="number" value={count} min="1" max="1000" onChange={e => setCount(parseInt(e.target.value) || 1)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="unique" checked={unique} onChange={e => setUnique(e.target.checked)} className="h-4 w-4 rounded border-black/15 accent-primary" />
          <label htmlFor="unique" className="text-sm font-medium cursor-pointer">Unique Numbers Only</label>
        </div>

        <div className="flex gap-2">
          <Button onClick={generate}>Generate</Button>
          <Button variant="ghost" onClick={() => { setMin(1); setMax(100); setCount(1); clearAll(); }}>Reset</Button>
        </div>

        {output && (
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {output.map((num: number, i: number) => (
                <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center font-bold text-lg border border-black/5 dark:border-white/5">
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
