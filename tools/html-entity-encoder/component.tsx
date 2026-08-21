"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtmlEntityEncoderTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const encoded = input.replace(/[\u00A0-\u9999<>\&]/g, (i) => "&#" + i.charCodeAt(0) + ";");
    setOutput(encoded);
  };

  return (
    <ToolContainer title="HTML Entity Encoder" description="Encode special characters into HTML entities.">
      <div className="grid gap-6">
        <TextArea label="Text Input" value={input} onChange={(e) => setInput(e.target.value)} rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Encode</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Encoded Output" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
