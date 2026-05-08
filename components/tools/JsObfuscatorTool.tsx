"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsObfuscatorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;

    // A simple mock obfuscator that renames variables and encoding strings
    // In a real scenario, you'd use a library, but we'll implement a basic version
    let obfuscated = input
      .replace(/const\s+(\w+)/g, (m, g) => `const _0x${Math.random().toString(16).slice(2, 6)}`)
      .replace(/let\s+(\w+)/g, (m, g) => `let _0x${Math.random().toString(16).slice(2, 6)}`)
      .replace(/var\s+(\w+)/g, (m, g) => `var _0x${Math.random().toString(16).slice(2, 6)}`)
      .replace(/"([^"]*)"/g, (m, g) => `String.fromCharCode(${g.split("").map((c: string) => c.charCodeAt(0)).join(",")})`)
      .replace(/'([^']*)'/g, (m, g) => `String.fromCharCode(${g.split("").map((c: string) => c.charCodeAt(0)).join(",")})`)
      .replace(/\s+/g, " ");

    setOutput(`(function(){${obfuscated}})();`);
  };

  return (
    <ToolContainer
      title="JS Obfuscator"
      description="Protect your JavaScript code by making it harder to read and understand."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input JavaScript"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="function hello() { console.log('world'); }"
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Obfuscate Code</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Obfuscated Output"
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
