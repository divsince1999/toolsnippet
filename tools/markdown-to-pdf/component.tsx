"use client";

import { useState, useMemo, useCallback } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

function parseMarkdownToHtml(md: string): string {
  if (!md.trim()) return "<p>No content to preview.</p>";

  const lines = md.split("\n");
  const htmlLines: string[] = [];
  let inCodeBlock = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        htmlLines.push("</code></pre>");
        inCodeBlock = false;
      } else {
        htmlLines.push("<pre><code>");
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      htmlLines.push(line.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***") {
      htmlLines.push("<hr />");
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      htmlLines.push(`<h1>${parseInline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      htmlLines.push(`<h2>${parseInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      htmlLines.push(`<h3>${parseInline(line.slice(4))}</h3>`);
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      htmlLines.push(`<blockquote>${parseInline(line.slice(2))}</blockquote>`);
      continue;
    }

    // Unordered List
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) {
        htmlLines.push("<ul>");
        inList = true;
      }
      htmlLines.push(`<li>${parseInline(line.slice(2))}</li>`);
      continue;
    } else if (inList) {
      htmlLines.push("</ul>");
      inList = false;
    }

    // Empty line
    if (!line.trim()) {
      continue;
    }

    // Standard paragraph
    htmlLines.push(`<p>${parseInline(line)}</p>`);
  }

  if (inList) htmlLines.push("</ul>");
  if (inCodeBlock) htmlLines.push("</code></pre>");

  return htmlLines.join("\n");
}

function parseInline(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

const SAMPLE_MD = `# Project Technical Specifications
**Document Version:** 2.4.0  
**Author:** Engineering Team  
**Date:** August 2026  

---

## 1. System Overview
ToolSnippet provides high-performance, **zero-knowledge** browser utilities. All computations happen in the client runtime without remote server storage.

### Key Architectural Highlights:
- **Zero Latency:** Sub-100ms algorithmic execution.
- **Client-Side Security:** WebCrypto API encryption with zero network transmission.
- **Offline Capability:** Fully functional progressive web application.

---

## 2. Code Example
\`\`\`typescript
interface ToolConfig {
  id: string;
  name: string;
  category: "Auth" | "Dev" | "Design" | "Data";
  isClientOnly: true;
}
\`\`\`

> *“Simplicity is prerequisite for reliability.”* — Edsger W. Dijkstra

---

## 3. Deployment Checklist
- [x] Security headers validated
- [x] Pre-rendered SSG verification
- [x] Automated DOM containment tests passed (765/765)`;

export default function MarkdownToPdfTool() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [theme, setTheme] = useState<"modern" | "academic" | "minimal">("modern");
  const [pageSize, setPageSize] = useState<"A4" | "Letter">("A4");

  const renderedHtml = useMemo(() => parseMarkdownToHtml(markdown), [markdown]);

  const handlePrint = useCallback(() => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    const fontStyle =
      theme === "academic"
        ? 'font-family: "Times New Roman", Times, serif; color: #000; line-height: 1.6;'
        : theme === "minimal"
        ? 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #222; line-height: 1.5;'
        : 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111827; line-height: 1.6;';

    const printCss = `
      @page {
        size: ${pageSize};
        margin: 20mm;
      }
      body {
        ${fontStyle}
        font-size: 13pt;
        background: #fff;
        padding: 0;
        margin: 0;
      }
      h1 { font-size: 22pt; margin-top: 0; color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
      h2 { font-size: 16pt; margin-top: 18pt; color: #334155; }
      h3 { font-size: 13pt; margin-top: 14pt; color: #475569; }
      p { margin: 8pt 0; }
      pre { background: #f1f5f9; padding: 10pt; border-radius: 6pt; border: 1px solid #cbd5e1; font-size: 10pt; overflow: hidden; }
      code { font-family: monospace; background: #f8fafc; padding: 2pt 4pt; border-radius: 3pt; }
      blockquote { border-left: 4px solid #6366f1; padding-left: 12pt; margin: 10pt 0; color: #4b5563; font-style: italic; }
      ul { padding-left: 20pt; margin: 8pt 0; }
      li { margin-bottom: 4pt; }
      hr { border: 0; border-top: 1px solid #e2e8f0; margin: 16pt 0; }
    `;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Export Document</title>
          <style>${printCss}</style>
        </head>
        <body>
          ${renderedHtml}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    }, 300);
  }, [renderedHtml, theme, pageSize]);

  return (
    <ToolContainer
      title="Markdown to PDF Converter"
      description="Format, preview, and export Markdown documents to printable PDFs directly in your browser with zero server uploads."
    >
      <div className="space-y-6">
        {/* Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Theme:</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as "modern" | "academic" | "minimal")}
                className="rounded-lg border border-black/15 bg-white px-2.5 py-1 text-xs dark:border-white/15 dark:bg-zinc-800"
              >
                <option value="modern">Modern Clean</option>
                <option value="academic">Academic Formal</option>
                <option value="minimal">Minimalist</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Page Size:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as "A4" | "Letter")}
                className="rounded-lg border border-black/15 bg-white px-2.5 py-1 text-xs dark:border-white/15 dark:bg-zinc-800"
              >
                <option value="A4">A4 (210 x 297 mm)</option>
                <option value="Letter">US Letter (8.5 x 11 in)</option>
              </select>
            </div>
          </div>

          <Button variant="primary" size="sm" onClick={handlePrint} className="h-8 gap-2">
            <span>🖨️</span> Export / Print PDF
          </Button>
        </div>

        {/* 2-Column Workstation */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Markdown Source:
              </label>
              <button
                type="button"
                onClick={() => setMarkdown("")}
                className="text-xs text-gray-500 hover:text-rose-500"
              >
                Clear
              </button>
            </div>
            <TextArea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type Markdown content here..."
              rows={18}
              className="font-mono text-xs"
            />
          </div>

          {/* Right: Printable Sheet Preview */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Live Printable Sheet Preview ({pageSize}):
            </label>
            <div
              className={`h-[420px] overflow-y-auto rounded-2xl border border-black/15 bg-white p-6 shadow-md text-gray-900 dark:border-white/15 dark:bg-zinc-900 dark:text-gray-100 ${
                theme === "academic" ? "font-serif" : "font-sans"
              }`}
            >
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
