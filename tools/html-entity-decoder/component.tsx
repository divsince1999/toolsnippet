"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtmlEntityDecoderTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const doc = new DOMParser().parseFromString(input, "text/html");
    setOutput(doc.documentElement.textContent || "");
  };

  return (
    <ToolContainer title="HTML Entity Decoder" description="Decode HTML entities back to characters.">
      <div className="grid gap-6">
        <TextArea label="Encoded Input" value={input} onChange={(e) => setInput(e.target.value)} rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Decode</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Decoded Output" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
