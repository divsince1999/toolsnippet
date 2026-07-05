"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function QrCodeGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [options, setOptions] = useState({
    size: 200,
    errorCorrection: "M",
    margin: 4,
  });

  const generate = () => {
    try {
      const { size, errorCorrection, margin } = options;
      
      // Simple QR code generation (simplified - in production would use a proper QR library)
      // This is a mock implementation that creates a placeholder QR code
      const qrData = input || "https://example.com";
      
      // Create a simple placeholder QR code visualization
      const qrSize = size;
      const moduleSize = Math.floor(qrSize / 25); // Simplified QR pattern
      const qrPattern = generateQrPattern(qrData);
      
      let svg = `<svg width="${qrSize}" height="${qrSize}" viewBox="0 0 ${qrSize} ${qrSize}" xmlns="http://www.w3.org/2000/svg">`;
      svg += `<rect width="${qrSize}" height="${qrSize}" fill="white"/>`;
      
      // Draw QR pattern
      for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 25; x++) {
          if (qrPattern[y][x]) {
            svg += `<rect x="${x * moduleSize}" y="${y * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`;
          }
        }
      }
      
      svg += `</svg>`;
      
      setOutput(svg);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "QR generation failed"}`);
    }
  };

  const generateQrPattern = (data: string): boolean[][] => {
    // Simplified QR pattern generation
    const pattern: boolean[][] = [];
    
    for (let y = 0; y < 25; y++) {
      pattern[y] = [];
      for (let x = 0; x < 25; x++) {
        // Create a simple pattern based on data
        const charIndex = (x + y) % data.length;
        const charCode = data.charCodeAt(charIndex);
        pattern[y][x] = (charCode % 3) === 0 || isPositionMarker(x, y);
      }
    }
    
    return pattern;
  };

  const isPositionMarker = (x: number, y: number): boolean => {
    // Position markers for QR codes
    return (
      (x < 7 && y < 7) || // Top-left
      (x < 7 && y > 17) || // Bottom-left
      (x > 17 && y < 7)    // Top-right
    );
  };

  const updateOption = (key: keyof typeof options, value: string | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ToolContainer title="QR Code Generator" description="Generate QR codes from text or URLs.">
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">QR Code Size</label>
            <input
              type="number"
              min="100"
              max="500"
              value={options.size}
              onChange={(e) => updateOption("size", parseInt(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Error Correction</label>
            <select
              value={options.errorCorrection}
              onChange={(e) => updateOption("errorCorrection", e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>
        </div>

        <TextArea 
          label="Text or URL" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter text or URL to encode in QR code..." 
          rows={5} 
        />
        <div className="flex gap-2">
          <Button onClick={generate}>Generate</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-black/10 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
            <div
              className="[&_svg]:block [&_svg]:h-auto [&_svg]:max-w-full"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
