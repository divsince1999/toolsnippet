"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ReadmeBadgeGenerator() {
  const [label, setLabel] = useState("npm");
  const [message, setMessage] = useState("v1.0.0");
  const [color, setColor] = useState("4f46e5");
  const [style, setStyle] = useState<"flat" | "flat-square" | "for-the-badge">("flat");
  const [linkUrl, setLinkUrl] = useState("https://npmjs.com/package/my-package");
  const [copied, setCopied] = useState(false);

  const badgeUrl = useMemo(() => {
    const l = encodeURIComponent(label.trim());
    const m = encodeURIComponent(message.trim());
    const c = color.replace("#", "").trim() || "4f46e5";
    return `https://img.shields.io/badge/${l}-${m}-${c}?style=${style}`;
  }, [label, message, color, style]);

  const markdownSnippet = useMemo(() => {
    return `[![${label}](${badgeUrl})](${linkUrl})`;
  }, [label, badgeUrl, linkUrl]);

  const applyPreset = (l: string, m: string, c: string) => {
    setLabel(l);
    setMessage(m);
    setColor(c);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="README & GitHub Shields Badge Generator"
      description="Generate shields.io status badges for GitHub README files including npm version, build status, license, and stars."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Quick Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "npm Version", l: "npm", m: "v1.0.0", c: "cb3837", url: "https://npmjs.com/package/my-package" },
              { name: "Build Passing", l: "build", m: "passing", c: "10b981", url: "https://github.com" },
              { name: "MIT License", l: "license", m: "MIT", c: "3b82f6", url: "https://opensource.org/licenses/MIT" },
              { name: "ToolSnippet Verified", l: "tools", m: "ToolSnippet", c: "4f46e5", url: "https://www.toolsnippet.com" },
              { name: "Coverage 98%", l: "coverage", m: "98%", c: "22c55e", url: "https://codecov.io" },
              { name: "TypeScript Ready", l: "TypeScript", m: "Ready", c: "3178c6", url: "https://www.typescriptlang.org" }
            ].map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  applyPreset(p.l, p.m, p.c);
                  if (p.url) setLinkUrl(p.url);
                }}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">Label:</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">Message:</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">Color (Hex):</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">Style:</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as "flat" | "flat-square" | "for-the-badge")}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="for-the-badge">For The Badge</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-gray-500">Target Link URL:</label>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Badge Live Preview:
            </span>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Markdown"}
            </Button>
          </div>

          <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-black/10 dark:border-white/10 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badgeUrl} alt={label} className="h-6" />
          </div>

          <div className="space-y-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">Markdown Code:</span>
            <pre className="p-3 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl font-mono text-xs text-gray-900 dark:text-gray-100 overflow-x-auto">
              {markdownSnippet}
            </pre>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
