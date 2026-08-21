"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function StringEscapeTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const escaped = JSON.stringify(input).slice(1, -1);
    setOutput(escaped);
  };

  return (
    <ToolContainer title="String Escape" description="Escape strings for use in programming languages.">
      <div className="grid gap-6">
        <TextArea label="Raw Text" value={input} onChange={(e) => setInput(e.target.value)} rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Escape</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Escaped String" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
