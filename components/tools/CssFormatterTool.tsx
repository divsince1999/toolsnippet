"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssFormatterTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleFormat = () => {
    try {
      if (!input) return;
      // Basic CSS formatting
      const formatted = input
        .replace(/\s*\{\s*/g, " {\n  ")
        .replace(/\s*;\s*/g, ";\n  ")
        .replace(/\s*\}\s*/g, "\n}\n")
        .replace(/\s*:\s*/g, ": ")
        .replace(/\n\s*\n/g, "\n")
        .replace(/\{\n\s*\}/g, "{}")
        .trim();
      setOutput(formatted);
      setError("");
    } catch (err) {
      setError("Failed to format CSS");
    }
  };

  return (
    <ToolContainer title="CSS Formatter" description="Beautify and indent your CSS code.">
      <div className="grid gap-6">
        <TextArea label="Input CSS" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleFormat}>Format CSS</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Formatted CSS" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
