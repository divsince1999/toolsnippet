"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const GENERIC_SET = new Set([
  "click here", "read more", "learn more", "visit website", "website", "here", "source", "link",
  "this article", "this page", "check this out", "more info", "details", "official site"
]);

const SAMPLE_ANCHORS = `ToolSnippet
toolsnippet.com
best developer tools
free online tools at ToolSnippet
click here
https://www.toolsnippet.com/
developer tools suite
read more
ToolSnippet tools`;

export default function AnchorTextOptimizer() {
  const [anchorsText, setAnchorsText] = useState(SAMPLE_ANCHORS);
  const [brand, setBrand] = useState("ToolSnippet");
  const [keyword, setKeyword] = useState("developer tools");

  const metrics = useMemo(() => {
    if (!anchorsText.trim()) {
      return { total: 0, exact: 0, partial: 0, branded: 0, generic: 0, naked: 0, items: [] };
    }

    const lines = anchorsText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const bLower = brand.trim().toLowerCase();
    const kLower = keyword.trim().toLowerCase();

    let exact = 0;
    let partial = 0;
    let branded = 0;
    let generic = 0;
    let naked = 0;

    const items = lines.map((anchor) => {
      const aLower = anchor.toLowerCase();
      let type: "Exact" | "Partial" | "Branded" | "Generic" | "Naked" = "Generic";

      if (/^(https?:\/\/|www\.)/i.test(anchor) || aLower.endsWith(".com") || aLower.endsWith(".io") || aLower.endsWith(".org")) {
        type = "Naked";
        naked++;
      } else if (kLower && aLower === kLower) {
        type = "Exact";
        exact++;
      } else if (bLower && (aLower === bLower || aLower.includes(bLower))) {
        type = "Branded";
        branded++;
      } else if (kLower && aLower.includes(kLower)) {
        type = "Partial";
        partial++;
      } else if (GENERIC_SET.has(aLower)) {
        type = "Generic";
        generic++;
      } else {
        type = "Partial";
        partial++;
      }

      return { anchor, type };
    });

    const total = lines.length;
    return { total, exact, partial, branded, generic, naked, items };
  }, [anchorsText, brand, keyword]);

  const getPct = (count: number) => (metrics.total > 0 ? ((count / metrics.total) * 100).toFixed(1) : "0");

  return (
    <ToolContainer title="Anchor Text Diversity & SEO Optimizer" description="Classify anchor texts into Exact, Partial, Branded, Generic, and Naked URLs to audit link profile balance.">
      <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Target Brand Name:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Target Primary Keyword:</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-[11px] text-gray-500">Branded</span>
          <p className="text-xl font-bold text-primary-solid">{getPct(metrics.branded)}%</p>
          <span className="text-[10px] text-gray-400">{metrics.branded} links</span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-[11px] text-gray-500">Naked URL</span>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{getPct(metrics.naked)}%</p>
          <span className="text-[10px] text-gray-400">{metrics.naked} links</span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-[11px] text-gray-500">Partial Match</span>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{getPct(metrics.partial)}%</p>
          <span className="text-[10px] text-gray-400">{metrics.partial} links</span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-[11px] text-gray-500">Generic</span>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{getPct(metrics.generic)}%</p>
          <span className="text-[10px] text-gray-400">{metrics.generic} links</span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-[11px] text-gray-500">Exact Match</span>
          <p className={`text-xl font-bold ${Number(getPct(metrics.exact)) > 20 ? "text-amber-600" : "text-emerald-600"}`}>
            {getPct(metrics.exact)}%
          </p>
          <span className="text-[10px] text-gray-400">{metrics.exact} links</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Anchor Text List (1 per line):</label>
          <Button variant="secondary" size="sm" onClick={() => setAnchorsText("")}>Clear</Button>
        </div>
        <textarea
          value={anchorsText}
          onChange={(e) => setAnchorsText(e.target.value)}
          placeholder="Paste anchor text list..."
          rows={6}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 text-xs font-mono outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
      </div>
      </div>
    </ToolContainer>
  );
}
