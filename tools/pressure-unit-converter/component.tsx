"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PressureUnitConverter() {
  const [val, setVal] = useState("1");
  const [unit, setUnit] = useState<string>("bar");

  const units = useMemo(() => [
    { key: "pa", name: "Pascal (Pa)", toPa: 1 },
    { key: "kpa", name: "Kilopascal (kPa)", toPa: 1000 },
    { key: "mpa", name: "Megapascal (MPa)", toPa: 1000000 },
    { key: "bar", name: "Bar (bar)", toPa: 100000 },
    { key: "psi", name: "Pounds per Sq Inch (PSI)", toPa: 6894.76 },
    { key: "atm", name: "Standard Atmosphere (atm)", toPa: 101325 },
    { key: "torr", name: "Torr / mmHg", toPa: 133.322 },
  ], []);

  const results = useMemo(() => {
    const num = parseFloat(val);
    if (isNaN(num)) return [];

    const src = units.find((u) => u.key === unit);
    if (!src) return [];

    const totalPa = num * src.toPa;

    return units.map((u) => {
      const converted = totalPa / u.toPa;
      const display = converted >= 100000 || (converted < 0.001 && converted > 0)
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
      title="Pressure Unit Converter"
      description="Convert pressure units between Pascal (Pa), Bar, PSI, Torr / mmHg, Atmosphere (atm), and Kilopascals (kPa)."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Pressure Value:
            </label>
            <input
              type="number"
              step="any"
              value={val}
              onChange={(e) => setVal(e.target.value)}
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
