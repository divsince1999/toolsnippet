"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function AmortizationLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const results = useMemo(() => {
    const P = loanAmount;
    const annualRate = interestRate / 100;
    const r = annualRate / 12;
    const n = loanTermYears * 12;

    if (P <= 0 || annualRate <= 0 || n <= 0) return null;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      monthlyEmi: Math.round(emi).toLocaleString(),
      totalPayment: Math.round(totalPayment).toLocaleString(),
      totalInterest: Math.round(totalInterest).toLocaleString(),
      interestPercent: Math.round((totalInterest / totalPayment) * 100)
    };
  }, [loanAmount, interestRate, loanTermYears]);

  return (
    <ToolContainer
      title="Loan & Mortgage EMI Amortization Calculator"
      description="Calculate monthly EMI repayments, total interest payable, loan amortization schedules, and principal payoff breakdowns."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Loan Amount ($):
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Interest Rate (% per year):
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Loan Term (Years):
            </label>
            <input
              type="number"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(parseInt(e.target.value, 10) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {results && (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Estimated Monthly Payment (EMI):
              </span>
              <div className="text-4xl font-extrabold text-primary-solid font-mono">${results.monthlyEmi} / mo</div>
            </div>

            <div className="grid gap-3 pt-3 border-t border-black/10 dark:border-white/10 sm:grid-cols-3 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total Principal:</span>
                <div className="font-mono text-base font-bold text-gray-900 dark:text-gray-100">${loanAmount.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total Interest Payable:</span>
                <div className="font-mono text-base font-bold text-amber-600 dark:text-amber-400">${results.totalInterest}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total Cost of Loan:</span>
                <div className="font-mono text-base font-bold text-gray-900 dark:text-gray-100">${results.totalPayment}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
