"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import rawManifest from "@/lib/tools/manifest.json";
import type { ToolManifestEntry } from "@/lib/tools/types";

const manifest: ToolManifestEntry[] = rawManifest as ToolManifestEntry[];

export default function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac] = useState(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || "");
    }
    return false;
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: Ctrl+K / Cmd+K or "/" to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (
        e.key === "/" &&
        document.activeElement !== inputRef.current &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter tools based on query
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return manifest
      .filter((tool) => {
        const nameMatch = tool.name.toLowerCase().includes(q);
        const descMatch = tool.shortDescription.toLowerCase().includes(q);
        const catMatch = tool.category.toLowerCase().includes(q);
        const tagMatch = tool.tags && tool.tags.some((t) => t.toLowerCase().includes(q));
        return nameMatch || descMatch || catMatch || tagMatch;
      })
      .slice(0, 8); // Top 8 fast results
  }, [query]);

  const activeIndex = selectedIndex < results.length ? selectedIndex : 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && results[activeIndex]) {
        router.push(`/tools/${results[activeIndex].slug}`);
        setIsOpen(false);
        setQuery("");
        inputRef.current?.blur();
      } else if (query.trim()) {
        router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
  };

  const handleSelectTool = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={`Search ${manifest.length}+ developer tools...`}
          aria-label="Search tools"
          className="h-9 w-full rounded-lg border border-black/15 bg-black/[0.02] pl-9 pr-14 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-solid focus:bg-transparent focus:ring-1 focus:ring-primary-solid dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary-solid sm:text-sm"
        />

        {/* Action / Shortcut Badge or Clear Button */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="rounded p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden rounded border border-black/10 bg-black/5 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:border-white/10 dark:bg-white/10 dark:text-gray-400 sm:inline-block">
              {isMac ? "⌘K" : "Ctrl+K"}
            </kbd>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[380px] overflow-y-auto rounded-xl border border-black/10 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-2xl">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Tools ({results.length})
              </div>
              {results.map((tool, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={handleSelectTool}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-start justify-between gap-3 rounded-lg px-3 py-2 text-left transition ${
                      isSelected
                        ? "bg-primary-solid/10 text-primary-solid dark:bg-primary-solid/20"
                        : "hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-xs font-semibold text-gray-900 dark:text-gray-100 sm:text-sm">
                          {tool.name}
                        </span>
                        <span className="shrink-0 rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300">
                          {tool.category}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-gray-500 dark:text-gray-400 sm:text-xs">
                        {tool.shortDescription}
                      </p>
                    </div>
                    <span className="shrink-0 self-center text-xs text-gray-400 dark:text-gray-500">
                      →
                    </span>
                  </Link>
                );
              })}

              <div className="border-t border-black/5 pt-1.5 text-center dark:border-white/5">
                <Link
                  href={`/tools?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleSelectTool}
                  className="block rounded-md py-1.5 text-xs font-medium text-primary-solid hover:underline"
                >
                  View all results for &quot;{query}&quot; →
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No tools found matching &quot;{query}&quot;
              </p>
              <Link
                href="/tools"
                onClick={handleSelectTool}
                className="mt-2 inline-block text-xs font-medium text-primary-solid hover:underline"
              >
                Browse all tools directory →
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-black/5 px-2.5 pt-2 text-[10px] text-gray-400 dark:border-white/5 dark:text-gray-500">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
        </div>
      )}
    </div>
  );
}
