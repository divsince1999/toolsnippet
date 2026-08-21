"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MarkdownToPdfCleaner() {
  const [markdown, setMarkdown] = useState(`# Project Architecture Report\n\nThis report outlines the infrastructure and deployment strategy.\n\n# Executive Summary\n\nKey metrics and KPIs achieved during Q3.\n\n## Performance Benchmarks\n\n| Endpoint | p50 (ms) | p99 (ms) |\n| :--- | :--- | :--- |\n| /api/v1/user | 12ms | 45ms |\n| /api/v1/auth | 18ms | 62ms |\n\n# Security & Compliance\n\nDetailed audit notes.`);
  const [pageBreakLevel, setPageBreakLevel] = useState<"h1" | "h2" | "none">("h1");
  const [copied, setCopied] = useState(false);

  const cleaned = useMemo(() => {
    if (!markdown.trim()) return "";

    let text = markdown;

    if (pageBreakLevel !== "none") {
      const regex = pageBreakLevel === "h1" ? /(?<!^)\n(# [^\n]+)/g : /(?<!^)\n(#{1,2} [^\n]+)/g;
      text = text.replace(regex, "\n\n<div style=\"page-break-after: always;\"></div>\n\n$1");
    }

    return text;
  }, [markdown, pageBreakLevel]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Markdown Print & PDF Layout Optimizer"
      description="Optimize and format raw Markdown for clean PDF exports and printing with automatic page breaks and print typography."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Page Breaks:
            </span>
            <select
              value={pageBreakLevel}
              onChange={(e) => setPageBreakLevel(e.target.value as "h1" | "h2" | "none")}
              className="rounded-xl border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="h1">Before each # H1 Heading</option>
              <option value="h2">Before # H1 and ## H2 Headings</option>
              <option value="none">No Page Breaks</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Input Markdown:
            </label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                PDF-Ready Clean Markdown:
              </label>
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy Clean Markdown"}
              </Button>
            </div>
            <textarea
              readOnly
              value={cleaned}
              rows={12}
              className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 font-mono text-xs dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
