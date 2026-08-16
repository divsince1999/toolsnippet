"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function TimestampToIsoTool() {
  const [inputVal, setInputVal] = useState<string>(() => String(Date.now()));
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parsed = useMemo(() => {
    if (!inputVal.trim()) return null;

    let date: Date | null = null;
    const clean = inputVal.trim();

    // Check if numeric timestamp
    if (/^-?\d+$/.test(clean)) {
      const num = parseInt(clean, 10);
      // If seconds (10 digits) vs milliseconds (13 digits)
      if (clean.length <= 10) {
        date = new Date(num * 1000);
      } else {
        date = new Date(num);
      }
    } else {
      // Try parsing ISO/date string
      const parsedTime = Date.parse(clean);
      if (!isNaN(parsedTime)) {
        date = new Date(parsedTime);
      }
    }

    if (!date || isNaN(date.getTime())) {
      return { valid: false, error: "Invalid timestamp or date format" };
    }

    const epochMs = date.getTime();
    const epochSec = Math.floor(epochMs / 1000);

    return {
      valid: true,
      epochMs,
      epochSec,
      isoUtc: date.toISOString(),
      utcString: date.toUTCString(),
      localString: date.toLocaleString(),
      dateOnly: date.toISOString().split("T")[0],
      timeOnly: date.toISOString().split("T")[1].replace("Z", " UTC"),
    };
  }, [inputVal]);

  const handleCopy = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const setNow = () => {
    setInputVal(String(Date.now()));
  };

  return (
    <ToolContainer
      title="Timestamp to ISO 8601 Converter"
      description="Convert Unix timestamps (seconds/milliseconds) to ISO 8601 UTC and local date formats."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[280px]">
            <label className="block text-sm font-medium mb-1">
              Enter Unix Epoch (seconds/ms) or Date/ISO String
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. 1773669600000 or 2026-03-16T12:00:00Z"
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>
          <Button onClick={setNow} variant="outline">
            Set to Current Time
          </Button>
        </div>

        {parsed && (
          <div>
            {!parsed.valid ? (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                {parsed.error}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { key: "isoUtc", label: "ISO 8601 (UTC)", val: parsed.isoUtc },
                  { key: "utcString", label: "RFC 2822 / UTC String", val: parsed.utcString },
                  { key: "localString", label: "Local Time Format", val: parsed.localString },
                  { key: "epochMs", label: "Epoch Milliseconds", val: String(parsed.epochMs) },
                  { key: "epochSec", label: "Epoch Seconds", val: String(parsed.epochSec) },
                  { key: "dateOnly", label: "Date (YYYY-MM-DD)", val: parsed.dateOnly },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-black/10 p-4 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {item.label}
                      </span>
                      <div className="mt-1 font-mono text-sm font-bold text-primary break-all">
                        {item.val}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-8 px-2 text-xs flex-shrink-0"
                      onClick={() => handleCopy(item.key, item.val || "")}
                    >
                      {copiedKey === item.key ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
