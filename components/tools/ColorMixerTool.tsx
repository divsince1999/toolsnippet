"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function ColorMixerTool() {
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#EF4444");
  const [ratio, setRatio] = useState(0.5);

  const mix = (c1: string, c2: string, r: number) => {
    const r1 = parseInt(c1.slice(1, 3), 16);
    const g1 = parseInt(c1.slice(3, 5), 16);
    const b1 = parseInt(c1.slice(5, 7), 16);

    const r2 = parseInt(c2.slice(1, 3), 16);
    const g2 = parseInt(c2.slice(3, 5), 16);
    const b2 = parseInt(c2.slice(5, 7), 16);

    const rMix = Math.round(r1 * (1 - r) + r2 * r);
    const gMix = Math.round(g1 * (1 - r) + g2 * r);
    const bMix = Math.round(b1 * (1 - r) + b2 * r);

    return `#${rMix.toString(16).padStart(2, '0')}${gMix.toString(16).padStart(2, '0')}${bMix.toString(16).padStart(2, '0')}`.toUpperCase();
  };

  const mixedColor = mix(color1, color2, ratio);

  return (
    <ToolContainer title="Color Mixer" description="Blend two colors together at a specific ratio.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Color 1</label>
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer bg-transparent" />
              <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-xs font-mono outline-none dark:border-white/20" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Color 2</label>
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer bg-transparent" />
              <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-xs font-mono outline-none dark:border-white/20" />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium flex justify-between">
              Mix Ratio <span>{(ratio * 100).toFixed(0)}% Color 2</span>
            </label>
            <input type="range" min="0" max="1" step="0.01" value={ratio} onChange={(e) => setRatio(parseFloat(e.target.value))} className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[200px] rounded-2xl flex items-center justify-center shadow-inner border border-black/5 dark:border-white/5" style={{ backgroundColor: mixedColor }}>
            <div className="px-4 py-2 rounded-lg bg-white/90 dark:bg-black/80 backdrop-blur shadow-sm text-center">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Result</div>
              <div className="text-2xl font-black font-mono">{mixedColor}</div>
            </div>
          </div>
          <Button onClick={() => navigator.clipboard.writeText(mixedColor)}>Copy Hex Code</Button>
        </div>
      </div>
    </ToolContainer>
  );
}
