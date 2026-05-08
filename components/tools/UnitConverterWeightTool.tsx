"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const UNITS: Record<string, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
  ton: 1000,
};

export default function UnitConverterWeightTool() {
  const { output, setOutput, clearAll } = useTool();
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("kg");
  const [to, setTo] = useState("lb");

  const handleConvert = () => {
    const result = (value * UNITS[from]) / UNITS[to];
    setOutput(`${value} ${from} = ${result.toFixed(4)} ${to}`);
  };

  return (
    <ToolContainer title="Weight Unit Converter" description="Convert between kilograms, pounds, and other mass units.">
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Value</label>
            <input type="number" value={value} onChange={e => setValue(parseFloat(e.target.value) || 0)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">From</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20">
              {Object.keys(UNITS).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">To</label>
            <select value={to} onChange={e => setTo(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20">
              {Object.keys(UNITS).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button variant="ghost" onClick={() => { setValue(1); clearAll(); }}>Reset</Button>
        </div>
        {output && <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center font-bold text-lg">{output}</div>}
      </div>
    </ToolContainer>
  );
}
