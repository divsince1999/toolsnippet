"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [monthlyContrib, setMonthlyContrib] = useState(250);
  const [compoundFreq, setCompoundFreq] = useState<1 | 2 | 4 | 12 | 365>(12);

  const results = useMemo(() => {
    const P = principal;
    const r = rate / 100;
    const t = years;
    const n = compoundFreq;
    const PMT = monthlyContrib;

    if (P < 0 || r < 0 || t <= 0) return null;

    const compoundFactor = Math.pow(1 + r / n, n * t);
    const principalGrowth = P * compoundFactor;

    let contribGrowth = 0;
    if (PMT > 0 && r > 0) {
      const totalMonths = t * 12;
      const ratePerMonth = r / 12;
      contribGrowth = PMT * ((Math.pow(1 + ratePerMonth, totalMonths) - 1) / ratePerMonth);
    }

    const futureValue = Math.round(principalGrowth + contribGrowth);
    const totalDeposited = Math.round(P + PMT * t * 12);
    const totalInterest = Math.round(futureValue - totalDeposited);

    return {
      futureValue: futureValue.toLocaleString(),
      totalDeposited: totalDeposited.toLocaleString(),
      totalInterest: totalInterest.toLocaleString(),
      interestRatio: Math.round((totalInterest / futureValue) * 100)
    };
  }, [principal, rate, years, monthlyContrib, compoundFreq]);

  return (
    <ToolContainer
      title="Compound Interest & Investment Growth Calculator"
      description="Calculate compound interest, future investment balance, monthly contributions, and total interest earned over time."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Initial Principal ($):
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Annual Interest Rate (%):
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Investment Period (Years):
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value, 10) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Monthly Contribution ($):
            </label>
            <input
              type="number"
              value={monthlyContrib}
              onChange={(e) => setMonthlyContrib(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Compounding Frequency:
            </label>
            <select
              value={compoundFreq}
              onChange={(e) => setCompoundFreq(parseInt(e.target.value, 10) as 1 | 2 | 4 | 12 | 365)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="12">Monthly (12/year)</option>
              <option value="4">Quarterly (4/year)</option>
              <option value="2">Semi-Annually (2/year)</option>
              <option value="1">Annually (1/year)</option>
              <option value="365">Daily (365/year)</option>
            </select>
          </div>
        </div>

        {results && (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Future Investment Value:
              </span>
              <div className="text-4xl font-extrabold text-primary-solid font-mono">${results.futureValue}</div>
            </div>

            <div className="grid gap-3 pt-3 border-t border-black/10 dark:border-white/10 sm:grid-cols-3 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total Principal Deposited:</span>
                <div className="font-mono text-base font-bold text-gray-900 dark:text-gray-100">${results.totalDeposited}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total Interest Earned:</span>
                <div className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">+${results.totalInterest}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Interest Share:</span>
                <div className="font-mono text-base font-bold text-primary-solid">{results.interestRatio}% of total</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
