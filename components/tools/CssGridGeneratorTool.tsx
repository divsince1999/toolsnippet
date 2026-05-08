"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssGridGeneratorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(10);

  const handleGenerate = () => {
    const css = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
}

.grid-item {
  background-color: #3b82f6;
  padding: 20px;
  border-radius: 4px;
  color: white;
  text-align: center;
}`;
    setOutput(css);
  };

  return (
    <ToolContainer
      title="CSS Grid Generator"
      description="Visually configure CSS Grid layouts and export the code."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Rows</label>
            <input type="number" min="1" max="12" value={rows} onChange={e => setRows(parseInt(e.target.value) || 1)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Columns</label>
            <input type="number" min="1" max="12" value={cols} onChange={e => setCols(parseInt(e.target.value) || 1)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Gap (px)</label>
            <input type="number" min="0" max="100" value={gap} onChange={e => setGap(parseInt(e.target.value) || 0)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate CSS</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>
        {output && (
          <div className="grid gap-6">
            <div className="p-4 border border-black/10 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
              <div 
                className="grid" 
                style={{ 
                  gridTemplateColumns: `repeat(${cols}, 1fr)`, 
                  gridTemplateRows: `repeat(${rows}, 1fr)`, 
                  gap: `${gap}px` 
                }}
              >
                {Array.from({ length: rows * cols }).map((_, i) => (
                  <div key={i} className="bg-primary/20 border border-primary/30 rounded p-4 text-xs font-mono text-center">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <TextArea label="Generated CSS" readOnly copyable value={output} rows={10} />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
