"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssNeumorphismGeneratorTool() {
  const [bgColor, setBgColor] = useState("#e0e5ec");
  const [size, setSize] = useState(160);
  const [radius, setRadius] = useState(30);
  const [distance, setDistance] = useState(12);
  const [blur, setBlur] = useState(24);
  const [shape, setShape] = useState<"flat" | "concave" | "convex" | "inset">("flat");
  const [isCopied, setIsCopied] = useState(false);

  // Helper to lighten/darken hex
  const adjustHex = (hex: string, amount: number) => {
    let clean = hex.replace("#", "");
    if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
    const num = parseInt(clean, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const darkShadow = useMemo(() => adjustHex(bgColor, -35), [bgColor]);
  const lightShadow = useMemo(() => adjustHex(bgColor, 35), [bgColor]);

  const cssStyle = useMemo(() => {
    let bgGradient = bgColor;
    let shadow = "";

    if (shape === "flat") {
      bgGradient = bgColor;
      shadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
    } else if (shape === "concave") {
      bgGradient = `linear-gradient(145deg, ${adjustHex(bgColor, -15)}, ${adjustHex(bgColor, 15)})`;
      shadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
    } else if (shape === "convex") {
      bgGradient = `linear-gradient(145deg, ${adjustHex(bgColor, 15)}, ${adjustHex(bgColor, -15)})`;
      shadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
    } else if (shape === "inset") {
      bgGradient = bgColor;
      shadow = `inset ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -${distance}px -${distance}px ${blur}px ${lightShadow}`;
    }

    return {
      borderRadius: `${radius}px`,
      background: bgGradient,
      boxShadow: shadow,
    };
  }, [bgColor, distance, blur, shape, radius, darkShadow, lightShadow]);

  const cssCode = useMemo(() => {
    return `border-radius: ${cssStyle.borderRadius};\nbackground: ${cssStyle.background};\nbox-shadow: ${cssStyle.boxShadow};`;
  }, [cssStyle]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Neumorphism (Soft UI) Generator"
      description="Create modern Soft UI extruded and pressed neumorphic shadows with customized lighting."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Base Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border border-black/10 p-1"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-32 rounded border border-black/15 bg-transparent p-2 font-mono text-sm dark:border-white/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Shape Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["flat", "concave", "convex", "inset"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShape(s)}
                  className={`rounded-lg border p-2 text-xs font-medium capitalize transition ${
                    shape === s ? "bg-primary text-white border-primary" : "border-black/10 dark:border-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Distance</span>
              <span className="font-mono">{distance}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Blur Radius</span>
              <span className="font-mono">{blur}px</span>
            </div>
            <input
              type="range"
              min="4"
              max="80"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Card Size</span>
              <span className="font-mono">{size}px</span>
            </div>
            <input
              type="range"
              min="100"
              max="240"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Corner Radius</span>
              <span className="font-mono">{radius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div
            className="flex min-h-[260px] items-center justify-center rounded-2xl p-8 transition"
            style={{ backgroundColor: bgColor }}
          >
            <div
              className="flex items-center justify-center font-bold text-gray-600 text-sm transition-all"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                ...cssStyle,
              }}
            >
              Soft UI
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy Neumorphic CSS"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={cssCode}
              rows={4}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
