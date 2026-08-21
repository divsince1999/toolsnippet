"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TemperatureConverter() {
  const [val, setVal] = useState("25");
  const [scale, setScale] = useState<"C" | "F" | "K" | "R">("C");

  const results = useMemo(() => {
    const num = parseFloat(val);
    if (isNaN(num)) return null;

    let c = num;
    if (scale === "F") c = (num - 32) * (5 / 9);
    else if (scale === "K") c = num - 273.15;
    else if (scale === "R") c = (num - 491.67) * (5 / 9);

    const f = c * (9 / 5) + 32;
    const k = c + 273.15;
    const r = (c + 273.15) * (9 / 5);

    return {
      c: c.toFixed(2),
      f: f.toFixed(2),
      k: k.toFixed(2),
      r: r.toFixed(2)
    };
  }, [val, scale]);

  return (
    <ToolContainer
      title="Temperature Unit Converter"
      description="Convert temperatures between Celsius, Fahrenheit, Kelvin, Rankine, and Delisle with step-by-step conversion formulas."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Temperature Value:
            </label>
            <input
              type="number"
              step="any"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Source Scale:
            </label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value as "C" | "F" | "K" | "R")}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
              <option value="R">Rankine (°R)</option>
            </select>
          </div>
        </div>

        {results && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500">Celsius:</span>
              <div className="font-mono text-xl font-bold text-primary-solid">{results.c} °C</div>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500">Fahrenheit:</span>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-gray-100">{results.f} °F</div>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500">Kelvin:</span>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-gray-100">{results.k} K</div>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500">Rankine:</span>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-gray-100">{results.r} °R</div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
