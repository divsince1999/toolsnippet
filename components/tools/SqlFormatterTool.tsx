"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SqlFormatterTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const formatSql = () => {
    try {
      if (!input) return;
      
      // Very basic SQL formatter logic
      let formatted = input
        .replace(/\s+/g, " ")
        .replace(/\s*,\s*/g, ", ")
        .replace(/\s*\(\s*/g, " (")
        .replace(/\s*\)\s*/g, ") ")
        .replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER|GROUP|ORDER|BY|HAVING|LIMIT|OFFSET|UNION|ALL|SET|VALUES|AND|OR|ON|AS)\b/gi, 
          (match) => "\n" + match.toUpperCase())
        .trim();

      setOutput(formatted);
      setError("");
    } catch (err) {
      setError("Failed to format SQL");
    }
  };

  return (
    <ToolContainer
      title="SQL Formatter"
      description="Beautify and format your SQL queries for better readability."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input SQL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT * FROM users WHERE id = 1..."
          rows={10}
        />

        <div className="flex gap-2">
          <Button onClick={formatSql}>Format SQL</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>

        {output && (
          <TextArea
            label="Formatted SQL"
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
