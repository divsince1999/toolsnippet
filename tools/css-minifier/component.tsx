"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

function minifyCssAdvanced(
  css: string,
  options: { removeComments: boolean; shortenHex: boolean; stripZeroUnits: boolean; removeTrailingSemi: boolean }
): string {
  if (!css.trim()) return "";
  let result = css;

  // 1. Remove comments
  if (options.removeComments) {
    result = result.replace(/\/\*[\s\S]*?\*\//g, "");
  }

  // 2. Collapse whitespace
  result = result.replace(/\s+/g, " ");

  // 3. Remove spaces around symbols
  result = result.replace(/\s*([\{\}:;,>+~])\s*/g, "$1");

  // 4. Strip zero units (0px, 0em, 0rem, 0% -> 0)
  if (options.stripZeroUnits) {
    result = result.replace(/(?<=[\s:(,])0(?:px|em|rem|%|vh|vw|pt|cm|mm|in)(?=[\s;,)!}])/gi, "0");
  }

  // 5. Shorten hex colors (#ffffff -> #fff, #000000 -> #000)
  if (options.shortenHex) {
    result = result.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3(?![0-9a-fA-F])/g, "#$1$2$3");
  }

  // 6. Remove trailing semicolons before closing brace
  if (options.removeTrailingSemi) {
    result = result.replace(/;(?=\})/g, "");
  }

  return result.trim();
}

const SAMPLE_CSS = `/* ToolSnippet Primary Stylesheet */
:root {
  --primary-color: #4f46e5;
  --secondary-color: #06b6d4;
  --font-base: 16px;
  --line-height: 1.5;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px 0px;
  padding: 24px 32px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.025em;
  margin-bottom: 12px;
}`;

export default function CssMinifierTool() {
  const [inputCss, setInputCss] = useState(SAMPLE_CSS);
  const [removeComments, setRemoveComments] = useState(true);
  const [shortenHex, setShortenHex] = useState(true);
  const [stripZeroUnits, setStripZeroUnits] = useState(true);
  const [removeTrailingSemi, setRemoveTrailingSemi] = useState(true);
  const [copied, setCopied] = useState(false);

  const minified = useMemo(() => {
    return minifyCssAdvanced(inputCss, {
      removeComments,
      shortenHex,
      stripZeroUnits,
      removeTrailingSemi,
    });
  }, [inputCss, removeComments, shortenHex, stripZeroUnits, removeTrailingSemi]);

  const originalBytes = new Blob([inputCss]).size;
  const minifiedBytes = new Blob([minified]).size;
  const savedBytes = Math.max(0, originalBytes - minifiedBytes);
  const savedPercent = originalBytes > 0 ? Math.round((savedBytes / originalBytes) * 100) : 0;

  const handleCopy = () => {
    if (minified) {
      navigator.clipboard.writeText(minified);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!minified) return;
    const blob = new Blob([minified], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "styles.min.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolContainer
      title="CSS Minifier & Compressor"
      description="Minify and compress CSS stylesheets in real-time with customizable compression rules and instant byte savings calculation."
    >
      <div className="space-y-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-black/10 bg-white p-4 text-center dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Original Size</span>
            <div className="mt-1 font-mono text-lg font-bold text-gray-900 dark:text-white">
              {originalBytes.toLocaleString()} B
            </div>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-4 text-center dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Minified Size</span>
            <div className="mt-1 font-mono text-lg font-bold text-primary-solid">
              {minifiedBytes.toLocaleString()} B
            </div>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-4 text-center dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Bytes Saved</span>
            <div className="mt-1 font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
              -{savedBytes.toLocaleString()} B
            </div>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-4 text-center dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Reduction</span>
            <div className="mt-1 font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {savedPercent}% Saved
            </div>
          </div>
        </div>

        {/* Compression Options */}
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3.5 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Minification Rules:</span>
            <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={removeComments}
                onChange={(e) => setRemoveComments(e.target.checked)}
                className="rounded accent-primary-solid"
              />
              Strip Comments
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={shortenHex}
                onChange={(e) => setShortenHex(e.target.checked)}
                className="rounded accent-primary-solid"
              />
              Shorten Hex Colors
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={stripZeroUnits}
                onChange={(e) => setStripZeroUnits(e.target.checked)}
                className="rounded accent-primary-solid"
              />
              Strip Zero Units
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={removeTrailingSemi}
                onChange={(e) => setRemoveTrailingSemi(e.target.checked)}
                className="rounded accent-primary-solid"
              />
              Remove Trailing Semicolons
            </label>
          </div>
        </div>

        {/* 2-Column Workstation */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Input CSS:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInputCss(SAMPLE_CSS)}
                  className="text-xs text-primary-solid hover:underline"
                >
                  Load Sample
                </button>
                <button
                  type="button"
                  onClick={() => setInputCss("")}
                  className="text-xs text-gray-500 hover:text-rose-500"
                >
                  Clear
                </button>
              </div>
            </div>
            <TextArea
              value={inputCss}
              onChange={(e) => setInputCss(e.target.value)}
              placeholder="Paste raw CSS stylesheet here..."
              rows={16}
              className="font-mono text-xs"
            />
          </div>

          {/* Right Column: Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Minified CSS Output:
              </label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!minified} className="h-7 text-xs">
                  {copied ? "✓ Copied" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={!minified} className="h-7 text-xs">
                  Download .min.css
                </Button>
              </div>
            </div>
            <TextArea
              value={minified}
              readOnly
              placeholder="Minified CSS will appear here in real time..."
              rows={16}
              className="bg-black/[0.02] font-mono text-xs dark:bg-white/[0.02]"
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
