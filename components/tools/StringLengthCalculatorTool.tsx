"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function StringLengthCalculatorTool() {
  const { input, setInput, clearAll } = useTool();

  const stats = {
    characters: input.length,
    charactersNoSpaces: input.replace(/\s/g, "").length,
    words: input.trim() ? input.trim().split(/\s+/).length : 0,
    lines: input ? input.split("\n").length : 0,
    bytes: new TextEncoder().encode(input).length,
  };

  return (
    <ToolContainer
      title="String Length Calculator"
      description="Get detailed character, word, line counts and byte size for your text."
    >
      <div className="grid gap-6">
        <TextArea
          label="Enter Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type text here..."
          rows={10}
        />
        <div className="flex gap-2">
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{stats.characters}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Characters</div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{stats.words}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Words</div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{stats.lines}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Lines</div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{stats.bytes}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Bytes</div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">No Spaces</div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
