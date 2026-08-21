"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssTriangleGeneratorTool() {
  const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right">("top");
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [color, setColor] = useState("#0f766e");
  const [isCopied, setIsCopied] = useState(false);

  const triangleStyles = useMemo(() => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    switch (direction) {
      case "top":
        return {
          width: "0px",
          height: "0px",
          borderLeft: `${halfWidth}px solid transparent`,
          borderRight: `${halfWidth}px solid transparent`,
          borderBottom: `${height}px solid ${color}`,
        };
      case "bottom":
        return {
          width: "0px",
          height: "0px",
          borderLeft: `${halfWidth}px solid transparent`,
          borderRight: `${halfWidth}px solid transparent`,
          borderTop: `${height}px solid ${color}`,
        };
      case "left":
        return {
          width: "0px",
          height: "0px",
          borderTop: `${halfHeight}px solid transparent`,
          borderBottom: `${halfHeight}px solid transparent`,
          borderRight: `${width}px solid ${color}`,
        };
      case "right":
        return {
          width: "0px",
          height: "0px",
          borderTop: `${halfHeight}px solid transparent`,
          borderBottom: `${halfHeight}px solid transparent`,
          borderLeft: `${width}px solid ${color}`,
        };
      case "top-left":
        return {
          width: "0px",
          height: "0px",
          borderTop: `${height}px solid ${color}`,
          borderRight: `${width}px solid transparent`,
        };
      case "top-right":
        return {
          width: "0px",
          height: "0px",
          borderTop: `${height}px solid ${color}`,
          borderLeft: `${width}px solid transparent`,
        };
      case "bottom-left":
        return {
          width: "0px",
          height: "0px",
          borderBottom: `${height}px solid ${color}`,
          borderRight: `${width}px solid transparent`,
        };
      case "bottom-right":
        return {
          width: "0px",
          height: "0px",
          borderBottom: `${height}px solid ${color}`,
          borderLeft: `${width}px solid transparent`,
        };
    }
  }, [direction, width, height, color]);

  const cssCode = useMemo(() => {
    let css = `width: 0;\nheight: 0;\n`;
    for (const [k, v] of Object.entries(triangleStyles)) {
      if (k === "width" || k === "height") continue;
      const cssProp = k.replace(/([A-Z])/g, "-$1").toLowerCase();
      css += `${cssProp}: ${v};\n`;
    }
    return css.trim();
  }, [triangleStyles]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Triangle Generator"
      description="Create pure CSS triangles pointing in any direction with custom dimensions and colors."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Direction
            </label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as typeof direction)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="top">Top ▲</option>
              <option value="bottom">Bottom ▼</option>
              <option value="left">Left ◀</option>
              <option value="right">Right ▶</option>
              <option value="top-left">Top-Left ◤</option>
              <option value="top-right">Top-Right ◥</option>
              <option value="bottom-left">Bottom-Left ◣</option>
              <option value="bottom-right">Bottom-Right ◢</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
                <span>Width ({width}px)</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
                <span>Height ({height}px)</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border border-black/10 p-1"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-32 rounded border border-black/15 bg-transparent p-2 font-mono text-sm dark:border-white/20"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 p-8 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <div style={triangleStyles} className="transition-all" />
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy Triangle CSS"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={cssCode}
              rows={5}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
