"use client";

import { useState, useEffect } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function CssClipPathGeneratorTool() {
  const [shape, setShape] = useState("polygon");
  const [points, setPoints] = useState([
    { x: 50, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 }
  ]);

  const cssCode = `clip-path: ${shape}(${points.map(p => `${p.x}% ${p.y}%`).join(", ")});`;

  const SHAPES = [
    { name: "Triangle", points: [{ x: 50, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }] },
    { name: "Square", points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }] },
    { name: "Diamond", points: [{ x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }] },
    { name: "Pentagon", points: [{ x: 50, y: 0 }, { x: 100, y: 38 }, { x: 82, y: 100 }, { x: 18, y: 100 }, { x: 0, y: 38 }] },
  ];

  return (
    <ToolContainer title="CSS Clip-Path Generator" description="Create complex shapes for UI elements visually.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {SHAPES.map(s => (
              <Button key={s.name} variant="outline" size="sm" onClick={() => setPoints(s.points)}>{s.name}</Button>
            ))}
          </div>

          <div className="space-y-4">
            {points.map((p, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Point {i+1} X (%)</label>
                  <input type="range" min="0" max="100" value={p.x} onChange={e => {
                    const newPoints = [...points];
                    newPoints[i].x = parseInt(e.target.value);
                    setPoints(newPoints);
                  }} className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
                </div>
                <div className="grid gap-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Point {i+1} Y (%)</label>
                  <input type="range" min="0" max="100" value={p.y} onChange={e => {
                    const newPoints = [...points];
                    newPoints[i].y = parseInt(e.target.value);
                    setPoints(newPoints);
                  }} className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[300px] rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center">
            <div 
              className="w-48 h-48 bg-gradient-to-br from-primary to-purple-500 shadow-xl transition-all duration-300"
              style={{ clipPath: cssCode.replace("clip-path: ", "").replace(";", "") }}
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
