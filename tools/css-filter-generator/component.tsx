"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssFilterGeneratorTool() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const filterString = useMemo(() => {
    const filters: string[] = [];
    if (blur > 0) filters.push(`blur(${blur}px)`);
    if (brightness !== 100) filters.push(`brightness(${brightness}%)`);
    if (contrast !== 100) filters.push(`contrast(${contrast}%)`);
    if (grayscale > 0) filters.push(`grayscale(${grayscale}%)`);
    if (hueRotate > 0) filters.push(`hue-rotate(${hueRotate}deg)`);
    if (invert > 0) filters.push(`invert(${invert}%)`);
    if (opacity !== 100) filters.push(`opacity(${opacity}%)`);
    if (saturate !== 100) filters.push(`saturate(${saturate}%)`);
    if (sepia > 0) filters.push(`sepia(${sepia}%)`);

    return filters.length > 0 ? filters.join(" ") : "none";
  }, [blur, brightness, contrast, grayscale, hueRotate, invert, opacity, saturate, sepia]);

  const cssCode = useMemo(() => {
    return `filter: ${filterString};\n-webkit-filter: ${filterString};`;
  }, [filterString]);

  const resetFilters = () => {
    setBlur(0);
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setHueRotate(0);
    setInvert(0);
    setOpacity(100);
    setSaturate(100);
    setSepia(0);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Filter Effects Playground"
      description="Apply and adjust visual CSS image filters including blur, grayscale, contrast, hue-rotate, and sepia."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500">Blur: {blur}px</span>
              <input
                type="range"
                min="0"
                max="20"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Brightness: {brightness}%</span>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Contrast: {contrast}%</span>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Grayscale: {grayscale}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={grayscale}
                onChange={(e) => setGrayscale(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Hue-Rotate: {hueRotate}°</span>
              <input
                type="range"
                min="0"
                max="360"
                value={hueRotate}
                onChange={(e) => setHueRotate(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Invert: {invert}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={invert}
                onChange={(e) => setInvert(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Saturate: {saturate}%</span>
              <input
                type="range"
                min="0"
                max="300"
                value={saturate}
                onChange={(e) => setSaturate(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Sepia: {sepia}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sepia}
                onChange={(e) => setSepia(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset All Filters
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 p-6 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <div
              className="flex h-36 w-60 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-cyan-500 font-bold text-white shadow-md text-sm transition-all"
              style={{ filter: filterString }}
            >
              Filter Target Image
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy Filter CSS"}
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
