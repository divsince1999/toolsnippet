"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

function calculateTwitterLength(text: string): number {
  // Replace URLs with 23 char placeholders
  const urlRegex = /https?:\/\/[^\s]+/gi;
  const noUrls = text.replace(urlRegex, "x".repeat(23));

  let len = 0;
  for (const char of noUrls) {
    const code = char.codePointAt(0) || 0;
    // CJK and emoji usually count as 2
    if (code > 0x7f) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

function splitIntoThread(text: string): string[] {
  if (!text.trim()) return [];
  const words = text.split(/\s+/);
  const tweets: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (calculateTwitterLength(candidate) <= 265) {
      current = candidate;
    } else {
      if (current) tweets.push(current);
      current = word;
    }
  }
  if (current) tweets.push(current);

  const total = tweets.length;
  if (total <= 1) return tweets;

  return tweets.map((t, i) => `${t} (${i + 1}/${total})`);
}

const SAMPLE = `Building in public is one of the most effective ways to grow an audience and gather rapid feedback. When you share daily updates, developers connect with your journey and provide valuable insights that improve product quality.

Furthermore, automated testing and clean UI architecture guarantee that as your tool catalog expands to 200+ utilities, performance remains lightning fast and completely bug-free.

Always prioritize user experience, accessible dark mode, and client-side execution to ensure maximum privacy and speed.`;

export default function TwitterTweetCounter() {
  const [input, setInput] = useState(SAMPLE);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const length = useMemo(() => calculateTwitterLength(input), [input]);
  const thread = useMemo(() => splitIntoThread(input), [input]);

  const handleCopyTweet = (t: string, idx: number) => {
    navigator.clipboard.writeText(t);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(thread.join("\n\n---\n\n"));
    setCopiedIdx(-1);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <ToolContainer title="Twitter / X Thread Splitter & Counter" description="Calculate weighted 280-character Twitter limits and automatically split long paragraphs into numbered threads.">
      <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Total Characters</span>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{input.length}</p>
        </div>
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Twitter Weighted Chars</span>
          <p className={`text-2xl font-bold ${length <= 280 ? "text-emerald-600" : "text-amber-600"}`}>
            {length} / 280
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="text-xs text-gray-500 dark:text-gray-400">Thread Tweets</span>
          <p className="text-2xl font-bold text-primary-solid">{thread.length} Tweets</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Draft Tweet / Thread:</label>
          <Button variant="secondary" size="sm" onClick={() => setInput("")}>Clear</Button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or write your tweet or thread content..."
          rows={6}
          className="w-full rounded-xl border border-black/15 bg-transparent p-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
        />
      </div>

      {thread.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Generated Thread ({thread.length} Tweets):
            </label>
            <Button variant="secondary" size="sm" onClick={handleCopyAll}>
              {copiedIdx === -1 ? "✓ Copied All" : "Copy Entire Thread"}
            </Button>
          </div>

          <div className="space-y-3">
            {thread.map((tweetText, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {tweetText}
                </p>
                <div className="flex items-center justify-between border-t border-black/5 pt-2 dark:border-white/5 text-xs text-gray-400">
                  <span>Tweet #{idx + 1} ({calculateTwitterLength(tweetText)} chars)</span>
                  <Button variant="secondary" size="sm" onClick={() => handleCopyTweet(tweetText, idx)}>
                    {copiedIdx === idx ? "✓ Copied" : "Copy Tweet"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </ToolContainer>
  );
}
