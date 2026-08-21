"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const SAMPLE_PAIRS = `/blog/old-post /blog/new-awesome-post
/about-us /about
/products/v1 /products/latest`;

export default function RedirectRuleGenerator() {
  const [input, setInput] = useState(SAMPLE_PAIRS);
  const [server, setServer] = useState<"htaccess" | "nginx" | "nextjs" | "netlify">("htaccess");
  const [status, setStatus] = useState<"301" | "302">("301");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";

    const lines = input
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith("#"));

    const pairs: { from: string; to: string }[] = [];
    for (const line of lines) {
      const parts = line.split(/[\s,;\t]+/).filter(Boolean);
      if (parts.length >= 2) {
        pairs.push({ from: parts[0], to: parts[1] });
      }
    }

    if (pairs.length === 0) return "# No valid URL pairs found. Format: /old-path /new-path";

    if (server === "htaccess") {
      return [
        `# Apache .htaccess ${status} Redirects`,
        "RewriteEngine On",
        ...pairs.map((p) => `Redirect ${status} ${p.from} ${p.to}`)
      ].join("\n");
    }

    if (server === "nginx") {
      const flag = status === "301" ? "permanent" : "redirect";
      return [
        `# Nginx ${status} Rewrite Rules`,
        ...pairs.map((p) => `rewrite ^${p.from.replace(/\./g, "\\\.")}$ ${p.to} ${flag};`)
      ].join("\n");
    }

    if (server === "nextjs") {
      const isPermanent = status === "301";
      const config = pairs.map(
        (p) => `  {\n    source: '${p.from}',\n    destination: '${p.to}',\n    permanent: ${isPermanent},\n  }`
      );
      return `// next.config.js / next.config.mjs\nexport default {\n  async redirects() {\n    return [\n${config.join(",\n")}\n    ];\n  },\n};`;
    }

    if (server === "netlify") {
      return [
        `# Netlify / Cloudflare Pages _redirects`,
        ...pairs.map((p) => `${p.from}  ${p.to}  ${status}!`)
      ].join("\n");
    }

    return "";
  }, [input, server, status]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer title="Bulk 301/302 Redirect Rule Generator" description="Generate bulk 301/302 redirects for Apache .htaccess, Nginx, Next.js config, and Cloudflare rules.">
      <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-1 font-semibold">
            <span>Target Platform:</span>
            <select
              value={server}
              onChange={(e) => setServer(e.target.value as "htaccess" | "nginx" | "nextjs" | "netlify")}
              className="rounded border border-black/15 bg-white px-2 py-1 dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="htaccess">Apache (.htaccess)</option>
              <option value="nginx">Nginx (rewrite)</option>
              <option value="nextjs">Next.js (next.config)</option>
              <option value="netlify">Netlify / Cloudflare (_redirects)</option>
            </select>
          </label>
          <label className="flex items-center gap-1 font-semibold">
            <span>Redirect Type:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "301" | "302")}
              className="rounded border border-black/15 bg-white px-2 py-1 dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="301">301 (Permanent)</option>
              <option value="302">302 (Temporary)</option>
            </select>
          </label>
        </div>
        <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
          {copied ? "✓ Copied Rules" : "Copy Configuration"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Source URL Pairs (/old-path /new-path):
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="/old-url /new-url"
            rows={10}
            className="w-full rounded-xl border border-black/15 bg-transparent p-4 font-mono text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Generated Web Server Rules:
          </label>
          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-4 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
          />
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
