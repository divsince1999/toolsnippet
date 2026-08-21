"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const POWER_WORDS = new Set([
  "proven", "instant", "essential", "effortless", "ultimate", "master", "complete", "exclusive",
  "secret", "insider", "powerful", "boost", "skyrocket", "hack", "guide", "free", "easy", "step-by-step",
  "remarkable", "unbelievable", "critical", "massive", "astonishing", "quick", "guaranteed", "simple"
]);

const EMOTIONAL_WORDS = new Set([
  "love", "hate", "fear", "danger", "joy", "amazing", "stunning", "shocking", "heartwarming",
  "devastating", "delight", "insane", "miracle", "epic", "brilliant", "tragedy", "excited", "happy"
]);

export default function HeadlineAnalyzer() {
  const [headline, setHeadline] = useState("10 Proven Developer Tools to Skyrocket Your Coding Productivity");

  const analysis = useMemo(() => {
    if (!headline.trim()) {
      return { score: 0, words: 0, chars: 0, powerFound: [], emotionFound: [], tips: [] };
    }

    const tokens = headline
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);

    const wordsCount = tokens.length;
    const charsCount = headline.length;

    const powerFound = tokens.filter((w) => POWER_WORDS.has(w));
    const emotionFound = tokens.filter((w) => EMOTIONAL_WORDS.has(w));

    let score = 40;
    const tips: string[] = [];

    // Length scoring
    if (wordsCount >= 6 && wordsCount <= 9) {
      score += 20;
    } else if (wordsCount < 5) {
      tips.push("Headline is quite short. Aim for 6–9 words for maximum engagement.");
    } else if (wordsCount > 12) {
      tips.push("Headline is too long. Try condensing to under 10 words.");
    }

    if (charsCount >= 45 && charsCount <= 65) {
      score += 15;
    } else if (charsCount > 65) {
      tips.push("Characters exceed 65 chars and may be truncated on Google Search results.");
    }

    // Power words
    if (powerFound.length > 0) {
      score += Math.min(15, powerFound.length * 10);
    } else {
      tips.push("Add at least one high-impact Power Word (e.g. 'proven', 'effortless', 'complete').");
    }

    // Emotional words
    if (emotionFound.length > 0) {
      score += Math.min(10, emotionFound.length * 5);
    } else {
      tips.push("Include an emotional trigger to drive reader curiosity.");
    }

    score = Math.min(100, Math.max(10, score));

    return { score, words: wordsCount, chars: charsCount, powerFound, emotionFound, tips };
  }, [headline]);

  return (
    <ToolContainer title="Blog & Ad Headline Analyzer" description="Score headlines based on power words, emotional triggers, character length, sentiment, and clickability.">
      <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Headline to Analyze:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Enter blog, video, or ad headline..."
            className="w-full rounded-xl border border-black/15 bg-transparent px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary dark:border-white/20 font-medium"
          />
          <Button variant="secondary" onClick={() => setHeadline("")}>
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Headline Score</span>
          <p className={`text-3xl font-bold ${analysis.score >= 70 ? "text-emerald-600" : analysis.score >= 50 ? "text-amber-600" : "text-rose-600"}`}>
            {analysis.score}/100
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Word Count</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analysis.words}</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Character Count</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analysis.chars}</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Power Words</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analysis.powerFound.length}</p>
        </div>
      </div>

      {analysis.tips.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 dark:border-amber-500/30">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Optimization Suggestions:
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-amber-900 dark:text-amber-200 list-disc list-inside">
            {analysis.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </ToolContainer>
  );
}
