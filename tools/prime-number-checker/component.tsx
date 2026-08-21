"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) {
      factors.push(d);
      n = Math.floor(n / d);
    }
    d++;
  }
  if (n > 1) factors.push(n);
  return factors;
}

function allFactors(n: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

export default function PrimeNumberCheckerTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    const n = parseInt(input);
    if (isNaN(n) || n < 1) return null;
    const prime = isPrime(n);
    const factors = allFactors(n);
    const primeFacts = primeFactors(n);
    return { n, prime, factors, primeFacts };
  }, [input]);

  return (
    <ToolContainer title="Prime Number Checker" description="Check if a number is prime and see its full prime factorization." maxWidth="4xl">
      <div>
        <label className="block text-sm font-medium mb-2">Enter a positive integer</label>
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. 97"
          min={1}
          className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-4 py-3 text-lg font-mono outline-none focus:border-primary"
        />
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          <div className={`rounded-xl p-5 text-center border ${result.prime ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"}`}>
            <div className="text-3xl font-bold mb-1">
              {result.n.toLocaleString()}
            </div>
            <div className={`text-lg font-semibold ${result.prime ? "text-green-700 dark:text-green-400" : "text-orange-700 dark:text-orange-400"}`}>
              {result.prime ? "✓ Prime Number" : "✗ Composite Number"}
            </div>
          </div>

          {!result.prime && result.primeFacts.length > 0 && (
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Prime Factorization</div>
              <div className="font-mono text-base">
                {result.n} = {result.primeFacts.join(" × ")}
              </div>
            </div>
          )}

          <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
              All Factors ({result.factors.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {result.factors.map(f => (
                <span key={f} className="rounded-md bg-black/5 dark:bg-white/5 px-2 py-0.5 text-sm font-mono">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </ToolContainer>
  );
}
