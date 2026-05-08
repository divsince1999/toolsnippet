"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CsvToJsonTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      const lines = input.trim().split("\n");
      const headers = lines[0].split(",").map(h => h.trim());
      const result = lines.slice(1).map(line => {
        const values = line.split(",");
        return headers.reduce((obj: any, header, i) => {
          obj[header] = values[i]?.trim();
          return obj;
        }, {});
      });
      setOutput(JSON.stringify(result, null, 2));
      setError("");
    } catch (err) {
      setError("Failed to convert CSV to JSON");
    }
  };

  return (
    <ToolContainer title="CSV to JSON Converter" description="Convert CSV data to JSON format.">
      <div className="grid gap-6">
        <TextArea label="Input CSV" value={input} onChange={(e) => setInput(e.target.value)} placeholder="name,age\nJohn,30..." rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to JSON</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="JSON Output" readOnly copyable value={output} rows={10} />}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
