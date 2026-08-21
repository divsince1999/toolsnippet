"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssTextShadowGeneratorTool() {
  const [offsetX, setOffsetX] = useState(2);
  const [offsetY, setOffsetY] = useState(4);
  const [blur, setBlur] = useState(8);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#0f172a");
  const [previewText, setPreviewText] = useState("ToolSnippet Text Shadow");
  const [isCopied, setIsCopied] = useState(false);

  const shadowCss = useMemo(() => {
    return `${offsetX}px ${offsetY}px ${blur}px ${shadowColor}`;
  }, [offsetX, offsetY, blur, shadowColor]);

  const cssCode = useMemo(() => {
    return `text-shadow: ${shadowCss};`;
  }, [shadowCss]);

  const applyPreset = (ox: number, oy: number, bl: number, sc: string, tc: string, bg: string) => {
    setOffsetX(ox);
    setOffsetY(oy);
    setBlur(bl);
    setShadowColor(sc);
    setTextColor(tc);
    setBgColor(bg);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Text Shadow Generator"
      description="Create custom CSS text shadows, neon glow effects, and 3D typography styling."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Preview Text
            </label>
            <input
              type="text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-sm dark:border-white/20"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Horizontal Offset (X)</span>
              <span className="font-mono">{offsetX}px</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Vertical Offset (Y)</span>
              <span className="font-mono">{offsetY}px</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
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
              min="0"
              max="50"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Shadow Color
              </label>
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border border-black/10 p-1"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Text Color
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border border-black/10 p-1"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Background
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border border-black/10 p-1"
              />
            </div>
          </div>

          {/* Presets */}
          <div>
            <span className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Neon Glow", ox: 0, oy: 0, bl: 20, sc: "#00ffcc", tc: "#ffffff", bg: "#0f172a" },
                { name: "Subtle Drop", ox: 2, oy: 4, bl: 6, sc: "#00000066", tc: "#1e293b", bg: "#f8fafc" },
                { name: "Retro 3D", ox: 4, oy: 4, bl: 0, sc: "#dc2626", tc: "#facc15", bg: "#1e1b4b" },
                { name: "Fire Glow", ox: 0, oy: -2, bl: 12, sc: "#f97316", tc: "#fef08a", bg: "#450a0a" },
              ].map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p.ox, p.oy, p.bl, p.sc, p.tc, p.bg)}
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
            className="flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 p-6 transition overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <h2
              className="text-center text-3xl font-extrabold transition-all break-words max-w-full overflow-hidden"
              style={{
                color: textColor,
                textShadow: shadowCss,
              }}
            >
              {previewText}
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy text-shadow CSS"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={cssCode}
              rows={2}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
