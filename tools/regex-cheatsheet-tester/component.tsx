"use client";

import { useMemo, useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

const TOKENS = [
  { label: "Positive Lookahead", token: "(?=...)", desc: "Asserts what follows" },
  { label: "Negative Lookahead", token: "(?!...)", desc: "Asserts what does not follow" },
  { label: "Non-Capturing Group", token: "(?:...)", desc: "Groups without capturing" },
  { label: "Named Group", token: "(?<name>...)", desc: "Captures with label" },
  { label: "Word Boundary", token: "\\b", desc: "Matches start/end of word" },
  { label: "Digit", token: "\\d", desc: "Matches any digit [0-9]" },
  { label: "Whitespace", token: "\\s", desc: "Matches spaces/tabs/newlines" }
];

export default function RegexCheatsheetTester() {
  const [pattern, setPattern] = useState("(?<protocol>https?)://(?<domain>[a-zA-Z0-9.-]+)");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("Visit https://toolsnippet.io and http://example.com for free developer tools.");

  const results = useMemo(() => {
    if (!pattern.trim()) return { matches: [], error: "" };

    try {
      const reg = new RegExp(pattern, flags);
      const matches: { text: string; index: number; groups: Record<string, string> }[] = [];

      let match;
      if (flags.includes("g")) {
        while ((match = reg.exec(testText)) !== null) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: (match.groups as Record<string, string> | undefined) || {}
          });
          if (match.index === reg.lastIndex) reg.lastIndex++;
        }
      } else {
        match = reg.exec(testText);
        if (match) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: (match.groups as Record<string, string> | undefined) || {}
          });
        }
      }

      return { matches, error: "" };
    } catch (err: unknown) {
      return { matches: [], error: err instanceof Error ? err.message : "Invalid RegEx" };
    }
  }, [pattern, flags, testText]);

  const insertToken = (token: string) => {
    setPattern((prev) => prev + token);
  };

  return (
    <ToolContainer
      title="RegEx Token Builder & Cheatsheet Tester"
      description="Interactive regular expression tester with quick-click token inserts for lookaheads, capture groups, and anchors."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Quick-Insert Token Cheatsheet:
          </span>
          <div className="flex flex-wrap gap-2">
            {TOKENS.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => insertToken(t.token)}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-2.5 py-1 text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                <span className="font-mono text-primary-solid font-bold">{t.token}</span>{" "}
                <span className="text-gray-500 text-[11px]">({t.label})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="sm:col-span-3 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Regular Expression Pattern:
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Flags:
            </label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m, s"
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Test String:
          </label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.02] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Evaluation Results ({results.matches.length} matches):
            </span>
          </div>

          {results.error ? (
            <div className="text-xs text-rose-600 dark:text-rose-400 font-mono">
              Syntax Error: {results.error}
            </div>
          ) : results.matches.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {results.matches.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-black/10 bg-white p-3 text-xs dark:border-white/10 dark:bg-zinc-900"
                >
                  <div className="font-mono font-bold text-primary-solid break-all">
                    Match #{idx + 1}: &quot;{m.text}&quot; (at index {m.index})
                  </div>
                  {Object.keys(m.groups).length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-2 text-[11px] font-mono">
                      {Object.entries(m.groups).map(([k, v]) => (
                        <span key={k} className="rounded bg-primary-solid/10 px-2 py-0.5 text-primary-solid">
                          {k}: &quot;{v}&quot;
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-500 text-center py-4">No matches found for this pattern.</div>
          )}
        </div>
      </div>
    </ToolContainer>
  );
}
