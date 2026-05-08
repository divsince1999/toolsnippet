"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function NumberBaseConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = (base: number) => {
    if (!input) return;
    try {
      const num = parseInt(input, 10);
      if (isNaN(num)) throw new Error();
      setOutput(num.toString(base).toUpperCase());
    } catch {
      setOutput("Invalid input");
    }
  };

  return (
    <ToolContainer title="Number Base Converter" description="Convert numbers between different mathematical bases.">
      <div className="grid gap-6">
        <TextArea label="Decimal Number" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter decimal number..." rows={1} />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => handleConvert(2)}>to Binary</Button>
          <Button variant="outline" onClick={() => handleConvert(8)}>to Octal</Button>
          <Button variant="outline" onClick={() => handleConvert(16)}>to Hex</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Result" readOnly copyable value={output} rows={1} />}
      </div>
    </ToolContainer>
  );
}
