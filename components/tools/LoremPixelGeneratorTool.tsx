"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function LoremPixelGeneratorTool() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [category, setCategory] = useState("abstract");
  const [imgUrl, setImgUrl] = useState(`https://picsum.photos/400/300`);

  const generate = () => {
    // Using picsum.photos as a reliable placeholder service
    setImgUrl(`https://picsum.photos/${width}/${height}?random=${Math.random()}`);
  };

  return (
    <ToolContainer title="Placeholder Image Generator" description="Generate dummy images for your UI/UX designs.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Width (px)</label>
              <input type="number" value={width} onChange={e => setWidth(parseInt(e.target.value) || 100)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Height (px)</label>
              <input type="number" value={height} onChange={e => setHeight(parseInt(e.target.value) || 100)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20" />
            </div>
          </div>
          <Button onClick={generate} className="w-full">Generate New Image</Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex items-center justify-center">
            <img src={imgUrl} alt="Placeholder" className="max-w-full h-auto shadow-xl rounded-lg" />
          </div>
          <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-xs break-all relative group">
            <code>{imgUrl}</code>
            <Button size="sm" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText(imgUrl)}>Copy URL</Button>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
