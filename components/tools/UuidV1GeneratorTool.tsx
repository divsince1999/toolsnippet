"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UuidV1GeneratorTool() {
  const { output, setOutput, copyToClipboard, isCopied } = useTool();

  const generate = () => {
    // Basic UUID v1 implementation (time-based)
    // In a real app, we'd use a library, but for browser-only zero-dep:
    const now = Date.now();
    const timeLow = (now & 0xffffffff).toString(16).padStart(8, '0');
    const timeMid = ((now >> 32) & 0xffff).toString(16).padStart(4, '0');
    const timeHiAndVersion = (((now >> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0');
    
    const clockSeq = (Math.floor(Math.random() * 0x3fff) | 0x8000).toString(16).padStart(4, '0');
    const node = Math.floor(Math.random() * 0xffffffffffff).toString(16).padStart(12, '0');
    
    const uuid = `${timeLow}-${timeMid}-${timeHiAndVersion}-${clockSeq}-${node}`;
    setOutput(uuid);
  };

  return (
    <ToolContainer title="UUID v1 Generator" description="Generate time-based Universally Unique Identifiers.">
      <div className="flex flex-col items-center gap-6 py-8">
        <Button size="lg" onClick={generate}>Generate UUID v1</Button>
        
        {output && (
          <div className="w-full max-w-lg p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center group relative">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Your UUID v1</div>
            <div className="text-2xl font-mono font-bold break-all text-primary mb-4">{output}</div>
            <Button variant="secondary" onClick={() => copyToClipboard(output)}>
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
