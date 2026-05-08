"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function RgbToHexTool() {
  const { output, setOutput, clearAll } = useTool();
  const [r, setR] = useState(255);
  const [g, setG] = useState(255);
  const [b, setB] = useState(255);

  const handleConvert = () => {
    const toHex = (c: number) => {
      const hex = Math.max(0, Math.min(255, c)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    const hex = "#" + toHex(r) + toHex(g) + toHex(b);
    setOutput(hex.toUpperCase());
  };

  return (
    <ToolContainer title="RGB to HEX Converter" description="Convert RGB colors to HEX codes.">
      <div className="grid gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Red</label>
            <input type="number" min="0" max="255" value={r} onChange={(e) => setR(parseInt(e.target.value) || 0)} className="w-24 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Green</label>
            <input type="number" min="0" max="255" value={g} onChange={(e) => setG(parseInt(e.target.value) || 0)} className="w-24 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Blue</label>
            <input type="number" min="0" max="255" value={b} onChange={(e) => setB(parseInt(e.target.value) || 0)} className="w-24 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button variant="ghost" onClick={() => { setR(255); setG(255); setB(255); clearAll(); }}>Reset</Button>
        </div>
        {output && (
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded border border-black/10 shadow-sm" style={{ backgroundColor: output }} />
            <TextArea label="HEX Code" readOnly copyable value={output} rows={1} />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
