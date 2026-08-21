"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtmlToMarkdownTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convertHtmlToMd = () => {
    if (!input.trim()) return;

    const md = input
      // Pre and code blocks
      .replace(/<pre><code(?:\s+class="language-([a-z0-9_-]+)")?>([\s\S]*?)<\/code><\/pre>/gim, "```$1\n$2\n```\n")
      .replace(/<code>(.*?)<\/code>/gim, "`$1`")
      // Headings
      .replace(/<h1>(.*?)<\/h1>/gim, "# $1\n\n")
      .replace(/<h2>(.*?)<\/h2>/gim, "## $1\n\n")
      .replace(/<h3>(.*?)<\/h3>/gim, "### $1\n\n")
      .replace(/<h4>(.*?)<\/h4>/gim, "#### $1\n\n")
      .replace(/<h5>(.*?)<\/h5>/gim, "##### $1\n\n")
      .replace(/<h6>(.*?)<\/h6>/gim, "###### $1\n\n")
      // Formatting
      .replace(/<strong><em>(.*?)<\/em><\/strong>/gim, "***$1***")
      .replace(/<em><strong>(.*?)<\/strong><\/em>/gim, "***$1***")
      .replace(/<strong>(.*?)<\/strong>/gim, "**$1**")
      .replace(/<b>(.*?)<\/b>/gim, "**$1**")
      .replace(/<em>(.*?)<\/em>/gim, "*$1*")
      .replace(/<i>(.*?)<\/i>/gim, "*$1*")
      .replace(/<del>(.*?)<\/del>/gim, "~~$1~~")
      .replace(/<strike>(.*?)<\/strike>/gim, "~~$1~~")
      // Links and Images
      .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gim, "[$2]($1)")
      .replace(/<img\s+(?:[^>]*?\s+)?src="([^"]*)"(?:\s+alt="([^"]*)")?[^>]*\/?>(?:<\/img>)?/gim, "![$2]($1)")
      // Blockquotes
      .replace(/<blockquote>([\s\S]*?)<\/blockquote>/gim, (_, content) => {
        return content.trim().split("\n").map((line: string) => `> ${line}`).join("\n") + "\n\n";
      })
      // Lists
      .replace(/<li>(.*?)<\/li>/gim, "- $1\n")
      .replace(/<\/?(ul|ol)>/gim, "\n")
      // Paragraphs & breaks
      .replace(/<p>(.*?)<\/p>/gim, "$1\n\n")
      .replace(/<br\s*\/?>/gim, "\n")
      .replace(/<hr\s*\/?>/gim, "\n---\n\n")
      // Remove all remaining HTML tags
      .replace(/<[^>]+>/gim, "")
      // Decode HTML entities
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, "\n\n");

    setOutput(md.trim());
  };

  return (
    <ToolContainer
      title="HTML to Markdown Converter"
      description="Convert HTML source code, articles, and snippets into clean Markdown syntax."
    >
      <div className="grid gap-6">
        <TextArea
          label="HTML Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`<h1>Hello World</h1>\n<p>This is <strong>bold</strong> and <a href="https://example.com">a link</a>.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>`}
          rows={10}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={convertHtmlToMd}>Convert to Markdown</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <TextArea
            label="Markdown Output"
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
