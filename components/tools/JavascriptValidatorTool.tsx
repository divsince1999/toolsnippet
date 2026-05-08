"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JavascriptValidatorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleValidate = () => {
    if (!input) return;
    try {
      new Function(input);
      setOutput("✅ JavaScript syntax is valid.");
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Syntax error in JavaScript");
      setOutput("");
    }
  };

  return (
    <ToolContainer title="JavaScript Validator" description="Check JavaScript code for basic syntax errors.">
      <div className="grid gap-6">
        <TextArea label="Input JavaScript" value={input} onChange={(e) => setInput(e.target.value)} rows={12} />
        <div className="flex gap-2">
          <Button onClick={handleValidate}>Validate JS</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <p className="text-sm font-medium text-green-600 dark:text-green-400">{output}</p>}
        {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">❌ {error}</p>}
      </div>
    </ToolContainer>
  );
}
