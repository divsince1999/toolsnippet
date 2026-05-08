"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SvgMinifierTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;

    const minified = input
      .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
      .replace(/>\s+</g, "><") // Remove space between tags
      .replace(/\s+/g, " ") // Collapse multiple spaces
      .replace(/\s*([={}])\s*/g, "$1") // Remove spaces around =, {, }
      .replace(/<\?xml.*?\?>/gi, "") // Remove XML declaration
      .replace(/<!DOCTYPE.*?>/gi, "") // Remove DOCTYPE
      .trim();

    setOutput(minified);
  };

  return (
    <ToolContainer
      title="SVG Minifier"
      description="Optimize SVG code by removing metadata and unnecessary characters."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input SVG Code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<svg>...</svg>"
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Minify SVG</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <div className="grid gap-4">
            <div className="flex justify-center p-4 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg border border-black/10 dark:border-white/10">
              <div dangerouslySetInnerHTML={{ __html: output }} />
            </div>
            <TextArea
              label="Minified Output"
              readOnly
              copyable
              value={output}
              rows={8}
            />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
