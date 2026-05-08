"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function CssAnimationGeneratorTool() {
  const [duration, setDuration] = useState(2);
  const [timing, setTiming] = useState("ease-in-out");
  const [animationType, setAnimationType] = useState("bounce");

  const animations: Record<string, string> = {
    bounce: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}`,
    pulse: `@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}`,
    spin: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`,
  };

  const cssCode = `${animations[animationType]}\n\n.animate {\n  animation: ${animationType} ${duration}s ${timing} infinite;\n}`;

  return (
    <ToolContainer title="CSS Animation Generator" description="Create smooth keyframe animations visually.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Animation Type</label>
            <select value={animationType} onChange={e => setAnimationType(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20">
              <option value="bounce">Bounce</option>
              <option value="pulse">Pulse</option>
              <option value="spin">Spin</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Duration ({duration}s)</label>
            <input type="range" min="0.1" max="5" step="0.1" value={duration} onChange={e => setDuration(parseFloat(e.target.value))} className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-white/10" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Timing Function</label>
            <select value={timing} onChange={e => setTiming(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20">
              <option value="linear">Linear</option>
              <option value="ease">Ease</option>
              <option value="ease-in">Ease-In</option>
              <option value="ease-out">Ease-Out</option>
              <option value="ease-in-out">Ease-In-Out</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[250px] rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden">
            <style>{cssCode.replace('.animate', '.preview-box')}</style>
            <div className="preview-box w-20 h-20 bg-primary rounded-xl shadow-lg" />
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-mono text-[10px] whitespace-pre relative group border border-black/5 dark:border-white/5">
            <code>{cssCode}</code>
            <Button size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText(cssCode)}>Copy CSS</Button>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
