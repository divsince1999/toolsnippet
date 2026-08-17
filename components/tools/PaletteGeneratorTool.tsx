"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PaletteGeneratorTool() {
  const [baseColor, setBaseColor] = useState("#0f766e");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // HEX to HSL
  const hexToHsl = (hex: string) => {
    let clean = hex.replace("#", "");
    if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // HSL to HEX
  const hslToHex = (h: number, s: number, l: number) => {
    h = (h % 360 + 360) % 360;
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  };

  const harmonies = useMemo(() => {
    const { h, s, l } = hexToHsl(baseColor);

    return {
      complementary: [
        baseColor,
        hslToHex(h + 180, s, l),
        hslToHex(h + 180, Math.max(0, s - 20), Math.min(100, l + 20)),
        hslToHex(h, Math.max(0, s - 20), Math.min(100, l + 20)),
      ],
      analogous: [
        hslToHex(h - 30, s, l),
        baseColor,
        hslToHex(h + 30, s, l),
        hslToHex(h + 60, s, l),
      ],
      triadic: [
        baseColor,
        hslToHex(h + 120, s, l),
        hslToHex(h + 240, s, l),
        hslToHex(h + 120, s, Math.min(100, l + 15)),
      ],
      monochromatic: [
        hslToHex(h, s, Math.max(10, l - 30)),
        hslToHex(h, s, Math.max(20, l - 15)),
        baseColor,
        hslToHex(h, s, Math.min(90, l + 15)),
        hslToHex(h, s, Math.min(95, l + 30)),
      ],
    };
  }, [baseColor]);

  const copyColor = async (hex: string, key: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <ToolContainer
      title="Harmonious Color Palette Generator"
      description="Generate complementary, analogous, triadic, and monochromatic color palettes from any base color."
      maxWidth="5xl"
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs font-semibold uppercase text-gray-500">Pick Seed Color:</span>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="h-10 w-16 cursor-pointer rounded border border-black/10 p-1"
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-32 rounded border border-black/15 bg-transparent p-2 font-mono text-sm dark:border-white/20"
            />
          </div>
        </div>

        {/* Harmony Palettes */}
        <div className="space-y-6">
          {Object.entries(harmonies).map(([harmonyName, colors]) => (
            <div key={harmonyName} className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 capitalize">
                {harmonyName} Palette
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {colors.map((c, i) => {
                  const itemKey = `${harmonyName}-${i}`;
                  return (
                    <div
                      key={itemKey}
                      onClick={() => copyColor(c, itemKey)}
                      className="group cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
                    >
                      <div className="h-20 w-full transition group-hover:scale-105" style={{ backgroundColor: c }} />
                      <div className="p-2.5 text-center font-mono text-xs font-semibold flex items-center justify-between">
                        <span>{c}</span>
                        <span className="text-[10px] text-primary">
                          {copiedIndex === itemKey ? "Copied!" : "Copy"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
