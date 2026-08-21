"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SpeedDistanceTimeCalculator() {
  const [mode, setMode] = useState<"speed" | "time" | "distance">("speed");
  const [distance, setDistance] = useState(100);
  const [distUnit, setDistUnit] = useState<"km" | "miles" | "meters">("km");
  const [hours, setHours] = useState(1);
  const [mins, setMins] = useState(30);
  const [speed, setSpeed] = useState(65);
  const [speedUnit, setSpeedUnit] = useState<"kmh" | "mph">("kmh");

  const results = useMemo(() => {
    // Total hours
    const totalHours = hours + mins / 60;

    // Convert distance to kilometers
    let distKm = distance;
    if (distUnit === "miles") distKm = distance * 1.60934;
    else if (distUnit === "meters") distKm = distance / 1000;

    if (mode === "speed") {
      if (totalHours <= 0) return null;
      const speedKmh = distKm / totalHours;
      const speedMph = speedKmh / 1.60934;
      const speedMs = speedKmh / 3.6;
      const knots = speedKmh / 1.852;
      const minPerKm = (totalHours * 60) / distKm;

      return {
        mainLabel: "Calculated Speed",
        mainVal: `${speedKmh.toFixed(2)} km/h`,
        speedKmh: speedKmh.toFixed(2),
        speedMph: speedMph.toFixed(2),
        speedMs: speedMs.toFixed(2),
        knots: knots.toFixed(2),
        pace: `${Math.floor(minPerKm)}m ${Math.round((minPerKm % 1) * 60)}s / km`
      };
    } else if (mode === "time") {
      let speedKmh = speed;
      if (speedUnit === "mph") speedKmh = speed * 1.60934;
      if (speedKmh <= 0) return null;

      const calcHours = distKm / speedKmh;
      const h = Math.floor(calcHours);
      const m = Math.round((calcHours % 1) * 60);

      return {
        mainLabel: "Estimated Travel Time",
        mainVal: `${h} hours ${m} minutes`,
        speedKmh: speedKmh.toFixed(2),
        speedMph: (speedKmh / 1.60934).toFixed(2),
        speedMs: (speedKmh / 3.6).toFixed(2),
        knots: (speedKmh / 1.852).toFixed(2),
        pace: "—"
      };
    } else {
      let speedKmh = speed;
      if (speedUnit === "mph") speedKmh = speed * 1.60934;
      const calcDistKm = speedKmh * totalHours;

      return {
        mainLabel: "Total Distance",
        mainVal: `${calcDistKm.toFixed(2)} km (${(calcDistKm / 1.60934).toFixed(2)} miles)`,
        speedKmh: speedKmh.toFixed(2),
        speedMph: (speedKmh / 1.60934).toFixed(2),
        speedMs: (speedKmh / 3.6).toFixed(2),
        knots: (speedKmh / 1.852).toFixed(2),
        pace: "—"
      };
    }
  }, [mode, distance, distUnit, hours, mins, speed, speedUnit]);

  return (
    <ToolContainer
      title="Speed, Distance & Travel Pace Tool"
      description="Calculate speed, elapsed travel time, total distance, and running pace across km/h, mph, m/s, knots, and min/km."
    >
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-black/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setMode("speed")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "speed" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Calculate Speed
          </button>
          <button
            type="button"
            onClick={() => setMode("time")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "time" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Calculate Time
          </button>
          <button
            type="button"
            onClick={() => setMode("distance")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "distance" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Calculate Distance
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {mode !== "distance" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Distance:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                  className="flex-1 rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
                <select
                  value={distUnit}
                  onChange={(e) => setDistUnit(e.target.value as "km" | "miles" | "meters")}
                  className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                >
                  <option value="km">Kilometers (km)</option>
                  <option value="miles">Miles (mi)</option>
                  <option value="meters">Meters (m)</option>
                </select>
              </div>
            </div>
          )}

          {mode !== "time" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Time (Hours & Minutes):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={hours}
                  placeholder="Hours"
                  onChange={(e) => setHours(parseInt(e.target.value, 10) || 0)}
                  className="w-1/2 rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  type="number"
                  value={mins}
                  placeholder="Mins"
                  onChange={(e) => setMins(parseInt(e.target.value, 10) || 0)}
                  className="w-1/2 rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {mode !== "speed" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Speed:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value) || 0)}
                  className="flex-1 rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
                <select
                  value={speedUnit}
                  onChange={(e) => setSpeedUnit(e.target.value as "kmh" | "mph")}
                  className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                >
                  <option value="kmh">km/h</option>
                  <option value="mph">mph</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {results && (
          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {results.mainLabel}:
            </span>
            <div className="text-3xl font-extrabold text-primary-solid font-mono">
              {results.mainVal}
            </div>

            <div className="grid gap-3 pt-3 border-t border-black/10 dark:border-white/10 sm:grid-cols-4 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400">km/h:</span>
                <div className="font-mono text-sm font-bold">{results.speedKmh}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">mph:</span>
                <div className="font-mono text-sm font-bold">{results.speedMph}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Knots:</span>
                <div className="font-mono text-sm font-bold">{results.knots}</div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Running Pace:</span>
                <div className="font-mono text-sm font-bold">{results.pace}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
