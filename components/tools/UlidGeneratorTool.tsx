"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UlidGeneratorTool() {
  const { output, setOutput, copyToClipboard, isCopied } = useTool();

  const generate = () => {
    const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    const encodeTime = (now: number, len: number) => {
      let res = "";
      for (let i = len; i > 0; i--) {
        const mod = now % 32;
        res = ENCODING.charAt(mod) + res;
        now = (now - mod) / 32;
      }
      return res;
    };

    const encodeRandom = (len: number) => {
      let res = "";
      for (let i = 0; i < len; i++) {
        res += ENCODING.charAt(Math.floor(Math.random() * 32));
      }
      return res;
    };

    const ulid = encodeTime(Date.now(), 10) + encodeRandom(16);
    setOutput(ulid);
  };

  return (
    <ToolContainer title="ULID Generator" description="Generate Lexicographically Sortable Unique Identifiers.">
      <div className="flex flex-col items-center gap-6 py-8">
        <Button size="lg" onClick={generate}>Generate ULID</Button>
        
        {output && (
          <div className="w-full max-w-lg p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center group relative">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Your ULID</div>
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
