"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function DotenvToJsonTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;

    const lines = input.split("\n");
    const result: Record<string, string | number | boolean> = {};

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").trim().replace(/^['"]|['"]$/g, "");
      
      if (key) {
        const cleanKey = key.trim();
        let finalValue: string | number | boolean = value;
        
        if (value.toLowerCase() === "true") finalValue = true;
        else if (value.toLowerCase() === "false") finalValue = false;
        else if (!isNaN(Number(value)) && value !== "") finalValue = Number(value);
        
        result[cleanKey] = finalValue;
      }
    });

    setOutput(JSON.stringify(result, null, 2));
  };

  return (
    <ToolContainer
      title=".env to JSON"
      description="Convert environment variables to structured JSON objects."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input .env"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="DB_HOST=localhost\nDB_PORT=5432"
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
      </div>
    </ToolContainer>
  );
}
