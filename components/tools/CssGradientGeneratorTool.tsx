"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function CssGradientGeneratorTool() {
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#9333EA");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState("linear");

  const gradient = type === "linear" 
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssCode = `background: ${gradient};`;

  return (
    <ToolContainer title="CSS Gradient Generator" description="Design linear and radial CSS gradients visually.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Color 1</label>
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer bg-transparent" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Color 2</label>
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer bg-transparent" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20">
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>
            {type === "linear" && (
              <div className="grid gap-2">
                <label className="text-sm font-medium">Angle ({angle}°)</label>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[200px] rounded-2xl shadow-lg border border-black/5 dark:border-white/5" style={{ background: gradient }} />
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-mono text-xs break-all relative group">
            <code>{cssCode}</code>
            <Button size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText(cssCode)}>Copy</Button>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
