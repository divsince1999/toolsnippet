"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BinaryToHexConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    const binary = input.replace(/[^01]/g, "");
    if (!binary) {
      setOutput("");
      return;
    }

    // Pad binary to be multiple of 4
    const padded = binary.padStart(Math.ceil(binary.length / 4) * 4, "0");
    let hex = "";
    for (let i = 0; i < padded.length; i += 4) {
      const chunk = padded.substring(i, i + 4);
      hex += parseInt(chunk, 2).toString(16).toUpperCase();
    }
    setOutput(hex);
  };

  return (
    <ToolContainer title="Binary to Hex Converter" description="Convert binary strings to hexadecimal.">
      <TextArea
        label="Binary Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 10101010"
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
