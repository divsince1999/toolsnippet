"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SqlQueryMinifier() {
  const [sql, setSql] = useState(`-- Select Active Users with recent orders\nSELECT \n    u.id,\n    u.email,\n    COUNT(o.id) AS total_orders\nFROM users u\n/* Join active orders */\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE u.status = 'active'\nGROUP BY u.id, u.email\nHAVING COUNT(o.id) > 5\nORDER BY total_orders DESC;`);
  const [copied, setCopied] = useState(false);

  const minified = useMemo(() => {
    if (!sql.trim()) return "";

    let text = sql;
    // Remove multi-line comments /* ... */
    text = text.replace(/\/\*[\s\S]*?\*\//g, "");
    // Remove single line comments -- ...
    text = text.replace(/--.*$/gm, "");
    // Replace multiple whitespaces and newlines with single space
    text = text.replace(/\s+/g, " ").trim();

    return text;
  }, [sql]);

  const stats = useMemo(() => {
    const rawLen = sql.length;
    const minLen = minified.length;
    const saved = rawLen > 0 ? Math.round(((rawLen - minLen) / rawLen) * 100) : 0;
    return { rawLen, minLen, saved };
  }, [sql, minified]);

  const handleCopy = () => {
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="SQL Query Minifier & Single-Line Optimizer"
      description="Minify SQL queries by removing comments, collapsing whitespace, and compressing queries for embedded application strings."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Input SQL Query:
          </label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={7}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Minified Single-Line SQL:
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                -{stats.saved}% size reduction ({stats.rawLen} ➔ {stats.minLen} chars)
              </span>
            </div>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Minified SQL"}
            </Button>
          </div>
          <textarea
            readOnly
            value={minified}
            rows={4}
            className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 font-mono text-xs dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100"
          />
        </div>
      </div>
    </ToolContainer>
  );
}
