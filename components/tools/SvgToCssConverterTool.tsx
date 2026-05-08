"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function SvgToCssConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    if (!input) return;
    const encoded = encodeURIComponent(input.trim())
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");
    
    const css = `background-image: url("data:image/svg+xml,${encoded}");`;
    setOutput(css);
  };

  return (
    <ToolContainer title="SVG to CSS Converter" description="Convert SVG code to a CSS background-image data URI.">
      <div className="grid gap-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste SVG code here..."
          className="w-full h-48 rounded-lg border border-black/15 bg-transparent p-3 text-sm font-mono outline-none dark:border-white/20"
        />
        <div className="flex gap-2">
          <Button onClick={convert}>Generate CSS</Button>
          <Button variant="ghost" onClick={clearAll}>Clear</Button>
        </div>
        
        {output && (
          <div className="grid gap-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-white/5 font-mono text-xs break-all relative group border border-black/5 dark:border-white/5">
              <code>{output}</code>
              <Button size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border border-black/5 dark:border-white/5">
              <div className="w-12 h-12 border rounded bg-white dark:bg-gray-800" style={{ backgroundImage: output.replace('background-image: ', '').replace(';', ''), backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
              <div className="text-sm font-medium">Preview in 48x48 container</div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
