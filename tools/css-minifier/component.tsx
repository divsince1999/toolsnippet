"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssMinifierTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleMinify = () => {
    if (!input) return;
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
      .replace(/\s+/g, " ") // Collapse whitespace
      .replace(/\s*([\{\}:;,])\s*/g, "$1") // Remove spaces around delimiters
      .trim();
    setOutput(minified);
  };

  return (
    <ToolContainer title="CSS Minifier" description="Compress CSS files for faster website loading.">
      <div className="grid gap-6">
        <TextArea label="Input CSS" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleMinify}>Minify CSS</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Minified CSS" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
