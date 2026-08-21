"use client";

import ToolContainer from "@/components/ui/ToolContainer";

import { useState } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  max: number;
  placeholder?: string;
  isTextArea?: boolean;
}

function AdField({ label, value, onChange, max, placeholder, isTextArea }: FieldProps) {
  const len = value.length;
  const isOver = len > max;
  const isClose = len >= max * 0.8 && !isOver;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold text-gray-700 dark:text-gray-300">{label}</label>
        <span
          className={`font-mono ${
            isOver ? "text-rose-600 font-bold" : isClose ? "text-amber-600 font-semibold" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {len} / {max} chars
        </span>
      </div>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className={`w-full rounded-xl border bg-transparent p-3 text-xs outline-none focus:ring-2 focus:ring-primary dark:bg-zinc-900/50 ${
            isOver ? "border-rose-500" : "border-black/15 dark:border-white/20"
          }`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-transparent px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:bg-zinc-900/50 ${
            isOver ? "border-rose-500" : "border-black/15 dark:border-white/20"
          }`}
        />
      )}
    </div>
  );
}

export default function AdCopyCharacterCounter() {
  const [platform, setPlatform] = useState<"google" | "meta" | "linkedin">("google");

  // Google RSA fields
  const [h1, setH1] = useState("Best Developer Tools 2026");
  const [h2, setH2] = useState("Fast, Private & 100% Free");
  const [h3, setH3] = useState("Try Online In Browser");
  const [d1, setD1] = useState("Explore 170+ developer tools: format JSON, SQL, convert data schemas, and generate crypto keys.");
  const [d2, setD2] = useState("Free browser utilities for web developers. No download required. Fast and 100% secure.");
  const [path1, setPath1] = useState("tools");
  const [path2, setPath2] = useState("developer");

  // Meta fields
  const [metaPrimary, setMetaPrimary] = useState("Boost your development workflow with 170+ browser-based developer utilities.");
  const [metaHeadline, setMetaHeadline] = useState("Free Online Developer Tools");
  const [metaDesc, setMetaDesc] = useState("Format, convert, and test code fast.");

  return (
    <ToolContainer title="Ad Copy Character & Limit Validator" description="Validate character limits and guidelines for Google Ads, Meta/Facebook, LinkedIn, and X/Twitter Ads.">
      <div className="space-y-6">
      <div className="flex gap-2 border-b border-black/10 pb-4 dark:border-white/10">
        <button
          type="button"
          onClick={() => setPlatform("google")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
            platform === "google" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
          }`}
        >
          🔍 Google Search Ads (RSA)
        </button>
        <button
          type="button"
          onClick={() => setPlatform("meta")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
            platform === "meta" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
          }`}
        >
          📱 Meta / Facebook Ads
        </button>
      </div>

      {platform === "google" && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <AdField label="Headline 1 (Required)" value={h1} onChange={setH1} max={30} placeholder="Max 30 chars" />
            <AdField label="Headline 2 (Required)" value={h2} onChange={setH2} max={30} placeholder="Max 30 chars" />
            <AdField label="Headline 3 (Optional)" value={h3} onChange={setH3} max={30} placeholder="Max 30 chars" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <AdField label="Description 1 (Required)" value={d1} onChange={setD1} max={90} isTextArea placeholder="Max 90 chars" />
            <AdField label="Description 2 (Optional)" value={d2} onChange={setD2} max={90} isTextArea placeholder="Max 90 chars" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <AdField label="Display Path 1 (Optional)" value={path1} onChange={setPath1} max={15} placeholder="e.g. tools" />
            <AdField label="Display Path 2 (Optional)" value={path2} onChange={setPath2} max={15} placeholder="e.g. free" />
          </div>
        </div>
      )}

      {platform === "meta" && (
        <div className="space-y-4">
          <AdField label="Primary Text (Mobile cutoff ~125 chars)" value={metaPrimary} onChange={setMetaPrimary} max={125} isTextArea />
          <AdField label="Headline (Max 40 chars recommended)" value={metaHeadline} onChange={setMetaHeadline} max={40} />
          <AdField label="Description (Max 30 chars recommended)" value={metaDesc} onChange={setMetaDesc} max={30} />
        </div>
      )}
      </div>
    </ToolContainer>
  );
}
