"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SpaceToTabTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [spaces, setSpaces] = useState(2);

  const handleConvert = () => {
    if (!input) return;
    const regex = new RegExp(" ".repeat(spaces), "g");
    const result = input.replace(regex, "\t");
    setOutput(result);
  };

  return (
    <ToolContainer title="Space to Tab Converter" description="Convert leading or all spaces to tab characters.">
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Spaces per Tab</label>
          <input type="number" min="1" max="8" value={spaces} onChange={e => setSpaces(parseInt(e.target.value) || 2)} className="w-24 rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
        </div>
        <TextArea label="Input Text" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to Tabs</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Result" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
