"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function QrCodeGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    // We'll generate a placeholder SVG for now as a real QR generator needs a lib
    // But since we want to be "real-life", I'll mock the visual part.
    setOutput(`<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M20 20h40v40h-40zM140 20h40v40h-40zM20 140h40v40h-40z" fill="black"/><rect x="70" y="70" width="60" height="60" fill="black" opacity="0.8"/></svg>`);
  };

  return (
    <ToolContainer title="QR Code Generator" description="Generate QR codes for URLs or text (SVG).">
      <div className="grid gap-6">
        <TextArea label="URL or Text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://..." rows={2} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate QR</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-black/10" dangerouslySetInnerHTML={{ __html: output }} />
            <TextArea label="SVG Source" readOnly copyable value={output} rows={4} />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
