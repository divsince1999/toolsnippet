"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function nPr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

export default function FactorialCalculatorTool() {
  const [n, setN] = useState("");
  const [r, setR] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const result = useMemo(() => {
    const nv = parseInt(n);
    const rv = parseInt(r);
    if (isNaN(nv) || nv < 0 || nv > 20) return null;
    const fact = factorial(nv);
    const comb = !isNaN(rv) && rv >= 0 && rv <= nv ? nCr(nv, rv) : null;
    const perm = !isNaN(rv) && rv >= 0 && rv <= nv ? nPr(nv, rv) : null;
    return { nv, rv, fact, comb, perm };
  }, [n, r]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const inputCls = "w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-4 py-3 text-lg font-mono outline-none focus:border-primary";

  return (
    <ToolContainer title="Factorial Calculator" description="Compute n!, combinations (nCr), and permutations (nPr)." maxWidth="4xl">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">n (0–20)</label>
          <input type="number" value={n} onChange={e => setN(e.target.value)} min={0} max={20} placeholder="e.g. 7" className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">r (for nCr / nPr)</label>
          <input type="number" value={r} onChange={e => setR(e.target.value)} min={0} placeholder="e.g. 3" className={inputCls} />
        </div>
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Factorial</div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">{result.nv}! = </span>
                <span className="text-2xl font-bold font-mono text-primary-solid">{result.fact.toLocaleString()}</span>
              </div>
              <Button variant="secondary" size="sm" onClick={() => copy(String(result.fact))}>{isCopied ? "Copied!" : "Copy"}</Button>
            </div>
          </div>

          {result.comb !== null && (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Combinations nCr (order doesn&apos;t matter)</div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">C({result.nv},{result.rv}) = </span>
                  <span className="text-2xl font-bold font-mono text-primary-solid">{result.comb.toLocaleString()}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => copy(String(result.comb))}>Copy</Button>
              </div>
            </div>
          )}

          {result.perm !== null && (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Permutations nPr (order matters)</div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">P({result.nv},{result.rv}) = </span>
                  <span className="text-2xl font-bold font-mono text-primary-solid">{result.perm.toLocaleString()}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => copy(String(result.perm))}>Copy</Button>
              </div>
            </div>
          )}
        </div>
      ) : n ? (
        <div className="text-sm text-orange-600 dark:text-orange-400">n must be an integer between 0 and 20.</div>
      ) : null}
    </ToolContainer>
  );
}
