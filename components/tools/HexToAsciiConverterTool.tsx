"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HexToAsciiConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    const hex = input.replace(/[^0-9A-Fa-f]/g, "");
    let text = "";
    for (let i = 0; i < hex.length; i += 2) {
      const charCode = parseInt(hex.substring(i, i + 2), 16);
      if (!isNaN(charCode)) {
        text += String.fromCharCode(charCode);
      }
    }
    setOutput(text);
  };

  return (
    <ToolContainer title="Hex to ASCII Converter" description="Convert hexadecimal codes back to plain text.">
      <TextArea
        label="Hex Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 48 65 6C 6C 6F"
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={convert}>Convert</Button>
        <Button variant="ghost" onClick={clearAll}>Clear</Button>
      </div>
      {output && (
        <TextArea
          label="Text Output"
          value={output}
          readOnly
          className="mt-6"
          copyable
        />
      )}
    </ToolContainer>
  );
}
