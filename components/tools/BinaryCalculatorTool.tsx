"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BinaryCalculatorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [bin1, setBin1] = useState("");
  const [bin2, setBin2] = useState("");
  const [op, setOp] = useState("+");

  const handleCalculate = () => {
    try {
      const n1 = parseInt(bin1, 2);
      const n2 = parseInt(bin2, 2);
      let res = 0;
      if (op === "+") res = n1 + n2;
      else if (op === "-") res = n1 - n2;
      else if (op === "*") res = n1 * n2;
      else if (op === "/") res = Math.floor(n1 / n2);

      setOutput(res.toString(2));
    } catch {
      setOutput("Error");
    }
  };

  return (
    <ToolContainer title="Binary Calculator" description="Perform arithmetic operations on binary numbers.">
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          <input value={bin1} onChange={e => setBin1(e.target.value)} placeholder="Binary 1 (e.g., 1010)" className="rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          <select value={op} onChange={e => setOp(e.target.value)} className="w-20 rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20">
            <option>+</option>
            <option>-</option>
            <option>*</option>
            <option>/</option>
          </select>
          <input value={bin2} onChange={e => setBin2(e.target.value)} placeholder="Binary 2 (e.g., 1100)" className="rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCalculate}>Calculate</Button>
          <Button variant="ghost" onClick={() => { setBin1(""); setBin2(""); clearAll(); }}>Clear</Button>
        </div>
        {output && <div className="p-4 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] text-center font-mono text-xl">{output}</div>}
      </div>
    </ToolContainer>
  );
}
