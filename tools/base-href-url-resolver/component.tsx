"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BaseHrefUrlResolver() {
  const [baseUrl, setBaseUrl] = useState("https://example.com/docs/getting-started/");
  const [relUrls, setRelUrls] = useState("../api/overview\n/assets/logo.png\n?version=v2#installation\n./setup");
  const [copied, setCopied] = useState(false);

  const resolvedList = useMemo(() => {
    if (!baseUrl.trim()) return [];

    try {
      const base = new URL(baseUrl.trim());
      const lines = relUrls.split("\n").map((l) => l.trim()).filter(Boolean);

      return lines.map((rel) => {
        try {
          const absolute = new URL(rel, base).href;
          return { rel, absolute, error: "" };
        } catch {
          return { rel, absolute: "", error: "Invalid relative URL" };
        }
      });
    } catch {
      return [{ rel: "", absolute: "", error: "Invalid Base URL" }];
    }
  }, [baseUrl, relUrls]);

  const handleCopy = () => {
    const text = resolvedList.map((item) => item.absolute).filter(Boolean).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Base Href & Relative URL Resolver"
      description="Resolve relative links and path references against a base URL according to the RFC 3986 specification."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Base URL:
          </label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Relative URLs (One per line):
            </label>
            <textarea
              value={relUrls}
              onChange={(e) => setRelUrls(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Resolved Absolute URLs:
              </label>
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy All Absolute URLs"}
              </Button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {resolvedList.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-black/10 bg-black/[0.02] p-3 text-xs dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <div className="text-[10px] text-gray-500 font-mono mb-0.5">Input: {item.rel}</div>
                  {item.error ? (
                    <div className="text-rose-600 dark:text-rose-400 font-mono">{item.error}</div>
                  ) : (
                    <div className="font-mono font-bold text-primary-solid break-all">{item.absolute}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
