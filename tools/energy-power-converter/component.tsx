"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function EnergyPowerConverter() {
  const [val, setVal] = useState(1);
  const [unit, setUnit] = useState<string>("kwh");

  const units = useMemo(() => [
    { key: "j", name: "Joules (J)", toJoules: 1 },
    { key: "kj", name: "Kilojoules (kJ)", toJoules: 1000 },
    { key: "cal", name: "Gram Calories (cal)", toJoules: 4.184 },
    { key: "kcal", name: "Kilocalories / Food Cal (kcal)", toJoules: 4184 },
    { key: "wh", name: "Watt-Hours (Wh)", toJoules: 3600 },
    { key: "kwh", name: "Kilowatt-Hours (kWh)", toJoules: 3600000 },
    { key: "btu", name: "British Thermal Units (BTU)", toJoules: 1055.06 },
  ], []);

  const results = useMemo(() => {
    const src = units.find((u) => u.key === unit);
    if (!src || val <= 0) return [];

    const totalJoules = val * src.toJoules;

    return units.map((u) => {
      const converted = totalJoules / u.toJoules;
      const display = converted >= 1000000 || (converted < 0.0001 && converted > 0)
        ? converted.toExponential(4)
        : converted.toLocaleString(undefined, { maximumFractionDigits: 5 });

      return {
        ...u,
        value: display
      };
    });
  }, [val, unit, units]);

  return (
    <ToolContainer
      title="Energy & Power Unit Converter"
      description="Convert energy and power units between Joules, Kilocalories, Kilowatt-Hours (kWh), BTUs, Watts, and Horsepower (hp)."
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
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
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
              {units.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <div
              key={item.key}
              className="rounded-xl border border-black/10 bg-black/[0.02] p-3.5 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.name}</div>
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
