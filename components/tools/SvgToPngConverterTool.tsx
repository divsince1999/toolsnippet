"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState, useRef } from "react";

export default function SvgToPngConverterTool() {
  const { input: svgInput, setInput: setSvgInput, clearAll } = useTool();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);

  const convert = () => {
    if (typeof window === "undefined" || typeof Image === "undefined") return;
    if (!svgInput) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgInput], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width || 500;
      canvas.height = img.height || 500;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setPngUrl(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <ToolContainer title="SVG to PNG Converter" description="Convert SVG vector code to raster PNG images.">
      <div className="grid gap-6">
        <textarea
          value={svgInput}
          onChange={(e) => setSvgInput(e.target.value)}
          placeholder="Paste SVG code here..."
          className="w-full h-48 rounded-lg border border-black/15 bg-transparent p-3 text-sm font-mono outline-none dark:border-white/20"
        />
        <div className="flex gap-2">
          <Button onClick={convert}>Convert to PNG</Button>
          <Button variant="ghost" onClick={() => { clearAll(); setPngUrl(null); }}>Clear</Button>
        </div>
        
        {pngUrl && (
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <img src={pngUrl} alt="Converted PNG" className="max-w-full h-auto shadow-lg rounded" />
            <Button as="a" href={pngUrl} download="converted.png">Download PNG</Button>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolContainer>
  );
}
