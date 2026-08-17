"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssClipPathGeneratorTool() {
  const [shape, setShape] = useState<string>("hexagon");
  const [isCopied, setIsCopied] = useState(false);

  const shapesMap: Record<string, string> = {
    circle: "circle(50% at 50% 50%)",
    ellipse: "ellipse(40% 50% at 50% 50%)",
    triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
    trapezoid: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
    parallelogram: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
    rhombus: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    hexagon: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    message: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
    chevron: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
    arrow: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
  };

  const clipPathValue = shapesMap[shape] || shapesMap.hexagon;

  const cssCode = useMemo(() => {
    return `clip-path: ${clipPathValue};\n-webkit-clip-path: ${clipPathValue};`;
  }, [clipPathValue]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Clip-Path Shape Generator"
      description="Create polygon, star, geometric, and banner shapes using CSS clip-path."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
            Select Shape
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(shapesMap).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setShape(s)}
                className={`rounded-lg border p-2.5 text-xs font-medium capitalize transition ${
                  shape === s
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-black/10 p-8 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <div
              className="h-44 w-44 bg-gradient-to-tr from-indigo-500 via-primary to-teal-400 shadow-xl transition-all duration-300 flex items-center justify-center text-white font-bold text-xs"
              style={{
                clipPath: clipPathValue,
                WebkitClipPath: clipPathValue,
              }}
            >
              {shape.toUpperCase()}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy clip-path CSS"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={cssCode}
              rows={3}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
