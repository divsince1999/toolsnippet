"use client";

import { useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonSizeAnalyzerTool() {
  const { input, setInput, clearAll } = useTool();

  const analysis = useMemo(() => {
    if (!input.trim()) return null;

    try {
      const parsed = JSON.parse(input);
      const rawBytes = new Blob([input]).size;
      const minifiedStr = JSON.stringify(parsed);
      const minifiedBytes = new Blob([minifiedStr]).size;
      const estimatedGzip = Math.round(minifiedBytes * 0.35); // standard ~65% compression ratio estimate

      let totalKeys = 0;
      let totalArrays = 0;
      let totalObjects = 0;
      let maxDepth = 0;

      const traverse = (node: unknown, depth: number) => {
        maxDepth = Math.max(maxDepth, depth);

        if (Array.isArray(node)) {
          totalArrays++;
          node.forEach((item) => traverse(item, depth + 1));
        } else if (typeof node === "object" && node !== null) {
          totalObjects++;
          const entries = Object.entries(node);
          totalKeys += entries.length;
          entries.forEach(([, val]) => traverse(val, depth + 1));
        }
      };

      traverse(parsed, 1);

      const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
      };

      return {
        valid: true,
        rawBytes,
        rawFormatted: formatBytes(rawBytes),
        minifiedBytes,
        minifiedFormatted: formatBytes(minifiedBytes),
        savingsPercent: Math.round(((rawBytes - minifiedBytes) / (rawBytes || 1)) * 100),
        estimatedGzipFormatted: formatBytes(estimatedGzip),
        totalKeys,
        totalObjects,
        totalArrays,
        maxDepth,
        error: null,
      };
    } catch (err: unknown) {
      return {
        valid: false,
        error: err instanceof Error ? err.message : "Invalid JSON format",
      };
    }
  }, [input]);

  return (
    <ToolContainer
      title="JSON Size & Depth Analyzer"
      description="Inspect byte size, minified size, gzip compression estimate, total key counts, and nesting depth."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <TextArea
          label="Input JSON Payload"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"status": 200, "data": [{"id": 1, "name": "Item"}]}'
          rows={8}
        />

        <div className="flex gap-2">
          <Button variant="ghost" onClick={clearAll} disabled={!input}>
            Clear
          </Button>
        </div>

        {analysis && (
          <div>
            {!analysis.valid ? (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                <strong>Syntax Error:</strong> {analysis.error}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-black/10 p-4 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Raw Payload Size
                  </span>
                  <div className="mt-1 text-2xl font-bold font-mono text-primary">
                    {analysis.rawFormatted}
                  </div>
                  <div className="text-xs text-gray-500">{analysis.rawBytes} bytes</div>
                </div>

                <div className="rounded-xl border border-black/10 p-4 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Minified Size
                  </span>
                  <div className="mt-1 text-2xl font-bold font-mono text-primary">
                    {analysis.minifiedFormatted}
                  </div>
                  <div className="text-xs text-green-600">-{analysis.savingsPercent}% saved</div>
                </div>

                <div className="rounded-xl border border-black/10 p-4 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Estimated Gzip
                  </span>
                  <div className="mt-1 text-2xl font-bold font-mono text-primary">
                    ~{analysis.estimatedGzipFormatted}
                  </div>
                  <div className="text-xs text-gray-500">Over-the-wire estimate</div>
                </div>

                <div className="rounded-xl border border-black/10 p-4 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Nesting Depth
                  </span>
                  <div className="mt-1 text-2xl font-bold font-mono text-primary">
                    {analysis.maxDepth} levels
                  </div>
                  <div className="text-xs text-gray-500">
                    {analysis.totalKeys} keys · {analysis.totalArrays} arrays
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
