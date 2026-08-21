"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

function parseDuration(s: string): number | null {
  const trimmed = s.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(":").map(p => parseFloat(p.trim()));
  if (parts.some(isNaN)) return null;
  if (parts.length === 1) return parts[0];                          // seconds
  if (parts.length === 2) return parts[0] * 60 + parts[1];         // MM:SS
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS
  return null;
}

function formatHMS(totalSec: number): string {
  const abs = Math.abs(totalSec);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = Math.floor(abs % 60);
  const hStr = h.toString().padStart(2, "0");
  const mStr = m.toString().padStart(2, "0");
  const sStr = s.toString().padStart(2, "0");
  return (totalSec < 0 ? "-" : "") + `${hStr}:${mStr}:${sStr}`;
}

type DurationRow = { id: number; value: string; op: "+" | "-" };

export default function TimeDurationCalculatorTool() {
  const [rows, setRows] = useState<DurationRow[]>([
    { id: 1, value: "", op: "+" },
    { id: 2, value: "", op: "+" },
  ]);
  const [isCopied, setIsCopied] = useState(false);

  const addRow = () => setRows(r => [...r, { id: Date.now(), value: "", op: "+" }]);
  const removeRow = (id: number) => setRows(r => r.filter(row => row.id !== id));
  const updateRow = (id: number, field: keyof DurationRow, val: string) =>
    setRows(r => r.map(row => row.id === id ? { ...row, [field]: val } : row));

  const result = useMemo(() => {
    let total = 0;
    for (const row of rows) {
      const secs = parseDuration(row.value);
      if (secs !== null) {
        total += row.op === "+" ? secs : -secs;
      }
    }
    return { totalSec: total, hms: formatHMS(total), totalMin: (total / 60).toFixed(2), totalHours: (total / 3600).toFixed(4) };
  }, [rows]);

  const copy = async () => {
    await navigator.clipboard.writeText(result.hms);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const inputCls = "rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-2 text-sm font-mono outline-none focus:border-primary";

  return (
    <ToolContainer title="Time Duration Calculator" description="Add and subtract time durations in HH:MM:SS format." maxWidth="4xl">
      <div className="space-y-2 mb-4">
        {rows.map((row, i) => (
          <div key={row.id} className="flex items-center gap-2">
            <select
              value={row.op}
              onChange={e => updateRow(row.id, "op", e.target.value)}
              className={`${inputCls} w-14`}
              disabled={i === 0}
            >
              <option value="+">+</option>
              <option value="-">−</option>
            </select>
            <input
              type="text"
              value={row.value}
              onChange={e => updateRow(row.id, "value", e.target.value)}
              placeholder="HH:MM:SS or MM:SS or seconds"
              className={`${inputCls} flex-1`}
            />
            {rows.length > 2 && (
              <button onClick={() => removeRow(row.id)} className="text-gray-400 hover:text-red-500 text-lg leading-none px-1" aria-label="Remove">×</button>
            )}
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addRow}>+ Add Duration</Button>

      <div className="mt-6 rounded-xl border border-black/10 dark:border-white/10 p-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Total Duration</div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl font-bold font-mono text-primary-solid">{result.hms}</span>
          <Button variant="secondary" onClick={copy}>{isCopied ? "Copied!" : "Copy"}</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold block">Total Minutes</span>
            <span className="font-mono font-medium">{result.totalMin}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold block">Total Hours</span>
            <span className="font-mono font-medium">{result.totalHours}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold block">Total Seconds</span>
            <span className="font-mono font-medium">{result.totalSec}</span>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
