"use client";

import { useState, useCallback } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

function cryptoRandFloat(): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] / (0xFFFFFFFF + 1);
}

export default function RandomNumberGeneratorTool() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [quantity, setQuantity] = useState("1");
  const [decimals, setDecimals] = useState("0");
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generate = useCallback(() => {
    setError("");
    const lo = parseFloat(min), hi = parseFloat(max);
    const qty = Math.min(10000, Math.max(1, parseInt(quantity) || 1));
    const dp = Math.max(0, Math.min(10, parseInt(decimals) || 0));

    if (isNaN(lo) || isNaN(hi)) { setError("Enter valid min and max values."); return; }
    if (lo >= hi) { setError("Min must be less than Max."); return; }

    const gen = () => {
      const raw = lo + cryptoRandFloat() * (hi - lo);
      return dp === 0 ? Math.floor(raw) : parseFloat(raw.toFixed(dp));
    };

    let nums: number[];
    if (unique && dp === 0) {
      const range = Math.floor(hi) - Math.ceil(lo) + 1;
      if (qty > range) { setError(`Cannot generate ${qty} unique integers in range [${Math.ceil(lo)}, ${Math.floor(hi)}].`); return; }
      const pool = new Set<number>();
      while (pool.size < qty) pool.add(Math.floor(lo + cryptoRandFloat() * (Math.floor(hi) - Math.floor(lo) + 1)));
      nums = Array.from(pool);
    } else {
      nums = Array.from({ length: qty }, gen);
    }

    setResults(nums);
  }, [min, max, quantity, decimals, unique]);

  const copy = async () => {
    await navigator.clipboard.writeText(results.join("\n"));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const inputCls = "w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <ToolContainer title="Random Number Generator" description="Generate random numbers with custom range and quantity." maxWidth="4xl">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium mb-1">Minimum</label>
          <input type="number" value={min} onChange={e => setMin(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Maximum</label>
          <input type="number" value={max} onChange={e => setMax(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Quantity</label>
          <input type="number" value={quantity} min={1} max={10000} onChange={e => setQuantity(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Decimal Places</label>
          <input type="number" value={decimals} min={0} max={10} onChange={e => setDecimals(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} className="rounded" />
          No duplicates (integers only)
        </label>
      </div>

      {error && <p className="mb-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={generate}>Generate</Button>
        {results.length > 0 && (
          <Button variant="secondary" onClick={copy}>{isCopied ? "Copied!" : "Copy All"}</Button>
        )}
        {results.length > 0 && (
          <Button variant="ghost" onClick={() => setResults([])}>Clear</Button>
        )}
      </div>

      {results.length > 0 && (
        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
            {results.length} Result{results.length !== 1 ? "s" : ""}
          </div>
          <div className="font-mono text-sm break-all max-h-64 overflow-y-auto">
            {results.length === 1 ? (
              <span className="text-3xl font-bold text-primary-solid">{results[0]}</span>
            ) : (
              results.join(", ")
            )}
          </div>
        </div>
      )}
    </ToolContainer>
  );
}
