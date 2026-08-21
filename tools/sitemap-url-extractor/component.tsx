"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const SAMPLE_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.toolsnippet.com/</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.toolsnippet.com/tools</loc>
    <lastmod>2026-08-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.toolsnippet.com/tools/json-formatter</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

export default function SitemapUrlExtractor() {
  const [xml, setXml] = useState(SAMPLE_SITEMAP);
  const [format, setFormat] = useState<"urls" | "csv" | "json">("urls");
  const [copied, setCopied] = useState(false);

  const parsedData = useMemo(() => {
    if (!xml.trim()) return { count: 0, output: "" };

    const locRegex = /<loc>\s*([^<]+)\s*<\/loc>/gi;
    const urlBlockRegex = /<url>([\s\S]*?)<\/url>/gi;

    const urls: string[] = [];
    const fullItems: { loc: string; lastmod?: string; changefreq?: string; priority?: string }[] = [];

    let blockMatch;
    while ((blockMatch = urlBlockRegex.exec(xml)) !== null) {
      const block = blockMatch[1];
      const locMatch = /<loc>\s*([^<]+)\s*<\/loc>/i.exec(block);
      if (locMatch) {
        const loc = locMatch[1].trim();
        const lastmod = /<lastmod>\s*([^<]+)\s*<\/lastmod>/i.exec(block)?.[1]?.trim();
        const changefreq = /<changefreq>\s*([^<]+)\s*<\/changefreq>/i.exec(block)?.[1]?.trim();
        const priority = /<priority>\s*([^<]+)\s*<\/priority>/i.exec(block)?.[1]?.trim();

        urls.push(loc);
        fullItems.push({ loc, lastmod, changefreq, priority });
      }
    }

    // Fallback if no <url> tags (e.g. sitemapindex)
    if (urls.length === 0) {
      let locOnly;
      while ((locOnly = locRegex.exec(xml)) !== null) {
        const u = locOnly[1].trim();
        urls.push(u);
        fullItems.push({ loc: u });
      }
    }

    let output = "";
    if (format === "urls") {
      output = urls.join("\n");
    } else if (format === "csv") {
      output = [
        "URL,LastMod,ChangeFreq,Priority",
        ...fullItems.map((i) => `"${i.loc}","${i.lastmod || ""}","${i.changefreq || ""}","${i.priority || ""}"`)
      ].join("\n");
    } else {
      output = JSON.stringify(fullItems, null, 2);
    }

    return { count: urls.length, output };
  }, [xml, format]);

  const handleCopy = () => {
    navigator.clipboard.writeText(parsedData.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer title="XML Sitemap URL & Link Extractor" description="Parse XML sitemaps to extract all <loc> URLs, lastmod timestamps, and changefreq tags into CSV or URL lists.">
      <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-semibold">Export Format:</span>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "urls" | "csv" | "json")}
            className="rounded border border-black/15 bg-white px-2 py-1 dark:border-white/20 dark:bg-zinc-900 dark:text-white font-medium"
          >
            <option value="urls">Clean URL List (1 per line)</option>
            <option value="csv">CSV (URL, Date, Freq, Priority)</option>
            <option value="json">JSON Array</option>
          </select>
          <span className="rounded-full bg-primary-solid/10 px-2.5 py-0.5 font-semibold text-primary-solid">
            {parsedData.count} URLs Found
          </span>
        </div>
        <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!parsedData.output}>
          {copied ? "✓ Copied Data" : "Copy Extracted URLs"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Source XML Sitemap Content:
          </label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            placeholder="Paste <urlset> or <sitemapindex> XML content here..."
            rows={12}
            className="w-full rounded-xl border border-black/15 bg-transparent p-4 font-mono text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Extracted Links ({format.toUpperCase()}):
          </label>
          <textarea
            readOnly
            value={parsedData.output || "No <loc> tags found in provided XML."}
            rows={12}
            className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-4 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
          />
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
