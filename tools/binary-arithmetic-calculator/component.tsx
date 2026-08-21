"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BinaryArithmeticCalculator() {
  const [base, setBase] = useState<2 | 8 | 10 | 16>(2);
  const [val1, setVal1] = useState("10110");
  const [op, setOp] = useState<"+" | "-" | "*" | "/" | "%">("+");
  const [val2, setVal2] = useState("1101");

  const results = useMemo(() => {
    try {
      const v1 = val1.trim().replace(/^0[bBoxX]/, "");
      const v2 = val2.trim().replace(/^0[bBoxX]/, "");

      const n1 = parseInt(v1, base);
      const n2 = parseInt(v2, base);

      if (isNaN(n1) || isNaN(n2)) return { error: "Invalid digits for selected numeral base" };

      let res = 0;
      switch (op) {
        case "+": res = n1 + n2; break;
        case "-": res = n1 - n2; break;
        case "*": res = n1 * n2; break;
        case "/":
          if (n2 === 0) return { error: "Division by zero" };
          res = Math.floor(n1 / n2);
          break;
        case "%":
          if (n2 === 0) return { error: "Modulo by zero" };
          res = n1 % n2;
          break;
      }

      return {
        dec: res.toString(10),
        bin: (res >>> 0).toString(2),
        hex: "0x" + (res >>> 0).toString(16).toUpperCase(),
        oct: "0o" + (res >>> 0).toString(8),
        error: ""
      };
    } catch {
      return { error: "Calculation error" };
    }
  }, [base, val1, op, val2]);

  return (
    <ToolContainer
      title="Binary & Hex Arithmetic Calculator"
      description="Perform addition, subtraction, multiplication, and division directly on Binary, Hexadecimal, and Octal numbers."
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span>Input Base:</span>
          {[
            { label: "Binary (Base 2)", b: 2 as const },
            { label: "Hexadecimal (Base 16)", b: 16 as const },
            { label: "Decimal (Base 10)", b: 10 as const },
            { label: "Octal (Base 8)", b: 8 as const }
          ].map((item) => (
            <button
              key={item.b}
              type="button"
              onClick={() => { setBase(item.b); }}
              className={`rounded-lg px-3 py-1.5 transition ${
                base === item.b ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 items-center">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-gray-500">Operand 1:</label>
            <input
              type="text"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-gray-500">Operation:</label>
            <select
              value={op}
              onChange={(e) => setOp(e.target.value as "+" | "-" | "*" | "/" | "%")}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-bold text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="+">+ (Addition)</option>
              <option value="-">− (Subtraction)</option>
              <option value="*">× (Multiplication)</option>
              <option value="/">÷ (Integer Division)</option>
              <option value="%">% (Modulo)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-gray-500">Operand 2:</label>
            <input
              type="text"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {results && !results.error && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500">Binary Result:</span>
              <div className="font-mono text-lg font-bold text-primary-solid break-all">{results.bin}</div>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500">Hexadecimal Result:</span>
              <div className="font-mono text-lg font-bold break-all">{results.hex}</div>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500">Decimal Result:</span>
              <div className="font-mono text-lg font-bold break-all">{results.dec}</div>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs text-gray-500">Octal Result:</span>
              <div className="font-mono text-lg font-bold break-all">{results.oct}</div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
