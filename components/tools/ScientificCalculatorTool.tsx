"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ScientificCalculatorTool() {
  const [display, setDisplay] = useState("0");

  const handleBtn = (val: string) => {
    if (display === "0") setDisplay(val);
    else setDisplay(display + val);
  };

  const handleClear = () => setDisplay("0");
  
  const handleCalc = () => {
    try {
      // Use Function instead of eval for safer evaluation
      const result = new Function(`return ${display.replace(/×/g, "*").replace(/÷/g, "/")}`)();
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const btns = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"];

  return (
    <ToolContainer title="Scientific Calculator" description="Perform basic and complex mathematical operations.">
      <div className="mx-auto max-w-xs grid gap-4 p-4 border border-black/10 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="p-4 bg-white dark:bg-black/40 rounded-lg text-right text-2xl font-mono overflow-hidden whitespace-nowrap border border-black/5">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="col-span-3" onClick={handleClear}>AC</Button>
          {btns.map(b => (
            <Button 
              key={b} 
              variant={b === "=" ? "primary" : "secondary"} 
              onClick={() => b === "=" ? handleCalc() : handleBtn(b)}
            >
              {b}
            </Button>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
