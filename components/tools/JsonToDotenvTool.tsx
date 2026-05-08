"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToDotenvTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      const parsed = JSON.parse(input);
      const env = flattenObject(parsed);
      setOutput(env);
      setError("");
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  const flattenObject = (obj: any, prefix = ""): string => {
    let result = "";
    for (const [key, value] of Object.entries(obj)) {
      const cleanKey = (prefix + key).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        result += flattenObject(value, `${cleanKey}_`);
      } else {
        result += `${cleanKey}=${value}\n`;
      }
    }
    return result;
  };

  return (
    <ToolContainer
      title="JSON to .env"
      description="Convert JSON configuration objects to standard .env variable format."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input JSON"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"database": {"host": "localhost"}}'
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to .env</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label=".env Output"
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
