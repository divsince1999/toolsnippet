"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtmlMinifierTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleMinify = () => {
    if (!input) return;
    const minified = input
      .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
      .replace(/\s+/g, " ") // Collapse whitespace
      .replace(/>\s+</g, "><") // Remove space between tags
      .trim();
    setOutput(minified);
  };

  return (
    <ToolContainer title="HTML Minifier" description="Compress HTML markup for better performance.">
      <div className="grid gap-6">
        <TextArea label="Input HTML" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleMinify}>Minify HTML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Minified HTML" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
