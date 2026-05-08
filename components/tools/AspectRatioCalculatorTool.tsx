"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function AspectRatioCalculatorTool() {
  const [width, setWidth] = useState<number | "">(1920);
  const [height, setHeight] = useState<number | "">(1080);
  const [newWidth, setNewWidth] = useState<number | "">("");
  const [newHeight, setNewHeight] = useState<number | "">("");

  const presets = [
    { name: "16:9", w: 16, h: 9 },
    { name: "4:3", w: 4, h: 3 },
    { name: "1:1", w: 1, h: 1 },
    { name: "21:9", w: 21, h: 9 },
  ];

  const handleNewWidthChange = (val: number | "") => {
    setNewWidth(val);
    if (val && width && height) {
      setNewHeight(Math.round((val * (height as number)) / (width as number)));
    } else {
      setNewHeight("");
    }
  };

  const handleNewHeightChange = (val: number | "") => {
    setNewHeight(val);
    if (val && width && height) {
      setNewWidth(Math.round((val * (width as number)) / (height as number)));
    } else {
      setNewWidth("");
    }
  };

  const applyPreset = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
    setNewWidth("");
    setNewHeight("");
  };

  return (
    <ToolContainer title="Aspect Ratio Calculator" description="Calculate dimensions while maintaining aspect ratio.">
      <div className="grid gap-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Original / Target Ratio</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-medium">Width</label>
                <input 
                  type="number" 
                  value={width} 
                  onChange={(e) => setWidth(parseInt(e.target.value) || "")}
                  className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium">Height</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(parseInt(e.target.value) || "")}
                  className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map(p => (
                <Button key={p.name} variant="outline" size="sm" onClick={() => applyPreset(p.w, p.h)}>
                  {p.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">New Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-medium">New Width</label>
                <input 
                  type="number" 
                  value={newWidth} 
                  onChange={(e) => handleNewWidthChange(parseInt(e.target.value) || "")}
                  placeholder="Calculate..."
                  className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium">New Height</label>
                <input 
                  type="number" 
                  value={newHeight} 
                  onChange={(e) => handleNewHeightChange(parseInt(e.target.value) || "")}
                  placeholder="Calculate..."
                  className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
                />
              </div>
            </div>
          </div>
        </div>

        {width && height && (
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center gap-4 text-center">
            <div className="text-sm text-gray-500">Visual Representation</div>
            <div 
              className="bg-primary/20 border-2 border-primary rounded flex items-center justify-center text-primary font-bold transition-all duration-300"
              style={{ 
                aspectRatio: `${width}/${height}`,
                width: "min(100%, 200px)"
              }}
            >
              {width}:{height}
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
