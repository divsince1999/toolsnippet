"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const AFINN: Record<string, number> = {
  outstanding: 5, amazing: 4, excellent: 4, fantastic: 4, super: 3, great: 3, good: 2, love: 3, best: 3,
  happy: 3, joy: 3, wonderful: 4, awesome: 4, perfect: 4, beautiful: 3, glad: 2, helpful: 2, recommend: 2,
  terrible: -4, horrible: -4, awful: -4, bad: -2, hate: -3, poor: -2, worst: -4, disappointed: -3,
  broken: -2, fail: -2, failure: -3, bug: -2, error: -2, slow: -2, delay: -1, expensive: -1, waste: -3,
  useless: -3, scam: -5, cheat: -4, fraud: -5, angry: -3, pain: -2, difficult: -2, annoyed: -2
};

const SAMPLE_TEXT = `ToolSnippet is an amazing developer toolkit! The tools are super fast, reliable, and completely free. I was really disappointed with other slow alternatives, but this suite is fantastic and makes formatting effortless.`;

export default function TextSentimentAnalyzer() {
  const [text, setText] = useState(SAMPLE_TEXT);

  const result = useMemo(() => {
    if (!text.trim()) {
      return { score: 0, comparative: 0, positiveWords: [], negativeWords: [], label: "Neutral" };
    }

    const tokens = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    let totalScore = 0;
    const positiveWords: { word: string; score: number }[] = [];
    const negativeWords: { word: string; score: number }[] = [];

    for (const token of tokens) {
      if (token in AFINN) {
        const val = AFINN[token];
        totalScore += val;
        if (val > 0) positiveWords.push({ word: token, score: val });
        else if (val < 0) negativeWords.push({ word: token, score: val });
      }
    }

    const comparative = tokens.length > 0 ? Number((totalScore / tokens.length).toFixed(2)) : 0;

    let label = "Neutral";
    if (totalScore >= 3) label = "Positive";
    if (totalScore >= 7) label = "Very Positive";
    if (totalScore <= -3) label = "Negative";
    if (totalScore <= -7) label = "Very Negative";

    return { score: totalScore, comparative, positiveWords, negativeWords, label };
  }, [text]);

  return (
    <ToolContainer title="Text Sentiment & Tone Analyzer" description="Analyze sentiment polarity, emotional tone, and positive/negative word distributions in real time.">
      <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Tone Sentiment</span>
          <p
            className={`text-2xl font-bold ${
              result.label.includes("Positive")
                ? "text-emerald-600"
                : result.label.includes("Negative")
                ? "text-rose-600"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {result.label}
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Raw Score</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-mono">
            {result.score > 0 ? `+${result.score}` : result.score}
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Positive Signals</span>
          <p className="text-2xl font-bold text-emerald-600">{result.positiveWords.length}</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Negative Signals</span>
          <p className="text-2xl font-bold text-rose-600">{result.negativeWords.length}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Input Content to Analyze:</label>
          <Button variant="secondary" size="sm" onClick={() => setText("")}>Clear</Button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write text..."
          rows={5}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 dark:border-emerald-500/30">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Positive Keywords ({result.positiveWords.length}):
          </h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.positiveWords.length > 0 ? (
              result.positiveWords.map((pw, i) => (
                <span key={i} className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  {pw.word} (+{pw.score})
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">None detected.</span>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 dark:border-rose-500/30">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            Negative Keywords ({result.negativeWords.length}):
          </h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.negativeWords.length > 0 ? (
              result.negativeWords.map((nw, i) => (
                <span key={i} className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/40 dark:text-rose-200">
                  {nw.word} ({nw.score})
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">None detected.</span>
            )}
          </div>
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
