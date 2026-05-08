"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UnitConverterTempTool() {
  const { output, setOutput, clearAll } = useTool();
  const [value, setValue] = useState(0);
  const [from, setFrom] = useState("Celsius");
  const [to, setTo] = useState("Fahrenheit");

  const handleConvert = () => {
    let result = 0;
    let celsius = value;
    if (from === "Fahrenheit") celsius = (value - 32) * 5 / 9;
    else if (from === "Kelvin") celsius = value - 273.15;

    if (to === "Celsius") result = celsius;
    else if (to === "Fahrenheit") result = (celsius * 9 / 5) + 32;
    else if (to === "Kelvin") result = celsius + 273.15;

    setOutput(`${value} ${from} = ${result.toFixed(2)} ${to}`);
  };

  return (
    <ToolContainer title="Temperature Converter" description="Switch between Celsius, Fahrenheit, and Kelvin scales.">
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Value</label>
            <input type="number" value={value} onChange={e => setValue(parseFloat(e.target.value) || 0)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">From</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20">
              <option>Celsius</option>
              <option>Fahrenheit</option>
              <option>Kelvin</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">To</label>
            <select value={to} onChange={e => setTo(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20">
              <option>Celsius</option>
              <option>Fahrenheit</option>
              <option>Kelvin</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button variant="ghost" onClick={() => { setValue(0); clearAll(); }}>Reset</Button>
        </div>
        {output && <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center font-bold text-lg">{output}</div>}
      </div>
    </ToolContainer>
  );
}
