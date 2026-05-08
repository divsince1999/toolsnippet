"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function AdvancedCaseConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = (type: string) => {
    if (!input) return;
    const words = input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
    let result = "";
    switch (type) {
      case "snake": result = words.map(w => w.toLowerCase()).join("_"); break;
      case "camel": result = words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(""); break;
      case "pascal": result = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(""); break;
      case "kebab": result = words.map(w => w.toLowerCase()).join("-"); break;
    }
    setOutput(result);
  };

  return (
    <ToolContainer title="Advanced Case Converter" description="Convert between snake_case, camelCase, PascalCase, and kebab-case.">
      <div className="grid gap-6">
        <TextArea label="Variable Name" value={input} onChange={(e) => setInput(e.target.value)} placeholder="enter_variable_name" rows={1} />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => handleConvert("snake")}>snake_case</Button>
          <Button variant="outline" onClick={() => handleConvert("camel")}>camelCase</Button>
          <Button variant="outline" onClick={() => handleConvert("pascal")}>PascalCase</Button>
          <Button variant="outline" onClick={() => handleConvert("kebab")}>kebab-case</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Result" readOnly copyable value={output} rows={1} />}
      </div>
    </ToolContainer>
  );
}
