"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SvgPathVisualizerTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [fillColor, setFillColor] = useState("#0f766e");
  const [strokeColor, setStrokeColor] = useState("#0f766e");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [showFill, setShowFill] = useState(true);
  const [showStroke, setShowStroke] = useState(false);
  const [viewBoxSize, setViewBoxSize] = useState(100);

  const defaultSample = "M50 0 L100 100 L0 100 Z";

  const pathD = input.trim()
    ? input.trim().replace(/^<path\s+[^>]*d=["']([^"']+)["'][^>]*\/?>$/i, "$1").replace(/^d=["']([^"']+)["']$/i, "$1")
    : defaultSample;

  const visualizePath = () => {
    try {
      if (!input.trim()) return;

      const cleanD = input.trim().replace(/^<path\s+[^>]*d=["']([^"']+)["'][^>]*\/?>$/i, "$1");
      const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" width="${viewBoxSize}" height="${viewBoxSize}">\n  <path d="${cleanD}" fill="${showFill ? fillColor : "none"}" stroke="${showStroke ? strokeColor : "none"}" stroke-width="${strokeWidth}" />\n</svg>`;

      setOutput(fullSvg);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to parse SVG path.");
    }
  };

  return (
    <ToolContainer
      title="SVG Path Visualizer & Scaler"
      description="Inspect, render, and convert raw SVG path d-strings into complete scalable SVG elements."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="SVG Path (d attribute or <path> tag)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5`}
            rows={5}
            error={error}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                ViewBox Size (px)
              </label>
              <input
                type="number"
                value={viewBoxSize}
                onChange={(e) => setViewBoxSize(Number(e.target.value))}
                className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-sm dark:border-white/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Stroke Width
              </label>
              <input
                type="number"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-full rounded-lg border border-black/15 bg-transparent p-2 text-sm dark:border-white/20"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase text-gray-500 mb-1">
                <input
                  type="checkbox"
                  checked={showFill}
                  onChange={(e) => setShowFill(e.target.checked)}
                  className="rounded text-primary"
                />
                <span>Fill Color</span>
              </label>
              <input
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                disabled={!showFill}
                className="h-10 w-16 cursor-pointer rounded border border-black/10 p-1 disabled:opacity-40"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase text-gray-500 mb-1">
                <input
                  type="checkbox"
                  checked={showStroke}
                  onChange={(e) => setShowStroke(e.target.checked)}
                  className="rounded text-primary"
                />
                <span>Stroke Color</span>
              </label>
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                disabled={!showStroke}
                className="h-10 w-16 cursor-pointer rounded border border-black/10 p-1 disabled:opacity-40"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={visualizePath}>Generate SVG Markup</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex min-h-[260px] items-center justify-center rounded-2xl border-2 border-dashed border-primary/40 bg-black/[0.02] p-6 dark:bg-white/[0.02]">
            <svg
              viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
              className="h-44 w-44 drop-shadow-md transition-all"
            >
              <path
                d={pathD}
                fill={showFill ? fillColor : "none"}
                stroke={showStroke ? strokeColor : "none"}
                strokeWidth={strokeWidth}
              />
            </svg>
          </div>

          {output && (
            <TextArea
              label="Full SVG Code"
              readOnly
              copyable
              value={output}
              rows={5}
            />
          )}
        </div>
      </div>
    </ToolContainer>
  );
}
