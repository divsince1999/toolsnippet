"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function ColorNameFinderTool() {
  const [color, setColor] = useState("#3B82F6");

  // Simplified color name database
  const COLOR_NAMES: Record<string, string> = {
    "#000000": "Black",
    "#FFFFFF": "White",
    "#FF0000": "Red",
    "#00FF00": "Lime",
    "#0000FF": "Blue",
    "#FFFF00": "Yellow",
    "#00FFFF": "Cyan",
    "#FF00FF": "Magenta",
    "#C0C0C0": "Silver",
    "#808080": "Gray",
    "#800000": "Maroon",
    "#808000": "Olive",
    "#008000": "Green",
    "#800080": "Purple",
    "#008080": "Teal",
    "#000080": "Navy",
    "#3B82F6": "Royal Blue",
    "#EF4444": "Coral Red",
    "#10B981": "Emerald Green",
    "#F59E0B": "Amber",
    "#6366F1": "Indigo",
    "#8B5CF6": "Violet",
    "#EC4899": "Pink",
  };

  const findName = (hex: string) => {
    hex = hex.toUpperCase();
    if (COLOR_NAMES[hex]) return COLOR_NAMES[hex];
    
    // In a real app, we'd find the nearest neighbor in RGB space
    return "Custom Shade";
  };

  return (
    <ToolContainer title="Color Name Finder" description="Find the closest human-readable name for any color code.">
      <div className="flex flex-col items-center gap-8 py-10">
        <div className="flex flex-col items-center gap-4">
          <input 
            type="color" 
            value={color} 
            onChange={e => setColor(e.target.value)} 
            className="w-32 h-32 rounded-full cursor-pointer border-4 border-white shadow-2xl transition-transform hover:scale-105" 
          />
          <input 
            type="text" 
            value={color.toUpperCase()} 
            onChange={e => setColor(e.target.value)} 
            className="text-center font-mono font-bold text-2xl bg-transparent outline-none border-b-2 border-primary/20 focus:border-primary" 
          />
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-500 uppercase tracking-widest mb-1 font-bold">Closest Name</div>
          <div className="text-5xl font-black text-primary">{findName(color)}</div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {Object.entries(COLOR_NAMES).slice(0, 16).map(([hex, name]) => (
            <button 
              key={hex} 
              onClick={() => setColor(hex)}
              className="w-10 h-10 rounded-lg shadow-sm hover:scale-110 transition-transform"
              style={{ backgroundColor: hex }}
              title={name}
            />
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
