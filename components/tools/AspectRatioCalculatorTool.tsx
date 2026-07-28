"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const PRESETS = [
  { label: "16:9 (Widescreen)", w: 16, h: 9 },
  { label: "4:3 (Standard)", w: 4, h: 3 },
  { label: "1:1 (Square)", w: 1, h: 1 },
  { label: "3:2 (DSLR Photo)", w: 3, h: 2 },
  { label: "2:3 (Portrait)", w: 2, h: 3 },
  { label: "9:16 (Vertical)", w: 9, h: 16 },
  { label: "21:9 (Ultrawide)", w: 21, h: 9 },
  { label: "Custom", w: 0, h: 0 },
];

export default function AspectRatioCalculatorTool() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [customW, setCustomW] = useState("16");
  const [customH, setCustomH] = useState("9");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lastChanged, setLastChanged] = useState<"width"|"height">("width");
  const [isCopied, setIsCopied] = useState(false);

  const ratio = useMemo(() => {
    const p = PRESETS[presetIdx];
    if (p.w !== 0) return { w: p.w, h: p.h };
    const cw = parseFloat(customW), ch = parseFloat(customH);
    if (!isNaN(cw) && !isNaN(ch) && cw > 0 && ch > 0) return { w: cw, h: ch };
    return null;
  }, [presetIdx, customW, customH]);

  const computed = useMemo(() => {
    if (!ratio) return null;
    if (lastChanged === "width" && width) {
      const w = parseFloat(width);
      if (!isNaN(w) && w > 0) return { width: w, height: parseFloat(((w * ratio.h) / ratio.w).toFixed(2)) };
    }
    if (lastChanged === "height" && height) {
      const h = parseFloat(height);
      if (!isNaN(h) && h > 0) return { width: parseFloat(((h * ratio.w) / ratio.h).toFixed(2)), height: h };
    }
    return null;
  }, [ratio, width, height, lastChanged]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const inputCls = "w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2 text-sm font-mono outline-none focus:border-primary";

  return (
    <ToolContainer title="Aspect Ratio Calculator" description="Calculate missing width or height from a given aspect ratio." maxWidth="4xl">
      {/* Preset selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Ratio</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setPresetIdx(i)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${presetIdx === i ? "bg-primary text-white dark:text-gray-900" : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom ratio */}
      {PRESETS[presetIdx].w === 0 && (
        <div className="mb-4 grid grid-cols-2 gap-3 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <div>
            <label className="block text-xs font-medium mb-1">Width Ratio</label>
            <input type="number" value={customW} onChange={e => setCustomW(e.target.value)} min={0.1} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Height Ratio</label>
            <input type="number" value={customH} onChange={e => setCustomH(e.target.value)} min={0.1} className={inputCls} />
          </div>
        </div>
      )}

      {/* Dimension input */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Width (px)</label>
          <input
            type="number"
            value={lastChanged === "width" ? width : (computed?.width ?? "")}
            onChange={e => { setWidth(e.target.value); setLastChanged("width"); }}
            placeholder="Enter width"
            className={inputCls + " text-base py-3"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (px)</label>
          <input
            type="number"
            value={lastChanged === "height" ? height : (computed?.height ?? "")}
            onChange={e => { setHeight(e.target.value); setLastChanged("height"); }}
            placeholder="Enter height"
            className={inputCls + " text-base py-3"}
          />
        </div>
      </div>

      {computed && ratio && (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Result</div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-xl font-bold font-mono text-primary-solid">
              {computed.width} × {computed.height}
            </div>
            <Button variant="secondary" onClick={() => copy(`${computed.width} × ${computed.height}`)}>
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Ratio: {ratio.w}:{ratio.h} · {computed.width}px wide × {computed.height}px tall
          </div>
          {/* Visual proportional preview */}
          <div className="mt-4 overflow-hidden rounded-md border border-black/10 dark:border-white/10 bg-primary/10" style={{ paddingTop: `${(ratio.h / ratio.w) * 100}%`, maxWidth: "100%", position: "relative" }}>
            <div className="absolute inset-0 flex items-center justify-center text-xs text-primary-solid font-medium">
              {ratio.w}:{ratio.h}
            </div>
          </div>
        </div>
      )}
    </ToolContainer>
  );
}
