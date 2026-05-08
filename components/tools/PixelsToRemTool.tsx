"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PixelsToRemTool() {
  const { output, setOutput, clearAll } = useTool();
  const [px, setPx] = useState(16);
  const [base, setBase] = useState(16);

  const handleConvert = () => {
    const rem = px / base;
    setOutput(`${rem}rem`);
  };

  return (
    <ToolContainer
      title="Pixels to REM"
      description="Convert static pixel values to relative REM units for responsive design."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Pixels (px)</label>
            <input
              type="number"
              value={px}
              onChange={(e) => setPx(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Base Size (default 16px)</label>
            <input
              type="number"
              value={base}
              onChange={(e) => setBase(parseFloat(e.target.value) || 16)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to REM</Button>
          <Button variant="ghost" onClick={() => { setPx(16); setBase(16); clearAll(); }}>Reset</Button>
        </div>
        {output && (
          <TextArea
            label="Result"
            readOnly
            copyable
            value={output}
            rows={1}
          />
        )}
      </div>
    </ToolContainer>
  );
}
