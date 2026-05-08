"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function YamlToJsonTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      
      const lines = input.split("\n");
      const result: any = {};
      const stack: { obj: any; indent: number }[] = [{ obj: result, indent: -1 }];

      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;

        const indent = line.search(/\S/);
        const [key, ...valueParts] = trimmed.split(":");
        const value = valueParts.join(":").trim();
        const cleanKey = key.trim();

        while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
          stack.pop();
        }

        const current = stack[stack.length - 1].obj;
        if (value) {
          current[cleanKey] = isNaN(Number(value)) ? value : Number(value);
        } else {
          current[cleanKey] = {};
          stack.push({ obj: current[cleanKey], indent });
        }
      });

      setOutput(JSON.stringify(result, null, 2));
      setError("");
    } catch (err) {
      setError("Failed to convert YAML. Please ensure consistent indentation.");
    }
  };

  return (
    <ToolContainer
      title="YAML to JSON Converter"
      description="Convert simple YAML configurations to JSON format."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input YAML"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="name: John\nage: 30..."
          rows={10}
        />

        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to JSON</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>

        {output && (
          <TextArea
            label="JSON Output"
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
