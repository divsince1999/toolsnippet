"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonValidatorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      JSON.parse(input);
      setOutput("✅ Valid JSON");
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <ToolContainer title="JSON Validator" description="Check if your JSON data is valid and well-formed.">
      <div className="grid gap-6">
        <TextArea label="Input JSON" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Validate JSON</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <p className="text-sm font-medium text-green-600 dark:text-green-400">{output}</p>}
        {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">❌ {error}</p>}
      </div>
    </ToolContainer>
  );
}
