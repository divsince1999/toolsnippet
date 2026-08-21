"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MetaRobotsTagGenerator() {
  const [noindex, setNoindex] = useState(false);
  const [nofollow, setNofollow] = useState(false);
  const [noarchive, setNoarchive] = useState(false);
  const [nosnippet, setNosnippet] = useState(false);
  const [noimageindex, setNoimageindex] = useState(false);
  const [maxImagePreview, setMaxImagePreview] = useState<"none" | "standard" | "large">("large");
  const [copied, setCopied] = useState<string | null>(null);

  const directives = useMemo(() => {
    const list: string[] = [];
    if (noindex) list.push("noindex");
    else list.push("index");

    if (nofollow) list.push("nofollow");
    else list.push("follow");

    if (noarchive) list.push("noarchive");
    if (nosnippet) list.push("nosnippet");
    if (noimageindex) list.push("noimageindex");

    if (!nosnippet) {
      if (maxImagePreview !== "standard") {
        list.push(`max-image-preview:${maxImagePreview}`);
      }
    }

    const contentStr = list.join(", ");
    const htmlMeta = `<meta name="robots" content="${contentStr}" />\n<meta name="googlebot" content="${contentStr}" />`;
    const httpHeader = `X-Robots-Tag: ${contentStr}`;
    const nginxHeader = `add_header X-Robots-Tag "${contentStr}";`;
    const apacheHeader = `Header set X-Robots-Tag "${contentStr}"`;

    return { contentStr, htmlMeta, httpHeader, nginxHeader, apacheHeader };
  }, [noindex, nofollow, noarchive, nosnippet, noimageindex, maxImagePreview]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolContainer title="Meta Robots & X-Robots-Tag Generator" description="Generate granular HTML meta robots directives (noindex, nofollow, nosnippet) and HTTP X-Robots-Tag response headers.">
      <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Indexing Directives:
          </label>
          <div className="space-y-2 rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={noindex}
                onChange={(e) => setNoindex(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span><strong>noindex</strong> (Do not show in search results)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={nofollow}
                onChange={(e) => setNofollow(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span><strong>nofollow</strong> (Do not follow links on this page)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={noarchive}
                onChange={(e) => setNoarchive(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span><strong>noarchive</strong> (Do not show cached link in search)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={nosnippet}
                onChange={(e) => setNosnippet(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span><strong>nosnippet</strong> (Do not show snippet or video preview)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={noimageindex}
                onChange={(e) => setNoimageindex(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span><strong>noimageindex</strong> (Do not index images on page)</span>
            </label>
          </div>

          <div className="space-y-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold">max-image-preview:</label>
              <select
                value={maxImagePreview}
                onChange={(e) => setMaxImagePreview(e.target.value as "none" | "standard" | "large")}
                className="rounded border border-black/15 bg-white px-2 py-1 dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              >
                <option value="large">large (Google Discover Optimal)</option>
                <option value="standard">standard</option>
                <option value="none">none</option>
              </select>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                HTML Meta Tag:
              </label>
              <Button variant="secondary" size="sm" onClick={() => handleCopy(directives.htmlMeta, "html")}>
                {copied === "html" ? "✓ Copied" : "Copy HTML"}
              </Button>
            </div>
            <textarea
              readOnly
              value={directives.htmlMeta}
              rows={3}
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-3 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Nginx Header:
              </label>
              <Button variant="secondary" size="sm" onClick={() => handleCopy(directives.nginxHeader, "nginx")}>
                {copied === "nginx" ? "✓ Copied" : "Copy Nginx"}
              </Button>
            </div>
            <textarea
              readOnly
              value={directives.nginxHeader}
              rows={2}
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-3 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Apache .htaccess Header:
              </label>
              <Button variant="secondary" size="sm" onClick={() => handleCopy(directives.apacheHeader, "apache")}>
                {copied === "apache" ? "✓ Copied" : "Copy Apache"}
              </Button>
            </div>
            <textarea
              readOnly
              value={directives.apacheHeader}
              rows={2}
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-3 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
            />
          </div>
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
