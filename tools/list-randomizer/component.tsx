"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ListRandomizerTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const lines = input.split("\n").filter(l => l.trim());
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutput(lines.join("\n"));
  };

  return (
    <ToolContainer title="List Randomizer" description="Shuffle the order of lines in a list.">
      <div className="grid gap-6">
        <TextArea label="Input List" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Shuffle List</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Shuffled List" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
