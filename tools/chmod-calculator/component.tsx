"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ChmodCalculatorTool() {
  const [permissions, setPermissions] = useState({
    ownerRead: true,
    ownerWrite: true,
    ownerExec: true,
    groupRead: true,
    groupWrite: false,
    groupExec: true,
    publicRead: true,
    publicWrite: false,
    publicExec: true,
  });

  const [filename, setFilename] = useState("file.txt");
  const [isCopied, setIsCopied] = useState(false);

  const toggle = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculated = useMemo(() => {
    const ownerVal =
      (permissions.ownerRead ? 4 : 0) +
      (permissions.ownerWrite ? 2 : 0) +
      (permissions.ownerExec ? 1 : 0);

    const groupVal =
      (permissions.groupRead ? 4 : 0) +
      (permissions.groupWrite ? 2 : 0) +
      (permissions.groupExec ? 1 : 0);

    const publicVal =
      (permissions.publicRead ? 4 : 0) +
      (permissions.publicWrite ? 2 : 0) +
      (permissions.publicExec ? 1 : 0);

    const octal = `${ownerVal}${groupVal}${publicVal}`;
    const symbolic = `${permissions.ownerRead ? "r" : "-"}${permissions.ownerWrite ? "w" : "-"}${
      permissions.ownerExec ? "x" : "-"
    }${permissions.groupRead ? "r" : "-"}${permissions.groupWrite ? "w" : "-"}${
      permissions.groupExec ? "x" : "-"
    }${permissions.publicRead ? "r" : "-"}${permissions.publicWrite ? "w" : "-"}${
      permissions.publicExec ? "x" : "-"
    }`;

    return {
      octal,
      symbolic,
      command: `chmod ${octal} ${filename || "filename"}`,
    };
  }, [permissions, filename]);

  const applyPreset = (octal: string) => {
    const o = parseInt(octal[0], 10);
    const g = parseInt(octal[1], 10);
    const p = parseInt(octal[2], 10);

    setPermissions({
      ownerRead: !!(o & 4),
      ownerWrite: !!(o & 2),
      ownerExec: !!(o & 1),
      groupRead: !!(g & 4),
      groupWrite: !!(g & 2),
      groupExec: !!(g & 1),
      publicRead: !!(p & 4),
      publicWrite: !!(p & 2),
      publicExec: !!(p & 1),
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(calculated.command);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Linux Chmod Permissions Calculator"
      description="Calculate Linux/Unix file permissions visually with octal numbers and symbolic notation."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        {/* Presets */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Standard Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "755 (Standard Executable)", octal: "755" },
              { label: "644 (Standard Web File)", octal: "644" },
              { label: "777 (Full Access)", octal: "777" },
              { label: "600 (Private SSH Key / Config)", octal: "600" },
              { label: "700 (Private Executable)", octal: "700" },
              { label: "400 (Read-Only Owner)", octal: "400" },
            ].map((p) => (
              <button
                key={p.octal}
                type="button"
                onClick={() => applyPreset(p.octal)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  calculated.octal === p.octal
                    ? "bg-primary text-white border-primary"
                    : "border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Checkbox Matrix */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Owner */}
          <div className="rounded-xl border border-black/10 p-5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="text-base font-bold mb-3 text-primary">Owner (User)</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.ownerRead}
                  onChange={() => toggle("ownerRead")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Read (r = 4)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.ownerWrite}
                  onChange={() => toggle("ownerWrite")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Write (w = 2)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.ownerExec}
                  onChange={() => toggle("ownerExec")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Execute (x = 1)</span>
              </label>
            </div>
          </div>

          {/* Group */}
          <div className="rounded-xl border border-black/10 p-5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="text-base font-bold mb-3 text-primary">Group</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.groupRead}
                  onChange={() => toggle("groupRead")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Read (r = 4)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.groupWrite}
                  onChange={() => toggle("groupWrite")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Write (w = 2)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.groupExec}
                  onChange={() => toggle("groupExec")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Execute (x = 1)</span>
              </label>
            </div>
          </div>

          {/* Public */}
          <div className="rounded-xl border border-black/10 p-5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="text-base font-bold mb-3 text-primary">Public (Others)</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.publicRead}
                  onChange={() => toggle("publicRead")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Read (r = 4)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.publicWrite}
                  onChange={() => toggle("publicWrite")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Write (w = 2)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={permissions.publicExec}
                  onChange={() => toggle("publicExec")}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span>Execute (x = 1)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="rounded-xl border border-black/10 p-6 dark:border-white/10 bg-white dark:bg-black/20">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Octal Notation
              </span>
              <div className="mt-1 text-3xl font-bold font-mono text-primary">
                {calculated.octal}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Symbolic Notation
              </span>
              <div className="mt-1 text-3xl font-bold font-mono text-primary">
                {calculated.symbolic}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Target File / Path
              </span>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="e.g. script.sh"
                className="mt-1 w-full rounded-md border border-black/15 bg-transparent px-3 py-1.5 font-mono text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 dark:border-white/10 pt-4">
            <div className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
              $ {calculated.command}
            </div>
            <Button onClick={handleCopy} size="sm">
              {isCopied ? "Copied Command!" : "Copy chmod Command"}
            </Button>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
