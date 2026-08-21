"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BinaryToTextTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    try {
      const text = input.split(" ").map(bin => String.fromCharCode(parseInt(bin, 2))).join("");
      setOutput(text);
    } catch {
      setOutput("Invalid binary data");
    }
  };

  return (
    <ToolContainer title="Binary to Text" description="Decode binary strings into human-readable text.">
      <div className="grid gap-6">
        <TextArea label="Binary Input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="01001000 01001001..." rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Text Output" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
