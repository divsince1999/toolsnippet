"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SqlToJsonTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    try {
      const regex = /VALUES\s*\((.*?)\)/gi;
      const matches = Array.from(input.matchAll(regex));
      const results = matches.map(match => {
        const values = match[1].split(",").map(v => v.trim().replace(/^'|'$/g, ""));
        return values;
      });

      setOutput(JSON.stringify(results, null, 2));
      setError("");
    } catch (err) {
      setError("Failed to parse SQL. Currently supports simple INSERT statements.");
    }
  };

  return (
    <ToolContainer title="SQL to JSON Converter" description="Convert SQL INSERT statements to JSON arrays.">
      <div className="grid gap-6">
        <TextArea label="Input SQL" value={input} onChange={(e) => setInput(e.target.value)} placeholder="INSERT INTO table VALUES ('val1', 'val2')..." rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to JSON</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="JSON Output" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
