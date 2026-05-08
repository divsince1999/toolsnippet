"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TextToBinaryTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const binary = input.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
    setOutput(binary);
  };

  return (
    <ToolContainer title="Text to Binary" description="Encode any text into its binary representation.">
      <div className="grid gap-6">
        <TextArea label="Text Input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type something..." rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Binary Output" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
