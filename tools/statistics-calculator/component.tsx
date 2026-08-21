"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function StatisticsCalculator() {
  const [dataInput, setDataInput] = useState("12, 15, 23, 24, 25, 29, 32, 34, 39, 42, 50");
  const [isSample, setIsSample] = useState(true);

  const stats = useMemo(() => {
    const nums = dataInput
      .split(/[,\s]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);

    const n = nums.length;
    if (n === 0) return null;

    const sum = nums.reduce((acc, v) => acc + v, 0);
    const mean = sum / n;

    // Median
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;

    // Mode
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    for (const x of nums) {
      freq[x] = (freq[x] || 0) + 1;
      if (freq[x] > maxFreq) maxFreq = freq[x];
    }
    const modes = Object.keys(freq).filter((k) => freq[parseFloat(k)] === maxFreq && maxFreq > 1);

    // Variance & Std Dev
    const divisor = isSample && n > 1 ? n - 1 : n;
    const variance = nums.reduce((acc, v) => acc + (v - mean) ** 2, 0) / divisor;
    const stdDev = Math.sqrt(variance);

    // Quartiles
    const q1 = nums[Math.floor(n / 4)];
    const q3 = nums[Math.floor((3 * n) / 4)];
    const iqr = q3 - q1;

    return {
      count: n,
      sum,
      min: nums[0],
      max: nums[n - 1],
      range: nums[n - 1] - nums[0],
      mean: mean.toFixed(3),
      median: median.toFixed(3),
      mode: modes.length > 0 ? modes.join(", ") : "No duplicate mode",
      variance: variance.toFixed(3),
      stdDev: stdDev.toFixed(3),
      q1,
      q3,
      iqr
    };
  }, [dataInput, isSample]);

  return (
    <ToolContainer
      title="Descriptive Statistics Calculator"
      description="Compute Mean, Median, Mode, Variance, Standard Deviation, Quartiles, IQR, Range, and Z-Scores from numerical datasets."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Raw Dataset (Comma, space, or newline separated):
          </label>
          <textarea
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
          <div className="flex gap-4 text-xs font-medium">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="statType"
                checked={isSample}
                onChange={() => setIsSample(true)}
                className="text-primary-solid focus:ring-primary-solid"
              />
              <span>Sample Statistics (n - 1)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="statType"
                checked={!isSample}
                onChange={() => setIsSample(false)}
                className="text-primary-solid focus:ring-primary-solid"
              />
              <span>Population Statistics (n)</span>
            </label>
          </div>
        </div>

        {stats && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Count (n)", val: stats.count },
              { label: "Sum (Σx)", val: stats.sum.toLocaleString() },
              { label: "Mean (Average)", val: stats.mean },
              { label: "Median", val: stats.median },
              { label: "Standard Deviation (s)", val: stats.stdDev },
              { label: "Variance (s²)", val: stats.variance },
              { label: "Min / Max", val: `${stats.min} / ${stats.max}` },
              { label: "Range / IQR", val: `${stats.range} (IQR: ${stats.iqr})` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</div>
                <div className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">{stat.val}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
