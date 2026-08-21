"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ScientificNotationConverter() {
  const [val, setVal] = useState("125000000");

  const results = useMemo(() => {
    const num = parseFloat(val);
    if (isNaN(num)) return null;

    const sci = num.toExponential();
    const [coeff, exp] = sci.split("e");
    const expNum = parseInt(exp, 10);

    // Engineering notation (exponent multiple of 3)
    const engExp = Math.floor(expNum / 3) * 3;
    const engCoeff = (num / Math.pow(10, engExp)).toFixed(3);

    const prefixes: Record<number, string> = {
      [-12]: "pico (p)",
      [-9]: "nano (n)",
      [-6]: "micro (µ)",
      [-3]: "milli (m)",
      [0]: "unit (none)",
      [3]: "kilo (k)",
      [6]: "mega (M)",
      [9]: "giga (G)",
      [12]: "tera (T)",
      [15]: "peta (P)"
    };

    const prefix = prefixes[engExp] || `10^${engExp}`;

    return {
      standard: num.toLocaleString(),
      scientific: `${parseFloat(coeff).toFixed(3)} × 10^${expNum}`,
      sciE: sci,
      engineering: `${engCoeff} × 10^${engExp}`,
      siPrefix: `${engCoeff} ${prefix}`
    };
  }, [val]);

  return (
    <ToolContainer
      title="Scientific & Engineering Notation Converter"
      description="Convert between standard decimals, scientific notation (1.23e+8), and engineering metric prefixes (nano to tera)."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Number Input (Standard or e-Notation):
          </label>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {results && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500 dark:text-gray-400">Scientific Notation:</span>
              <div className="font-mono text-lg font-bold text-primary-solid">{results.scientific}</div>
              <div className="text-[11px] opacity-75 font-mono">E-Notation: {results.sciE}</div>
            </div>

            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500 dark:text-gray-400">Engineering Notation:</span>
              <div className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">{results.engineering}</div>
            </div>

            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500 dark:text-gray-400">SI Metric Prefix Form:</span>
              <div className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">{results.siPrefix}</div>
            </div>

            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500 dark:text-gray-400">Standard Decimal Form:</span>
              <div className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">{results.standard}</div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
