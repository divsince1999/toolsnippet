"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HexToRgbTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    let hex = input.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map(s => s + s).join("");
    }
    if (hex.length !== 6) {
      setOutput("Invalid HEX code");
      return;
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    setOutput(`rgb(${r}, ${g}, ${b})`);
  };

  return (
    <ToolContainer title="HEX to RGB Converter" description="Convert HEX codes to RGB values.">
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">HEX Code</label>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="#FFFFFF" className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="RGB Value" readOnly copyable value={output} rows={1} />}
      </div>
    </ToolContainer>
  );
}
