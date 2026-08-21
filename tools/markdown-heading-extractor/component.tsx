"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

const SAMPLE_MD = `# Project Documentation

## Getting Started
### Prerequisites
### Installation

## Architecture & Design
### Frontend Components
### Backend API
#### Database Schema

## Testing & Quality
### Unit Testing
### Performance Benchmarks

## Deployment`;

export default function MarkdownHeadingExtractor() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [listType, setListType] = useState<"unordered" | "ordered">("unordered");
  const [minLevel, setMinLevel] = useState(2);
  const [maxLevel, setMaxLevel] = useState(4);
  const [copied, setCopied] = useState(false);

  const toc = useMemo(() => {
    if (!markdown.trim()) return "";

    const lines = markdown.split("\n");
    const headingRegex = /^(#{1,6})\s+(.+)$/;
    const entries: { level: number; text: string; slug: string }[] = [];

    for (const line of lines) {
      const match = line.trim().match(headingRegex);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim();
        if (level >= minLevel && level <= maxLevel) {
          entries.push({
            level,
            text: rawText,
            slug: slugify(rawText)
          });
        }
      }
    }

    if (entries.length === 0) return "";

    return entries
      .map((entry) => {
        const indent = "  ".repeat(entry.level - minLevel);
        const bullet = listType === "ordered" ? "1." : "-";
        return `${indent}${bullet} [${entry.text}](#${entry.slug})`;
      })
      .join("\n");
  }, [markdown, listType, minLevel, maxLevel]);

  const handleCopy = () => {
    navigator.clipboard.writeText(toc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer title="Markdown Table of Contents Generator" description="Extract Markdown H1 to H6 headings and generate indented, clickable Table of Contents (TOC) lists.">
      <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-1 font-semibold">
            <span>List Style:</span>
            <select
              value={listType}
              onChange={(e) => setListType(e.target.value as "unordered" | "ordered")}
              className="rounded border border-black/15 bg-white px-2 py-1 dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="unordered">Unordered (- Bullet)</option>
              <option value="ordered">Ordered (1. Numbered)</option>
            </select>
          </label>
          <label className="flex items-center gap-1 font-semibold">
            <span>Min Depth:</span>
            <select
              value={minLevel}
              onChange={(e) => setMinLevel(Number(e.target.value))}
              className="rounded border border-black/15 bg-white px-2 py-1 dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value={1}>H1</option>
              <option value={2}>H2 (Default)</option>
              <option value={3}>H3</option>
            </select>
          </label>
          <label className="flex items-center gap-1 font-semibold">
            <span>Max Depth:</span>
            <select
              value={maxLevel}
              onChange={(e) => setMaxLevel(Number(e.target.value))}
              className="rounded border border-black/15 bg-white px-2 py-1 dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value={3}>H3</option>
              <option value={4}>H4 (Default)</option>
              <option value={6}>H6 (All)</option>
            </select>
          </label>
        </div>
        <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!toc}>
          {copied ? "✓ Copied TOC" : "Copy TOC Markdown"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Source Markdown Document:
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Paste Markdown document here..."
            rows={12}
            className="w-full rounded-xl border border-black/15 bg-transparent p-4 font-mono text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Generated Table of Contents (TOC):
          </label>
          <textarea
            readOnly
            value={toc || "No headings found within selected H-depth limits."}
            rows={12}
            className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-4 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
          />
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
