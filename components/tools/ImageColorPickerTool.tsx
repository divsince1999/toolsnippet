"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function ImageColorPickerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState("#3B82F6");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const pickColor = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(img, 0, 0);
    
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * img.naturalWidth;
    const y = ((e.clientY - rect.top) / rect.height) * img.naturalHeight;
    
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`.toUpperCase();
    setPickedColor(hex);
  };

  return (
    <ToolContainer title="Image Color Picker" description="Extract colors from any image file instantly.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl bg-gray-50 dark:bg-white/5 group hover:border-primary transition-colors cursor-pointer relative">
            <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
            <div className="text-sm font-bold text-gray-500 group-hover:text-primary">Click to upload image</div>
          </div>

          {image && (
            <div className="relative overflow-hidden rounded-xl border border-black/5 dark:border-white/5 shadow-lg">
              <img src={image} alt="Target" className="w-full h-auto cursor-crosshair" onClick={pickColor} />
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur text-[10px] text-white rounded">Click image to pick color</div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[200px] rounded-2xl flex flex-col items-center justify-center shadow-inner border border-black/5 dark:border-white/5" style={{ backgroundColor: pickedColor }}>
            <div className="px-6 py-4 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur shadow-xl text-center">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Picked Color</div>
              <div className="text-3xl font-black font-mono mb-4">{pickedColor}</div>
              <Button size="sm" onClick={() => navigator.clipboard.writeText(pickedColor)}>Copy Hex</Button>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
