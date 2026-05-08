"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PhpSerializerTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [mode, setMode] = useState<"serialize" | "unserialize">("unserialize");

  const handleConvert = () => {
    try {
      if (!input) return;
      
      if (mode === "unserialize") {
        // Very basic PHP unserializer for simple arrays/strings/numbers
        const result = mockUnserialize(input);
        setOutput(JSON.stringify(result, null, 2));
      } else {
        const parsed = JSON.parse(input);
        const result = mockSerialize(parsed);
        setOutput(result);
      }
      setError("");
    } catch (err) {
      setError(`Failed to ${mode}. Ensure input is valid.`);
    }
  };

  const mockUnserialize = (data: string): any => {
    if (data.startsWith("s:")) {
      const match = data.match(/s:\d+:"(.*)";/);
      return match ? match[1] : "";
    }
    if (data.startsWith("i:") || data.startsWith("d:")) {
      const match = data.match(/[id]:(.*);/);
      return match ? Number(match[1]) : 0;
    }
    if (data.startsWith("a:")) {
      return "Complex PHP arrays require a full library. Support coming soon.";
    }
    return data;
  };

  const mockSerialize = (data: any): string => {
    const type = typeof data;
    if (type === "string") return `s:${data.length}:"${data}";`;
    if (type === "number") return `${Number.isInteger(data) ? "i" : "d"}:${data};`;
    if (Array.isArray(data)) return `a:${data.length}:{...}`;
    return String(data);
  };

  return (
    <ToolContainer
      title="PHP Serializer"
      description="Serialize or unserialize data in PHP format for debugging legacy systems."
    >
      <div className="grid gap-6">
        <div className="flex gap-4">
          <Button 
            variant={mode === "unserialize" ? "primary" : "outline"} 
            onClick={() => setMode("unserialize")}
          >
            Unserialize to JSON
          </Button>
          <Button 
            variant={mode === "serialize" ? "primary" : "outline"} 
            onClick={() => setMode("serialize")}
          >
            Serialize to PHP
          </Button>
        </div>
        <TextArea
          label={mode === "unserialize" ? "Serialized String" : "JSON Data"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "unserialize" ? 's:11:"Hello World";' : '{"key": "val"}'}
          rows={6}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>{mode === "unserialize" ? "Unserialize" : "Serialize"}</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Result"
            readOnly
            copyable
            value={output}
            rows={8}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
