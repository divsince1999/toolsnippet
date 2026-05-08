"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";

export default function CssFlexboxGeneratorTool() {
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [flexWrap, setFlexWrap] = useState("nowrap");

  const cssCode = `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  flex-wrap: ${flexWrap};\n}`;

  return (
    <ToolContainer title="CSS Flexbox Generator" description="Visual builder for Flexbox layouts.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Flex Direction</label>
            <select value={flexDirection} onChange={e => setFlexDirection(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20">
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Justify Content</label>
            <select value={justifyContent} onChange={e => setJustifyContent(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20">
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Align Items</label>
            <select value={alignItems} onChange={e => setAlignItems(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20">
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="baseline">baseline</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div 
            className="flex-1 min-h-[250px] rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 p-4"
            style={{ display: "flex", flexDirection: flexDirection as any, justifyContent: justifyContent as any, alignItems: alignItems as any, flexWrap: flexWrap as any }}
          >
            {[1, 2, 3].map(i => (
              <div key={i} className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center font-bold text-primary m-1">
                {i}
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-mono text-xs whitespace-pre relative group border border-black/5 dark:border-white/5">
            <code>{cssCode}</code>
            <Button size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText(cssCode)}>Copy CSS</Button>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
