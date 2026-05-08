"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function BarcodeGeneratorTool() {
  const [value, setValue] = useState("12345678");

  return (
    <ToolContainer title="Barcode Generator" description="Generate barcodes for your products and inventory.">
      <div className="flex flex-col items-center gap-6 py-10">
        <input 
          type="text" 
          value={value} 
          onChange={e => setValue(e.target.value)} 
          className="w-full max-w-md rounded-lg border border-black/15 bg-transparent p-3 text-center text-xl font-bold outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
        <div className="p-8 bg-white rounded-xl shadow-inner border border-black/5 flex items-center justify-center">
          {/* Simulation of a barcode using div bars */}
          <div className="flex gap-[2px] items-end h-32">
            {value.split('').map((char, i) => (
              <div key={i} className="flex gap-[1px]">
                <div className="bg-black w-1 h-full" style={{ opacity: (char.charCodeAt(0) % 3 + 1) * 0.3 }} />
                <div className="bg-white w-1 h-full" />
                <div className="bg-black w-2 h-full" style={{ opacity: (char.charCodeAt(0) % 2 + 1) * 0.4 }} />
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400">Barcode generation is simulated for visual reference.</p>
      </div>
    </ToolContainer>
  );
}
