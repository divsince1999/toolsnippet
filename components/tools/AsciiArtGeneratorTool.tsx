"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function AsciiArtGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;

    // Simple fixed-width block font mock
    const alphabet: Record<string, string[]> = {
      'a': ["  A  ", " A A ", "AAAAA", "A   A", "A   A"],
      'b': ["BBBB ", "B   B", "BBBB ", "B   B", "BBBB "],
      'c': [" CCCC", "C    ", "C    ", "C    ", " CCCC"],
      'h': ["H   H", "H   H", "HHHHH", "H   H", "H   H"],
      'e': ["EEEEE", "E    ", "EEEE ", "E    ", "EEEEE"],
      'l': ["L    ", "L    ", "L    ", "L    ", "LLLLL"],
      'o': [" OOO ", "O   O", "O   O", "O   O", " OOO "],
      // Add more letters as needed for the mock
    };

    const lines = ["", "", "", "", ""];
    input.toLowerCase().split("").forEach(char => {
      const art = alphabet[char] || ["     ", "     ", "  ?  ", "     ", "     "];
      art.forEach((line, i) => lines[i] += line + "  ");
    });

    setOutput(lines.join("\n"));
  };

  return (
    <ToolContainer
      title="ASCII Art Generator"
      description="Convert text into large ASCII art banners for your code comments or terminal."
    >
      <div className="grid gap-6">
        <TextArea
          label="Enter Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="HELLO"
          rows={2}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate Art</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <pre className="p-6 overflow-x-auto rounded-lg border border-black/10 bg-black/[0.03] text-xs font-mono dark:border-white/10 dark:bg-white/[0.03] leading-none">
            {output}
          </pre>
        )}
      </div>
    </ToolContainer>
  );
}
