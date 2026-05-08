"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsDeobfuscatorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;

    // A simple mock de-obfuscator that reverses common patterns
    let deobfuscated = input
      .replace(/\(function\(\)\{(.*)\}\)\(\);/, "$1")
      .replace(/String\.fromCharCode\(([\d,]+)\)/g, (m, g) => {
        return `"${g.split(",").map((c: string) => String.fromCharCode(parseInt(c))).join("")}"`;
      })
      .replace(/_0x[a-f0-9]{4}/g, (m) => `var_${m.slice(-4)}`);

    setOutput(deobfuscated.trim());
  };

  return (
    <ToolContainer
      title="JS De-obfuscator"
      description="Clean up obfuscated JavaScript code and restore readable patterns."
    >
      <div className="grid gap-6">
        <TextArea
          label="Obfuscated JS"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="(function(){ ... })();"
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>De-obfuscate Code</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Cleaned Output"
            readOnly
            copyable
            value={output}
            rows={10}
          />
        )}
      </div>
    </ToolContainer>
  );
}
