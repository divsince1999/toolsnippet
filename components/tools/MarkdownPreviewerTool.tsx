"use client";

import { useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MarkdownPreviewerTool() {
  const { input, setInput, clearAll } = useTool();

  const previewHtml = useMemo(() => {
    if (!input) return "";
    
    // Basic Markdown to HTML using regex
    let html = input
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg" />')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" class="text-primary hover:underline">$1</a>')
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      .replace(/`([^`]+)`/gim, '<code class="bg-black/5 dark:bg-white/10 px-1 rounded">$1</code>')
      .replace(/\n/gim, "<br />");

    return html;
  }, [input]);

  return (
    <ToolContainer
      title="Markdown Previewer"
      description="Write Markdown and see the rendered preview in real-time."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <TextArea
          label="Markdown Editor"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="# Hello World\n\n**Bold text** and *italic*..."
          rows={15}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Live Preview</label>
          <div 
            className="min-h-[300px] flex-1 overflow-auto rounded-lg border border-black/15 bg-white p-4 text-sm prose dark:prose-invert dark:border-white/20 dark:bg-black/20"
            dangerouslySetInnerHTML={{ __html: previewHtml || '<p class="text-gray-400 italic">Preview will appear here...</p>' }}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
      </div>
    </ToolContainer>
  );
}
