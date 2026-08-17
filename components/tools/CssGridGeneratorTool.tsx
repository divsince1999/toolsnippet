"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssGridGeneratorTool() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [colGap, setColGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [isCopied, setIsCopied] = useState(false);

  const totalCells = cols * rows;

  const cssCode = useMemo(() => {
    return `display: grid;\ngrid-template-columns: repeat(${cols}, minmax(0, 1fr));\ngrid-template-rows: repeat(${rows}, minmax(0, 1fr));\ngap: ${rowGap}px ${colGap}px;`;
  }, [cols, rows, colGap, rowGap]);

  const tailwindCode = useMemo(() => {
    return `grid grid-cols-${cols} grid-rows-${rows} gap-x-[${colGap}px] gap-y-[${rowGap}px]`;
  }, [cols, rows, colGap, rowGap]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Grid Layout Generator"
      description="Create multi-column and multi-row CSS grid layouts with interactive column and gap controls."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Columns ({cols})</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Rows ({rows})</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Column Gap ({colGap}px)</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              value={colGap}
              onChange={(e) => setColGap(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Row Gap ({rowGap}px)</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              value={rowGap}
              onChange={(e) => setRowGap(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div
            className="min-h-[260px] w-full rounded-2xl border-2 border-dashed border-primary/40 bg-black/[0.02] p-4 dark:bg-white/[0.02]"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              gap: `${rowGap}px ${colGap}px`,
            }}
          >
            {Array.from({ length: totalCells }).map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-gradient-to-tr from-primary/80 to-indigo-500/80 flex items-center justify-center font-bold text-white shadow-sm text-xs"
              >
                Cell {i + 1}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy Grid CSS"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={cssCode}
              rows={4}
            />
            <TextArea
              label="Tailwind CSS Classes"
              readOnly
              copyable
              value={tailwindCode}
              rows={2}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
