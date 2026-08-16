"use client";

import { useMemo, useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ReadTimeCalculatorTool() {
  const { input, setInput, clearAll } = useTool();
  const [wpm, setWpm] = useState(225); // average adult silent reading speed
  const [speakingWpm, setSpeakingWpm] = useState(130); // average speaking speed

  const metrics = useMemo(() => {
    if (!input.trim()) return null;

    const trimmed = input.trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const charCount = input.length;
    const charNoSpaces = input.replace(/\s/g, "").length;
    const sentences = trimmed.split(/[.!?]+/).filter(Boolean);
    const sentenceCount = sentences.length || 1;
    const paragraphs = trimmed.split(/\n+/).filter(Boolean);
    const paragraphCount = paragraphs.length || 1;

    // Reading time calculation
    const readMinutesExact = wordCount / wpm;
    const readMinutes = Math.floor(readMinutesExact);
    const readSeconds = Math.round((readMinutesExact - readMinutes) * 60);

    // Speaking time calculation
    const speakMinutesExact = wordCount / speakingWpm;
    const speakMinutes = Math.floor(speakMinutesExact);
    const speakSeconds = Math.round((speakMinutesExact - speakMinutes) * 60);

    // Average metrics
    const avgWordLength = wordCount > 0 ? (charNoSpaces / wordCount).toFixed(1) : "0";
    const avgSentenceLength = (wordCount / sentenceCount).toFixed(1);

    return {
      readTimeFormatted: readMinutes > 0 ? `${readMinutes} min ${readSeconds} sec` : `${readSeconds} sec`,
      speakTimeFormatted: speakMinutes > 0 ? `${speakMinutes} min ${speakSeconds} sec` : `${speakSeconds} sec`,
      wordCount,
      charCount,
      charNoSpaces,
      sentenceCount,
      paragraphCount,
      avgWordLength,
      avgSentenceLength,
    };
  }, [input, wpm, speakingWpm]);

  return (
    <ToolContainer
      title="Reading & Speaking Time Calculator"
      description="Estimate reading time, speech duration, and text readability metrics for content creators."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Article or Speech Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste blog post, speech draft, or article text here to calculate reading and speaking time..."
          rows={10}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Reading Speed (WPM):</label>
              <input
                type="number"
                min="100"
                max="500"
                value={wpm}
                onChange={(e) => setWpm(parseInt(e.target.value) || 225)}
                className="w-20 rounded-md border border-black/15 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Speaking Speed (WPM):</label>
              <input
                type="number"
                min="80"
                max="300"
                value={speakingWpm}
                onChange={(e) => setSpeakingWpm(parseInt(e.target.value) || 130)}
                className="w-20 rounded-md border border-black/15 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              />
            </div>
          </div>

          <Button variant="ghost" onClick={clearAll} disabled={!input}>
            Clear Text
          </Button>
        </div>

        {metrics && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-black/10 p-5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Silent Reading Time
              </span>
              <div className="mt-2 text-2xl font-bold font-mono text-primary">
                {metrics.readTimeFormatted}
              </div>
              <div className="mt-1 text-xs text-gray-500">Based on {wpm} words/min</div>
            </div>

            <div className="rounded-xl border border-black/10 p-5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Speaking / Speech Time
              </span>
              <div className="mt-2 text-2xl font-bold font-mono text-primary">
                {metrics.speakTimeFormatted}
              </div>
              <div className="mt-1 text-xs text-gray-500">Based on {speakingWpm} words/min</div>
            </div>

            <div className="rounded-xl border border-black/10 p-5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Word & Character Counts
              </span>
              <div className="mt-2 text-2xl font-bold font-mono text-primary">
                {metrics.wordCount.toLocaleString()} words
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {metrics.charCount.toLocaleString()} chars ({metrics.charNoSpaces.toLocaleString()} no spaces)
              </div>
            </div>

            <div className="rounded-xl border border-black/10 p-5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Structure & Averages
              </span>
              <div className="mt-2 text-2xl font-bold font-mono text-primary">
                {metrics.sentenceCount} sentences
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {metrics.paragraphCount} paragraphs · ~{metrics.avgSentenceLength} words/sentence
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
