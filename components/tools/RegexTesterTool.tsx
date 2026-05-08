"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("\\b\\w{4}\\b");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState(
    "This line has code and many words.\nTest regex quickly."
  );

  const result = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(testText.matchAll(regex), (match) => match[0]);
      return { matches, error: "" };
    } catch (err) {
      return {
        matches: [] as string[],
        error: err instanceof Error ? err.message : "Invalid regex",
      };
    }
  }, [pattern, flags, testText]);

  return (
    <ToolContainer
      title="Regex Tester"
      description="Test your regular expressions against sample text in real-time."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Pattern</label>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
              placeholder="Regex pattern"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Flags</label>
            <input
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-24 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
              placeholder="gim"
            />
          </div>
        </div>

        <TextArea
          label="Test Text"
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          rows={8}
          placeholder="Enter text to test against..."
          error={result.error}
        />

        <div className="rounded-lg border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Matches ({result.matches.length})</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPattern("");
                setFlags("g");
                setTestText("");
              }}
            >
              Reset
            </Button>
          </div>
          
          <div className="max-h-60 overflow-y-auto rounded border border-black/5 bg-white p-2 dark:border-white/5 dark:bg-black/20">
            {result.matches.length > 0 ? (
              <ul className="space-y-1">
                {result.matches.map((match, index) => (
                  <li
                    key={`${match}-${index}`}
                    className="rounded bg-primary/10 px-2 py-1 text-sm font-mono dark:bg-primary/20"
                  >
                    {match}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4 text-center text-sm text-gray-500">No matches found.</p>
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
