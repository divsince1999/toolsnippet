"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ModuloInverseCalculator() {
  const [a, setA] = useState("7");
  const [b, setB] = useState("3");
  const [m, setM] = useState("26");
  const [op, setOp] = useState<"inverse" | "modExp" | "mod">("inverse");

  const results = useMemo(() => {
    try {
      const bigA = BigInt(a.trim());
      const bigM = BigInt(m.trim());
      if (bigM <= BigInt(0)) return { error: "Modulus must be greater than 0" };

      if (op === "mod") {
        const res = ((bigA % bigM) + bigM) % bigM;
        return { result: res.toString(), error: "" };
      }

      if (op === "modExp") {
        const bigB = BigInt(b.trim());
        if (bigB < BigInt(0)) return { error: "Exponent must be non-negative" };
        let base = bigA % bigM;
        let exp = bigB;
        let res = BigInt(1);
        while (exp > BigInt(0)) {
          if (exp % BigInt(2) === BigInt(1)) res = (res * base) % bigM;
          base = (base * base) % bigM;
          exp = exp / BigInt(2);
        }
        return { result: res.toString(), error: "" };
      }

      if (op === "inverse") {
        let t = BigInt(0), newT = BigInt(1);
        let r = bigM, newR = ((bigA % bigM) + bigM) % bigM;

        while (newR !== BigInt(0)) {
          const quotient = r / newR;
          const tempT = t - quotient * newT;
          t = newT;
          newT = tempT;

          const tempR = r - quotient * newR;
          r = newR;
          newR = tempR;
        }

        if (r > BigInt(1)) {
          return { error: `${a} is not invertible modulo ${m} (gcd !== 1)` };
        }
        if (t < BigInt(0)) t = t + bigM;

        return { result: t.toString(), error: "" };
      }

      return { error: "" };
    } catch {
      return { error: "Invalid numeric input" };
    }
  }, [a, b, m, op]);

  return (
    <ToolContainer
      title="Modular Arithmetic & Modulo Inverse Calculator"
      description="Calculate modular arithmetic, modular exponentiation (a^b mod m), and Extended Euclidean modular multiplicative inverse."
    >
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-black/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setOp("inverse")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              op === "inverse" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Modular Inverse (a⁻¹ mod m)
          </button>
          <button
            type="button"
            onClick={() => setOp("modExp")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              op === "modExp" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Modular Exponentiation (a^b mod m)
          </button>
          <button
            type="button"
            onClick={() => setOp("mod")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              op === "mod" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Basic Modulo (a mod m)
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Integer a:
            </label>
            <input
              type="text"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          {op === "modExp" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Exponent b:
              </label>
              <input
                type="text"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Modulus m:
            </label>
            <input
              type="text"
              value={m}
              onChange={(e) => setM(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {results.error ? (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
            {results.error}
          </div>
        ) : (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 text-center dark:border-white/10 dark:bg-white/[0.02] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Computed Result:
            </span>
            <div className="text-4xl font-extrabold text-primary-solid font-mono">
              {results.result}
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
