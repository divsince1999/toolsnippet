"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HexToAsciiTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [separator, setSeparator] = useState<"space" | "none" | "0x">("space");

  const hexToAscii = () => {
    try {
      if (!input.trim()) return;

      const cleanHex = input
        .replace(/0x/gi, "")
        .replace(/[^0-9a-fA-F]/g, "");

      if (cleanHex.length % 2 !== 0) {
        throw new Error("Invalid hex string: length must be an even number of characters.");
      }

      let text = "";
      for (let i = 0; i < cleanHex.length; i += 2) {
        const byte = parseInt(cleanHex.substr(i, 2), 16);
        text += String.fromCharCode(byte);
      }

      setOutput(text);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to decode Hex.");
    }
  };

  const asciiToHex = () => {
    try {
      if (!input) return;

      const hexArr = [];
      for (let i = 0; i < input.length; i++) {
        const hex = input.charCodeAt(i).toString(16).padStart(2, "0");
        if (separator === "0x") {
          hexArr.push(`0x${hex}`);
        } else {
          hexArr.push(hex);
        }
      }

      const joiner = separator === "none" ? "" : " ";
      setOutput(hexArr.join(joiner));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to encode to Hex.");
    }
  };

  return (
    <ToolContainer
      title="Hex to ASCII Converter"
      description="Convert Hexadecimal strings to plain ASCII text and encode text into Hex dumps."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Hex or Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 48 65 6c 6c 6f 20 57 6f 72 6c 64 or Hello World"
          rows={6}
          error={error}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-500">Hex Format:</label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as "space" | "none" | "0x")}
              className="rounded-md border border-black/15 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            >
              <option value="space">Space-separated (48 65 6c)</option>
              <option value="none">Continuous (48656c)</option>
              <option value="0x">Prefixed (0x48 0x65)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button onClick={hexToAscii}>Hex → ASCII Text</Button>
            <Button variant="outline" onClick={asciiToHex}>ASCII Text → Hex</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <TextArea
            label="Converted Output"
            readOnly
            copyable
            value={output}
            rows={6}
          />
        )}
      </div>
    </ToolContainer>
  );
}
