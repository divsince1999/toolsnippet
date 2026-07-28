"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

function round(val: number, dp = 4) {
  return parseFloat(val.toFixed(dp));
}

export default function PercentageCalculatorTool() {
  const [percentOf, setPercentOf] = useState({ pct: "", of: "", result: "" });
  const [whatPct, setWhatPct] = useState({ x: "", of: "", result: "" });
  const [pctChange, setPctChange] = useState({ from: "", to: "", result: "" });

  const calcPercentOf = (pct: string, of: string) => {
    const p = parseFloat(pct), o = parseFloat(of);
    if (!isNaN(p) && !isNaN(o)) return String(round((p / 100) * o));
    return "";
  };

  const calcWhatPct = (x: string, of: string) => {
    const xv = parseFloat(x), ov = parseFloat(of);
    if (!isNaN(xv) && !isNaN(ov) && ov !== 0) return round((xv / ov) * 100) + "%";
    return "";
  };

  const calcChange = (from: string, to: string) => {
    const f = parseFloat(from), t = parseFloat(to);
    if (!isNaN(f) && !isNaN(t) && f !== 0) {
      const chg = round(((t - f) / Math.abs(f)) * 100);
      return (chg >= 0 ? "+" : "") + chg + "%";
    }
    return "";
  };

  const inputCls = "w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary";
  const resultCls = "mt-3 rounded-lg bg-primary/10 border border-primary/20 px-4 py-3 text-center text-xl font-bold text-primary-solid";

  return (
    <ToolContainer title="Percentage Calculator" description="Calculate percentages, percentage change, and reverse percentages." maxWidth="4xl">
      <div className="space-y-6">
        {/* Mode 1 */}
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">What is X% of Y?</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Percentage (%)</label>
              <input type="number" value={percentOf.pct} onChange={e => setPercentOf(p => ({ ...p, pct: e.target.value, result: calcPercentOf(e.target.value, p.of) }))} placeholder="e.g. 15" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Of Number</label>
              <input type="number" value={percentOf.of} onChange={e => setPercentOf(p => ({ ...p, of: e.target.value, result: calcPercentOf(p.pct, e.target.value) }))} placeholder="e.g. 200" className={inputCls} />
            </div>
          </div>
          {percentOf.result && <div className={resultCls}>{percentOf.pct}% of {percentOf.of} = <span>{percentOf.result}</span></div>}
        </div>

        {/* Mode 2 */}
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">What percent is X of Y?</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">X (Number)</label>
              <input type="number" value={whatPct.x} onChange={e => setWhatPct(p => ({ ...p, x: e.target.value, result: calcWhatPct(e.target.value, p.of) }))} placeholder="e.g. 25" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Y (Total)</label>
              <input type="number" value={whatPct.of} onChange={e => setWhatPct(p => ({ ...p, of: e.target.value, result: calcWhatPct(p.x, e.target.value) }))} placeholder="e.g. 200" className={inputCls} />
            </div>
          </div>
          {whatPct.result && <div className={resultCls}>{whatPct.x} is <span>{whatPct.result}</span> of {whatPct.of}</div>}
        </div>

        {/* Mode 3 */}
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Percentage Change</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Original Value</label>
              <input type="number" value={pctChange.from} onChange={e => setPctChange(p => ({ ...p, from: e.target.value, result: calcChange(e.target.value, p.to) }))} placeholder="e.g. 100" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">New Value</label>
              <input type="number" value={pctChange.to} onChange={e => setPctChange(p => ({ ...p, to: e.target.value, result: calcChange(p.from, e.target.value) }))} placeholder="e.g. 130" className={inputCls} />
            </div>
          </div>
          {pctChange.result && (
            <div className={`${resultCls} ${pctChange.result.startsWith("+") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              Change: <span>{pctChange.result}</span>
            </div>
          )}
        </div>
      </div>
    </ToolContainer>
  );
}
