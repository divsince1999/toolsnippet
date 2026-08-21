"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const INVISIBLE_CHARS: { code: string; name: string; hex: string; regex: RegExp }[] = [
  { code: "\u200B", name: "Zero-Width Space (ZWSP)", hex: "U+200B", regex: /\u200B/g },
  { code: "\u200C", name: "Zero-Width Non-Joiner (ZWNJ)", hex: "U+200C", regex: /\u200C/g },
  { code: "\u200D", name: "Zero-Width Joiner (ZWJ)", hex: "U+200D", regex: /\u200D/g },
  { code: "\uFEFF", name: "Byte Order Mark / ZWNBSP", hex: "U+FEFF", regex: /\uFEFF/g },
  { code: "\u00AD", name: "Soft Hyphen (SHY)", hex: "U+00AD", regex: /\u00AD/g },
  { code: "\u00A0", name: "Non-Breaking Space (NBSP)", hex: "U+00A0", regex: /\u00A0/g },
  { code: "\u200E", name: "Left-to-Right Mark (LRM)", hex: "U+200E", regex: /\u200E/g },
  { code: "\u200F", name: "Right-to-Left Mark (RLM)", hex: "U+200F", regex: /\u200F/g }
];

const SAMPLE_TEXT = "Hello\u200BWorld!\u00A0This text contains hidden\uFEFFzero-width\u200Dcharacters.";

export default function InvisibleCharacterDetector() {
  const [input, setInput] = useState(SAMPLE_TEXT);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    if (!input) return { totalFound: 0, cleaned: "", breakdown: [] };

    let totalFound = 0;
    const breakdown = INVISIBLE_CHARS.map((charDef) => {
      const matches = input.match(charDef.regex);
      const count = matches ? matches.length : 0;
      totalFound += count;
      return { ...charDef, count };
    }).filter((b) => b.count > 0);

    // Cleaned version
    let cleaned = input;
    for (const charDef of INVISIBLE_CHARS) {
      if (charDef.hex === "U+00A0") {
        cleaned = cleaned.replace(charDef.regex, " "); // replace NBSP with standard space
      } else {
        cleaned = cleaned.replace(charDef.regex, "");
      }
    }

    return { totalFound, cleaned, breakdown };
  }, [input]);

  const handleCopyCleaned = () => {
    navigator.clipboard.writeText(analysis.cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer title="Zero-Width & Invisible Character Detector" description="Detect, reveal, and remove hidden zero-width spaces, soft hyphens, and invisible Unicode control characters.">
      <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Invisible Chars Found</span>
          <p className={`text-2xl font-bold ${analysis.totalFound > 0 ? "text-rose-600" : "text-emerald-600"}`}>
            {analysis.totalFound}
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Total String Length</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{input.length}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Cleaned String Length</span>
          <p className="text-2xl font-bold text-primary-solid">{analysis.cleaned.length}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Input Text / Code:</label>
          <Button variant="secondary" size="sm" onClick={() => setInput("")}>Clear</Button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text or code snippet here..."
          rows={5}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 font-mono text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
      </div>

      {analysis.breakdown.length > 0 && (
        <div className="space-y-2 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 dark:border-rose-500/40">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            Detected Invisible Characters Breakdown:
          </h4>
          <div className="flex flex-wrap gap-2 pt-1">
            {analysis.breakdown.map((b) => (
              <span
                key={b.hex}
                className="rounded-lg bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-900 dark:bg-rose-900/40 dark:text-rose-200"
              >
                {b.name} ({b.hex}): <strong>{b.count}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Cleaned Text (Zero-Width Characters Stripped):
          </label>
          <Button variant="secondary" size="sm" onClick={handleCopyCleaned} disabled={!analysis.cleaned}>
            {copied ? "✓ Copied Clean Text" : "Copy Clean Text"}
          </Button>
        </div>
        <textarea
          readOnly
          value={analysis.cleaned}
          rows={5}
          className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-4 font-mono text-xs outline-none dark:border-white/10 dark:bg-white/[0.02]"
        />
      </div>
      </div>
    </ToolContainer>
  );
}
