"use client";

import { useState, useEffect } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function CssTextShadowGeneratorTool() {
  const [hOffset, setHOffset] = useState(2);
  const [vOffset, setVOffset] = useState(2);
  const [blur, setBlur] = useState(4);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.5);
  const [cssCode, setCssCode] = useState("");

  useEffect(() => {
    const rgba = hexToRgba(color, opacity);
    setCssCode(`text-shadow: ${hOffset}px ${vOffset}px ${blur}px ${rgba};`);
  }, [hOffset, vOffset, blur, color, opacity]);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <ToolContainer title="CSS Text Shadow Generator" description="Create stylish text effects with shadows.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium flex justify-between">Horizontal Offset <span>{hOffset}px</span></label>
            <input type="range" min="-50" max="50" value={hOffset} onChange={(e) => setHOffset(parseInt(e.target.value))} className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium flex justify-between">Vertical Offset <span>{vOffset}px</span></label>
            <input type="range" min="-50" max="50" value={vOffset} onChange={(e) => setVOffset(parseInt(e.target.value))} className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium flex justify-between">Blur Radius <span>{blur}px</span></label>
            <input type="range" min="0" max="50" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Color</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Opacity <span>{opacity}</span></label>
              <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[200px] flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-5xl font-black text-gray-800 dark:text-white" style={{ textShadow: cssCode.replace("text-shadow: ", "").replace(";", "") }}>
              Preview
            </div>
          </div>
          <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-sm break-all relative group">
            <code>{cssCode}</code>
            <Button size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText(cssCode)}>Copy</Button>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
