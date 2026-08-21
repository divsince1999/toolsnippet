"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BandwidthTransferCalculator() {
  const [fileSize, setFileSize] = useState(10);
  const [fileUnit, setFileUnit] = useState<"MB" | "GB" | "TB">("GB");
  const [speed, setSpeed] = useState(100);
  const [speedUnit, setSpeedUnit] = useState<"Mbps" | "Gbps" | "MBps">("Mbps");
  const [overhead, setOverhead] = useState(false);

  const results = useMemo(() => {
    // Convert file size to bits
    let totalBits = fileSize;
    if (fileUnit === "MB") totalBits *= 8 * 1024 * 1024;
    else if (fileUnit === "GB") totalBits *= 8 * 1024 * 1024 * 1024;
    else if (fileUnit === "TB") totalBits *= 8 * 1024 * 1024 * 1024 * 1024;

    // Convert speed to bits per second
    let bps = speed;
    if (speedUnit === "Mbps") bps *= 1000 * 1000;
    else if (speedUnit === "Gbps") bps *= 1000 * 1000 * 1000;
    else if (speedUnit === "MBps") bps *= 8 * 1000 * 1000;

    if (bps <= 0 || totalBits <= 0) return { seconds: 0, text: "0 seconds" };

    if (overhead) {
      totalBits *= 1.1; // 10% TCP/IP overhead
    }

    const totalSeconds = totalBits / bps;
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.round(totalSeconds % 60);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0) parts.push(`${mins}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    const transferRateMBps = (bps / (8 * 1024 * 1024)).toFixed(2);

    return {
      seconds: totalSeconds,
      formattedTime: parts.join(" "),
      transferRateMBps
    };
  }, [fileSize, fileUnit, speed, speedUnit, overhead]);

  return (
    <ToolContainer
      title="Bandwidth & Data Transfer Calculator"
      description="Calculate file download/upload times, data transfer rates, and bandwidth consumption across various network speeds."
    >
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                File Size / Data Amount:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={fileSize}
                  onChange={(e) => setFileSize(parseFloat(e.target.value) || 0)}
                  className="flex-1 rounded-xl border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
                <select
                  value={fileUnit}
                  onChange={(e) => setFileUnit(e.target.value as "MB" | "GB" | "TB")}
                  className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                >
                  <option value="MB">MB (Megabytes)</option>
                  <option value="GB">GB (Gigabytes)</option>
                  <option value="TB">TB (Terabytes)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Network Speed:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value) || 0)}
                  className="flex-1 rounded-xl border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
                <select
                  value={speedUnit}
                  onChange={(e) => setSpeedUnit(e.target.value as "Mbps" | "Gbps" | "MBps")}
                  className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                >
                  <option value="Mbps">Mbps (Megabits/sec)</option>
                  <option value="Gbps">Gbps (Gigabits/sec)</option>
                  <option value="MBps">MB/s (Megabytes/sec)</option>
                </select>
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-1.5">
              <span className="text-xs text-gray-500 dark:text-gray-400">Common Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: "50 Mbps (4G/LTE)", s: 50, u: "Mbps" as const },
                  { name: "100 Mbps (Broadband)", s: 100, u: "Mbps" as const },
                  { name: "500 Mbps (Fast Cable)", s: 500, u: "Mbps" as const },
                  { name: "1 Gbps (Fiber)", s: 1, u: "Gbps" as const },
                  { name: "10 Gbps (Data Center)", s: 10, u: "Gbps" as const }
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setSpeed(preset.s);
                      setSpeedUnit(preset.u);
                    }}
                    className="rounded-lg border border-black/10 bg-white/50 px-2.5 py-1 text-[11px] font-medium hover:border-primary-solid dark:border-white/10 dark:bg-zinc-900/50"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={overhead}
                onChange={(e) => setOverhead(e.target.checked)}
                className="rounded border-gray-300 text-primary-solid focus:ring-primary-solid"
              />
              <span>Include 10% realistic network overhead & packet loss</span>
            </label>
          </div>

          {/* Results Summary */}
          <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Estimated Transfer Duration:
              </span>
              <div className="text-4xl font-extrabold text-primary-solid font-mono">
                {results.formattedTime}
              </div>
              <div className="space-y-2 pt-2 border-t border-black/10 dark:border-white/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Total Duration:</span>
                  <span className="font-semibold font-mono">{results.seconds.toFixed(2)} seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Effective Throughput:</span>
                  <span className="font-semibold font-mono">{results.transferRateMBps} MB/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Data Transfer Volume:</span>
                  <span className="font-semibold font-mono">{fileSize} {fileUnit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
