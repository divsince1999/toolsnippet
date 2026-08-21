"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function AngleConverter() {
  const [val, setVal] = useState("180");
  const [unit, setUnit] = useState<"deg" | "rad" | "grad" | "turn">("deg");

  const results = useMemo(() => {
    const num = parseFloat(val);
    if (isNaN(num)) return null;

    let deg = num;
    if (unit === "rad") deg = num * (180 / Math.PI);
    else if (unit === "grad") deg = num * 0.9;
    else if (unit === "turn") deg = num * 360;

    const rad = deg * (Math.PI / 180);
    const grad = deg / 0.9;
    const turn = deg / 360;
    const arcmin = deg * 60;
    const arcsec = deg * 3600;

    const radPiFraction = (turn * 2).toFixed(3) + "π";

    const sin = Math.sin(rad).toFixed(4);
    const cos = Math.cos(rad).toFixed(4);
    const tan = Math.abs(Math.cos(rad)) < 1e-10 ? "Undefined (∞)" : Math.tan(rad).toFixed(4);

    return {
      deg: deg.toFixed(4),
      rad: rad.toFixed(4),
      radPiFraction,
      grad: grad.toFixed(4),
      turn: turn.toFixed(4),
      arcmin: arcmin.toFixed(1),
      arcsec: arcsec.toFixed(1),
      sin,
      cos,
      tan
    };
  }, [val, unit]);

  return (
    <ToolContainer
      title="Angle & Trigonometry Unit Converter"
      description="Convert between Degrees, Radians, Gradians, Arcminutes, Arcseconds, and Turns with live trigonometric values."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Input Angle:
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
              Source Unit:
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "deg" | "rad" | "grad" | "turn")}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="deg">Degrees (°)</option>
              <option value="rad">Radians (rad)</option>
              <option value="grad">Gradians (grad)</option>
              <option value="turn">Revolutions / Turns (turn)</option>
            </select>
          </div>
        </div>

        {results && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Degrees (°)", val: `${results.deg}°` },
                { label: "Radians (rad)", val: `${results.rad} rad (${results.radPiFraction})` },
                { label: "Gradians (grad)", val: `${results.grad} grad` },
                { label: "Turns / Revolutions", val: `${results.turn} rev` },
                { label: "Arcminutes (′)", val: `${results.arcmin}′` },
                { label: "Arcseconds (″)", val: `${results.arcsec}″` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-black/10 bg-black/[0.02] p-3.5 dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
                  <div className="font-mono text-base font-bold text-gray-900 dark:text-gray-100 break-all">
                    {item.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Trig Functions */}
            <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Trigonometric Values:
              </span>
              <div className="grid gap-3 pt-2 sm:grid-cols-3 text-center">
                <div className="p-2">
                  <span className="text-xs text-gray-500">sin(θ):</span>
                  <div className="font-mono text-lg font-bold text-primary-solid">{results.sin}</div>
                </div>
                <div className="p-2">
                  <span className="text-xs text-gray-500">cos(θ):</span>
                  <div className="font-mono text-lg font-bold text-primary-solid">{results.cos}</div>
                </div>
                <div className="p-2">
                  <span className="text-xs text-gray-500">tan(θ):</span>
                  <div className="font-mono text-lg font-bold text-primary-solid">{results.tan}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
