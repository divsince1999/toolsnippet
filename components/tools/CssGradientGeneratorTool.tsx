"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssGradientGeneratorTool() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#a855f7");
  const [color3, setColor3] = useState("#ec4899");
  const [useThirdColor, setUseThirdColor] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const gradientCss = useMemo(() => {
    if (type === "linear") {
      return useThirdColor
        ? `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`
        : `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    } else {
      return useThirdColor
        ? `radial-gradient(circle, ${color1}, ${color2}, ${color3})`
        : `radial-gradient(circle, ${color1}, ${color2})`;
    }
  }, [type, angle, color1, color2, color3, useThirdColor]);

  const cssCode = useMemo(() => {
    return `background: ${color1};\nbackground: ${gradientCss};`;
  }, [color1, gradientCss]);

  const applyPreset = (c1: string, c2: string, c3: string, ang = 135) => {
    setColor1(c1);
    setColor2(c2);
    setColor3(c3);
    setAngle(ang);
    setUseThirdColor(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Gradient Generator"
      description="Create beautiful linear and radial CSS gradients with multi-color stops and angles."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="flex gap-2">
            <Button
              variant={type === "linear" ? "primary" : "outline"}
              onClick={() => setType("linear")}
            >
              Linear Gradient
            </Button>
            <Button
              variant={type === "radial" ? "primary" : "outline"}
              onClick={() => setType("radial")}
            >
              Radial Gradient
            </Button>
          </div>

          {type === "linear" && (
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
                <span>Gradient Angle</span>
                <span className="font-mono">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full cursor-pointer accent-primary"
              />
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Color 1
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-black/10 p-1"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-20 rounded border border-black/15 bg-transparent p-1.5 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Color 2
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-black/10 p-1"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-20 rounded border border-black/15 bg-transparent p-1.5 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Color 3 (Optional)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color3}
                  disabled={!useThirdColor}
                  onChange={(e) => setColor3(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-black/10 p-1 disabled:opacity-40"
                />
                <input
                  type="text"
                  value={color3}
                  disabled={!useThirdColor}
                  onChange={(e) => setColor3(e.target.value)}
                  className="w-20 rounded border border-black/15 bg-transparent p-1.5 font-mono text-xs disabled:opacity-40"
                />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input
              type="checkbox"
              checked={useThirdColor}
              onChange={(e) => setUseThirdColor(e.target.checked)}
              className="h-4 w-4 rounded text-primary focus:ring-primary"
            />
            <span>Enable 3rd Color Stop</span>
          </label>

          {/* Curated Presets */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Popular Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Hyper", c1: "#ec4899", c2: "#8b5cf6", c3: "#3b82f6" },
                { name: "Sunset", c1: "#f97316", c2: "#ef4444", c3: "#a855f7" },
                { name: "Ocean", c1: "#06b6d4", c2: "#3b82f6", c3: "#6366f1" },
                { name: "Emerald", c1: "#10b981", c2: "#059669", c3: "#047857" },
                { name: "Midnight", c1: "#0f172a", c2: "#1e293b", c3: "#334155" },
              ].map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p.c1, p.c2, p.c3)}
                  className="rounded-lg border border-black/10 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div
            className="flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 p-8 shadow-inner transition"
            style={{ background: gradientCss }}
          >
            <span className="rounded-lg bg-black/40 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
              Gradient Preview
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy CSS Code"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={cssCode}
              rows={3}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
