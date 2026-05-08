"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToCsvTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Input must be a non-empty array of objects");
      }
      const headers = Object.keys(parsed[0]);
      const csv = [
        headers.join(","),
        ...parsed.map(row => headers.map(h => row[h]).join(","))
      ].join("\n");
      setOutput(csv);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert JSON to CSV");
    }
  };

  return (
    <ToolContainer title="JSON to CSV Converter" description="Convert JSON arrays to CSV format.">
      <div className="grid gap-6">
        <TextArea label="Input JSON Array" value={input} onChange={(e) => setInput(e.target.value)} placeholder='[{"name": "John", "age": 30}]...' rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to CSV</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="CSV Output" readOnly copyable value={output} rows={10} />}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
