"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssGlassmorphismGeneratorTool() {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.3);
  const [saturation, setSaturation] = useState(180);
  const [isCopied, setIsCopied] = useState(false);

  const cssCode = useMemo(() => {
    return `background: rgba(255, 255, 255, ${opacity});\nbackdrop-filter: blur(${blur}px) saturate(${saturation}%);\n-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);\nborder: 1px solid rgba(255, 255, 255, ${borderOpacity});\nborder-radius: 16px;\nbox-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);`;
  }, [blur, opacity, borderOpacity, saturation]);

  const tailwindCode = useMemo(() => {
    return `bg-white/${Math.round(opacity * 100)} backdrop-blur-[${blur}px] border border-white/${Math.round(borderOpacity * 100)} rounded-2xl shadow-xl`;
  }, [blur, opacity, borderOpacity]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Glassmorphism Generator"
      description="Create modern frosted glass UI cards with backdrop blur, transparency, and glossy borders."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Backdrop Blur</span>
              <span className="font-mono">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Background Opacity</span>
              <span className="font-mono">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.9"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Border Opacity</span>
              <span className="font-mono">{Math.round(borderOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Color Saturation</span>
              <span className="font-mono">{saturation}%</span>
            </div>
            <input
              type="range"
              min="100"
              max="250"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-2xl p-8 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-inner">
            <div className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-yellow-300 opacity-80 blur-lg" />
            <div className="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-cyan-400 opacity-80 blur-xl" />

            <div
              className="relative z-10 w-64 p-6 text-center text-white"
              style={{
                background: `rgba(255, 255, 255, ${opacity})`,
                backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
                borderRadius: "16px",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4 className="font-bold text-lg">Glassmorphism</h4>
              <p className="text-xs opacity-90 mt-1">Frosted Glass UI Card</p>
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
              rows={6}
            />
            <TextArea
              label="Tailwind CSS Utility Classes"
              readOnly
              copyable
              value={tailwindCode}
              rows={2}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
