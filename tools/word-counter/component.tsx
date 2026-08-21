"use client";

import { useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function WordCounterTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();

  const metrics = useMemo(() => {
    const text = input;
    const trimmed = text.trim();
    
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = trimmed ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0;
    const lines = text ? text.split("\n").length : 0;

    // Reading time: 200 wpm, Speaking time: 130 wpm
    const readTimeSeconds = Math.ceil((words / 200) * 60);
    const speakTimeSeconds = Math.ceil((words / 130) * 60);

    const formatDuration = (totalSec: number) => {
      if (totalSec === 0) return "0 sec";
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      if (mins === 0) return `${secs} sec`;
      return `${mins} min ${secs} sec`;
    };

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingTime: formatDuration(readTimeSeconds),
      speakingTime: formatDuration(speakTimeSeconds),
    };
  }, [input]);

  const summaryText = `Words: ${metrics.words}\nCharacters (with spaces): ${metrics.charsWithSpaces}\nCharacters (no spaces): ${metrics.charsNoSpaces}\nSentences: ${metrics.sentences}\nParagraphs: ${metrics.paragraphs}\nLines: ${metrics.lines}\nReading Time: ${metrics.readingTime}\nSpeaking Time: ${metrics.speakingTime}`;

  return (
    <ToolContainer
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and reading time in real-time."
      maxWidth="4xl"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.words}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Words</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.charsWithSpaces}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Characters</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.sentences}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Sentences</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 bg-black/5 dark:bg-white/5 text-center">
          <div className="text-2xl font-bold text-primary-solid">{metrics.paragraphs}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Paragraphs</div>
        </div>
      </div>

      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste your text here..."
        rows={10}
      />

      <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => copyToClipboard(summaryText)} disabled={!input}>
            {isCopied ? "Copied Summary!" : "Copy Summary"}
          </Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>
            Clear
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-600 dark:text-gray-400 border-t border-black/10 dark:border-white/10 pt-4">
        <div>
          <span className="font-semibold block text-gray-900 dark:text-white">Chars (no spaces)</span>
          {metrics.charsNoSpaces}
        </div>
        <div>
          <span className="font-semibold block text-gray-900 dark:text-white">Total Lines</span>
          {metrics.lines}
        </div>
        <div>
          <span className="font-semibold block text-gray-900 dark:text-white">Reading Time</span>
          {metrics.readingTime}
        </div>
        <div>
          <span className="font-semibold block text-gray-900 dark:text-white">Speaking Time</span>
          {metrics.speakingTime}
        </div>
      </div>
    </ToolContainer>
  );
}
