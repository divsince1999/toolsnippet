"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CrontabGeneratorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [weekday, setWeekday] = useState("*");

  const handleConvert = () => {
    setOutput(`${minute} ${hour} ${day} ${month} ${weekday}`);
  };

  const presets = [
    { name: "Every Minute", val: ["*", "*", "*", "*", "*"] },
    { name: "Every Hour", val: ["0", "*", "*", "*", "*"] },
    { name: "Every Day at Midnight", val: ["0", "0", "*", "*", "*"] },
    { name: "Every Sunday at Midnight", val: ["0", "0", "*", "*", "0"] },
    { name: "First Day of Month", val: ["0", "0", "1", "*", "*"] },
  ];

  const applyPreset = (val: string[]) => {
    setMinute(val[0]);
    setHour(val[1]);
    setDay(val[2]);
    setMonth(val[3]);
    setWeekday(val[4]);
  };

  return (
    <ToolContainer
      title="Crontab Generator"
      description="Visually build cron expressions for scheduled tasks."
    >
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {presets.map(p => (
            <Button key={p.name} variant="secondary" size="sm" onClick={() => applyPreset(p.val)}>
              {p.name}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase text-gray-500">Minute</label>
            <input value={minute} onChange={e => setMinute(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase text-gray-500">Hour</label>
            <input value={hour} onChange={e => setHour(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase text-gray-500">Day</label>
            <input value={day} onChange={e => setDay(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase text-gray-500">Month</label>
            <input value={month} onChange={e => setMonth(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase text-gray-500">Weekday</label>
            <input value={weekday} onChange={e => setWeekday(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate Cron</Button>
          <Button variant="ghost" onClick={() => { applyPreset(["*", "*", "*", "*", "*"]); clearAll(); }}>Reset</Button>
        </div>
        {output && (
          <TextArea
            label="Cron Expression"
            readOnly
            copyable
            value={output}
            rows={1}
          />
        )}
      </div>
    </ToolContainer>
  );
}
