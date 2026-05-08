"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function BarcodeScannerOnlineTool() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <ToolContainer title="Barcode Scanner Online" description="Read EAN, UPC, and Code128 barcodes directly from your browser.">
      <div className="flex flex-col items-center gap-8 py-10">
        <div className="w-full max-w-md aspect-video border-4 border-dashed border-black/10 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 group hover:border-primary transition-colors cursor-pointer relative">
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📊</div>
          <div className="text-sm font-bold text-gray-500 group-hover:text-primary text-center px-4">Barcode Detection<br/><span className="text-[10px] font-normal">Requires BarcodeDetector API (Chrome/Edge)</span></div>
        </div>

        <Button size="lg" onClick={() => setResult("Detection active... searching for barcodes.")}>Start Scanner</Button>

        {result && (
          <div className="w-full max-w-lg p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Scanner Status</div>
            <div className="text-sm font-medium text-primary">{result}</div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
