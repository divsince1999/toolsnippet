"use client";

import { useTool } from "@/hooks/useTool";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function WordCounterAdvancedTool() {
  const { input, setInput } = useTool();

  const trimmed = input.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = input.length;
  const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <ToolContainer title="Word Counter Advanced" description="Professional text analysis including reading time and paragraph counts.">
      <div className="grid gap-6">
        <TextArea label="Enter Text" value={input} onChange={(e) => setInput(e.target.value)} rows={12} />
        
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{words}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Words</div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{characters}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Characters</div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{sentences}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Sentences</div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{paragraphs}</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Paragraphs</div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] text-center">
            <div className="text-2xl font-bold text-primary">{readingTime}m</div>
            <div className="text-xs text-gray-500 uppercase font-medium">Reading Time</div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
