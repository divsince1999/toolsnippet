"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function FractionCalculator() {
  const [w1, setW1] = useState("0");
  const [n1, setN1] = useState("3");
  const [d1, setD1] = useState("4");

  const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");

  const [w2, setW2] = useState("0");
  const [n2, setN2] = useState("2");
  const [d2, setD2] = useState("3");

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  const results = useMemo(() => {
    const den1 = parseInt(d1, 10) || 1;
    const num1 = (parseInt(w1, 10) || 0) * den1 + (parseInt(n1, 10) || 0);

    const den2 = parseInt(d2, 10) || 1;
    const num2 = (parseInt(w2, 10) || 0) * den2 + (parseInt(n2, 10) || 0);

    let resNum = 0;
    let resDen = 1;

    switch (op) {
      case "+":
        resNum = num1 * den2 + num2 * den1;
        resDen = den1 * den2;
        break;
      case "-":
        resNum = num1 * den2 - num2 * den1;
        resDen = den1 * den2;
        break;
      case "*":
        resNum = num1 * num2;
        resDen = den1 * den2;
        break;
      case "/":
        if (num2 === 0) return { error: "Cannot divide by zero fraction" };
        resNum = num1 * den2;
        resDen = den1 * num2;
        break;
    }

    if (resDen < 0) {
      resNum = -resNum;
      resDen = -resDen;
    }

    const common = gcd(resNum, resDen);
    const simpNum = resNum / common;
    const simpDen = resDen / common;

    const whole = Math.trunc(simpNum / simpDen);
    const remNum = Math.abs(simpNum % simpDen);
    const decimal = (simpNum / simpDen).toFixed(4);

    return {
      rawFraction: `${resNum}/${resDen}`,
      simplified: simpDen === 1 ? `${simpNum}` : `${simpNum}/${simpDen}`,
      mixed: Math.abs(whole) > 0 && remNum > 0 ? `${whole} ${remNum}/${simpDen}` : null,
      decimal
    };
  }, [w1, n1, d1, op, w2, n2, d2]);

  return (
    <ToolContainer
      title="Fraction Calculator & Simplifier"
      description="Add, subtract, multiply, and divide fractions and mixed numbers, simplify to lowest terms, and convert to decimals."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          {/* Fraction 1 */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={w1}
              onChange={(e) => setW1(e.target.value)}
              placeholder="Whole"
              className="w-16 rounded-xl border border-black/15 bg-white p-2.5 text-center text-sm font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
            <div className="flex flex-col gap-1 w-16">
              <input
                type="number"
                value={n1}
                onChange={(e) => setN1(e.target.value)}
                placeholder="Num"
                className="rounded-lg border border-black/15 bg-white p-1 text-center text-xs font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
              <div className="h-[1.5px] bg-black/20 dark:bg-white/20" />
              <input
                type="number"
                value={d1}
                onChange={(e) => setD1(e.target.value)}
                placeholder="Den"
                className="rounded-lg border border-black/15 bg-white p-1 text-center text-xs font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>

          {/* Operator */}
          <select
            value={op}
            onChange={(e) => setOp(e.target.value as "+" | "-" | "*" | "/")}
            className="rounded-xl border border-black/15 bg-white px-3 py-2 text-base font-bold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          >
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>

          {/* Fraction 2 */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={w2}
              onChange={(e) => setW2(e.target.value)}
              placeholder="Whole"
              className="w-16 rounded-xl border border-black/15 bg-white p-2.5 text-center text-sm font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
            <div className="flex flex-col gap-1 w-16">
              <input
                type="number"
                value={n2}
                onChange={(e) => setN2(e.target.value)}
                placeholder="Num"
                className="rounded-lg border border-black/15 bg-white p-1 text-center text-xs font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
              <div className="h-[1.5px] bg-black/20 dark:bg-white/20" />
              <input
                type="number"
                value={d2}
                onChange={(e) => setD2(e.target.value)}
                placeholder="Den"
                className="rounded-lg border border-black/15 bg-white p-1 text-center text-xs font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        {results && !results.error && (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 text-center dark:border-white/10 dark:bg-white/[0.02] space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Simplified Result:
            </div>
            <div className="text-4xl font-extrabold text-primary-solid font-mono">
              {results.simplified}
            </div>
            {results.mixed && (
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Mixed Number: <span className="font-bold font-mono">{results.mixed}</span>
              </div>
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-black/10 dark:border-white/10">
              Decimal Equivalent: <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{results.decimal}</span>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
