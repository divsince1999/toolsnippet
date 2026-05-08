"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CronDescriptorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const parts = input.trim().split(/\s+/);
    if (parts.length < 5) {
      setOutput("Invalid cron expression: expected 5 parts (minute, hour, day, month, day-of-week)");
      return;
    }

    const [m, h, d, mo, dw] = parts;
    
    const describePart = (val: string, unit: string, all: string = "every") => {
      if (val === "*") return all + " " + unit;
      if (val.includes("/")) {
        const [start, step] = val.split("/");
        return `every ${step} ${unit}s starting from ${start === "*" ? "0" : start}`;
      }
      if (val.includes(",")) return `on ${unit}s ${val}`;
      if (val.includes("-")) return `between ${unit}s ${val.replace("-", " and ")}`;
      return `at ${unit} ${val}`;
    };

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let desc = "Runs ";
    
    if (m === "*" && h === "*") desc += "every minute";
    else if (h === "*") desc += `every hour at minute ${m}`;
    else desc += `at ${h.padStart(2, "0")}:${m.padStart(2, "0")}`;

    if (d !== "*") desc += `, on day ${d} of the month`;
    if (mo !== "*") {
      const monthName = months[parseInt(mo)] || mo;
      desc += `, in ${monthName}`;
    }
    if (dw !== "*") {
      const dayName = days[parseInt(dw)] || dw;
      desc += `, on ${dayName}`;
    }

    setOutput(desc + ".");
  };

  return (
    <ToolContainer title="Cron Expression Descriptor" description="Convert cron expressions into human-readable text.">
      <div className="grid gap-6">
        <TextArea label="Cron Expression" value={input} onChange={(e) => setInput(e.target.value)} placeholder="0 0 * * *" rows={1} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Describe</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Human Readable" readOnly copyable value={output} rows={1} />}
      </div>
    </ToolContainer>
  );
}
