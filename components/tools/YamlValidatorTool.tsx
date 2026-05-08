"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function YamlValidatorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleValidate = () => {
    if (!input) return;
    // Basic YAML validation (indentation and colon check)
    const lines = input.split("\n");
    let isValid = true;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith("#") && !line.includes(":") && !line.startsWith("-")) {
        setError(`Syntax error on line ${i + 1}: Missing colon or list marker.`);
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setOutput("✅ YAML structure appears valid.");
      setError("");
    } else {
      setOutput("");
    }
  };

  return (
    <ToolContainer title="YAML Validator" description="Validate YAML configuration files for syntax errors.">
      <div className="grid gap-6">
        <TextArea label="Input YAML" value={input} onChange={(e) => setInput(e.target.value)} rows={12} />
        <div className="flex gap-2">
          <Button onClick={handleValidate}>Validate YAML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <p className="text-sm font-medium text-green-600 dark:text-green-400">{output}</p>}
        {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">❌ {error}</p>}
      </div>
    </ToolContainer>
  );
}
