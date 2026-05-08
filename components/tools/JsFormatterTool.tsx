"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsFormatterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleFormat = () => {
    if (!input) return;
    // Very basic JS formatter
    const formatted = input
      .replace(/;\s*/g, ";\n")
      .replace(/\{\s*/g, " {\n  ")
      .replace(/\}\s*/g, "\n}\n")
      .replace(/\n\s*\n/g, "\n")
      .trim();
    setOutput(formatted);
  };

  return (
    <ToolContainer title="JS Formatter" description="Format and beautify JavaScript code.">
      <div className="grid gap-6">
        <TextArea label="Input JS" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleFormat}>Format JS</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Formatted JS" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
