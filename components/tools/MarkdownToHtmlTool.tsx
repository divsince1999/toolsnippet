"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MarkdownToHtmlTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;

    let html = input
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      .replace(/\n/gim, "<br />");

    setOutput(html.trim());
  };

  return (
    <ToolContainer
      title="Markdown to HTML"
      description="Convert Markdown text into valid HTML markup."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Markdown"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="# Hello World"
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to HTML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="HTML Output"
            readOnly
            copyable
            value={output}
            rows={10}
          />
        )}
      </div>
    </ToolContainer>
  );
}
