"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TextReverserTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleReverseChars = () => {
    if (!input) return;
    setOutput(input.split("").reverse().join(""));
  };

  const handleReverseWords = () => {
    if (!input) return;
    setOutput(input.split(/\s+/).reverse().join(" "));
  };

  return (
    <ToolContainer title="Text Reverser" description="Reverse characters or words in a string.">
      <div className="grid gap-6">
        <TextArea label="Input Text" value={input} onChange={(e) => setInput(e.target.value)} rows={5} />
        <div className="flex gap-2">
          <Button onClick={handleReverseChars}>Reverse Characters</Button>
          <Button variant="outline" onClick={handleReverseWords}>Reverse Words</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Reversed Output" readOnly copyable value={output} rows={5} />}
      </div>
    </ToolContainer>
  );
}
