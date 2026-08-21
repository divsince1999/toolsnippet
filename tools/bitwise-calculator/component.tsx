"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BitwiseCalculator() {
  const [opA, setOpA] = useState("12");
  const [opB, setOpB] = useState("5");
  const [operator, setOperator] = useState<"&" | "|" | "^" | "~" | "<<" | ">>" | ">>>">("&");

  const parsed = useMemo(() => {
    const parseNum = (str: string) => {
      const clean = str.trim();
      if (clean.startsWith("0x") || clean.startsWith("0X")) return parseInt(clean, 16);
      if (clean.startsWith("0b") || clean.startsWith("0B")) return parseInt(clean.slice(2), 2);
      return parseInt(clean, 10);
    };

    const a = parseNum(opA) || 0;
    const b = parseNum(opB) || 0;

    let res = 0;
    switch (operator) {
      case "&": res = a & b; break;
      case "|": res = a | b; break;
      case "^": res = a ^ b; break;
      case "~": res = ~a; break;
      case "<<": res = a << b; break;
      case ">>": res = a >> b; break;
      case ">>>": res = a >>> b; break;
    }

    const to32Bin = (n: number) => (n >>> 0).toString(2).padStart(32, "0");
    const toHex = (n: number) => "0x" + (n >>> 0).toString(16).toUpperCase();

    return {
      a,
      b,
      res,
      aBin: to32Bin(a),
      bBin: to32Bin(b),
      resBin: to32Bin(res),
      resHex: toHex(res)
    };
  }, [opA, opB, operator]);

  return (
    <ToolContainer
      title="Bitwise Operations & Shift Calculator"
      description="Interactive 32-bit and 64-bit calculator for bitwise AND, OR, XOR, NOT, NAND, NOR, Shift Left (<<), and Shift Right (>>)."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Operand A (Dec, 0xHex, 0bBin):
            </label>
            <input
              type="text"
              value={opA}
              onChange={(e) => setOpA(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Bitwise Operation:
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value as "&" | "|" | "^" | "~" | "<<" | ">>" | ">>>")}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="&">AND (&)</option>
              <option value="|">OR (|)</option>
              <option value="^">XOR (^)</option>
              <option value="~">NOT (~A)</option>
              <option value="<<">Shift Left (A &lt;&lt; B)</option>
              <option value=">>">Shift Right Signed (A &gt;&gt; B)</option>
              <option value=">>>">Shift Right Zero-Fill (A &gt;&gt;&gt; B)</option>
            </select>
          </div>

          {operator !== "~" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Operand B (or Shift Count):
              </label>
              <input
                type="text"
                value={opB}
                onChange={(e) => setOpB(e.target.value)}
                className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          )}
        </div>

        {/* Results Card */}
        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Decimal (Signed 32-bit):</span>
              <div className="text-2xl font-bold font-mono text-primary-solid">{parsed.res}</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Hexadecimal:</span>
              <div className="text-2xl font-bold font-mono">{parsed.resHex}</div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Unsigned Decimal:</span>
              <div className="text-2xl font-bold font-mono">{parsed.res >>> 0}</div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-black/10 dark:border-white/10 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-500 dark:text-gray-400">A (Bin 32-bit):</span>
              <span className="tracking-widest">{parsed.aBin}</span>
            </div>
            {operator !== "~" && (
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-gray-500 dark:text-gray-400">B (Bin 32-bit):</span>
                <span className="tracking-widest">{parsed.bBin}</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-primary-solid">
              <span>Result (Bin):</span>
              <span className="tracking-widest">{parsed.resBin}</span>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
