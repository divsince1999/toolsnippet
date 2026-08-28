"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

interface FieldValidation {
  name: string;
  value: string;
  valid: boolean;
  explanation: string;
  allowedRange: string;
}

function parseCronField(field: string, min: number, max: number, names?: string[]): { valid: boolean; explanation: string } {
  const f = field.trim();
  if (f === "*") return { valid: true, explanation: "Every value in range" };
  if (f === "?") return { valid: true, explanation: "No specific value" };

  // Step notation: */5 or 10-30/5
  if (f.includes("/")) {
    const [rangePart, stepPart] = f.split("/");
    const step = parseInt(stepPart, 10);
    if (isNaN(step) || step <= 0) return { valid: false, explanation: "Invalid step value" };
    if (rangePart !== "*") {
      const subCheck = parseCronField(rangePart, min, max, names);
      if (!subCheck.valid) return subCheck;
    }
    return { valid: true, explanation: `Every ${step} units` };
  }

  // Lists: 1,2,5 or MON,WED,FRI
  if (f.includes(",")) {
    const items = f.split(",");
    for (const item of items) {
      const sub = parseCronField(item, min, max, names);
      if (!sub.valid) return sub;
    }
    return { valid: true, explanation: `At ${items.join(", ")}` };
  }

  // Ranges: 1-5 or MON-FRI
  if (f.includes("-")) {
    const [startStr, endStr] = f.split("-");
    let start = parseInt(startStr, 10);
    let end = parseInt(endStr, 10);

    if (names && isNaN(start)) {
      start = names.indexOf(startStr.toUpperCase());
    }
    if (names && isNaN(end)) {
      end = names.indexOf(endStr.toUpperCase());
    }

    if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) {
      return { valid: false, explanation: `Invalid range (${startStr}-${endStr})` };
    }
    return { valid: true, explanation: `Between ${startStr} and ${endStr}` };
  }

  // Single number or name
  let val = parseInt(f, 10);
  if (names && isNaN(val)) {
    val = names.indexOf(f.toUpperCase());
  }

  if (isNaN(val) || val < min || val > max) {
    return { valid: false, explanation: `Value out of bounds (${min}-${max})` };
  }

  return { valid: true, explanation: `At value ${f}` };
}

