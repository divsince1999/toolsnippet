"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function Rot13ConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const rot13 = input.replace(/[a-zA-Z]/g, (c: string) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
    setOutput(rot13);
  };

  return (
    <ToolContainer title="ROT13 Converter" description="Encode or decode text using the ROT13 cipher.">
      <div className="grid gap-6">
        <TextArea label="Input Text" value={input} onChange={(e) => setInput(e.target.value)} rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Rotate 13</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="ROT13 Output" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
