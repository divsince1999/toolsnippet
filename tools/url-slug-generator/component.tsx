"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "is", "by", "from", "up", "about", "into", "over", "after"
]);

export default function UrlSlugGeneratorTool() {
  const [inputTitle, setInputTitle] = useState("Top 10 Modern Next.js 15 & React Best Practices for 2026!");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [stripNumbers, setStripNumbers] = useState(false);
  const [maxLength, setMaxLength] = useState(80);

  const slug = useMemo(() => {
    if (!inputTitle.trim()) return "";

    // Normalize and remove diacritics / accents (e.g. café -> cafe)
    let text = inputTitle
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (lowercase) text = text.toLowerCase();

    // Replace special symbols with words or spaces
    text = text
      .replace(/&/g, " and ")
      .replace(/@/g, " at ")
      .replace(/%/g, " percent ");

    if (stripNumbers) {
      text = text.replace(/[0-9]/g, "");
    }

    // Replace non-alphanumeric with spaces
    text = text.replace(/[^a-zA-Z0-9\s-_]/g, " ");

    let words = text.split(/\s+/).filter(Boolean);

    if (removeStopWords) {
      words = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()));
    }

    let joined = words.join(separator);
    if (maxLength > 0 && joined.length > maxLength) {
      joined = joined.substring(0, maxLength).replace(new RegExp(`\\${separator}+$`), "");
    }

    return joined;
  }, [inputTitle, separator, lowercase, removeStopWords, stripNumbers, maxLength]);

  return (
    <ToolContainer
      title="URL Slug & Clean Permalink Generator"
      description="Convert article titles and headings into SEO-friendly, clean URL permalinks with custom separators."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
            Article Title or Heading
          </label>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Enter title (e.g. How to Build Fast Static Sites with Next.js)..."
            className="w-full rounded-lg border border-black/15 bg-white p-3 text-base dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Word Separator
            </label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as "-" | "_")}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="-">Hyphen ( - ) SEO</option>
              <option value="_">Underscore ( _ )</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Max Length ({maxLength})
            </label>
            <input
              type="number"
              min="20"
              max="200"
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value))}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 pt-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="rounded text-primary"
              />
              <span>Lowercase</span>
            </label>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
              <input
                type="checkbox"
                checked={removeStopWords}
                onChange={(e) => setRemoveStopWords(e.target.checked)}
                className="rounded text-primary"
              />
              <span>Filter Stop Words</span>
            </label>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
              <input
                type="checkbox"
                checked={stripNumbers}
                onChange={(e) => setStripNumbers(e.target.checked)}
                className="rounded text-primary"
              />
              <span>Strip Numbers</span>
            </label>
          </div>
        </div>

        {slug && (
          <TextArea
            label="Generated URL Slug"
            readOnly
            copyable
            value={slug}
            rows={2}
          />
        )}
      </div>
    </ToolContainer>
  );
}
