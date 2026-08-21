"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function FloatingPointConverter() {
  const [val, setVal] = useState("0.1");
  const [precision, setPrecision] = useState<"single" | "double">("single");

  const parsed = useMemo(() => {
    const num = parseFloat(val);
    if (isNaN(num)) return null;

    if (precision === "single") {
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      view.setFloat32(0, num, false);
      const uint = view.getUint32(0, false);
      const bin = uint.toString(2).padStart(32, "0");

      const sign = bin[0];
      const exponent = bin.slice(1, 9);
      const mantissa = bin.slice(9);
      const hex = "0x" + uint.toString(16).toUpperCase().padStart(8, "0");

      const expVal = parseInt(exponent, 2) - 127;
      const actualVal = view.getFloat32(0, false);

      return { sign, exponent, mantissa, hex, expVal, actualVal, totalBits: 32 };
    } else {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      view.setFloat64(0, num, false);
      const high = view.getUint32(0, false).toString(2).padStart(32, "0");
      const low = view.getUint32(4, false).toString(2).padStart(32, "0");
      const bin = high + low;

      const sign = bin[0];
      const exponent = bin.slice(1, 12);
      const mantissa = bin.slice(12);
      const hex = "0x" + view.getBigUint64(0, false).toString(16).toUpperCase().padStart(16, "0");

      const expVal = parseInt(exponent, 2) - 1023;
      const actualVal = view.getFloat64(0, false);

      return { sign, exponent, mantissa, hex, expVal, actualVal, totalBits: 64 };
    }
  }, [val, precision]);

  return (
    <ToolContainer
      title="IEEE 754 Floating-Point Visualizer & Converter"
      description="Convert 32-bit single and 64-bit double precision floats into Sign bit, Exponent, Mantissa, and Hexadecimal representations."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Decimal Float Value:
            </label>
            <input
              type="text"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Precision Format:
            </label>
            <select
              value={precision}
              onChange={(e) => setPrecision(e.target.value as "single" | "double")}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="single">32-bit Single Precision (float)</option>
              <option value="double">64-bit Double Precision (double)</option>
            </select>
          </div>
        </div>

        {parsed && (
          <div className="space-y-4 rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02]">
            {/* Color-Coded Bit Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Binary Bit Fields ({parsed.totalBits}-bit):
              </span>
              <div className="flex flex-wrap gap-1 font-mono text-xs break-all">
                <span className="rounded bg-rose-500/20 px-2 py-1 text-rose-700 dark:text-rose-300 font-bold" title="Sign Bit">
                  {parsed.sign}
                </span>
                <span className="rounded bg-amber-500/20 px-2 py-1 text-amber-700 dark:text-amber-300 font-bold" title="Exponent">
                  {parsed.exponent}
                </span>
                <span className="rounded bg-sky-500/20 px-2 py-1 text-sky-700 dark:text-sky-300 font-bold" title="Mantissa / Fraction">
                  {parsed.mantissa}
                </span>
              </div>
              <div className="flex gap-4 text-[11px] pt-1">
                <span className="text-rose-600 dark:text-rose-400">■ Sign (1 bit)</span>
                <span className="text-amber-600 dark:text-amber-400">■ Exponent ({precision === "single" ? "8 bits" : "11 bits"})</span>
                <span className="text-sky-600 dark:text-sky-400">■ Mantissa ({precision === "single" ? "23 bits" : "52 bits"})</span>
              </div>
            </div>

            <div className="grid gap-3 pt-3 border-t border-black/10 dark:border-white/10 sm:grid-cols-3 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Hex Representation:</span>
                <div className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">{parsed.hex}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Unbiased Exponent (2^n):</span>
                <div className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">2^{parsed.expVal}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Actual Stored Float:</span>
                <div className="font-mono text-sm font-bold text-primary-solid">{parsed.actualVal}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
