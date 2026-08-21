"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TextCaseTool() {
  const { input, setInput, stats, clearAll, copyToClipboard, isCopied } = useTool();

  function toUpperCase() {
    setInput((prev) => prev.toUpperCase());
  }

  function toLowerCase() {
    setInput((prev) => prev.toLowerCase());
  }

  function toTitleCase() {
    setInput((prev) =>
      prev
        .toLowerCase()
        .replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1))
    );
  }

  return (
    <ToolContainer
      title="Text Case Converter"
      description="Convert text to UPPERCASE, lowercase, or Title Case in your browser."
      maxWidth="4xl"
    >
      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste text..."
        rows={8}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={toUpperCase}>UPPERCASE</Button>
        <Button variant="outline" onClick={toLowerCase}>lowercase</Button>
        <Button variant="outline" onClick={toTitleCase}>Title Case</Button>
        <Button variant="secondary" onClick={() => copyToClipboard(input)} disabled={!input}>
          {isCopied ? "Copied!" : "Copy"}
        </Button>
        <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
      </div>

      <div className="mt-6 flex gap-6 text-xs font-medium text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Words: {stats.words}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Characters: {stats.characters}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Lines: {stats.lines}
        </div>
      </div>
    </ToolContainer>
  );
}
