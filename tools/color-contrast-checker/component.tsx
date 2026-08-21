"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ColorContrastCheckerTool() {
  const [textColor, setTextColor] = useState("#0f766e");
  const [bgColor, setBgColor] = useState("#ffffff");

  const getLuminance = (hex: string) => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2), 16) / 255 || 0;
    const g = parseInt(clean.slice(2, 4), 16) / 255 || 0;
    const b = parseInt(clean.slice(4, 6), 16) / 255 || 0;

    const transform = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

    return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
  };

  const contrastRatio = useMemo(() => {
    const lum1 = getLuminance(textColor);
    const lum2 = getLuminance(bgColor);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Number(ratio.toFixed(2));
  }, [textColor, bgColor]);

  const swapColors = () => {
    const temp = textColor;
    setTextColor(bgColor);
    setBgColor(temp);
  };

  const aaNormal = contrastRatio >= 4.5;
  const aaLarge = contrastRatio >= 3.0;
  const aaaNormal = contrastRatio >= 7.0;
  const aaaLarge = contrastRatio >= 4.5;

  return (
    <ToolContainer
      title="WCAG Color Contrast Checker"
      description="Check color contrast compliance for text and UI elements against WCAG 2.1 AA and AAA accessibility standards."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Text / Foreground Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-black/10 p-1"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-28 rounded border border-black/15 bg-transparent p-2 font-mono text-sm dark:border-white/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-black/10 p-1"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-28 rounded border border-black/15 bg-transparent p-2 font-mono text-sm dark:border-white/20"
                />
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={swapColors}>
            ⇄ Swap Text & Background Colors
          </Button>

          {/* Quick Presets */}
          <div>
            <span className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Common Combinations
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Dark on Light", text: "#1e293b", bg: "#ffffff" },
                { label: "Light on Dark", text: "#f8fafc", bg: "#0f172a" },
                { label: "Teal on White", text: "#0f766e", bg: "#ffffff" },
                { label: "Blue on Gray", text: "#2563eb", bg: "#f1f5f9" },
              ].map((combo) => (
                <button
                  key={combo.label}
                  type="button"
                  onClick={() => {
                    setTextColor(combo.text);
                    setBgColor(combo.bg);
                  }}
                  className="rounded-lg border border-black/10 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                >
                  {combo.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Live Render */}
        <div className="space-y-6">
          <div
            className="flex min-h-[160px] flex-col justify-center rounded-2xl border border-black/10 p-6 shadow-sm transition"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h3 className="text-xl font-bold">Contrast Preview Sample</h3>
            <p className="mt-2 text-sm">
              The quick brown fox jumps over the lazy dog. Good contrast ensures everyone can read your content clearly.
            </p>
          </div>

          {/* Compliance Matrix */}
          <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
              <span className="text-sm font-semibold">Calculated Contrast Ratio:</span>
              <span className="font-mono text-2xl font-bold text-primary">{contrastRatio} : 1</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 text-xs font-medium">
              <div className="flex items-center justify-between rounded-lg bg-white/60 p-2.5 dark:bg-white/5">
                <span>WCAG AA Normal Text (4.5:1)</span>
                <span className={`px-2 py-0.5 rounded font-bold ${aaNormal ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
                  {aaNormal ? "PASS" : "FAIL"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-white/60 p-2.5 dark:bg-white/5">
                <span>WCAG AA Large Text (3.0:1)</span>
                <span className={`px-2 py-0.5 rounded font-bold ${aaLarge ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
                  {aaLarge ? "PASS" : "FAIL"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-white/60 p-2.5 dark:bg-white/5">
                <span>WCAG AAA Normal Text (7.0:1)</span>
                <span className={`px-2 py-0.5 rounded font-bold ${aaaNormal ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
                  {aaaNormal ? "PASS" : "FAIL"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-white/60 p-2.5 dark:bg-white/5">
                <span>WCAG AAA Large Text (4.5:1)</span>
                <span className={`px-2 py-0.5 rounded font-bold ${aaaLarge ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
                  {aaaLarge ? "PASS" : "FAIL"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
