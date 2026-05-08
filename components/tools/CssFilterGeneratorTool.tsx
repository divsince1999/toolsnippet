"use client";

import { useState, useEffect } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

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
  const [cssCode, setCssCode] = useState("");

  useEffect(() => {
    const filters = [
      blur > 0 && `blur(${blur}px)`,
      brightness !== 100 && `brightness(${brightness}%)`,
      contrast !== 100 && `contrast(${contrast}%)`,
      grayscale > 0 && `grayscale(${grayscale}%)`,
      hueRotate > 0 && `hue-rotate(${hueRotate}deg)`,
      invert > 0 && `invert(${invert}%)`,
      opacity !== 100 && `opacity(${opacity}%)`,
      saturate !== 100 && `saturate(${saturate}%)`,
      sepia > 0 && `sepia(${sepia}%)`,
    ].filter(Boolean).join(" ");
    
    setCssCode(filters ? `filter: ${filters};` : "filter: none;");
  }, [blur, brightness, contrast, grayscale, hueRotate, invert, opacity, saturate, sepia]);

  return (
    <ToolContainer title="CSS Filter Generator" description="Apply and preview CSS filters visually.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 max-h-[500px] overflow-auto pr-2">
          {[
            { label: "Blur", val: blur, set: setBlur, min: 0, max: 20, unit: "px" },
            { label: "Brightness", val: brightness, set: setBrightness, min: 0, max: 200, unit: "%" },
            { label: "Contrast", val: contrast, set: setContrast, min: 0, max: 200, unit: "%" },
            { label: "Grayscale", val: grayscale, set: setGrayscale, min: 0, max: 100, unit: "%" },
            { label: "Hue Rotate", val: hueRotate, set: setHueRotate, min: 0, max: 360, unit: "deg" },
            { label: "Invert", val: invert, set: setInvert, min: 0, max: 100, unit: "%" },
            { label: "Opacity", val: opacity, set: setOpacity, min: 0, max: 100, unit: "%" },
            { label: "Saturate", val: saturate, set: setSaturate, min: 0, max: 200, unit: "%" },
            { label: "Sepia", val: sepia, set: setSepia, min: 0, max: 100, unit: "%" },
          ].map(f => (
            <div key={f.label} className="grid gap-1">
              <label className="text-xs font-medium flex justify-between">{f.label} <span>{f.val}{f.unit}</span></label>
              <input type="range" min={f.min} max={f.max} value={f.val} onChange={e => f.set(parseInt(e.target.value))} className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={() => { setBlur(0); setBrightness(100); setContrast(100); setGrayscale(0); setHueRotate(0); setInvert(0); setOpacity(100); setSaturate(100); setSepia(0); }}>Reset Filters</Button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-xl relative">
            <img 
              src="https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&w=800&q=80" 
              alt="Preview" 
              className="w-full h-full object-cover"
              style={{ filter: cssCode.replace("filter: ", "").replace(";", "") }}
            />
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-mono text-xs break-all relative group border border-black/5 dark:border-white/5">
            <code>{cssCode}</code>
            <Button size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText(cssCode)}>Copy</Button>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
