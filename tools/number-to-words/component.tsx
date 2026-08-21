"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const ones = ["","one","two","three","four","five","six","seven","eight","nine",
  "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const tens = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

function sayBelow1000(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
  return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + sayBelow1000(n % 100) : "");
}

function numberToWords(n: number): string {
  if (n === 0) return "zero";
  let result = "";
  if (n < 0) { result = "negative "; n = -n; }

  const chunks: [number, string][] = [
    [1_000_000_000_000, "trillion"],
    [1_000_000_000, "billion"],
    [1_000_000, "million"],
    [1_000, "thousand"],
    [1, ""],
  ];

  for (const [divisor, label] of chunks) {
    if (n >= divisor) {
      const q = Math.floor(n / divisor);
      result += sayBelow1000(q) + (label ? " " + label : "");
      n %= divisor;
      if (n > 0) result += " ";
    }
  }
  return result.trim();
}

export default function NumberToWordsTool() {
  const [input, setInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const result = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return "";
    const n = parseInt(trimmed);
    if (isNaN(n)) return "Invalid number";
    if (Math.abs(n) > 999_999_999_999_999) return "Number too large (max 999 trillion)";
    return numberToWords(n);
  }, [input]);

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer title="Number to Words" description="Convert numeric figures into written English words." maxWidth="4xl">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Enter an integer</label>
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. 1234567"
          className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-4 py-3 text-lg font-mono outline-none focus:border-primary"
        />
      </div>

      {result && (
        <div className="mt-4 rounded-xl border border-black/10 dark:border-white/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Written Form</div>
          <div className={`text-lg font-medium capitalize leading-relaxed mb-4 ${result === "Invalid number" || result.startsWith("Number too") ? "text-red-500" : "text-gray-900 dark:text-white"}`}>
            {result}
          </div>
          {result !== "Invalid number" && !result.startsWith("Number too") && (
            <Button variant="secondary" onClick={copy}>{isCopied ? "Copied!" : "Copy to Clipboard"}</Button>
          )}
        </div>
      )}
    </ToolContainer>
  );
}
