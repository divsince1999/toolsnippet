"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HexToBinaryConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    const hex = input.replace(/[^0-9A-Fa-f]/g, "");
    if (!hex) {
      setOutput("");
      return;
    }

    let binary = "";
    for (let i = 0; i < hex.length; i++) {
      const bin = parseInt(hex[i], 16).toString(2).padStart(4, "0");
      binary += bin + " ";
    }
    setOutput(binary.trim());
  };

  return (
    <ToolContainer title="Hex to Binary Converter" description="Convert hexadecimal strings to binary.">
      <TextArea
        label="Hex Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. AF23"
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={convert}>Convert</Button>
        <Button variant="ghost" onClick={clearAll}>Clear</Button>
      </div>
      {output && (
        <TextArea
          label="Binary Output"
          value={output}
          readOnly
          className="mt-6"
          copyable
        />
      )}
    </ToolContainer>
  );
}
