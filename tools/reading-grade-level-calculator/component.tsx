"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean) return 0;
  if (clean.length <= 3) return 1;
  const normalized = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const matches = normalized.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

const SAMPLE_TEXT = `Developer tools allow engineers to format, inspect, and optimize data in real time. Good software design emphasizes clarity, simplicity, and performance. When code is modular and well structured, maintenance becomes effortless and developer productivity increases significantly.`;

export default function ReadingGradeLevelCalculator() {
  const [text, setText] = useState(SAMPLE_TEXT);

  const scores = useMemo(() => {
    if (!text.trim()) {
      return { words: 0, sentences: 0, syllables: 0, complexWords: 0, fleschEase: 0, fleschGrade: 0, gunningFog: 0, colemanLiau: 0, smog: 0 };
    }

    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 0);

    const sentences = text
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const totalWords = words.length;
    const totalSentences = Math.max(1, sentences.length);

    let totalSyllables = 0;
    let complexWords = 0;
    let totalLetters = 0;

    for (const w of words) {
      const syl = countSyllables(w);
      totalSyllables += syl;
      if (syl >= 3) complexWords++;
      totalLetters += w.replace(/[^a-z0-9]/g, "").length;
    }

    const wordsPerSentence = totalWords / totalSentences;
    const syllablesPerWord = totalWords > 0 ? totalSyllables / totalWords : 0;
    const complexRatio = totalWords > 0 ? (complexWords / totalWords) * 100 : 0;

    // Flesch Reading Ease = 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
    const fleschEase = Math.round(
      Math.min(100, Math.max(0, 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord))
    );

    // Flesch-Kincaid Grade = 0.39*(words/sentences) + 11.8*(syllables/words) - 15.59
    const fleschGrade = Math.max(
      1,
      Number((0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59).toFixed(1))
    );

    // Gunning Fog = 0.4 * ( (words/sentences) + 100*(complex/words) )
    const gunningFog = Math.max(
      1,
      Number((0.4 * (wordsPerSentence + complexRatio)).toFixed(1))
    );

    // Coleman-Liau = 0.0588*L - 0.296*S - 15.8 (L = avg letters/100 words, S = avg sentences/100 words)
    const L = totalWords > 0 ? (totalLetters / totalWords) * 100 : 0;
    const S = totalWords > 0 ? (totalSentences / totalWords) * 100 : 0;
    const colemanLiau = Math.max(1, Number((0.0588 * L - 0.296 * S - 15.8).toFixed(1)));

    // SMOG Index = 1.0430 * sqrt(30 * complex/sentences) + 3.1291
    const smog = Number((1.043 * Math.sqrt((30 * complexWords) / totalSentences) + 3.1291).toFixed(1));

    return {
      words: totalWords,
      sentences: totalSentences,
      syllables: totalSyllables,
      complexWords,
      fleschEase,
      fleschGrade,
      gunningFog,
      colemanLiau,
      smog
    };
  }, [text]);

  return (
    <ToolContainer title="Readability & Grade Level Calculator" description="Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, and SMOG scores.">
      <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Flesch Reading Ease</span>
          <p className="text-3xl font-bold text-primary-solid">{scores.fleschEase}/100</p>
          <span className="text-[11px] text-gray-500 dark:text-gray-400">
            {scores.fleschEase >= 70 ? "Easy / Conversational" : scores.fleschEase >= 60 ? "Standard / Plain English" : "Advanced / Difficult"}
          </span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Grade Level (K-12)</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">Grade {scores.fleschGrade}</p>
          <span className="text-[11px] text-gray-500 dark:text-gray-400">Flesch-Kincaid</span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Gunning Fog Index</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{scores.gunningFog}</p>
          <span className="text-[11px] text-gray-500 dark:text-gray-400">Years of Education</span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Complex Words (3+ syl)</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{scores.complexWords}</p>
          <span className="text-[11px] text-gray-500 dark:text-gray-400">{scores.words} total words</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Source Text Copy:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write content here..."
          rows={6}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
        <div className="flex justify-end">
          <Button variant="secondary" size="sm" onClick={() => setText("")}>
            Clear
          </Button>
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
