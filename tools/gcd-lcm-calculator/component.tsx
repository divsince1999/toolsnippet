"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function gcdMany(nums: number[]): number {
  return nums.reduce((acc, n) => gcd(acc, n));
}

function lcm(a: number, b: number): number {
  return (Math.abs(a) / gcd(a, b)) * Math.abs(b);
}

function lcmMany(nums: number[]): number {
  return nums.reduce((acc, n) => lcm(acc, n));
}

export default function GcdLcmCalculatorTool() {
  const [input, setInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const result = useMemo(() => {
    const nums = input.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (nums.length < 2) return null;
    return { nums, gcd: gcdMany(nums), lcm: lcmMany(nums) };
  }, [input]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer title="GCD & LCM Calculator" description="Compute the Greatest Common Divisor and Least Common Multiple." maxWidth="4xl">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Enter numbers (comma-separated)</label>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. 12, 18, 24"
          className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-4 py-3 text-lg font-mono outline-none focus:border-primary"
        />
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate numbers with commas. Minimum 2 numbers required.</div>
      </div>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 text-center">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">GCD</div>
            <div className="text-xs text-gray-400 mb-1">Greatest Common Divisor</div>
            <div className="text-4xl font-bold text-primary-solid mb-3">{result.gcd.toLocaleString()}</div>
            <Button variant="secondary" size="sm" onClick={() => copy(String(result.gcd))}>
              {isCopied ? "Copied!" : "Copy GCD"}
            </Button>
          </div>
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 text-center">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">LCM</div>
            <div className="text-xs text-gray-400 mb-1">Least Common Multiple</div>
            <div className="text-4xl font-bold text-primary-solid mb-3">{result.lcm.toLocaleString()}</div>
            <Button variant="outline" size="sm" onClick={() => copy(String(result.lcm))}>
              Copy LCM
            </Button>
          </div>

          <div className="sm:col-span-2 rounded-lg border border-black/10 dark:border-white/10 p-4 text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-white">Inputs: </strong>
            {result.nums.join(", ")} &nbsp;·&nbsp; <strong className="text-gray-900 dark:text-white">GCD = {result.gcd}</strong> &nbsp;·&nbsp; <strong className="text-gray-900 dark:text-white">LCM = {result.lcm.toLocaleString()}</strong>
          </div>
        </div>
      )}

      {!result && input.trim() && (
        <div className="text-sm text-orange-600 dark:text-orange-400">Enter at least 2 valid positive integers separated by commas.</div>
      )}
    </ToolContainer>
  );
}
