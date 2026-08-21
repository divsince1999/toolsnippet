"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CssFlexboxPlaygroundTool() {
  const [flexDirection, setFlexDirection] = useState<"row" | "row-reverse" | "column" | "column-reverse">("row");
  const [justifyContent, setJustifyContent] = useState<"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly">("center");
  const [alignItems, setAlignItems] = useState<"stretch" | "flex-start" | "center" | "flex-end" | "baseline">("center");
  const [flexWrap, setFlexWrap] = useState<"nowrap" | "wrap" | "wrap-reverse">("wrap");
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(4);
  const [isCopied, setIsCopied] = useState(false);

  const cssCode = useMemo(() => {
    return `display: flex;\nflex-direction: ${flexDirection};\njustify-content: ${justifyContent};\nalign-items: ${alignItems};\nflex-wrap: ${flexWrap};\ngap: ${gap}px;`;
  }, [flexDirection, justifyContent, alignItems, flexWrap, gap]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="CSS Flexbox Generator & Playground"
      description="Visual interactive builder for CSS Flexbox layouts with direction, alignment, and gap controls."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              flex-direction
            </label>
            <select
              value={flexDirection}
              onChange={(e) => setFlexDirection(e.target.value as typeof flexDirection)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              justify-content
            </label>
            <select
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value as typeof justifyContent)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              align-items
            </label>
            <select
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as typeof alignItems)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              flex-wrap
            </label>
            <select
              value={flexWrap}
              onChange={(e) => setFlexWrap(e.target.value as typeof flexWrap)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
                <span>Gap ({gap}px)</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
                <span>Items ({itemCount})</span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Playground Container */}
        <div className="flex flex-col gap-6">
          <div
            className="flex min-h-[260px] w-full rounded-2xl border-2 border-dashed border-primary/40 bg-black/[0.02] p-4 transition-all overflow-hidden dark:bg-white/[0.02]"
            style={{
              display: "flex",
              flexDirection,
              justifyContent,
              alignItems,
              flexWrap,
              gap: `${gap}px`,
            }}
          >
            {Array.from({ length: itemCount }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-16 min-w-16 rounded-xl bg-gradient-to-tr from-primary to-teal-400 flex items-center justify-center font-bold text-white shadow-md text-sm transition"
              >
                #{i + 1}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                {isCopied ? "Copied CSS!" : "Copy Flexbox CSS"}
              </Button>
            </div>
            <TextArea
              label="CSS Code"
              readOnly
              copyable
              value={cssCode}
              rows={6}
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
