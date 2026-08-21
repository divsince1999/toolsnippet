"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const JARGON_MAP: Record<string, string> = {
  "synergy": "teamwork",
  "low-hanging fruit": "easy wins",
  "low hanging fruit": "easy wins",
  "touch base": "talk",
  "circle back": "follow up",
  "paradigm shift": "major change",
  "move the needle": "make progress",
  "think outside the box": "be creative",
  "bandwidth": "time / capacity",
  "deep dive": "detailed look",
  "game changer": "major breakthrough",
  "at the end of the day": "ultimately",
  "value proposition": "benefit",
  "bleeding edge": "cutting edge",
  "boil the ocean": "overcomplicate",
  "ping you": "message you",
  "wheelhouse": "expertise",
  "take it offline": "discuss later"
};

const SAMPLE = `At the end of the day, our new synergy initiatives will move the needle and target the low-hanging fruit. Let's circle back tomorrow and touch base to take a deep dive into our value proposition.`;

export default function TextClicheFinder() {
  const [text, setText] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return { count: 0, found: [], cleaned: "" };
    }

    const found: { term: string; replacement: string }[] = [];
    let cleaned = text;

    for (const [jargon, replacement] of Object.entries(JARGON_MAP)) {
      const regex = new RegExp(`\\b${jargon}\\b`, "gi");
      const matches = text.match(regex);
      if (matches) {
        found.push({ term: jargon, replacement });
        cleaned = cleaned.replace(regex, replacement);
      }
    }

    return { count: found.length, found, cleaned };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer title="Corporate Jargon & Cliché Finder" description="Identify overused business buzzwords, marketing clichés, and fluff words with concise alternatives.">
      <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Jargon & Clichés Found</span>
          <p className={`text-2xl font-bold ${analysis.count > 0 ? "text-amber-600" : "text-emerald-600"}`}>
            {analysis.count}
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Clarity Status</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {analysis.count === 0 ? "Excellent" : analysis.count < 3 ? "Moderate" : "Heavy Jargon"}
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Replacements Ready</span>
          <p className="text-2xl font-bold text-primary-solid">{analysis.found.length}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Draft Content:</label>
          <Button variant="secondary" size="sm" onClick={() => setText("")}>Clear</Button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to scan for clichés..."
          rows={5}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
      </div>

      {analysis.found.length > 0 && (
        <div className="space-y-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 dark:border-amber-500/40">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Identified Buzzwords & Suggested Replacements:
          </h4>
          <div className="grid gap-2 pt-1 sm:grid-cols-2">
            {analysis.found.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-white/80 p-2 text-xs dark:bg-zinc-900/80">
                <span className="font-semibold text-rose-600 line-through">&ldquo;{f.term}&rdquo;</span>
                <span className="text-gray-400">➔</span>
                <span className="font-semibold text-emerald-600">&ldquo;{f.replacement}&rdquo;</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Clean Plain English Version:
          </label>
          <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!analysis.cleaned}>
            {copied ? "✓ Copied Clean Version" : "Copy Clean Version"}
          </Button>
        </div>
        <textarea
          readOnly
          value={analysis.cleaned}
          rows={5}
          className="w-full rounded-xl border border-black/10 bg-black/[0.02] p-4 text-sm outline-none dark:border-white/10 dark:bg-white/[0.02]"
        />
      </div>
      </div>
    </ToolContainer>
  );
}
