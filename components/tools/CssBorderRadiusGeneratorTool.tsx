"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssBorderRadiusGeneratorTool() {
  const [tlH, setTlH] = useState(30);
  const [trH, setTrH] = useState(70);
  const [brH, setBrH] = useState(70);
  const [blH, setBlH] = useState(30);

  const [tlV, setTlV] = useState(30);
  const [trV, setTrV] = useState(30);
  const [brV, setBrV] = useState(70);
  const [blV, setBlV] = useState(70);

  const [isCopied, setIsCopied] = useState(false);

  const borderRadiusVal = useMemo(() => {
    return `${tlH}% ${trH}% ${brH}% ${blH}% / ${tlV}% ${trV}% ${brV}% ${blV}%`;
  }, [tlH, trH, brH, blH, tlV, trV, brV, blV]);

  const cssCode = useMemo(() => {
    return `border-radius: ${borderRadiusVal};`;
  }, [borderRadiusVal]);

  const setPreset = (vals: number[]) => {
    setTlH(vals[0]);
    setTrH(vals[1]);
    setBrH(vals[2]);
    setBlH(vals[3]);
    setTlV(vals[4]);
    setTrV(vals[5]);
    setBrV(vals[6]);
    setBlV(vals[7]);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Border Radius & Blob Generator"
      description="Create unique organic shapes, blobs, and fancy border-radius styling with 8-point controls."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">
            Horizontal Radius Controls
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500">Top-Left (H): {tlH}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={tlH}
                onChange={(e) => setTlH(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Top-Right (H): {trH}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={trH}
                onChange={(e) => setTrH(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Bottom-Right (H): {brH}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={brH}
                onChange={(e) => setBrH(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Bottom-Left (H): {blH}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={blH}
                onChange={(e) => setBlH(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-primary pt-2">
            Vertical Radius Controls
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500">Top-Left (V): {tlV}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={tlV}
                onChange={(e) => setTlV(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Top-Right (V): {trV}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={trV}
                onChange={(e) => setTrV(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Bottom-Right (V): {brV}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={brV}
                onChange={(e) => setBrV(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Bottom-Left (V): {blV}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={blV}
                onChange={(e) => setBlV(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          {/* Presets */}
          <div className="pt-2">
            <span className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Shape Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Organic Blob", vals: [30, 70, 70, 30, 30, 30, 70, 70] },
                { name: "Egg", vals: [50, 50, 50, 50, 60, 60, 40, 40] },
                { name: "Leaf", vals: [0, 100, 0, 100, 0, 100, 0, 100] },
                { name: "Water Drop", vals: [50, 50, 50, 50, 0, 50, 50, 50] },
                { name: "Pebble", vals: [60, 40, 30, 70, 60, 30, 70, 40] },
              ].map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setPreset(p.vals)}
                  className="rounded-lg border border-black/10 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-black/10 p-8 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <div
              className="h-44 w-44 bg-gradient-to-tr from-primary to-emerald-400 shadow-xl transition-all duration-200 flex items-center justify-center text-white font-bold text-xs"
              style={{ borderRadius: borderRadiusVal }}
            >
              Blob Preview
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy Border Radius"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={cssCode}
              rows={2}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
