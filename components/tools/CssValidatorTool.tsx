"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssValidatorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleValidate = () => {
    if (!input) return;
    // Simple regex based CSS validation
    const errors: string[] = [];
    if ((input.match(/\{/g) || []).length !== (input.match(/\}/g) || []).length) {
      errors.push("Mismatched braces { }");
    }
    
    if (errors.length > 0) {
      setError(errors.join(", "));
      setOutput("");
    } else {
      setOutput("✅ CSS structure seems valid.");
      setError("");
    }
  };

  return (
    <ToolContainer title="CSS Validator" description="Check your CSS code for basic structural errors.">
      <div className="grid gap-6">
        <TextArea label="Input CSS" value={input} onChange={(e) => setInput(e.target.value)} rows={12} />
        <div className="flex gap-2">
          <Button onClick={handleValidate}>Validate CSS</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <p className="text-sm font-medium text-green-600 dark:text-green-400">{output}</p>}
        {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">❌ {error}</p>}
      </div>
    </ToolContainer>
  );
}
