"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function AsciiToHexConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    let hex = "";
    for (let i = 0; i < input.length; i++) {
      hex += input.charCodeAt(i).toString(16).toUpperCase().padStart(2, "0") + " ";
    }
    setOutput(hex.trim());
  };

  return (
    <ToolContainer title="ASCII to Hex Converter" description="Convert plain text to hexadecimal codes.">
      <TextArea
        label="Text Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={convert}>Convert</Button>
        <Button variant="ghost" onClick={clearAll}>Clear</Button>
      </div>
      {output && (
        <TextArea
          label="Hex Output"
          value={output}
          readOnly
          className="mt-6"
          copyable
        />
      )}
    </ToolContainer>
  );
}
