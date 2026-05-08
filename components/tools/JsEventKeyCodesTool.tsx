"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function JsEventKeyCodesTool() {
  const [keyData, setKeyData] = useState<any>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    setKeyData({
      key: e.key,
      code: e.code,
      keyCode: e.keyCode,
      location: e.location,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
      meta: e.metaKey,
    });
  };

  return (
    <ToolContainer title="JS Event Key Codes" description="Press any key to see its JavaScript event properties.">
      <div 
        className="min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl outline-none focus:border-primary transition-colors bg-gray-50 dark:bg-white/5 group"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {!keyData ? (
          <div className="text-center space-y-2 pointer-events-none">
            <div className="text-4xl animate-bounce">⌨️</div>
            <div className="text-lg font-bold text-gray-500 group-focus:text-primary">Press any key...</div>
            <div className="text-xs text-gray-400">Make sure this area is focused</div>
          </div>
        ) : (
          <div className="w-full p-8 grid gap-8 max-w-2xl">
            <div className="text-center">
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">event.key</div>
              <div className="text-7xl font-black text-primary">{keyData.key === " " ? "Space" : keyData.key}</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-black/5 dark:border-white/5 text-center">
                <div className="text-[10px] text-gray-500 uppercase mb-1">keyCode</div>
                <div className="text-2xl font-bold">{keyData.keyCode}</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-black/5 dark:border-white/5 text-center">
                <div className="text-[10px] text-gray-500 uppercase mb-1">code</div>
                <div className="text-sm font-mono font-bold truncate">{keyData.code}</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-black/5 dark:border-white/5 text-center">
                <div className="text-[10px] text-gray-500 uppercase mb-1">location</div>
                <div className="text-2xl font-bold">{keyData.location}</div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-black/5 dark:border-white/5 text-center">
                <div className="text-[10px] text-gray-500 uppercase mb-1">modifiers</div>
                <div className="flex justify-center gap-1 mt-1">
                  {keyData.ctrl && <span className="px-1 bg-primary/10 rounded text-[10px] font-bold">CTRL</span>}
                  {keyData.shift && <span className="px-1 bg-primary/10 rounded text-[10px] font-bold">SHIFT</span>}
                  {keyData.alt && <span className="px-1 bg-primary/10 rounded text-[10px] font-bold">ALT</span>}
                </div>
              </div>
            </div>
            <div className="text-center text-xs text-gray-400">Press another key to update</div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
