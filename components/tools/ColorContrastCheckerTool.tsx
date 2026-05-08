"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function ColorContrastCheckerTool() {
  const [foreground, setForeground] = useState("#FFFFFF");
  const [background, setBackground] = useState("#3B82F6");

  const getRGB = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrast = (hex1: string, hex2: string) => {
    const lum1 = getLuminance(...(getRGB(hex1) as [number, number, number]));
    const lum2 = getLuminance(...(getRGB(hex2) as [number, number, number]));
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const contrast = getContrast(foreground, background);
  const ratio = contrast.toFixed(2);

  const results = {
    aaNormal: contrast >= 4.5,
    aaLarge: contrast >= 3,
    aaaNormal: contrast >= 7,
    aaaLarge: contrast >= 4.5,
  };

  return (
    <ToolContainer title="Color Contrast Checker" description="Check text accessibility (WCAG) contrast ratios.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Text Color (Foreground)</label>
              <div className="flex gap-2">
                <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value.toUpperCase())} className="h-10 w-12 cursor-pointer bg-transparent" />
                <input type="text" value={foreground} onChange={(e) => setForeground(e.target.value.toUpperCase())} className="flex-1 rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Background Color</label>
              <div className="flex gap-2">
                <input type="color" value={background} onChange={(e) => setBackground(e.target.value.toUpperCase())} className="h-10 w-12 cursor-pointer bg-transparent" />
                <input type="text" value={background} onChange={(e) => setBackground(e.target.value.toUpperCase())} className="flex-1 rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
              </div>
            </div>
          </div>

          <div className="p-12 rounded-xl flex items-center justify-center text-center transition-colors duration-300" style={{ backgroundColor: background, color: foreground }}>
            <div>
              <div className="text-4xl font-bold mb-2">Sample Text</div>
              <p className="text-sm opacity-90">The quick brown fox jumps over the lazy dog.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
            <div className="text-sm text-gray-500 mb-1">Contrast Ratio</div>
            <div className="text-5xl font-black text-primary">{ratio}:1</div>
          </div>

          <div className="grid gap-4">
            <div className={`p-4 rounded-lg border flex items-center justify-between ${results.aaNormal ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
              <div className="font-medium">WCAG AA (Normal Text)</div>
              <div className={`text-sm font-bold ${results.aaNormal ? 'text-green-600' : 'text-red-600'}`}>{results.aaNormal ? 'PASS' : 'FAIL'}</div>
            </div>
            <div className={`p-4 rounded-lg border flex items-center justify-between ${results.aaaNormal ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
              <div className="font-medium">WCAG AAA (Normal Text)</div>
              <div className={`text-sm font-bold ${results.aaaNormal ? 'text-green-600' : 'text-red-600'}`}>{results.aaaNormal ? 'PASS' : 'FAIL'}</div>
            </div>
            <div className={`p-4 rounded-lg border flex items-center justify-between ${results.aaLarge ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
              <div className="font-medium">WCAG AA (Large Text)</div>
              <div className={`text-sm font-bold ${results.aaLarge ? 'text-green-600' : 'text-red-600'}`}>{results.aaLarge ? 'PASS' : 'FAIL'}</div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
