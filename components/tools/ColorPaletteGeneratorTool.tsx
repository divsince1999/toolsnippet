"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ColorPaletteGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [palette, setPalette] = useState<string[]>([]);

  const handleConvert = () => {
    if (!input) return;
    
    // Generate a simple palette from the base color
    // This is a mock: in real life you'd use tinycolor2 or similar
    const colors = [
      input,
      adjustColor(input, 20),
      adjustColor(input, -20),
      adjustColor(input, 40),
      adjustColor(input, -40),
    ];
    setPalette(colors);
    setOutput(colors.join(", "));
  };

  const adjustColor = (hex: string, percent: number) => {
    let num = parseInt(hex.replace("#", ""), 16);
    let amt = Math.round(2.55 * percent);
    let r = (num >> 16) + amt;
    let b = ((num >> 8) & 0x00ff) + amt;
    let g = (num & 0x0000ff) + amt;
    return "#" + (0x1000000 + (r < 255 ? r < 1 ? 0 : r : 255) * 0x10000 + (b < 255 ? b < 1 ? 0 : b : 255) * 0x100 + (g < 255 ? g < 1 ? 0 : g : 255)).toString(16).slice(1);
  };

  return (
    <ToolContainer
      title="Color Palette Generator"
      description="Generate harmonious color schemes starting from a single base color."
    >
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Base Color (HEX)</label>
          <div className="flex gap-4">
            <input
              type="color"
              value={input || "#3b82f6"}
              onChange={(e) => setInput(e.target.value)}
              className="h-12 w-12 rounded border border-black/10 cursor-pointer"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="#3b82f6"
              className="flex-1 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate Palette</Button>
          <Button variant="ghost" onClick={() => { setPalette([]); clearAll(); }}>Clear</Button>
        </div>
        {palette.length > 0 && (
          <div className="grid gap-6">
            <div className="flex h-24 overflow-hidden rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
              {palette.map((c, i) => (
                <div 
                  key={i} 
                  className="flex-1 group relative cursor-pointer" 
                  style={{ backgroundColor: c }}
                  onClick={() => navigator.clipboard.writeText(c)}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-white uppercase">{c}</span>
                  </div>
                </div>
              ))}
            </div>
            <TextArea label="HEX Values" readOnly copyable value={output} rows={1} />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
