"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HexColorCodeExtractor() {
  const [code, setCode] = useState(`:root {\n  --primary: #4f46e5;\n  --primary-hover: #4338ca;\n  --background: rgb(255, 255, 255);\n  --overlay: rgba(15, 23, 42, 0.75);\n  --accent: #10b981;\n  --warning: hsl(38, 92%, 50%);\n  --card: #f8fafc;\n}`);
  const [copied, setCopied] = useState<string | null>(null);

  const colors = useMemo(() => {
    if (!code.trim()) return [];

    const found = new Set<string>();

    // 1. HEX (#fff, #ffffff, #ffffff80)
    const hexMatches = code.match(/#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g) || [];
    hexMatches.forEach((c) => found.add(c.toLowerCase()));

    // 2. RGB & RGBA
    const rgbMatches = code.match(/rgba?\([^)]+\)/gi) || [];
    rgbMatches.forEach((c) => found.add(c));

    // 3. HSL & HSLA
    const hslMatches = code.match(/hsla?\([^)]+\)/gi) || [];
    hslMatches.forEach((c) => found.add(c));

    return Array.from(found);
  }, [code]);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAsCssVars = () => {
    const vars = colors.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n");
    navigator.clipboard.writeText(`:root {\n${vars}\n}`);
    setCopied("vars");
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ToolContainer
      title="CSS & Code Hex Color Extractor"
      description="Extract all HEX, RGB, RGBA, and HSL color codes from CSS, HTML, and JavaScript with live color swatch previews."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Paste CSS, HTML, SVG, or JS Code:
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={7}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Extracted Unique Colors ({colors.length}):
            </span>
            {colors.length > 0 && (
              <Button variant="secondary" size="sm" onClick={copyAsCssVars}>
                {copied === "vars" ? "Copied Variables!" : "Copy as CSS Variables"}
              </Button>
            )}
          </div>

          {colors.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {colors.map((c) => (
                <div
                  key={c}
                  onClick={() => copyColor(c)}
                  className="flex items-center gap-3 rounded-xl border border-black/10 bg-black/[0.02] p-2.5 cursor-pointer hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02] transition"
                >
                  <div
                    className="h-9 w-9 rounded-lg border border-black/10 shadow-inner shrink-0"
                    style={{ backgroundColor: c }}
                  />
                  <div className="overflow-hidden">
                    <div className="font-mono text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                      {c}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {copied === c ? "✓ Copied!" : "Click to copy"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-black/15 p-6 text-center text-xs text-gray-500 dark:border-white/15">
              No HEX, RGB, or HSL color codes detected in the input.
            </div>
          )}
        </div>
      </div>
    </ToolContainer>
  );
}
