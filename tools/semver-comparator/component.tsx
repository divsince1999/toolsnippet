"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

function parseSemver(v: string) {
  const clean = v.trim().replace(/^[v^~>=<s]+/, "");
  const [core, pre] = clean.split("-");
  const parts = core.split(".").map((n) => parseInt(n, 10) || 0);
  return {
    major: parts[0] || 0,
    minor: parts[1] || 0,
    patch: parts[2] || 0,
    pre: pre || ""
  };
}

export default function SemverComparator() {
  const [verA, setVerA] = useState("2.4.1");
  const [verB, setVerB] = useState("2.5.0");
  const [range, setRange] = useState("^2.4.0");

  const comparison = useMemo(() => {
    const a = parseSemver(verA);
    const b = parseSemver(verB);

    let diff = "Equal";
    let changeType = "None";

    if (a.major !== b.major) {
      diff = a.major > b.major ? "A is Greater" : "B is Greater";
      changeType = "Major (Breaking Change)";
    } else if (a.minor !== b.minor) {
      diff = a.minor > b.minor ? "A is Greater" : "B is Greater";
      changeType = "Minor (Backwards-Compatible Feature)";
    } else if (a.patch !== b.patch) {
      diff = a.patch > b.patch ? "A is Greater" : "B is Greater";
      changeType = "Patch (Backwards-Compatible Bug Fix)";
    }

    // Test range for Version B
    let satisfiesRange = false;
    if (range.startsWith("^")) {
      const target = parseSemver(range.slice(1));
      if (b.major === target.major) {
        if (b.minor > target.minor || (b.minor === target.minor && b.patch >= target.patch)) {
          satisfiesRange = true;
        }
      }
    } else if (range.startsWith("~")) {
      const target = parseSemver(range.slice(1));
      if (b.major === target.major && b.minor === target.minor && b.patch >= target.patch) {
        satisfiesRange = true;
      }
    } else {
      satisfiesRange = true;
    }

    return {
      diff,
      changeType,
      satisfiesRange
    };
  }, [verA, verB, range]);

  return (
    <ToolContainer
      title="SemVer Semantic Versioning Comparator"
      description="Compare semantic versions, validate npm range operators (^, ~, >=, x), and detect breaking major releases."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Version A:
            </label>
            <input
              type="text"
              value={verA}
              onChange={(e) => setVerA(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Version B:
            </label>
            <input
              type="text"
              value={verB}
              onChange={(e) => setVerB(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Test npm Range:
            </label>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder="^2.4.0"
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-4">
          <div className="grid gap-4 sm:grid-cols-3 text-center">
            <div className="p-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Comparison Result:</span>
              <div className="font-mono text-lg font-bold text-primary-solid">{comparison.diff}</div>
            </div>

            <div className="p-2 border-y sm:border-y-0 sm:border-x border-black/10 dark:border-white/10">
              <span className="text-xs text-gray-500 dark:text-gray-400">Release Classification:</span>
              <div className="font-mono text-xs font-bold text-gray-900 dark:text-gray-100 mt-1">
                {comparison.changeType}
              </div>
            </div>

            <div className="p-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Version B Range Check ({range}):</span>
              <div className={`font-mono text-base font-bold ${
                comparison.satisfiesRange ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              }`}>
                {comparison.satisfiesRange ? "✓ Satisfies Range" : "✗ Out of Range"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
