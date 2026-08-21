"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PxToRemConverterTool() {
  const [pxVal, setPxVal] = useState<string>("16");
  const [remVal, setRemVal] = useState<string>("1");
  const [baseSize, setBaseSize] = useState<number>(16);

  const handlePxChange = (val: string) => {
    setPxVal(val);
    const num = parseFloat(val);
    if (!isNaN(num) && baseSize > 0) {
      setRemVal((num / baseSize).toFixed(4).replace(/\.?0+$/, ""));
    } else {
      setRemVal("");
    }
  };

  const handleRemChange = (val: string) => {
    setRemVal(val);
    const num = parseFloat(val);
    if (!isNaN(num) && baseSize > 0) {
      setPxVal((num * baseSize).toFixed(2).replace(/\.?0+$/, ""));
    } else {
      setPxVal("");
    }
  };

  const handleBaseChange = (base: number) => {
    setBaseSize(base);
    const num = parseFloat(pxVal);
    if (!isNaN(num) && base > 0) {
      setRemVal((num / base).toFixed(4).replace(/\.?0+$/, ""));
    }
  };

  const commonSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96];

  return (
    <ToolContainer
      title="PX to REM & REM to PX Converter"
      description="Convert pixels (px) to rem/em units and back with customizable base root font sizes."
      maxWidth="5xl"
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs font-semibold uppercase text-gray-500">Root Font Size (1rem =):</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleBaseChange(16)}
              className={`rounded-lg px-3 py-1 text-xs font-medium ${baseSize === 16 ? "bg-primary text-white" : "border border-black/10 dark:border-white/10"}`}
            >
              16px (Default Browser)
            </button>
            <button
              type="button"
              onClick={() => handleBaseChange(10)}
              className={`rounded-lg px-3 py-1 text-xs font-medium ${baseSize === 10 ? "bg-primary text-white" : "border border-black/10 dark:border-white/10"}`}
            >
              10px (62.5% CSS trick)
            </button>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={baseSize}
                onChange={(e) => handleBaseChange(Number(e.target.value))}
                className="w-16 rounded border border-black/15 bg-transparent p-1 font-mono text-xs text-center dark:border-white/20"
              />
              <span className="text-xs font-mono text-gray-500">px</span>
            </div>
          </div>
        </div>

        {/* Dual Input Box */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-6 bg-black/[0.01] dark:border-white/10 dark:bg-white/[0.01]">
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Pixels (PX)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={pxVal}
                onChange={(e) => handlePxChange(e.target.value)}
                placeholder="16"
                className="w-full rounded-xl border border-black/15 bg-transparent p-3 font-mono text-2xl font-bold dark:border-white/20 focus:border-primary outline-none"
              />
              <span className="font-mono text-lg text-gray-400 font-semibold">px</span>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 p-6 bg-black/[0.01] dark:border-white/10 dark:bg-white/[0.01]">
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Root EM (REM)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={remVal}
                onChange={(e) => handleRemChange(e.target.value)}
                placeholder="1"
                className="w-full rounded-xl border border-black/15 bg-transparent p-3 font-mono text-2xl font-bold dark:border-white/20 focus:border-primary outline-none"
              />
              <span className="font-mono text-lg text-gray-400 font-semibold">rem</span>
            </div>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
            Standard PX to REM Reference Table (Base: {baseSize}px)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs font-mono">
            {commonSizes.map((px) => {
              const rem = (px / baseSize).toFixed(4).replace(/\.?0+$/, "");
              return (
                <div
                  key={px}
                  onClick={() => handlePxChange(px.toString())}
                  className="cursor-pointer rounded-lg border border-black/10 p-2.5 text-center hover:border-primary hover:bg-primary/5 transition dark:border-white/10"
                >
                  <div className="font-bold text-gray-900 dark:text-white">{px}px</div>
                  <div className="text-primary">{rem}rem</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
