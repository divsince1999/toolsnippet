"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToYamlTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const jsonToYaml = (obj: any, indent = 0): string => {
    const spaces = "  ".repeat(indent);
    if (obj === null) return "null";
    if (typeof obj !== "object") return String(obj);

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";
      return obj.map(item => `\n${spaces}- ${jsonToYaml(item, indent + 1)}`).join("");
    }

    return Object.entries(obj)
      .map(([key, value]) => {
        const valStr = typeof value === "object" && value !== null 
          ? jsonToYaml(value, indent + 1)
          : ` ${jsonToYaml(value, indent + 1)}`;
        return `\n${spaces}${key}:${valStr}`;
      })
      .join("");
  };

  const handleConvert = () => {
    try {
      if (!input) return;
      const parsed = JSON.parse(input);
      const yaml = jsonToYaml(parsed).trim();
      setOutput(yaml);
      setError("");
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  return (
    <ToolContainer
      title="JSON to YAML Converter"
      description="Convert JSON data to human-readable YAML format."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input JSON"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "John", "age": 30}...'
          rows={10}
        />

        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to YAML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>

        {output && (
          <TextArea
            label="YAML Output"
            readOnly
            copyable
            value={output}
            rows={10}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
