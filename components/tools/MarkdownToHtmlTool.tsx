"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MarkdownToHtmlTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convertMarkdown = () => {
    if (!input.trim()) return;

    let html = input
      // Code blocks
      .replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gim, (_, lang, code) => {
        return `<pre><code class="language-${lang || "text"}">${code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>`;
      })
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Headings
      .replace(/^###### (.*$)/gim, "<h6>$1</h6>")
      .replace(/^##### (.*$)/gim, "<h5>$1</h5>")
      .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Blockquotes
      .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      .replace(/~~(.*?)~~/gim, "<del>$1</del>")
      // Images & Links
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" />')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Unordered lists
      .replace(/^\s*[\-\*]\s+(.*$)/gim, "<li>$1</li>")
      // Ordered lists
      .replace(/^\s*\d+\.\s+(.*$)/gim, "<li>$1</li>")
      // Horizontal rules
      .replace(/^---$/gim, "<hr />")
      // Line breaks
      .replace(/\n\n/gim, "</p>\n<p>")
      .replace(/\n/gim, "<br />\n");

    html = `<p>${html}</p>`
      .replace(/<p><\/p>/g, "")
      .replace(/<p><(h[1-6]|pre|blockquote|hr)/gi, "<$1")
      .replace(/<\/(h[1-6]|pre|blockquote|hr)><\/p>/gi, "</$1>");

    setOutput(html.trim());
  };

  return (
    <ToolContainer
      title="Markdown to HTML Converter"
      description="Convert GitHub Flavored Markdown into clean, exportable HTML code."
    >
      <div className="grid gap-6">
        <TextArea
          label="Markdown Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`# Heading 1\n\n**Bold text**, *italic*, and [links](https://example.com).\n\n- List item 1\n- List item 2\n\n\`\`\`js\nconsole.log("Hello World");\n\`\`\``}
          rows={10}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={convertMarkdown}>Convert to HTML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <TextArea
            label="Generated HTML"
            readOnly
            copyable
            value={output}
            rows={12}
          />
        )}
      </div>
    </ToolContainer>
  );
}
