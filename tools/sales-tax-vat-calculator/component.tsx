"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SalesTaxVatCalculator() {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState(100);
  const [taxRate, setTaxRate] = useState(20);

  const results = useMemo(() => {
    if (amount <= 0 || taxRate < 0) return null;

    let net = 0;
    let tax = 0;
    let gross = 0;

    if (mode === "add") {
      net = amount;
      tax = amount * (taxRate / 100);
      gross = net + tax;
    } else {
      gross = amount;
      net = gross / (1 + taxRate / 100);
      tax = gross - net;
    }

    return {
      net: net.toFixed(2),
      tax: tax.toFixed(2),
      gross: gross.toFixed(2),
      effectiveRate: taxRate.toFixed(2)
    };
  }, [mode, amount, taxRate]);

  return (
    <ToolContainer
      title="Sales Tax, GST & VAT Calculator"
      description="Calculate tax inclusive and tax exclusive pricing, gross totals, and net breakdown for custom sales tax and VAT rates."
    >
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-black/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setMode("add")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "add" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Add Tax (Exclusive ➔ Total)
          </button>
          <button
            type="button"
            onClick={() => setMode("remove")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "remove" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Remove Tax (Inclusive ➔ Net)
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {mode === "add" ? "Net Amount ($):" : "Gross Total Amount ($):"}
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Tax / VAT Rate (%):
            </label>
            <input
              type="number"
              step="0.1"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {results && (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-4">
            <div className="grid gap-4 sm:grid-cols-3 text-center">
              <div className="p-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Net Price (Excl. Tax):</span>
                <div className="font-mono text-xl font-bold text-gray-900 dark:text-gray-100">${results.net}</div>
              </div>
              <div className="p-2 border-y sm:border-y-0 sm:border-x border-black/10 dark:border-white/10">
                <span className="text-xs text-gray-500 dark:text-gray-400">Tax Amount ({results.effectiveRate}%):</span>
                <div className="font-mono text-xl font-bold text-primary-solid">+${results.tax}</div>
              </div>
              <div className="p-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Gross Total (Incl. Tax):</span>
                <div className="font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">${results.gross}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
