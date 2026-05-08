"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonMinifierTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleMinify = () => {
    try {
      if (!input) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  return (
    <ToolContainer
      title="JSON Minifier"
      description="Compress JSON data by removing all whitespace and comments."
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
          <Button onClick={handleMinify}>Minify JSON</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Minified JSON"
            readOnly
            copyable
            value={output}
            rows={5}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
