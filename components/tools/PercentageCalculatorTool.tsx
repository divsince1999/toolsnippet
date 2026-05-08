"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PercentageCalculatorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(100);

  const handleCalculate = () => {
    const result = (num1 / 100) * num2;
    setOutput(`${num1}% of ${num2} is ${result.toFixed(2)}`);
  };

  return (
    <ToolContainer title="Percentage Calculator" description="Quickly calculate percentages and ratios.">
      <div className="grid gap-6">
        <div className="flex items-center gap-4">
          <span className="text-sm">What is</span>
          <input type="number" value={num1} onChange={e => setNum1(parseFloat(e.target.value) || 0)} className="w-24 rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          <span className="text-sm">% of</span>
          <input type="number" value={num2} onChange={e => setNum2(parseFloat(e.target.value) || 0)} className="w-32 rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCalculate}>Calculate</Button>
          <Button variant="ghost" onClick={clearAll}>Clear</Button>
        </div>
        {output && <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center font-bold text-lg">{output}</div>}
      </div>
    </ToolContainer>
  );
}
