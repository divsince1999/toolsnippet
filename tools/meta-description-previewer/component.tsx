"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MetaDescriptionPreviewer() {
  const [title, setTitle] = useState("10 Best Developer Tools for 2026 | Free Online Utilities");
  const [description, setDescription] = useState("Discover fast, secure, and free online developer tools. Format JSON, SQL, convert data formats, generate cryptographic keys, and test regex in browser.");
  const [url, setUrl] = useState("https://www.toolsnippet.com/tools/developer-suite");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  // Approximate pixel width calculations (proportional font simulation)
  const titleMetrics = useMemo(() => {
    const len = title.length;
    // Avg char width in Google Arial 20px is approx 9.5px
    const estPixels = Math.round(len * 9.6);
    const maxPx = viewMode === "desktop" ? 600 : 960;
    const isTruncated = estPixels > maxPx || len > 65;
    return { len, estPixels, maxPx, isTruncated };
  }, [title, viewMode]);

  const descMetrics = useMemo(() => {
    const len = description.length;
    const isUnder = len < 100;
    const isGood = len >= 120 && len <= 160;
    const isOver = len > 160;
    return { len, isUnder, isGood, isOver };
  }, [description]);

  const htmlTags = useMemo(() => {
    return `<title>${title}</title>\n<meta name="description" content="${description}" />\n<link rel="canonical" href="${url}" />`;
  }, [title, description, url]);

  const handleCopyTags = () => {
    navigator.clipboard.writeText(htmlTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer title="Google SERP Snippet & Meta Previewer" description="Simulate live Google Search desktop and mobile snippets with pixel-width measurement and truncation checks.">
      <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode("desktop")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === "desktop" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            💻 Desktop Preview
          </button>
          <button
            type="button"
            onClick={() => setViewMode("mobile")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === "mobile" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            📱 Mobile Preview
          </button>
        </div>
        <Button variant="secondary" size="sm" onClick={handleCopyTags}>
          {copied ? "✓ Copied HTML Tags" : "Copy Meta Tags"}
        </Button>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Page Title (&lt;title&gt;):</label>
            <span className={`font-mono ${titleMetrics.isTruncated ? "text-amber-600 font-bold" : "text-gray-500"}`}>
              {titleMetrics.len} chars (~{titleMetrics.estPixels}px / max {titleMetrics.maxPx}px)
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-black/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Meta Description:</label>
            <span className={`font-mono ${descMetrics.isGood ? "text-emerald-600 font-bold" : descMetrics.isOver ? "text-amber-600 font-bold" : "text-gray-500"}`}>
              {descMetrics.len} chars (Recommended: 120–160 chars)
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-black/15 bg-transparent p-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">Target Canonical URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-xl border border-black/15 bg-transparent px-4 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
      </div>

      {/* Simulated Google SERP Snippet */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Live Google SERP Card ({viewMode}):
        </label>
        <div
          className={`rounded-2xl border border-black/10 bg-white p-5 shadow-md dark:border-zinc-800 dark:bg-zinc-900 ${
            viewMode === "mobile" ? "max-w-md mx-auto" : "max-w-2xl"
          }`}
        >
          {/* Breadcrumb / URL */}
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
              ⚡
            </div>
            <div className="flex flex-col truncate">
              <span className="truncate text-xs font-medium text-gray-900 dark:text-gray-200">
                {url ? new URL(url).hostname.replace(/^www\./, "") : "toolsnippet.com"}
              </span>
              <span className="truncate text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                {url || "https://www.toolsnippet.com"}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-2 text-lg font-medium leading-snug text-[#1a0dab] hover:underline cursor-pointer dark:text-[#8ab4f8]">
            {title || "Page Title Here"}
          </h3>

          {/* Snippet Description */}
          <p className="mt-1.5 text-sm leading-relaxed text-[#4d5156] dark:text-[#bdc1c6] break-words">
            {description || "Meta description will appear here in search engine results."}
          </p>
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
