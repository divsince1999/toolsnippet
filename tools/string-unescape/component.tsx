"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function StringUnescapeTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    try {
      const unescaped = JSON.parse(`"${input}"`);
      setOutput(unescaped);
    } catch {
      setOutput("Invalid escaped string");
    }
  };

  return (
    <ToolContainer title="String Unescape" description="Remove escapes from programming strings.">
      <div className="grid gap-6">
        <TextArea label="Escaped Input" value={input} onChange={(e) => setInput(e.target.value)} rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Unescape</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Raw Output" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
