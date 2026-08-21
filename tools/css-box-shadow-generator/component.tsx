"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssBoxShadowGeneratorTool() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(10);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(-5);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.15);
  const [isInset, setIsInset] = useState(false);
  const [boxColor, setBoxColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#f3f4f6");
  const [isCopied, setIsCopied] = useState(false);

  const hexToRgba = (hex: string, alpha: number) => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2), 16) || 0;
    const g = parseInt(clean.slice(2, 4), 16) || 0;
    const b = parseInt(clean.slice(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowCss = useMemo(() => {
    const rgba = hexToRgba(shadowColor, opacity);
    const insetStr = isInset ? "inset " : "";
    return `${insetStr}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgba}`;
  }, [offsetX, offsetY, blur, spread, shadowColor, opacity, isInset]);

  const cssCode = useMemo(() => {
    return `box-shadow: ${shadowCss};\n-webkit-box-shadow: ${shadowCss};\n-moz-box-shadow: ${shadowCss};`;
  }, [shadowCss]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Box Shadow Generator"
      description="Create custom CSS box shadows with live visual preview, opacity, spread, and inset controls."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Horizontal Offset (X)</span>
              <span className="font-mono">{offsetX}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Vertical Offset (Y)</span>
              <span className="font-mono">{offsetY}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
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
              max="100"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Spread Radius</span>
              <span className="font-mono">{spread}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Shadow Opacity</span>
              <span className="font-mono">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
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
                Box Color
              </label>
              <input
                type="color"
                value={boxColor}
                onChange={(e) => setBoxColor(e.target.value)}
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

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                <input
                  type="checkbox"
                  checked={isInset}
                  onChange={(e) => setIsInset(e.target.checked)}
                  className="h-4 w-4 rounded text-primary focus:ring-primary"
                />
                <span>Inset Shadow</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live Preview & Output */}
        <div className="flex flex-col gap-6">
          <div
            className="flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 p-8 transition"
            style={{ backgroundColor: bgColor }}
          >
            <div
              className="h-32 w-48 rounded-xl flex items-center justify-center font-medium text-sm text-gray-700 transition duration-150"
              style={{
                backgroundColor: boxColor,
                boxShadow: shadowCss,
              }}
            >
              Preview Box
            </div>
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
              rows={4}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
