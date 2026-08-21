"use client";

import ToolContainer from "@/components/ui/ToolContainer";

import { useMemo, useState } from "react";

const SPAM_TRIGGERS = [
  "free", "100%", "guaranteed", "act now", "urgent", "cash", "make money", "winner",
  "congratulations", "risk-free", "no cost", "instant access", "million", "earn $", "viagra",
  "click here", "limited time", "exclusive deal", "order now", "special promotion"
];

export default function EmailSubjectLineTester() {
  const [subject, setSubject] = useState("🚀 Quick update: 20 new developer tools are now live on ToolSnippet");
  const [preview, setPreview] = useState("Explore schema converters, SEO analyzers, and crypto tools.");

  const analysis = useMemo(() => {
    if (!subject.trim()) {
      return { score: 0, charCount: 0, wordCount: 0, spamFound: [], isMobileCutoff: false, tips: [] };
    }

    const charCount = subject.length;
    const words = subject.trim().split(/\s+/);
    const wordCount = words.length;

    const lower = subject.toLowerCase();
    const spamFound = SPAM_TRIGGERS.filter((trigger) => lower.includes(trigger));

    let score = 50;
    const tips: string[] = [];

    // Length check
    if (charCount >= 30 && charCount <= 55) {
      score += 25;
    } else if (charCount < 20) {
      tips.push("Subject line is very short. Add more context to improve open rates.");
    } else if (charCount > 60) {
      score -= 15;
      tips.push("Subject line exceeds 60 characters and will be cut off on mobile email apps.");
    }

    // Word count check
    if (wordCount >= 4 && wordCount <= 8) {
      score += 15;
    }

    // Spam words check
    if (spamFound.length > 0) {
      score -= spamFound.length * 15;
      tips.push(`Flagged spam trigger words found: ${spamFound.join(", ")}`);
    } else {
      score += 10;
    }

    // Capitalization / punctuation check
    if (/[!]{2,}/.test(subject)) {
      score -= 10;
      tips.push("Avoid multiple exclamation marks (e.g. '!!') which trigger spam filters.");
    }
    if (subject.length > 10 && subject === subject.toUpperCase()) {
      score -= 20;
      tips.push("Avoid writing subject lines in ALL CAPS.");
    }

    score = Math.max(5, Math.min(100, score));

    return {
      score,
      charCount,
      wordCount,
      spamFound,
      isMobileCutoff: charCount > 42,
      tips
    };
  }, [subject]);

  return (
    <ToolContainer title="Email Subject Line & Spam Score Tester" description="Test email subject lines for spam trigger words, character length, mobile preview cutoff, and open-rate factors.">
      <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Subject Score</span>
          <p className={`text-3xl font-bold ${analysis.score >= 70 ? "text-emerald-600" : analysis.score >= 50 ? "text-amber-600" : "text-rose-600"}`}>
            {analysis.score}/100
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Characters</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analysis.charCount}</p>
          <span className="text-[10px] text-gray-400">Optimal: 30–50</span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Word Count</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analysis.wordCount}</p>
          <span className="text-[10px] text-gray-400">Optimal: 4–8</span>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Spam Triggers</span>
          <p className={`text-2xl font-bold ${analysis.spamFound.length === 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {analysis.spamFound.length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email Subject Line:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject line..."
            className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Preheader / Preview Text (Optional):</label>
          <input
            type="text"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            placeholder="Snippet shown next to subject line in inbox..."
            className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
      </div>

      {/* Simulated Mobile Email Client Notification */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Mobile Inbox Simulator:
        </label>
        <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 max-w-md">
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-bold text-gray-900 dark:text-gray-100">ToolSnippet Team</span>
            <span>9:41 AM</span>
          </div>
          <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
            {subject || "Subject line will appear here"}
          </p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
            {preview || "Email preheader text preview appears here..."}
          </p>
        </div>
      </div>

      {analysis.tips.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 dark:border-amber-500/30">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Optimization Alerts:
          </h4>
          <ul className="mt-2 space-y-1 text-xs text-amber-900 dark:text-amber-200 list-disc list-inside">
            {analysis.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </ToolContainer>
  );
}
