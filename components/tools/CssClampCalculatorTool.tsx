"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssClampCalculatorTool() {
  const [minVw, setMinVw] = useState(375);
  const [maxVw, setMaxVw] = useState(1440);
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(36);
  const [rootFontSize, setRootFontSize] = useState(16);
  const [previewVw, setPreviewVw] = useState(768);
  const [isCopied, setIsCopied] = useState(false);

  const clampResult = useMemo(() => {
    // Slope calculation
    const slope = (maxSize - minSize) / (maxVw - minVw);
    const yAxisIntersection = -minVw * slope + minSize;

    const minRem = (minSize / rootFontSize).toFixed(4).replace(/\.?0+$/, "") + "rem";
    const maxRem = (maxSize / rootFontSize).toFixed(4).replace(/\.?0+$/, "") + "rem";
    const vwVal = (slope * 100).toFixed(4).replace(/\.?0+$/, "") + "vw";
    const yRem = (yAxisIntersection / rootFontSize).toFixed(4).replace(/\.?0+$/, "") + "rem";

    const clampStr = `clamp(${minRem}, ${yRem} + ${vwVal}, ${maxRem})`;

    // Current preview size in px
    const computedSize = Math.max(minSize, Math.min(maxSize, slope * previewVw + yAxisIntersection));

    return {
      clampStr,
      cssProperty: `font-size: ${clampStr};`,
      computedPx: computedSize.toFixed(1),
    };
  }, [minVw, maxVw, minSize, maxSize, rootFontSize, previewVw]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(clampResult.cssProperty);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Clamp() Typography Calculator"
      description="Generate fluid responsive font-size and spacing values using modern CSS clamp() formulas."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Min Viewport Width (px)
              </label>
              <input
                type="number"
                value={minVw}
                onChange={(e) => setMinVw(Number(e.target.value))}
                className="w-full rounded-lg border border-black/15 bg-transparent p-2.5 font-mono text-sm dark:border-white/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Max Viewport Width (px)
              </label>
              <input
                type="number"
                value={maxVw}
                onChange={(e) => setMaxVw(Number(e.target.value))}
                className="w-full rounded-lg border border-black/15 bg-transparent p-2.5 font-mono text-sm dark:border-white/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Min Value / Font Size (px)
              </label>
              <input
                type="number"
                value={minSize}
                onChange={(e) => setMinSize(Number(e.target.value))}
                className="w-full rounded-lg border border-black/15 bg-transparent p-2.5 font-mono text-sm dark:border-white/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Max Value / Font Size (px)
              </label>
              <input
                type="number"
                value={maxSize}
                onChange={(e) => setMaxSize(Number(e.target.value))}
                className="w-full rounded-lg border border-black/15 bg-transparent p-2.5 font-mono text-sm dark:border-white/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Root Font Size (default 16px = 1rem)
            </label>
            <input
              type="number"
              value={rootFontSize}
              onChange={(e) => setRootFontSize(Number(e.target.value))}
              className="w-full rounded-lg border border-black/15 bg-transparent p-2.5 font-mono text-sm dark:border-white/20"
            />
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Preview Viewport Width</span>
              <span className="font-mono">{previewVw}px</span>
            </div>
            <input
              type="range"
              min={minVw}
              max={maxVw}
              value={previewVw}
              onChange={(e) => setPreviewVw(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-black/10 p-6 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center overflow-hidden">
            <div
              className="font-bold text-gray-900 dark:text-white transition-all leading-tight max-w-full break-words overflow-hidden"
              style={{ fontSize: `${clampResult.computedPx}px` }}
            >
              Fluid Typography
            </div>
            <div className="mt-3 text-xs font-mono text-gray-500">
              Rendered Size @ {previewVw}px viewport: <span className="font-bold text-primary">{clampResult.computedPx}px</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy clamp() CSS"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={clampResult.cssProperty}
              rows={2}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
