"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BytesUnitConverter() {
  const [val, setVal] = useState(1);
  const [unit, setUnit] = useState<string>("GB");

  const unitsConfig = useMemo(() => [
    { key: "B", name: "Bytes (B)", factor: 1, type: "Base" },
    { key: "KB", name: "Kilobytes (KB - 10³)", factor: 1e3, type: "SI Decimal (1000)" },
    { key: "MB", name: "Megabytes (MB - 10⁶)", factor: 1e6, type: "SI Decimal (1000)" },
    { key: "GB", name: "Gigabytes (GB - 10⁹)", factor: 1e9, type: "SI Decimal (1000)" },
    { key: "TB", name: "Terabytes (TB - 10¹²)", factor: 1e12, type: "SI Decimal (1000)" },
    { key: "PB", name: "Petabytes (PB - 10¹⁵)", factor: 1e15, type: "SI Decimal (1000)" },
    { key: "KiB", name: "Kibibytes (KiB - 2¹⁰)", factor: 1024, type: "IEC Binary (1024)" },
    { key: "MiB", name: "Mebibytes (MiB - 2²⁰)", factor: 1024 ** 2, type: "IEC Binary (1024)" },
    { key: "GiB", name: "Gibibytes (GiB - 2³⁰)", factor: 1024 ** 3, type: "IEC Binary (1024)" },
    { key: "TiB", name: "Tebibytes (TiB - 2⁴⁰)", factor: 1024 ** 4, type: "IEC Binary (1024)" },
    { key: "PiB", name: "Pebibytes (PiB - 2⁵⁰)", factor: 1024 ** 5, type: "IEC Binary (1024)" },
  ], []);

  const conversions = useMemo(() => {
    const selected = unitsConfig.find((u) => u.key === unit);
    if (!selected || val <= 0) return [];

    const totalBytes = val * selected.factor;

    return unitsConfig.map((u) => {
      const converted = totalBytes / u.factor;
      const display = converted >= 1000000 || (converted < 0.0001 && converted > 0)
        ? converted.toExponential(4)
        : converted.toLocaleString(undefined, { maximumFractionDigits: 6 });

      return {
        ...u,
        value: display,
        raw: converted
      };
    });
  }, [val, unit, unitsConfig]);

  return (
    <ToolContainer
      title="Data Storage & Byte Unit Converter"
      description="Convert between Bytes, KiB, MiB, GiB, TiB (binary base-2) and KB, MB, GB, TB, PB (decimal base-10) with exact precision."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Input Value:
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={val}
              onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Source Unit:
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              {unitsConfig.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {conversions.map((item) => (
            <div
              key={item.key}
              className="rounded-xl border border-black/10 bg-black/[0.02] p-3.5 transition hover:border-primary-solid/40 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span className="font-semibold">{item.key}</span>
                <span className="text-[10px] opacity-75">{item.type}</span>
              </div>
              <div className="font-mono text-base font-bold text-gray-900 dark:text-gray-100 break-all">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
