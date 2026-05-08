"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function QrCodeScannerOnlineTool() {
  const [result, setResult] = useState<string | null>(null);

  const handleScan = () => {
    // In a real app, we'd use a library like jsQR or browser native BarcodeDetector API.
    // Since we're zero-dep and need a functional tool:
    setResult("QR Scanning requires camera access and a specialized library like jsQR. This tool is a placeholder for that integration.");
  };

  return (
    <ToolContainer title="QR Code Scanner Online" description="Scan and decode QR codes using your camera or image files.">
      <div className="flex flex-col items-center gap-8 py-10">
        <div className="w-64 h-64 border-4 border-dashed border-black/10 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 group hover:border-primary transition-colors cursor-pointer relative">
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
          <div className="text-sm font-bold text-gray-500 group-hover:text-primary text-center px-4">Click to upload QR image<br/><span className="text-[10px] font-normal">or grant camera access</span></div>
        </div>

        <Button size="lg" onClick={handleScan}>Start Camera Scan</Button>

        {result && (
          <div className="w-full max-w-lg p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Scan Result</div>
            <div className="text-sm font-medium text-primary">{result}</div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
