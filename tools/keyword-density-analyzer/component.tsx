"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how",
  "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me", "more", "most", "my", "myself",
  "no", "nor", "not", "now", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves",
  "out", "over", "own", "s", "same", "she", "should", "so", "some", "such", "than", "that", "the", "their",
  "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too",
  "under", "until", "up", "very", "was", "we", "were", "what", "when", "where", "which", "while", "who",
  "whom", "why", "will", "with", "would", "you", "your", "yours", "yourself", "yourselves"
]);

const SAMPLE_TEXT = `Search engine optimization (SEO) is the process of improving website traffic quality and quantity from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. Modern SEO requires high quality content, fast load times, and structured data. Search engine optimization strategies help websites rank higher in organic search results.`;

export default function KeywordDensityAnalyzer() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [filterStopWords, setFilterStopWords] = useState(true);
  const [minWordLength, setMinWordLength] = useState(3);
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);

  const stats = useMemo(() => {
    if (!text.trim()) {
      return { totalWords: 0, uniqueWords: 0, oneGrams: [], twoGrams: [], threeGrams: [] };
    }

    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 0);

    const totalWords = words.length;
    if (totalWords === 0) {
      return { totalWords: 0, uniqueWords: 0, oneGrams: [], twoGrams: [], threeGrams: [] };
    }

    const filteredWords = words.filter((w) => {
      if (w.length < minWordLength) return false;
      if (filterStopWords && STOP_WORDS.has(w)) return false;
      return true;
    });

    const countFreq = (tokens: string[]) => {
      const freqMap: Record<string, number> = {};
      for (const token of tokens) {
        freqMap[token] = (freqMap[token] || 0) + 1;
      }
      return Object.entries(freqMap)
        .map(([phrase, count]) => ({
          phrase,
          count,
          density: ((count / totalWords) * 100).toFixed(2)
        }))
        .sort((a, b) => b.count - a.count);
    };

    const oneGrams = countFreq(filteredWords);

    const bigrams: string[] = [];
    for (let i = 0; i < words.length - 1; i++) {
      const w1 = words[i];
      const w2 = words[i + 1];
      if (filterStopWords && (STOP_WORDS.has(w1) && STOP_WORDS.has(w2))) continue;
      bigrams.push(`${w1} ${w2}`);
    }
    const twoGrams = countFreq(bigrams);

    const trigrams: string[] = [];
    for (let i = 0; i < words.length - 2; i++) {
      const w1 = words[i];
      const w2 = words[i + 1];
      const w3 = words[i + 2];
      if (filterStopWords && (STOP_WORDS.has(w1) && STOP_WORDS.has(w2) && STOP_WORDS.has(w3))) continue;
      trigrams.push(`${w1} ${w2} ${w3}`);
    }
    const threeGrams = countFreq(trigrams);

    return {
      totalWords,
      uniqueWords: new Set(words).size,
      oneGrams: oneGrams.slice(0, 15),
      twoGrams: twoGrams.slice(0, 15),
      threeGrams: threeGrams.slice(0, 15)
    };
  }, [text, filterStopWords, minWordLength]);

  const activeList = activeTab === 1 ? stats.oneGrams : activeTab === 2 ? stats.twoGrams : stats.threeGrams;

  return (
    <ToolContainer title="Keyword Density & N-Gram Analyzer" description="Analyze 1-word, 2-word, and 3-word n-gram frequency, density percentage, and keyword stuffing warnings.">
      <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Total Words</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalWords}</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Unique Words</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.uniqueWords}</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">1-Word Phrases</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.oneGrams.length}</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Multi-Word Phrases</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.twoGrams.length + stats.threeGrams.length}</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Source Text Copy:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type content here..."
          rows={6}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={filterStopWords}
            onChange={(e) => setFilterStopWords(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Filter Common Stop Words
        </label>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span>Min Word Length:</span>
          <input
            type="number"
            min={1}
            max={10}
            value={minWordLength}
            onChange={(e) => setMinWordLength(Number(e.target.value))}
            className="w-16 rounded border border-black/15 bg-white px-2 py-1 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>
        <Button variant="secondary" size="sm" onClick={() => setText("")}>
          Clear
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-black/10 pb-2 dark:border-white/10">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(1)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 1 ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
              }`}
            >
              1-Word Keywords
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(2)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 2 ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
              }`}
            >
              2-Word Phrases
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(3)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 3 ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
              }`}
            >
              3-Word Phrases
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/10 bg-black/[0.02] text-gray-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-gray-400">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Keyword / Phrase</th>
                <th className="p-3 text-right">Count</th>
                <th className="p-3 text-right">Density</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {activeList.length > 0 ? (
                activeList.map((item, idx) => {
                  const densityNum = parseFloat(item.density);
                  const isHigh = densityNum > 3.5;
                  const isGood = densityNum >= 1.0 && densityNum <= 3.5;

                  return (
                    <tr key={item.phrase} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                      <td className="p-3 font-mono text-gray-400">#{idx + 1}</td>
                      <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">{item.phrase}</td>
                      <td className="p-3 text-right font-mono">{item.count}</td>
                      <td className="p-3 text-right font-mono font-semibold">{item.density}%</td>
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            isHigh
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                              : isGood
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
                          }`}
                        >
                          {isHigh ? "High (>3.5%)" : isGood ? "Optimal" : "Low (<1%)"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No keywords found with current filter settings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
