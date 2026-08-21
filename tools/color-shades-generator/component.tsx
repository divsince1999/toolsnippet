"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ColorShadesGeneratorTool() {
  const [baseHex, setBaseHex] = useState("#0f766e");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hexToRgb = (hex: string): [number, number, number] | null => {
    const clean = hex.replace("#", "").trim();
    if (clean.length === 3) {
      const r = parseInt(clean[0] + clean[0], 16);
      const g = parseInt(clean[1] + clean[1], 16);
      const b = parseInt(clean[2] + clean[2], 16);
      return isNaN(r) || isNaN(g) || isNaN(b) ? null : [r, g, b];
    }
    if (clean.length === 6) {
      const r = parseInt(clean.slice(0, 2), 16);
      const g = parseInt(clean.slice(2, 4), 16);
      const b = parseInt(clean.slice(4, 6), 16);
      return isNaN(r) || isNaN(g) || isNaN(b) ? null : [r, g, b];
    }
    return null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const shades = useMemo(() => {
    const rgb = hexToRgb(baseHex);
    if (!rgb) return null;

    const [r, g, b] = rgb;
    const weights = [
      { label: "50", mixWith: [255, 255, 255], amount: 0.92 },
      { label: "100", mixWith: [255, 255, 255], amount: 0.8 },
      { label: "200", mixWith: [255, 255, 255], amount: 0.6 },
      { label: "300", mixWith: [255, 255, 255], amount: 0.4 },
      { label: "400", mixWith: [255, 255, 255], amount: 0.2 },
      { label: "500", mixWith: [r, g, b], amount: 0 },
      { label: "600", mixWith: [0, 0, 0], amount: 0.15 },
      { label: "700", mixWith: [0, 0, 0], amount: 0.3 },
      { label: "800", mixWith: [0, 0, 0], amount: 0.5 },
      { label: "900", mixWith: [0, 0, 0], amount: 0.7 },
      { label: "950", mixWith: [0, 0, 0], amount: 0.85 },
    ];

    return weights.map((item) => {
      const [mr, mg, mb] = item.mixWith;
      const nr = r + (mr - r) * item.amount;
      const ng = g + (mg - g) * item.amount;
      const nb = b + (mb - b) * item.amount;
      const hex = rgbToHex(nr, ng, nb);
      return {
        label: item.label,
        hex,
        rgb: `rgb(${Math.round(nr)}, ${Math.round(ng)}, ${Math.round(nb)})`,
      };
    });
  }, [baseHex]);

  const tailwindConfig = useMemo(() => {
    if (!shades) return "";
    const obj: Record<string, string> = {};
    shades.forEach((s) => {
      obj[s.label] = s.hex;
    });
    return JSON.stringify({ primary: obj }, null, 2);
  }, [shades]);

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolContainer
      title="Color Shades & Tint Generator"
      description="Generate a full 50-950 Tailwind and CSS palette of tints and shades from any base color."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={baseHex.startsWith("#") && baseHex.length === 7 ? baseHex : "#0f766e"}
              onChange={(e) => setBaseHex(e.target.value)}
              className="h-12 w-16 cursor-pointer rounded border border-black/10 p-1"
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Base Color (HEX)
              </label>
              <input
                type="text"
                value={baseHex}
                onChange={(e) => setBaseHex(e.target.value)}
                placeholder="#0f766e"
                className="w-36 rounded-md border border-black/15 bg-transparent p-2 font-mono text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              />
            </div>
          </div>
        </div>

        {shades && (
          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
              {shades.map((shade, idx) => (
                <button
                  key={shade.label}
                  type="button"
                  onClick={() => handleCopy(shade.hex, idx)}
                  className="flex flex-col items-center rounded-lg border border-black/10 p-2 text-center transition hover:scale-105 dark:border-white/10"
                >
                  <div
                    className="h-12 w-full rounded-md shadow-inner"
                    style={{ backgroundColor: shade.hex }}
                  />
                  <span className="mt-2 text-xs font-bold">{shade.label}</span>
                  <span className="mt-0.5 font-mono text-[11px] text-gray-600 dark:text-gray-400">
                    {copiedIndex === idx ? "Copied!" : shade.hex}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tailwindConfig && (
          <TextArea
            label="Tailwind CSS Color Config"
            readOnly
            copyable
            value={tailwindConfig}
            rows={8}
          />
        )}
      </div>
    </ToolContainer>
  );
}
