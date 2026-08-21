"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const INT_TO_ROMAN: [number, string][] = [
  [1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],
  [50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"],
];

function toRoman(n: number): string {
  if (n < 1 || n > 3999) return "Out of range (1–3999)";
  let result = "";
  for (const [val, sym] of INT_TO_ROMAN) {
    while (n >= val) { result += sym; n -= val; }
  }
  return result;
}

function fromRoman(s: string): number | null {
  const map: Record<string, number> = { I:1,V:5,X:10,L:50,C:100,D:500,M:1000 };
  const upper = s.toUpperCase().trim();
  if (!upper || !/^[IVXLCDM]+$/.test(upper)) return null;
  let total = 0;
  for (let i = 0; i < upper.length; i++) {
    const cur = map[upper[i]], next = map[upper[i + 1]];
    if (next && cur < next) total -= cur;
    else total += cur;
  }
  return total;
}

export default function RomanNumeralConverterTool() {
  const [numberInput, setNumberInput] = useState("");
  const [romanInput, setRomanInput] = useState("");
  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);

  const romanResult = useMemo(() => {
    const n = parseInt(numberInput);
    if (!numberInput || isNaN(n)) return "";
    return toRoman(n);
  }, [numberInput]);

  const numberResult = useMemo(() => {
    if (!romanInput) return "";
    const r = fromRoman(romanInput);
    if (r === null) return "Invalid Roman numeral";
    return r.toString();
  }, [romanInput]);

  const copy = async (text: string, setFn: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const inputCls = "w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-4 py-3 text-lg font-mono outline-none focus:border-primary";
  const resultCls = "mt-3 flex items-center justify-between rounded-lg bg-primary/10 border border-primary/20 px-4 py-3";

  return (
    <ToolContainer title="Roman Numeral Converter" description="Convert between integers and Roman numerals instantly." maxWidth="4xl">
      <div className="space-y-6">
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Number → Roman Numeral</h3>
          <input type="number" value={numberInput} onChange={e => setNumberInput(e.target.value)} placeholder="Enter 1–3999" min={1} max={3999} className={inputCls} />
          {romanResult && (
            <div className={resultCls}>
              <span className="text-2xl font-bold tracking-widest text-primary-solid">{romanResult}</span>
              <Button variant="secondary" size="sm" onClick={() => copy(romanResult, setIsCopied1)}>
                {isCopied1 ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Roman Numeral → Number</h3>
          <input type="text" value={romanInput} onChange={e => setRomanInput(e.target.value)} placeholder="Enter Roman numeral (e.g. XIV)" className={`${inputCls} uppercase`} />
          {numberResult && (
            <div className={resultCls}>
              <span className={`text-2xl font-bold ${numberResult === "Invalid Roman numeral" ? "text-red-500" : "text-primary-solid"}`}>
                {numberResult}
              </span>
              {numberResult !== "Invalid Roman numeral" && (
                <Button variant="secondary" size="sm" onClick={() => copy(numberResult, setIsCopied2)}>
                  {isCopied2 ? "Copied!" : "Copy"}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Quick reference: </span>
          I=1 · V=5 · X=10 · L=50 · C=100 · D=500 · M=1000
        </div>
      </div>
    </ToolContainer>
  );
}
