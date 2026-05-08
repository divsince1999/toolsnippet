"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CaseConverterProTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();

  const mockCase = (str: string) => {
    return str.split('').map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('');
  };

  const alternatingCase = (str: string) => {
    return str.split('').map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('');
  };

  const inverseCase = (str: string) => {
    return str.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('');
  };

  const handleTransform = (fn: (s: string) => string) => {
    setInput(fn(input));
  };

  return (
    <ToolContainer title="Case Converter Pro" description="Advanced text case conversion with fun and specialized formats.">
      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste text..."
        rows={8}
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={() => handleTransform(mockCase)}>mOcKiNg cAsE</Button>
        <Button variant="outline" onClick={() => handleTransform(alternatingCase)}>AlTeRnAtInG CaSe</Button>
        <Button variant="outline" onClick={() => handleTransform(inverseCase)}>iNVERSE cASE</Button>
        <Button variant="secondary" onClick={() => copyToClipboard(input)} disabled={!input}>
          {isCopied ? "Copied!" : "Copy"}
        </Button>
        <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
      </div>
    </ToolContainer>
  );
}
