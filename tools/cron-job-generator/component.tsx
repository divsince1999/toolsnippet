"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CronJobGenerator() {
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("0");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [copied, setCopied] = useState(false);

  const cronExpression = useMemo(() => {
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const humanReadable = useMemo(() => {
    if (cronExpression === "* * * * *") return "Every minute";
    if (cronExpression === "*/5 * * * *") return "Every 5 minutes";
    if (cronExpression === "*/15 * * * *") return "Every 15 minutes";
    if (cronExpression === "0 * * * *") return "Every hour at minute 0";
    if (cronExpression === "0 0 * * *") return "Every day at midnight (00:00)";
    if (cronExpression === "0 12 * * *") return "Every day at 12:00 PM (Noon)";
    if (cronExpression === "0 0 * * 0") return "Every Sunday at midnight";
    if (cronExpression === "0 0 1 * *") return "On the 1st day of every month at midnight";
    return `At minute ${minute}, hour ${hour}, day of month ${dayOfMonth}, month ${month}, day of week ${dayOfWeek}`;
  }, [cronExpression, minute, hour, dayOfMonth, month, dayOfWeek]);

  const applyPreset = (m: string, h: string, dom: string, mon: string, dow: string) => {
    setMinute(m);
    setHour(h);
    setDayOfMonth(dom);
    setMonth(mon);
    setDayOfWeek(dow);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Cron Expression Generator & Visual Scheduler"
      description="Build and schedule 5-field crontab expressions with frequency presets, step values, and human-readable descriptions."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Quick Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Every Minute", args: ["*", "*", "*", "*", "*"] },
              { label: "Every 5 Mins", args: ["*/5", "*", "*", "*", "*"] },
              { label: "Hourly", args: ["0", "*", "*", "*", "*"] },
              { label: "Daily (Midnight)", args: ["0", "0", "*", "*", "*"] },
              { label: "Weekly (Sunday)", args: ["0", "0", "*", "*", "0"] },
              { label: "Monthly (1st)", args: ["0", "0", "1", "*", "*"] }
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p.args[0], p.args[1], p.args[2], p.args[3], p.args[4])}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-gray-500">Minute (0-59)</label>
            <input
              type="text"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-2.5 font-mono text-sm text-center dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-gray-500">Hour (0-23)</label>
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-2.5 font-mono text-sm text-center dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-gray-500">Day (1-31)</label>
            <input
              type="text"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-2.5 font-mono text-sm text-center dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-gray-500">Month (1-12)</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-2.5 font-mono text-sm text-center dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-gray-500">Weekday (0-6)</label>
            <input
              type="text"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-2.5 font-mono text-sm text-center dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Generated Cron Expression:
            </span>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Expression"}
            </Button>
          </div>
          <div className="text-3xl font-extrabold text-primary-solid font-mono tracking-wider">
            {cronExpression}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Schedule: {humanReadable}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
