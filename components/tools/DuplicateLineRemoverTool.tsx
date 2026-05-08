"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function DuplicateLineRemoverTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const lines = input.split("\n");
    const unique = Array.from(new Set(lines));
    setOutput(unique.join("\n"));
  };

  return (
    <ToolContainer title="Duplicate Line Remover" description="Remove duplicate lines from a list or text.">
      <div className="grid gap-6">
        <TextArea label="Input List" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Remove Duplicates</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Unique List" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