const MONTH_NAMES = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DOW_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function generateHumanDescription(parts: string[]): string {
  if (parts.length < 5) return "Invalid cron format (must have 5 or 6 space-separated fields)";
  const [min, hour, dom, mon, dow] = parts;

  let desc = "";

  // Minutes & Hours
  if (min === "*" && hour === "*") {
    desc = "Every minute";
  } else if (min.startsWith("*/")) {
    const step = min.replace("*/", "");
    desc = `Every ${step} minutes`;
    if (hour !== "*") desc += ` during hour ${hour}`;
  } else if (min === "0" && hour === "*") {
    desc = "Every hour at minute 0";
  } else if (min === "0" && hour.startsWith("*/")) {
    desc = `Every ${hour.replace("*/", "")} hours`;
  } else {
    desc = `At ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
  }

  // Day of Month & Month
  if (dom !== "*" && dom !== "?") {
    desc += `, on day ${dom} of the month`;
  }
  if (mon !== "*") {
    desc += `, in month ${mon}`;
  }

  // Day of Week
  if (dow !== "*" && dow !== "?") {
    if (dow === "1-5") desc += ", Monday through Friday";
    else if (dow === "0,6" || dow === "6,0") desc += ", on weekends (Saturday and Sunday)";
    else desc += `, on day-of-week ${dow}`;
  }

  return desc;
}

function calculateNextExecutions(cronStr: string): Date[] {
  const dates: Date[] = [];
  const parts = cronStr.trim().split(/\s+/);
  if (parts.length < 5) return dates;

  const now = new Date();
  let current = new Date(now.getTime() + 60000); // start at next minute
  current.setSeconds(0, 0);

  const [minPart, hourPart] = parts;

  for (let i = 0; i < 2000 && dates.length < 5; i++) {
    const m = current.getMinutes();
    const h = current.getHours();

    let mMatch = minPart === "*";
    if (minPart.startsWith("*/")) {
      const step = parseInt(minPart.slice(2), 10);
      mMatch = m % step === 0;
    } else if (minPart.includes(",")) {
      mMatch = minPart.split(",").map((v) => parseInt(v.trim(), 10)).includes(m);
    } else if (!isNaN(parseInt(minPart, 10))) {
      mMatch = m === parseInt(minPart, 10);
    }

    let hMatch = hourPart === "*";
    if (hourPart.startsWith("*/")) {
      const step = parseInt(hourPart.slice(2), 10);
      hMatch = h % step === 0;
    } else if (hourPart.includes(",")) {
      hMatch = hourPart.split(",").map((v) => parseInt(v.trim(), 10)).includes(h);
    } else if (!isNaN(parseInt(hourPart, 10))) {
      hMatch = h === parseInt(hourPart, 10);
    }

    if (mMatch && hMatch) {
      dates.push(new Date(current));
    }

    current = new Date(current.getTime() + 60000);
  }

  return dates;
}

export default function CronExpressionValidatorTool() {
  const [cronInput, setCronInput] = useState("*/15 9-17 * * 1-5");
  const [copied, setCopied] = useState(false);

  const { fields, isValid, humanDesc, nextRuns } = useMemo(() => {
    const parts = cronInput.trim().split(/\s+/);
    if (parts.length < 5 || parts.length > 6) {
      return {
        fields: [],
        isValid: false,
        humanDesc: "Invalid number of fields. Expected 5 standard fields: (Minute Hour Day-of-Month Month Day-of-Week)",
        nextRuns: [],
      };
    }

    const fieldDefs = [
      { name: "Minute", min: 0, max: 59, names: undefined, range: "0 - 59" },
      { name: "Hour", min: 0, max: 23, names: undefined, range: "0 - 23" },
      { name: "Day of Month", min: 1, max: 31, names: undefined, range: "1 - 31" },
      { name: "Month", min: 1, max: 12, names: MONTH_NAMES, range: "1 - 12 (JAN-DEC)" },
      { name: "Day of Week", min: 0, max: 7, names: DOW_NAMES, range: "0 - 7 (SUN-SAT)" },
    ];

    const validated: FieldValidation[] = [];
    let allValid = true;

    for (let i = 0; i < 5; i++) {
      const def = fieldDefs[i];
      const val = parts[i] || "*";
      const res = parseCronField(val, def.min, def.max, def.names);
      if (!res.valid) allValid = false;
      validated.push({
        name: def.name,
        value: val,
        valid: res.valid,
        explanation: res.explanation,
        allowedRange: def.range,
      });
    }

    const desc = allValid ? generateHumanDescription(parts) : "Syntax error in one or more cron fields";
    const nextDates = allValid ? calculateNextExecutions(cronInput) : [];

    return {
      fields: validated,
      isValid: allValid,
      humanDesc: desc,
      nextRuns: nextDates,
    };
  }, [cronInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cronInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Cron Expression Validator & Schedule Inspector"
      description="Inspect cron syntax, validate field ranges, read natural language human descriptions, and calculate upcoming execution schedules in real time."
    >
      <div className="space-y-6">
        {/* Input & Expression Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Cron Expression (5 Fields):
            </label>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${isValid ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}>
              {isValid ? "✓ Valid Syntax" : "❌ Invalid Syntax"}
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={cronInput}
              onChange={(e) => setCronInput(e.target.value)}
              placeholder="*/15 9-17 * * 1-5"
              className="flex-1 rounded-xl border border-black/15 bg-white px-4 py-3 font-mono text-base font-bold text-gray-900 shadow-xs outline-none focus:border-primary-solid dark:border-white/15 dark:bg-zinc-900 dark:text-white"
            />
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? "✓ Copied" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Human Readable Schedule Banner */}
        <div className="rounded-2xl border border-primary-solid/20 bg-primary-solid/5 p-4 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary-solid">
            Plain English Translation
          </span>
          <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
            {humanDesc}
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Common Cron Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Every 5 Minutes", expr: "*/5 * * * *" },
              { label: "Every Hour (Top of Hour)", expr: "0 * * * *" },
              { label: "Daily at Midnight", expr: "0 0 * * *" },
              { label: "Daily at 9:00 AM", expr: "0 9 * * *" },
              { label: "Weekdays at 9 AM", expr: "0 9 * * 1-5" },
              { label: "Every 15m (Work Hours)", expr: "*/15 9-17 * * 1-5" },
              { label: "Sunday at 04:00 AM", expr: "0 4 * * 0" },
              { label: "1st of Every Month", expr: "0 0 1 * *" },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setCronInput(p.expr)}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 font-mono text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Field-by-Field Breakdown Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            5-Field Breakdown
          </h3>
          <div className="grid gap-3 sm:grid-cols-5">
            {fields.map((f) => (
              <div
                key={f.name}
                className="flex flex-col justify-between rounded-xl border border-black/10 bg-white p-3.5 shadow-xs dark:border-white/10 dark:bg-zinc-900"
              >
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                    {f.name}
                  </span>
                  <div className="mt-1 font-mono text-lg font-bold text-gray-900 dark:text-white">
                    {f.value}
                  </div>
                </div>
                <div className="mt-3 border-t border-black/5 pt-2 text-[10px] dark:border-white/5">
                  <div className="text-gray-500">Range: {f.allowedRange}</div>
                  <div className={`mt-0.5 font-medium ${f.valid ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {f.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Upcoming Executions */}
        {nextRuns.length > 0 && (
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Next 5 Upcoming Execution Schedules (Local Timezone)
            </h3>
            <div className="divide-y divide-black/5 dark:divide-white/5 font-mono text-xs">
              {nextRuns.map((date, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="font-semibold text-primary-solid">Run #{i + 1}</span>
                  <span className="text-gray-900 dark:text-gray-200">
                    {date.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })} at {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
