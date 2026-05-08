"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function WhitespaceRemoverTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleClean = (type: "all" | "extra" | "lines") => {
    if (!input) return;
    let result = "";
    if (type === "all") {
      result = input.replace(/\s+/g, "");
    } else if (type === "extra") {
      result = input.replace(/[ \t]+/g, " ").replace(/\n\s*\n/g, "\n\n").trim();
    } else {
      result = input.split("\n").map(l => l.trim()).filter(l => l).join("\n");
    }
    setOutput(result);
  };

  return (
    <ToolContainer title="Whitespace Remover" description="Clean up redundant spaces, tabs, and newlines from your text.">
      <div className="grid gap-6">
        <TextArea label="Input Text" value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => handleClean("extra")}>Remove Extra Spaces</Button>
          <Button variant="outline" onClick={() => handleClean("lines")}>Remove Empty Lines</Button>
          <Button variant="outline" onClick={() => handleClean("all")}>Remove ALL Whitespace</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Cleaned Result" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
