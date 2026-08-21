"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ScreenPpiCalculator() {
  const [width, setWidth] = useState(2560);
  const [height, setHeight] = useState(1440);
  const [diagonal, setDiagonal] = useState(27);

  const results = useMemo(() => {
    if (width <= 0 || height <= 0 || diagonal <= 0) return null;

    const diagPixels = Math.sqrt(width ** 2 + height ** 2);
    const ppi = Math.round((diagPixels / diagonal) * 100) / 100;
    const ppcm = Math.round((ppi / 2.54) * 100) / 100;
    const dotPitchMm = Math.round((25.4 / ppi) * 10000) / 10000;
    const megapixels = Math.round(((width * height) / 1000000) * 100) / 100;

    let rating = "Standard Desktop";
    if (ppi >= 300) rating = "Ultra-High Retina (Smartphone / Tablet)";
    else if (ppi >= 200) rating = "Retina HiDPI (Laptop / 4K Monitor)";
    else if (ppi >= 100) rating = "Crisp Desktop Display";
    else rating = "Low Pixel Density";

    return {
      ppi,
      ppcm,
      dotPitchMm,
      megapixels,
      diagPixels: Math.round(diagPixels),
      rating
    };
  }, [width, height, diagonal]);

  return (
    <ToolContainer
      title="Screen PPI & Pixel Density Calculator"
      description="Calculate screen Pixels Per Inch (PPI), dot pitch, pixel density, and total megapixels from display resolution and size."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Width (Pixels):
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Height (Pixels):
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Diagonal Size (Inches):
            </label>
            <input
              type="number"
              step="0.1"
              value={diagonal}
              onChange={(e) => setDiagonal(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400">Popular Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { name: "24-inch 1080p FHD", w: 1920, h: 1080, d: 24 },
              { name: "27-inch 1440p QHD", w: 2560, h: 1440, d: 27 },
              { name: "27-inch 4K UHD", w: 3840, h: 2160, d: 27 },
              { name: "14.2-inch MacBook Pro", w: 3024, h: 1964, d: 14.2 },
              { name: "6.1-inch Smartphone", w: 2556, h: 1179, d: 6.1 }
            ].map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  setWidth(preset.w);
                  setHeight(preset.h);
                  setDiagonal(preset.d);
                }}
                className="rounded-lg border border-black/10 bg-white/50 px-2.5 py-1 text-[11px] font-medium hover:border-primary-solid dark:border-white/10 dark:bg-zinc-900/50"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Card */}
        {results && (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Pixel Density (PPI):</span>
                <div className="text-4xl font-extrabold text-primary-solid font-mono">{results.ppi} PPI</div>
              </div>
              <div className="rounded-xl border border-primary-solid/30 bg-primary-solid/10 px-3 py-1.5 text-xs font-semibold text-primary-solid">
                {results.rating}
              </div>
            </div>

            <div className="grid gap-3 pt-3 border-t border-black/10 dark:border-white/10 sm:grid-cols-3 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Dot Pitch:</span>
                <div className="font-mono text-sm font-bold">{results.dotPitchMm} mm</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">PPCM:</span>
                <div className="font-mono text-sm font-bold">{results.ppcm} pixels/cm</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total Resolution:</span>
                <div className="font-mono text-sm font-bold">{results.megapixels} Megapixels</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
