"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const AUX_VERBS = "(?:is|are|was|were|been|being|be|am|get|got|gets|getting)";
const IRREGULAR_PAST = "(?:done|made|seen|written|taken|given|found|built|chosen|driven|eaten|known|shown|broken|spoken|frozen|lost|paid|sent|spent|told|thought|understood|won|read|cut|hit|let|put|set)";
const REGULAR_PAST = "(?:[a-z]{3,}ed)";
const PASSIVE_REGEX = new RegExp(`\\b${AUX_VERBS}\\s+(?:${IRREGULAR_PAST}|${REGULAR_PAST})(?:\\s+by\\b)?`, "gi");

const SAMPLE = `The new software update was deployed by the engineering team yesterday. Several bug fixes were implemented, and the documentation has been updated. Users are being notified via email.`;

export default function PassiveVoiceDetector() {
  const [text, setText] = useState(SAMPLE);

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return { matches: [], totalSentences: 0, passiveCount: 0, percentage: 0 };
    }

    const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
    const matches: { phrase: string; index: number }[] = [];

    let match;
    const regex = new RegExp(PASSIVE_REGEX);
    while ((match = regex.exec(text)) !== null) {
      matches.push({ phrase: match[0], index: match.index });
    }

    const totalSentences = Math.max(1, sentences.length);
    const passiveCount = matches.length;
    const percentage = Math.min(100, Math.round((passiveCount / totalSentences) * 100));

    return { matches, totalSentences, passiveCount, percentage };
  }, [text]);

  return (
    <ToolContainer title="Passive Voice Detector & Writing Assistant" description="Detect passive voice verb phrases in text and get actionable suggestions to convert them to active voice.">
      <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Passive Phrases Found</span>
          <p className={`text-2xl font-bold ${analysis.passiveCount > 0 ? "text-amber-600" : "text-emerald-600"}`}>
            {analysis.passiveCount}
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Total Sentences</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analysis.totalSentences}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Passive Density</span>
          <p className="text-2xl font-bold text-primary-solid">{analysis.percentage}%</p>
          <span className="text-[10px] text-gray-400">Target: &lt;10%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Text Draft:</label>
          <Button variant="secondary" size="sm" onClick={() => setText("")}>Clear</Button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write text..."
          rows={6}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
      </div>

      {analysis.matches.length > 0 && (
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Detected Passive Voice Phrases:
          </label>
          <div className="flex flex-wrap gap-2">
            {analysis.matches.map((m, i) => (
              <span
                key={i}
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:text-amber-200"
              >
                &ldquo;{m.phrase}&rdquo;
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 <strong>Tip:</strong> Rephrase these sentences by putting the actor or subject first (e.g., &ldquo;The engineering team deployed...&rdquo; instead of &ldquo;was deployed by...&rdquo;).
          </p>
        </div>
      )}
      </div>
    </ToolContainer>
  );
}
