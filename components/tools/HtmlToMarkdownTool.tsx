"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtmlToMarkdownTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;

    let md = input
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
      .replace(/<strong[^>]*>(.*?)<\/strong>|<b>(.*?)<\/b>/gi, "**$1$2**")
      .replace(/<em[^>]*>(.*?)<\/em>|<i>(.*?)<\/i>/gi, "*$1$2*")
      .replace(/<a[^>]*href=["'](.*?)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
      .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
      .replace(/<br[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, ""); // Remove remaining tags

    setOutput(md.trim());
  };

  return (
    <ToolContainer
      title="HTML to Markdown"
      description="Convert messy HTML markup to clean, readable Markdown."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input HTML"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<h1>Hello World</h1><p>Sample text.</p>..."
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to Markdown</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Markdown Output"
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
