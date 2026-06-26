"use client";

import { load } from "js-yaml";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function YamlToJsonTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input.trim()) return;

      const parsed = load(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to parse YAML. Please check your input.");
    }
  };

  return (
    <ToolContainer
      title="YAML to JSON Converter"
      description="Convert YAML configurations to JSON format."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input YAML"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="name: John\nage: 30\nitems:\n  - name: Item 1\n  - name: Item 2"
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
